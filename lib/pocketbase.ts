import PocketBase from 'pocketbase';

// Use environment variable for the URL (NEXT_PUBLIC_ prefix for browser access)
const POCKETBASE_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090';

export const pb = new PocketBase(POCKETBASE_URL);

// Optional: Enable auto-cancellation of pending requests
pb.autoCancellation(false);

// Types for our collections
export interface Booking {
  id?: string;
  name: string;
  email: string;
  lesson_type: string;
  preferred_time?: string;
  message?: string;
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created?: string;
  updated?: string;
}

export interface Lead {
  id?: string;
  name: string;
  email: string;
  message?: string;
  source?: string;
  status?: 'new' | 'contacted' | 'converted' | 'lost';
  created?: string;
  updated?: string;
}

export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  published: boolean;
  created?: string;
  updated?: string;
}

export interface Testimonial {
  id?: string;
  name: string;
  role: string;
  content: string;
  rating?: number;
  featured?: boolean;
  created?: string;
}

export interface LessonPackage {
  id?: string;
  name: string;
  level: string;
  description: string;
  features: string[];
  sessions: string;
  duration: string;
  price: string;
  popular: boolean;
  active: boolean;
}