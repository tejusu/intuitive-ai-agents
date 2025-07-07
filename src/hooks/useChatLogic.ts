
import { useState, useEffect } from 'react';
import { Message, getAIResponse } from '../utils/chatHelpers';
import { ShoppingFormValues } from '../components/AgentFormHandler';
import { ResearchFormValues } from '../components/ResearchAssistantForm';
import { Agent } from '../components/Layout';

export function useChatLogic(activeAgent: Agent) {
  const [messages, setMessages] = useState<Message[]>(activeAgent.chatHistory || []);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showShoppingForm, setShowShoppingForm] = useState(false);
  const [showResearchForm, setShowResearchForm] = useState(false);

  // Update messages when activeAgent changes
  useEffect(() => {
    setMessages(activeAgent.chatHistory || []);
    setShowShoppingForm(false);
    setShowResearchForm(false);
  }, [activeAgent.name, activeAgent.chatKey]);

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

  return {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    showShoppingForm,
    setShowShoppingForm,
    showResearchForm,
    setShowResearchForm,
    handleShoppingFormSubmit,
    handleResearchFormSubmit,
    handleSendMessage
  };
}
