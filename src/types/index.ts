export type UserRole = "admin" | "teacher" | "student";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  createdAt: Date;
  photoUrl?: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  maxPlays?: number;
  order: number;
  isWelcomeVideo?: boolean;
}

export interface Progress {
  userId: string;
  videoId: string;
  progress: number;
  completed: boolean;
  playCount: number;
  lastPosition: number;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userPhotoUrl?: string;
  content: string;
  createdAt: string;
}