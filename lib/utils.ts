import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRandomId(length = 8) {
  return Math.random().toString(36).substring(2, 2 + length);
}

const adjectives = ["Anonymous", "Hidden", "Secret", "Silent", "Lone", "Clever", "Brave", "Witty", "Curious", "Quick", "Daring", "Fierce", "Bold", "Swift", "Bright"];
const nouns = ["Fox", "Wolf", "Owl", "Bear", "Lion", "Tiger", "Eagle", "Shark", "Panther", "Hawk", "Dragon", "Phoenix", "Griffin", "Sprite", "Nomad"];

export function generateAnonymousName(): string {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adj}${noun}`;
}
