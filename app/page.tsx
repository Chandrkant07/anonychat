import { JoinRoomForm } from '@/components/JoinRoomForm';
import { CreateRoomForm } from '@/components/CreateRoomForm';
import { MessageSquareDashed } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-8 bg-background">
      <div className="flex flex-col items-center text-center space-y-6 w-full max-w-md">
        <div className="flex items-center gap-4">
            <MessageSquareDashed className="h-12 w-12 sm:h-16 sm:w-16 text-primary" />
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-primary font-headline">
              AnonyChat
            </h1>
        </div>
        <p className="max-w-2xl text-lg sm:text-xl text-foreground/80">
          Jump into ephemeral, real-time chat rooms. No accounts, no history, just anonymous conversations.
        </p>
        <div className="w-full pt-4">
          <Tabs defaultValue="join" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="join">Join Room</TabsTrigger>
              <TabsTrigger value="create">Create Room</TabsTrigger>
            </TabsList>
            <TabsContent value="join">
                <JoinRoomForm />
            </TabsContent>
            <TabsContent value="create">
                <CreateRoomForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
