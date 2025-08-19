"use client";

import { cn } from '@/lib/utils';
import { type Message } from './ChatRoom';
import { type UserProfile } from '@/hooks/use-user';
import UserAvatar from './UserAvatar';
import { format } from 'date-fns';

type MessageBubbleProps = {
  message: Message;
  currentUser: UserProfile | null;
};

export default function MessageBubble({ message, currentUser }: MessageBubbleProps) {
  const isCurrentUser = currentUser?.id === message.user.id;
  
  let timestamp;
  try {
    timestamp = message.timestamp?.toDate ? format(message.timestamp.toDate(), 'p') : null;
  } catch (e) {
    timestamp = null;
  }
  

  return (
    <div
      className={cn(
        'flex items-end gap-2 sm:gap-3 max-w-[85%] sm:max-w-[75%]',
        isCurrentUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
      )}
    >
      <UserAvatar user={message.user} />
      <div className={cn('flex flex-col', isCurrentUser ? 'items-end' : 'items-start')}>
        <div
          className={cn(
            'rounded-lg px-3 py-2 shadow-md',
            isCurrentUser
              ? 'bg-primary text-primary-foreground rounded-br-none'
              : 'bg-card text-card-foreground border rounded-bl-none'
          )}
        >
          <p className="font-semibold text-sm mb-1">{isCurrentUser ? 'You' : message.user.name}</p>
          <p className="text-base break-words whitespace-pre-wrap">{message.text}</p>
        </div>
        {timestamp && (
          <p className="text-xs text-muted-foreground mt-1 px-1">
            {timestamp}
          </p>
        )}
      </div>
    </div>
  );
}
