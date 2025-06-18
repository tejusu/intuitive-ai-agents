
import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, Plane, ShoppingBag, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChatMessage } from './ChatMessage';
import { TravelPlannerForm, TravelPlanFormValues } from './TravelPlannerForm';
import { ShoppingAssistantForm, ShoppingFormValues } from './ShoppingAssistantForm';

interface ChatViewProps {
  activeAgentName: string;
  activeAgentIcon: any;
  selectedModel: string;
  chatKey: number;
}

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  agentName?: string;
}

const agentPrompts = {
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

export function ChatView({ activeAgentName, activeAgentIcon: ActiveIcon, selectedModel, chatKey }: ChatViewProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages([]);
  }, [chatKey]);

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || inputValue.trim();
    if (!messageToSend) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageToSend,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(messageToSend, activeAgentName),
        isUser: false,
        timestamp: new Date(),
        agentName: activeAgentName
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleTravelFormSubmit = (values: TravelPlanFormValues) => {
    const message = `Plan a ${values.days}-day trip to ${values.destination} for ${values.travelers} travelers with a ${values.budget} budget. Interests: ${values.interests}. Travel style: ${values.style}.`;
    handleSendMessage(message);
  };

  const handleShoppingFormSubmit = (values: ShoppingFormValues) => {
    const message = `Help me find: ${values.query} in the ${values.category} category with a budget of ${values.budget}. Additional preferences: ${values.preferences}`;
    handleSendMessage(message);
  };

  const getAIResponse = (userMessage: string, agentName: string): string => {
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const prompts = agentPrompts[activeAgentName] || agentPrompts['AI Chat'];

  const renderAgentForm = () => {
    if (activeAgentName === 'Travel Planner') {
      return <TravelPlannerForm onSubmit={handleTravelFormSubmit} />;
    }
    if (activeAgentName === 'Shopping Assistant') {
      return <ShoppingAssistantForm onSubmit={handleShoppingFormSubmit} />;
    }
    return null;
  };

  if (messages.length === 0) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-8">
          <div className="text-center space-y-4 animate-fade-in-up">
            <div className="flex justify-center">
              <div className="p-4 bg-primary/10 rounded-2xl">
                <ActiveIcon className="h-12 w-12 text-primary" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Welcome to {activeAgentName}
              </h2>
              <p className="text-muted-foreground">
                {selectedModel}
              </p>
            </div>
          </div>

          {renderAgentForm()}

          <div className="w-full max-w-4xl space-y-4">
            <h3 className="text-lg font-semibold text-center text-foreground">
              Suggested prompts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {prompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="p-4 h-auto text-left justify-start bg-card hover:bg-accent transition-all duration-200 animate-scale-in rounded-xl border-border/50"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleSendMessage(prompt)}
                >
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{prompt}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-border/50">
          <div className="flex gap-3 max-w-4xl mx-auto">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Message ${activeAgentName}...`}
              className="flex-1 rounded-xl border-border/50 bg-background/50 backdrop-blur-sm"
            />
            <Button 
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim()}
              className="rounded-xl bg-primary hover:bg-primary/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.content}
              isUser={message.isUser}
              timestamp={message.timestamp}
              agentName={message.agentName}
            />
          ))}
          {isLoading && (
            <ChatMessage
              message="Thinking..."
              isUser={false}
              timestamp={new Date()}
              agentName={activeAgentName}
              isLoading={true}
            />
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      <div className="p-6 border-t border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="text-xs text-muted-foreground">
            {selectedModel}
          </div>
          <div className="flex gap-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Message ${activeAgentName}...`}
              className="flex-1 rounded-xl border-border/50 bg-background/50 backdrop-blur-sm"
            />
            <Button 
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isLoading}
              className="rounded-xl bg-primary hover:bg-primary/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
