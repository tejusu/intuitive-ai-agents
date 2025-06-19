
import { useState, useEffect } from 'react';
import { ChatWelcomeScreen } from './ChatWelcomeScreen';
import { ChatMessageList } from './ChatMessageList';
import { ChatInput } from './ChatInput';
import { TravelPlannerForm, TravelPlanFormValues } from './TravelPlannerForm';
import { ShoppingAssistantForm, ShoppingFormValues } from './ShoppingAssistantForm';
import { ResearchAssistantForm, ResearchFormValues } from './ResearchAssistantForm';
import { Message, getAIResponse } from '../utils/chatHelpers';
import { toast } from 'sonner';

interface ChatViewProps {
  activeAgentName: string;
  activeAgentIcon: any;
  selectedModel: string;
  chatKey: number;
}

export function ChatView({ activeAgentName, activeAgentIcon, selectedModel, chatKey }: ChatViewProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTravelForm, setShowTravelForm] = useState(false);
  const [showShoppingForm, setShowShoppingForm] = useState(false);
  const [showResearchForm, setShowResearchForm] = useState(false);

  useEffect(() => {
    setMessages([]);
    setShowTravelForm(false);
    setShowShoppingForm(false);
    setShowResearchForm(false);
  }, [chatKey]);

  const handleTravelFormSubmit = (values: TravelPlanFormValues) => {
    const formMessage = `I want to plan a ${values.days}-day trip to ${values.destination} for ${values.travelers} traveler(s) with a ${values.budget} budget, focusing on ${values.interests}.`;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: formMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setShowTravelForm(false);
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I've created a detailed travel plan for you!",
        isUser: false,
        timestamp: new Date(),
        agentName: activeAgentName,
        isTravelPlan: true,
        planDetails: values
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const handleShoppingFormSubmit = (values: ShoppingFormValues) => {
    const formMessage = `I'm looking for ${values.query} in the ${values.category} category with a budget of ${values.budget}. ${values.preferences ? `Additional preferences: ${values.preferences}` : ''}`;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: formMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setShowShoppingForm(false);
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Here are my product recommendations for you!",
        isUser: false,
        timestamp: new Date(),
        agentName: activeAgentName,
        isShoppingResponse: true,
        shoppingQuery: values.query
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const handleResearchFormSubmit = (values: ResearchFormValues) => {
    const formMessage = `I need research on "${values.topic}" with ${values.researchType} approach, ${values.researchDepth} depth, ${values.timeframe} timeframe. ${values.focusArea ? `Focus: ${values.focusArea}.` : ''} ${values.specificQuestions ? `Specific questions: ${values.specificQuestions}` : ''}`;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: formMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setShowResearchForm(false);
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Here's my comprehensive research on your topic!",
        isUser: false,
        timestamp: new Date(),
        agentName: activeAgentName,
        isResearchResponse: true,
        researchTopic: values.topic,
        researchType: values.researchType
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || inputValue.trim();
    if (!messageToSend) return;

    if (activeAgentName === 'Travel Planner' && messages.length === 0) {
      setShowTravelForm(true);
      return;
    }
    
    if (activeAgentName === 'Shopping Assistant' && messages.length === 0) {
      setShowShoppingForm(true);
      return;
    }

    if (activeAgentName === 'Research Assistant' && messages.length === 0) {
      setShowResearchForm(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageToSend,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

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

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('Message copied to clipboard!');
  };

  const handleLike = () => {
    toast.success('Feedback recorded!');
  };

  const handleDislike = () => {
    toast.success('Feedback recorded!');
  };

  const handleRegenerate = () => {
    toast.success('Regenerating response...');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (showTravelForm) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <TravelPlannerForm onSubmit={handleTravelFormSubmit} />
        </div>
      </div>
    );
  }

  if (showShoppingForm) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <ShoppingAssistantForm onSubmit={handleShoppingFormSubmit} />
        </div>
      </div>
    );
  }

  if (showResearchForm) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <ResearchAssistantForm onSubmit={handleResearchFormSubmit} />
        </div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <ChatWelcomeScreen
        activeAgentName={activeAgentName}
        activeAgentIcon={activeAgentIcon}
        selectedModel={selectedModel}
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSendMessage={handleSendMessage}
        onKeyPress={(e: React.KeyboardEvent) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
          }
        }}
      />
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ChatMessageList
        messages={messages}
        isLoading={isLoading}
        activeAgentIcon={activeAgentIcon}
        onCopy={(content: string) => {
          navigator.clipboard.writeText(content);
          toast.success('Message copied to clipboard!');
        }}
        onLike={() => toast.success('Feedback recorded!')}
        onDislike={() => toast.success('Feedback recorded!')}
        onRegenerate={() => toast.success('Regenerating response...')}
      />
      <ChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSendMessage={handleSendMessage}
        onKeyPress={(e: React.KeyboardEvent) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
          }
        }}
        isLoading={isLoading}
        activeAgentName={activeAgentName}
        selectedModel={selectedModel}
      />
    </div>
  );
}
