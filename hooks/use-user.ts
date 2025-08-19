"use client";

import { useState, useEffect } from 'react';
import { generateRandomId, generateAnonymousName } from '@/lib/utils';

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
}

export function useUser() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    let userProfile: UserProfile | null = null;
    const storedUser = localStorage.getItem('anonychat-user');

    if (storedUser) {
      try {
        userProfile = JSON.parse(storedUser);
      } catch (error) {
        console.error("Failed to parse user profile from localStorage", error);
        localStorage.removeItem('anonychat-user');
      }
    }

    if (!userProfile) {
      const userId = generateRandomId();
      userProfile = {
        id: userId,
        name: generateAnonymousName(),
        avatar: `https://api.dicebear.com/8.x/lorelei/svg?seed=${userId}`,
      };
      localStorage.setItem('anonychat-user', JSON.stringify(userProfile));
    }
    
    setUser(userProfile);
  }, []);

  return user;
}
