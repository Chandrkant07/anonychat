# AnonyChat

Anonymous, ephemeral chat rooms built with Next.js and Firebase.

## Overview
- Anonymous chat rooms with a clean UI
- App Router, server components where appropriate
- Tailwind CSS styling and shadcn/ui components
- Firebase Firestore for real-time data

## Tech Stack
- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- shadcn/ui
- Firebase (Firestore)

## Requirements
- Node.js 18+
- A Firebase project (Firestore enabled)

## Environment Variables
Create a `.env.local` in the project root with the following keys (from `lib/firebase.ts`):
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

## Quick Start
1. Install dependencies
   - npm: `npm install`
   - pnpm: `pnpm install`
   - yarn: `yarn`
2. Run the dev server
   - npm: `npm run dev`
   - pnpm: `pnpm dev`
   - yarn: `yarn dev`
3. Visit `http://localhost:3000`

## Build & Start
- Build: `npm run build`
- Start: `npm start`

## Firebase Setup Notes
- In the Firebase Console, create a Web App and copy the config into `.env.local`.
- Enable Firestore in production or test mode as needed.

## Project Structure
- `app/` Next.js App Router pages and layout
- `components/` UI and feature components
- `hooks/` React hooks
- `lib/` Firebase initialization and utilities
- `ai/` Genkit setup (optional)

## Deployment
- Recommended: Vercel
- Ensure all environment variables are configured in the hosting provider. 