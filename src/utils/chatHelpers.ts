
import { TravelPlanFormValues } from '../components/TravelPlannerForm';
import { ResearchFormValues } from '../components/ResearchAssistantForm';

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  agentName?: string;
  isTravelPlan?: boolean;
  isShoppingResponse?: boolean;
  isResearchResponse?: boolean;
  planDetails?: TravelPlanFormValues;
  shoppingQuery?: string;
  researchTopic?: string;
  researchDetails?: ResearchFormValues;
}

export const agentPrompts = {
  'AI Chat': [
    'Explain quantum computing in simple terms',
    'Help me write a professional email',
    'What are the latest AI trends?',
    'Debug my React component'
  ],
  'Travel Planner': [
    'Plan a 7-day trip to Europe',
    'Find budget-friendly destinations',
    'What to pack for a winter vacation',
    'Local cuisine recommendations'
  ],
  'Shopping Assistant': [
    'Find the best laptop under $1000',
    'Compare wireless headphones',
    'Sustainable fashion brands',
    'Home office setup essentials'
  ],
  'Researcher': [
    'Latest developments in renewable energy',
    'Summarize recent medical breakthroughs',
    'Market analysis for tech stocks',
    'Climate change research updates'
  ]
};

export const getAIResponse = (userMessage: string, agentName: string): string => {
  const responses = {
    'AI Chat': [
      "I'd be happy to help you with that! Let me break this down for you...",
      "That's a great question! Here's what I think...",
      "Based on my knowledge, I can provide you with the following insights...",
      "Let me analyze this for you and provide a comprehensive answer..."
    ],
    'Travel Planner': [
      "🌍 Exciting! I've found some amazing destinations for you. Here's what I recommend...",
      "✈️ Based on your preferences, I've crafted the perfect itinerary...",
      "🗺️ Let me help you plan an unforgettable trip with these suggestions...",
      "🏖️ I've researched the best options for your travel needs..."
    ],
    'Shopping Assistant': [
      "🛍️ I've found some excellent options that match your criteria...",
      "💰 Here are the best deals I've discovered for you...",
      "⭐ Based on reviews and ratings, I recommend these products...",
      "🔍 After comparing various options, here's what stands out..."
    ],
    'Researcher': [
      "📊 Based on the latest research and data, here are my findings...",
      "🔬 I've analyzed multiple sources and here's what the evidence shows...",
      "📈 The current trends and studies indicate that...",
      "📚 According to recent publications and expert opinions..."
    ]
  };

  const agentResponses = responses[agentName] || responses['AI Chat'];
  return agentResponses[Math.floor(Math.random() * agentResponses.length)];
};
