import { User, Task, CalendarEvent, Cluster, AIInsight, AgentPersonality } from '../types';

export const mockUser: User = {
  id: '1',
  firstName: 'Alex',
  lastName: 'Johnson',
  email: 'alex.johnson@example.com',
  agentName: 'JUNO – Works for Johnson',
  personality: 'friendly',
  clusters: ['johnson-family', 'johnson-work'],
};

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Review quarterly budget',
    description: 'Analyze Q3 spending and prepare for Q4 planning',
    completed: false,
    priority: 'high',
    dueDate: '2025-01-15',
    createdBy: 'juno',
    category: 'work',
    tags: ['#Business', '#Finance'],
    estimatedTime: '45 min'
  },
  {
    id: '2',
    title: 'Schedule team meeting',
    description: 'Plan next week\'s project sync with the development team',
    completed: false,
    priority: 'medium',
    dueDate: '2025-01-12',
    createdBy: 'user',
    category: 'work',
    tags: ['#Business', '#Meetings'],
    estimatedTime: '15 min'
  },
  {
    id: '3',
    title: 'Order office supplies',
    description: 'Restock printer paper and coffee for the office',
    completed: true,
    priority: 'low',
    dueDate: '2025-01-10',
    createdBy: 'juno',
    category: 'work',
    tags: ['#Business', '#Office'],
    estimatedTime: '10 min'
  },
  {
    id: '4',
    title: 'Post vintage camera on Facebook Marketplace',
    description: 'Create listing for Canon AE-1 with smart pricing and description',
    completed: false,
    priority: 'medium',
    dueDate: '2025-01-13',
    createdBy: 'juno',
    category: 'marketplace',
    tags: ['#Life', '#Marketplace'],
    estimatedTime: '20 min',
    socialPlatform: 'marketplace',
    marketplaceItem: {
      title: 'Vintage Canon AE-1 Film Camera',
      price: 180,
      description: 'Excellent condition vintage Canon AE-1 35mm film camera. Perfect for photography enthusiasts. Includes original strap and lens cap.',
      category: 'Electronics',
      condition: 'good',
      images: ['https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg'],
      location: 'Downtown'
    }
  },
  {
    id: '5',
    title: 'Schedule Instagram post about weekend project',
    description: 'Share DIY kitchen renovation progress with engaging caption',
    completed: false,
    priority: 'low',
    dueDate: '2025-01-14',
    createdBy: 'juno',
    category: 'social',
    tags: ['#Life', '#Social'],
    estimatedTime: '15 min',
    socialPlatform: 'instagram',
    postContent: {
      text: 'Weekend DIY project complete! ✨ Transformed our kitchen with some paint and new hardware. Sometimes the smallest changes make the biggest impact.',
      hashtags: ['#DIY', '#KitchenReno', '#WeekendProject', '#HomeImprovement', '#Transformation'],
      scheduledTime: '2025-01-14T18:00:00Z',
      mediaUrls: ['https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg']
    }
  },
  {
    id: '6',
    title: 'Draft LinkedIn post about industry insights',
    description: 'Share thoughts on emerging tech trends with professional tone',
    completed: false,
    priority: 'medium',
    dueDate: '2025-01-15',
    createdBy: 'juno',
    category: 'business',
    tags: ['#Business', '#LinkedIn'],
    estimatedTime: '25 min',
    socialPlatform: 'linkedin',
    postContent: {
      text: 'The convergence of AI and automation is reshaping how we approach productivity. Key insight: it\'s not about replacing human creativity, but amplifying it.',
      hashtags: ['#AI', '#Productivity', '#TechTrends', '#Innovation', '#Leadership'],
      scheduledTime: '2025-01-15T09:00:00Z'
    }
  },
  {
    id: '7',
    title: 'Reply to customer inquiries on Facebook',
    description: 'Respond to 3 pending messages about product availability',
    completed: false,
    priority: 'high',
    dueDate: '2025-01-12',
    createdBy: 'juno',
    category: 'business',
    tags: ['#Business', '#CustomerService'],
    estimatedTime: '30 min'
  },
  {
    id: '8',
    title: 'Ship sold marketplace items',
    description: 'Package and ship 2 items sold yesterday - vintage books and desk lamp',
    completed: false,
    priority: 'high',
    dueDate: '2025-01-12',
    createdBy: 'juno',
    category: 'marketplace',
    tags: ['#Life', '#Shipping'],
    estimatedTime: '45 min'
  }
];

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Client presentation',
    date: '2025-01-13',
    time: '10:00 AM',
    type: 'meeting',
    attendees: ['client@example.com', 'team@example.com']
  },
  {
    id: '2',
    title: 'Doctor appointment',
    date: '2025-01-14',
    time: '2:30 PM',
    type: 'reminder'
  },
  {
    id: '3',
    title: 'Family dinner',
    date: '2025-01-15',
    time: '7:00 PM',
    type: 'event'
  }
];

export const mockClusters: Cluster[] = [
  {
    id: 'johnson-family',
    name: 'Johnson Family',
    lastName: 'Johnson',
    members: [mockUser],
    sharedTasks: [
      {
        id: 'f1',
        title: 'Plan weekend trip',
        description: 'Coordinate family vacation to the mountains',
        completed: false,
        priority: 'medium',
        dueDate: '2025-01-20',
        createdBy: 'juno'
      }
    ],
    recentUpdates: [
      'Sarah Johnson joined the cluster',
      'New shared task: "Plan weekend trip" added',
      'Family calendar updated with 3 new events'
    ]
  },
  {
    id: 'johnson-work',
    name: 'Johnson Professionals',
    lastName: 'Johnson',
    members: [mockUser],
    sharedTasks: [
      {
        id: 'w1',
        title: 'Quarterly team sync',
        description: 'Coordinate with other Johnson professionals on Q1 goals',
        completed: false,
        priority: 'high',
        dueDate: '2025-01-18',
        createdBy: 'juno'
      }
    ],
    recentUpdates: [
      'Mike Johnson shared a project update',
      'New networking opportunity identified',
      'Cluster performance metrics improved by 15%'
    ]
  }
];

export const mockAIInsights: AIInsight[] = [
  {
    id: '1',
    type: 'suggestion',
    title: 'Optimize your schedule',
    description: 'I noticed you have 3 meetings tomorrow. Would you like me to suggest buffer time between them?',
    actionable: true,
    timestamp: '2025-01-11T09:15:00Z'
  },
  {
    id: '2',
    type: 'reminder',
    title: 'Follow up pending',
    description: 'You haven\'t followed up on the client email from 3 days ago. Should I draft a response?',
    actionable: true,
    timestamp: '2025-01-11T08:30:00Z'
  },
  {
    id: '3',
    type: 'analysis',
    title: 'Productivity insight',
    description: 'Your most productive time is between 9-11 AM. Consider scheduling important tasks during this window.',
    actionable: false,
    timestamp: '2025-01-11T07:45:00Z'
  }
];

export const personalityDescriptions: Record<AgentPersonality, string> = {
  friendly: 'Warm, encouraging, and supportive. JUNO will use casual language and provide gentle nudges.',
  professional: 'Formal, efficient, and business-focused. JUNO will maintain professional tone and prioritize work tasks.',
  casual: 'Relaxed, conversational, and laid-back. JUNO will be more informal and focus on work-life balance.',
  expert: 'Analytical, detailed, and precise. JUNO will provide in-depth insights and data-driven recommendations.'
};