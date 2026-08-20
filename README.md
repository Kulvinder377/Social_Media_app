# Pulse — Social Media Platform

Pulse is a full-stack social media application built with the MERN stack. It supports accounts, rich posts, social interactions, tailored feeds, and instant messaging powered by Socket.IO.

## Features

- JWT authentication and protected routes
- Profiles, bios, avatars, follow/unfollow
- Image and video posts, likes, comments and saves
- Personalized feed based on followed accounts
- Socket.IO direct messages, typing state and online presence (clients identify their user id on connection)
- Responsive React interface with dark, editorial styling

## Tech stack

React · Vite · Node.js · Express · MongoDB · Mongoose · Socket.IO · JWT

## Run locally

1. Copy `server/.env.example` to `server/.env` and fill in your values.
2. Install dependencies:
   ```bash
   npm install
   npm run install:all
   ```
3. Start both services:
   ```bash
   npm run dev
   ```

The client runs at `http://localhost:5173`; the API runs at `http://localhost:5000`.

## Environment variables

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/pulse
JWT_SECRET=replace-with-a-long-random-string
CLIENT_URL=http://localhost:5173
```
