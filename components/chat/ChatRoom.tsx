"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
  limit,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useUser, type UserProfile } from '@/hooks/use-user';
import { ArrowLeft, Loader2, Copy } from 'lucide-react';

import { Button } from '@/components/ui/button';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export interface Message {
  id: string;
  text: string;
  timestamp: any;
  user: UserProfile;
}

export default function ChatRoom({ roomId }: { roomId: string }) {
  const router = useRouter();
  const user = useUser();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [roomName, setRoomName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(roomId);
    toast({
      title: "Copied!",
      description: "Room code has been copied to your clipboard.",
    });
  };

  useEffect(() => {
    if (!roomId) return;

    const fetchRoomDetails = async () => {
      try {
        const roomRef = doc(db, 'rooms', roomId);
        const roomSnap = await getDoc(roomRef);

        if (roomSnap.exists()) {
          setRoomName(roomSnap.data().name);
        } else {
          setError("Room not found. It may have been deleted or never existed.");
          setTimeout(() => router.push('/'), 3000);
        }
      } catch (err) {
         setError("Failed to fetch room details.");
      }
    };

    fetchRoomDetails();

    const messagesRef = collection(db, 'rooms', roomId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'), limit(100));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs: Message[] = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() } as Message);
      });
      setMessages(msgs);
      if (loading) setLoading(false);
    }, (err) => {
      console.error("Error listening to messages:", err);
      setError("Could not load messages. Please try refreshing.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, [roomId, router, loading]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg font-semibold">Entering Room...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-4 bg-background">
        <h2 className="text-2xl font-bold text-destructive">{error}</h2>
        <p className="text-muted-foreground mt-2">Redirecting you to the homepage...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-secondary/30">
      <header className="flex items-center p-3 sm:p-4 border-b bg-card shadow-sm sticky top-0 z-10">
        <Button asChild variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0">
          <Link href="/">
            <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="sr-only">Back to Home</span>
          </Link>
        </Button>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 ml-2 sm:ml-4 flex-grow min-w-0">
            <h1 className="text-lg sm:text-xl font-bold truncate font-headline">{roomName}</h1>
            <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground font-mono tracking-widest bg-muted px-2 py-1 rounded-md">{roomId}</span>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleCopyCode}>
                                <Copy className="h-4 w-4" />
                                <span className="sr-only">Copy Room Code</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Copy Code</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} currentUser={user} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className="p-4 border-t bg-card sticky bottom-0">
        {user && <ChatInput roomId={roomId} user={user} />}
      </footer>
    </div>
  );
}
