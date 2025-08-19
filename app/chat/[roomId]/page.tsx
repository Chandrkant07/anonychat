import ChatRoom from '@/components/chat/ChatRoom';

type ChatPageProps = {
  params: { roomId: string };
};

// This page is kept as a Server Component for structure,
// but all Firebase logic is delegated to the ChatRoom client component
// due to the constraint of not using the Firebase Admin SDK.
export default function ChatPage({ params }: ChatPageProps) {
  return <ChatRoom roomId={params.roomId} />;
}
