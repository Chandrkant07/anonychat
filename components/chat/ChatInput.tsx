"use client";

import { useState } from 'react';
import { addDoc, collection, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from "@/hooks/use-toast";
import { type UserProfile } from '@/hooks/use-user';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { SendHorizonal } from 'lucide-react';

type ChatInputProps = {
  roomId: string;
  user: UserProfile;
};

const MESSAGE_RATE_LIMIT_MS = 2000; // 2 seconds

export default function ChatInput({ roomId, user }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [lastMessageTime, setLastMessageTime] = useState(0);
  const { toast } = useToast();

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isSending) return;

    const now = Date.now();
    if (now - lastMessageTime < MESSAGE_RATE_LIMIT_MS) {
      toast({
        title: "Whoa, slow down!",
        description: `You can only send a message every ${MESSAGE_RATE_LIMIT_MS / 1000} seconds.`,
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);

    try {
      const messagesRef = collection(db, 'rooms', roomId, 'messages');
      await addDoc(messagesRef, {
        text: message.trim(),
        timestamp: serverTimestamp(),
        user: {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
        },
      });
      
      const roomRef = doc(db, 'rooms', roomId);
      await updateDoc(roomRef, {
        lastActivity: serverTimestamp(),
      });

      setMessage('');
      setLastMessageTime(now);
    } catch (error) {
      console.error("Error sending message: ", error);
      toast({
        title: "Message failed",
        description: "Could not send your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };
  
  return (
    <form onSubmit={handleSendMessage} className="flex items-start gap-2 sm:gap-4">
      <Textarea
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(e);
          }
        }}
        rows={1}
        className="flex-1 resize-none max-h-32 text-base"
        disabled={isSending}
        aria-label="Chat message input"
      />
      <Button type="submit" size="icon" disabled={isSending || !message.trim()} className="h-12 w-12 sm:h-10 sm:w-10 flex-shrink-0">
        <SendHorizonal className="h-5 w-5" />
        <span className="sr-only">Send</span>
      </Button>
    </form>
  );
}
