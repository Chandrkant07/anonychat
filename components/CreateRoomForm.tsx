
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { generateRandomId } from "@/lib/utils";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export function CreateRoomForm() {
  const [roomName, setRoomName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomName.trim() || isLoading) return;

    setIsLoading(true);
    const normalizedRoomName = roomName.trim().toLowerCase();

    try {
      const roomId = generateRandomId(10);
      const newRoomRef = doc(db, "rooms", roomId);
      await setDoc(newRoomRef, {
        name: roomName.trim(),
        normalizedName: normalizedRoomName,
        createdAt: serverTimestamp(),
        lastActivity: serverTimestamp(),
      });
      router.push(`/chat/${roomId}`);
    } catch (error) {
      console.error("Error creating room: ", error);
      toast({
        title: "Error",
        description: "Could not create room. Please check your connection and try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-lg border-primary/20 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold font-headline">Create a New Room</CardTitle>
        <CardDescription>Give your new chat room a unique name.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCreateRoom} className="space-y-4">
          <Input
            type="text"
            placeholder="e.g., Secret Project Planning"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            required
            minLength={3}
            maxLength={50}
            className="text-base p-6"
            aria-label="New Room Name"
          />
          <Button type="submit" className="w-full text-lg p-6 font-semibold" disabled={isLoading || !roomName.trim()}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Creating..." : "Create Room"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
