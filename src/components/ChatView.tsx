
import { useState, useEffect } from 'react';
import { ChatWelcomeScreen } from './ChatWelcomeScreen';
import { ChatMessageList } from './ChatMessageList';
import { ChatInput } from './ChatInput';
import { TravelPlannerForm, TravelPlanFormValues } from './TravelPlannerForm';
import { ShoppingAssistantForm, ShoppingFormValues } from './ShoppingAssistantForm';
import { ResearchAssistantForm, ResearchFormValues } from './ResearchAssistantForm';
import { Message, getAIResponse } from '../utils/chatHelpers';
import { toast } from 'sonner';
import { Agent } from './Layout';

interface ChatViewProps {
  activeAgent: Agent;
  selectedModel: string;
}

export function ChatView({ activeAgent, selectedModel }: ChatViewProps) {
  const [messages, setMessages] = useState<Message[]>(activeAgent.chatHistory || []);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTravelForm, setShowTravelForm] = useState(false);
  const [showShoppingForm, setShowShoppingForm] = useState(false);
  const [showResearchForm, setShowResearchForm] = useState(false);

  // Update messages when activeAgent changes
  useEffect(() => {
    setMessages(activeAgent.chatHistory || []);
    setShowTravelForm(false);
    setShowShoppingForm(false);
    setShowResearchForm(false);
  }, [activeAgent.name, activeAgent.chatKey]);

  const handleTravelFormSubmit = (values: TravelPlanFormValues) => {
    const formMessage = `I want to plan a ${values.days}-day trip to ${values.destination} for ${values.travelers} traveler(s) with a ${values.budget} budget, focusing on ${values.interests}.`;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: formMessage,
      isUser: true,
      timestamp: new Date()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setShowTravelForm(false);
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I've created a detailed travel plan for you!",
        isUser: false,
        timestamp: new Date(),
        agentName: activeAgent.name,
        isTravelPlan: true,
        planDetails: values
      };
      const updatedMessages = [...newMessages, aiResponse];
      setMessages(updatedMessages);
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

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setShowShoppingForm(false);
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Here are my product recommendations for you!",
        isUser: false,
        timestamp: new Date(),
        agentName: activeAgent.name,
        isShoppingResponse: true,
        shoppingQuery: values.query
      };
      const updatedMessages = [...newMessages, aiResponse];
      setMessages(updatedMessages);
      setIsLoading(false);
    }, 2000);
  };

  const handleResearchFormSubmit = (values: ResearchFormValues) => {
    const formMessage = `I need research on "${values.topic}" with ${values.type} approach, ${values.depth} depth level, timeframe: ${values.timeframe}. ${values.focusArea ? `Focus area: ${values.focusArea}. ` : ''}${values.questions ? `Specific questions: ${values.questions}` : ''}`;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: formMessage,
      isUser: true,
      timestamp: new Date()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setShowResearchForm(false);
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Here's my comprehensive research findings!",
        isUser: false,
        timestamp: new Date(),
        agentName: activeAgent.name,
        isResearchResponse: true,
        researchTopic: values.topic,
        researchDetails: values
      };
      const updatedMessages = [...newMessages, aiResponse];
      setMessages(updatedMessages);
      setIsLoading(false);
    }, 2000);
  };

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || inputValue.trim();
    if (!messageToSend) return;

    if (activeAgent.name === 'Travel Planner' && messages.length === 0) {
      setShowTravelForm(true);
      return;
    }
    
    if (activeAgent.name === 'Shopping Assistant' && messages.length === 0) {
      setShowShoppingForm(true);
      return;
    }

    if (activeAgent.name === 'Researcher' && messages.length === 0) {
      setShowResearchForm(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageToSend,
      isUser: true,
      timestamp: new Date()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(messageToSend, activeAgent.name),
        isUser: false,
        timestamp: new Date(),
        agentName: activeAgent.name
      };
      const updatedMessages = [...newMessages, aiResponse];
      setMessages(updatedMessages);
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
        activeAgentName={activeAgent.name}
        activeAgentIcon={activeAgent.icon}
        selectedModel={selectedModel}
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSendMessage={handleSendMessage}
        onKeyPress={handleKeyPress}
      />
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ChatMessageList
        messages={messages}
        isLoading={isLoading}
        activeAgentIcon={activeAgent.icon}
        onCopy={handleCopy}
        onLike={handleLike}
        onDislike={handleDislike}
        onRegenerate={handleRegenerate}
      />
      <ChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSendMessage={handleSendMessage}
        onKeyPress={handleKeyPress}
        isLoading={isLoading}
        activeAgentName={activeAgent.name}
        selectedModel={selectedModel}
      />
    </div>
  );
}
