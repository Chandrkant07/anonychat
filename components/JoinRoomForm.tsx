"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export function JoinRoomForm() {
  const [roomCode, setRoomCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomCode.trim() || isLoading) return;

    setIsLoading(true);
    const roomId = roomCode.trim();

    try {
      const roomRef = doc(db, "rooms", roomId);
      const roomSnap = await getDoc(roomRef);

      if (roomSnap.exists()) {
        router.push(`/chat/${roomId}`);
      } else {
        toast({
          title: "Room not found",
          description: "A room with that code doesn't exist. Check the code or create a new room.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error joining room: ", error);
      toast({
        title: "Error",
        description: "Could not join room. Please check your connection and try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-lg border-primary/20 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold font-headline">Join Existing Room</CardTitle>
        <CardDescription>Enter the unique code for the room you want to join.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleJoinRoom} className="space-y-4">
          <Input
            type="text"
            placeholder="Enter room code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            required
            className="text-base p-6 tracking-widest"
            aria-label="Room Code"
          />
          <Button type="submit" className="w-full text-lg p-6 font-semibold" disabled={isLoading || !roomCode.trim()}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Joining..." : "Join Room"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
