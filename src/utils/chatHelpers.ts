import { TravelPlanFormValues } from '../components/TravelPlannerForm';

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  agentName?: string;
  isTravelPlan?: boolean;
  planDetails?: any;
  isShoppingResponse?: boolean;
  shoppingQuery?: string;
  isResearchResponse?: boolean;
  researchTopic?: string;
  researchType?: string;
}

export const agentPrompts: { [key: string]: string[] } = {
  'AI Chat': [
    "What's the latest in AI technology?",
    "Help me brainstorm ideas for my project",
    "Explain quantum computing in simple terms",
    "What are the best practices for remote work?"
  ],
  'Travel Planner': [
    "Plan a weekend getaway to Paris",
    "I need a budget-friendly trip to Southeast Asia",
    "Suggest romantic destinations for honeymoon",
    "Plan a family vacation with kids under 10"
  ],
  'Shopping Assistant': [
    "Find me the best laptop for coding",
    "I need workout gear for home fitness",
    "Recommend skincare products for sensitive skin",
    "Find gifts under $50 for my friend's birthday"
  ],
  'Research Assistant': [
    "Research the impact of AI on job markets",
    "Analyze current trends in renewable energy",
    "Study the effects of remote work on productivity",
    "Investigate blockchain applications in healthcare"
  ]
};

export const getAIResponse = (message: string, agentName: string): string => {
  const responses = {
    'AI Chat': [
      "That's a great question! Let me help you with that...",
      "I understand what you're looking for. Here's my take on it...",
      "Interesting perspective! Let me share some insights...",
      "Based on current information, here's what I can tell you..."
    ],
    'Travel Planner': [
      "What an exciting destination! Let me create the perfect itinerary for you...",
      "I love helping with travel plans! Here are some amazing suggestions...",
      "That sounds like a wonderful trip! Let me help you make it unforgettable...",
      "Great choice! I'll help you discover the best experiences there..."
    ],
    'Shopping Assistant': [
      "I've found some fantastic options that match your criteria...",
      "Great choice! Here are the best products I recommend...",
      "I've compared several options and here are my top picks...",
      "Perfect timing! I found some great deals on exactly what you need..."
    ],
    'Research Assistant': [
      "I've conducted thorough research on this topic. Here are the key findings...",
      "This is a fascinating subject! My research reveals several important insights...",
      "I've analyzed multiple sources and compiled comprehensive findings...",
      "Based on my research across various databases and sources..."
    ]
  };

  const agentResponses = responses[agentName as keyof typeof responses] || responses['AI Chat'];
  return agentResponses[Math.floor(Math.random() * agentResponses.length)];
};
