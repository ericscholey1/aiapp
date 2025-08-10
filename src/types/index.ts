export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  agentName: string;
  personality: AgentPersonality;
  clusters: string[];
  avatar?: string;
}

export type AgentPersonality = 'friendly' | 'professional' | 'casual' | 'expert';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  createdBy: 'user' | 'juno';
  category: 'work' | 'personal' | 'life' | 'business' | 'social' | 'marketplace';
  tags: string[];
  estimatedTime?: string;
  attachments?: string[];
  socialPlatform?: 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'marketplace';
  postContent?: {
    text: string;
    hashtags: string[];
    scheduledTime?: string;
    mediaUrls?: string[];
  };
  marketplaceItem?: {
    title: string;
    price: number;
    description: string;
    category: string;
    condition: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
    images: string[];
    location: string;
  };
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'meeting' | 'reminder' | 'event';
  attendees?: string[];
}

export interface Cluster {
  id: string;
  name: string;
  lastName: string;
  members: User[];
  sharedTasks: Task[];
  recentUpdates: string[];
}

export interface AIInsight {
  id: string;
  type: 'suggestion' | 'reminder' | 'analysis';
  title: string;
  description: string;
  actionable: boolean;
  timestamp: string;
}

export type AppScreen = 'signup' | 'onboarding' | 'dashboard' | 'personality' | 'clusters' | 'privacy';