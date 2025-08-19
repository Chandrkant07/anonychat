"use client";

import Image from 'next/image';
import { type UserProfile } from '@/hooks/use-user';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function UserAvatar({ user }: { user: UserProfile }) {
  return (
    <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
      <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="avatar character" />
      <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
