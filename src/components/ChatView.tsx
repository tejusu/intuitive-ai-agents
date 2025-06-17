
import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Paperclip, Mic, ArrowRight, LucideIcon, Check, X, Sparkles } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { TravelPlannerForm, TravelPlanFormValues } from './TravelPlannerForm';
import { ShoppingAssistantForm, ShoppingFormValues } from './ShoppingAssistantForm';

const agentInfo = {
  'AI Chat': {
    title: 'AI Chat',
    subtitle: 'Your intelligent AI companion for any question or task.',
    suggestions: [
      'Draft an email to my team about the new project timeline.',
      'Give me 10 ideas for a blog post about sustainable living.',
      "Explain the concept of 'machine learning' in simple terms.",
    ],
  },
  'Travel Planner': {
    title: 'Travel Planner',
    subtitle: 'Let me help you plan your next adventure with detailed itineraries.',
    suggestions: [
      'Create a 5-day itinerary for a relaxing beach vacation in Bali.',
      'What are the must-see historical sites in Rome?',
      'Find me unique, non-touristy experiences in Paris.',
    ],
  },
  'Shopping Assistant': {
    title: 'Shopping Assistant',
    subtitle: 'Your personal guide to smart shopping and product recommendations.',
    suggestions: [
      'What are the top-rated noise-cancelling headphones for under $200?',
      'Help me find a sustainable and ethical brand for everyday basics.',
      'Compare the new iPhone with the latest Google Pixel.',
    ],
  },
  'Researcher': {
    title: 'Researcher',
    subtitle: 'Get in-depth information and analysis on any topic.',
    suggestions: [
      'Summarize the latest breakthroughs in renewable energy technology.',
      'Provide a detailed overview of the causes of the Great Depression.',
      'Find academic papers on the psychological effects of social media.',
    ],
  },
};

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  isTravelPlan?: boolean;
  planDetails?: TravelPlanFormValues;
  isShoppingResponse?: boolean;
  shoppingQuery?: string;
}

interface ChatViewProps {
  activeAgentName: string;
  activeAgentIcon: LucideIcon;
  selectedModel: string;
  chatKey: number;
}

export function ChatView({ activeAgentName, activeAgentIcon: ActiveAgentIcon, selectedModel, chatKey }: ChatViewProps) {
  const currentAgentInfo = agentInfo[activeAgentName] || agentInfo['AI Chat'];
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showTravelForm, setShowTravelForm] = useState(false);
  const [showShoppingForm, setShowShoppingForm] = useState(false);
  const [currentPlanDetails, setCurrentPlanDetails] = useState<TravelPlanFormValues | undefined>();
  const [currentShoppingDetails, setCurrentShoppingDetails] = useState<ShoppingFormValues | undefined>();

  useEffect(() => {
    setMessages([]);
    setShowTravelForm(false);
    setShowShoppingForm(false);
    setInput('');
  }, [activeAgentName, chatKey]);

  const handleStartEdit = (message: Message) => {
    setInput(message.text);
    setEditingMessageId(message.id);
  };

  const cancelEdit = () => {
    setInput('');
    setEditingMessageId(null);
  };

  const handleSendMessage = (e: React.FormEvent, messageText?: string) => {
    e.preventDefault();
    const text = (messageText || input).trim();
    if (!text) return;

    if (editingMessageId) {
      setMessages(messages.map(msg => 
        msg.id === editingMessageId ? { ...msg, text } : msg
      ));
      setEditingMessageId(null);
    } else {
      const newMessage = { id: Date.now(), text, sender: 'user' as const };
      setMessages(prev => [...prev, newMessage]);
      
      if (activeAgentName === 'Travel Planner') {
        setShowTravelForm(true);
      } else if (activeAgentName === 'Shopping Assistant') {
        setShowShoppingForm(true);
      }
    }
    setInput('');
  };

  const handleTravelFormSubmit = (values: TravelPlanFormValues) => {
    setCurrentPlanDetails(values);
    const userMessageText = `Here are my travel details for ${values.destination}.`;
    
    const userMessage: Message = {
        id: Date.now(),
        text: userMessageText,
        sender: 'user',
    };
    
    const aiResponse: Message = {
        id: Date.now() + 1,
        sender: 'ai',
        text: 'Generated travel plan',
        isTravelPlan: true,
        planDetails: values
    };

    setMessages(prev => [...prev, userMessage, aiResponse]);
    setShowTravelForm(false);
  }

  const handleShoppingFormSubmit = (values: ShoppingFormValues) => {
    setCurrentShoppingDetails(values);
    const userMessageText = `I'm looking for ${values.query} in the ${values.category} category with a budget of ${values.budget}.`;
    
    const userMessage: Message = {
        id: Date.now(),
        text: userMessageText,
        sender: 'user',
    };
    
    const aiResponse: Message = {
        id: Date.now() + 1,
        sender: 'ai',
        text: 'Shopping recommendations',
        isShoppingResponse: true,
        shoppingQuery: values.query
    };

    setMessages(prev => [...prev, userMessage, aiResponse]);
    setShowShoppingForm(false);
  }

  const handleUpdatePlan = () => {
    setShowTravelForm(true);
  };

  const handleRegenerateShoppingResults = (query: string) => {
    const aiResponse: Message = {
        id: Date.now(),
        sender: 'ai',
        text: 'Updated shopping recommendations',
        isShoppingResponse: true,
        shoppingQuery: query
    };
    setMessages(prev => [...prev, aiResponse]);
  };

  useEffect(() => {
    if (activeAgentName === 'Travel Planner' && showTravelForm) {
      return;
    }

    if (activeAgentName === 'Shopping Assistant' && showShoppingForm) {
      return;
    }

    if (messages.length > 0 && messages[messages.length - 1].sender === 'user' && !editingMessageId) {
      const timer = setTimeout(() => {
        const aiResponse = { 
          id: Date.now() + 1, 
          text: `This is a simulated response from ${currentAgentInfo.title} regarding "${messages[messages.length - 1].text}". As a demo assistant, I'm here to show you what a conversation could look like.`, 
          sender: 'ai' as const 
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [messages, currentAgentInfo.title, editingMessageId, activeAgentName, showTravelForm, showShoppingForm]);
  
  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }, [messages]);

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-background to-background/50">
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex min-h-full items-center justify-center p-6">
            <div className="w-full max-w-4xl mx-auto text-center animate-fade-in-up">
              <div className="inline-block p-6 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl ring-1 ring-primary/10 mb-8 animate-bounce-in">
                <ActiveAgentIcon className="h-16 w-16 text-primary" />
              </div>
              <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-4">
                {currentAgentInfo.title}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
                {currentAgentInfo.subtitle}
              </p>
              <div className="inline-flex items-center justify-center px-6 py-3 bg-muted/50 rounded-full text-sm font-medium border border-border/50 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-primary mr-2" />
                <span className="font-semibold text-foreground">{selectedModel}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-4xl mx-auto p-6">
            <div className="space-y-8">
              {messages.map((message) => (
                <ChatMessage 
                  key={message.id} 
                  message={message} 
                  agentIcon={<ActiveAgentIcon className="h-full w-full text-primary" />} 
                  onStartEdit={handleStartEdit}
                  onUpdatePlan={handleUpdatePlan}
                  onRegenerateShoppingResults={handleRegenerateShoppingResults}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="border-t border-border/50 bg-background/80 backdrop-blur-sm p-6">
        <div className="w-full max-w-4xl mx-auto">
          {activeAgentName === 'Travel Planner' && showTravelForm ? (
            <TravelPlannerForm onSubmit={handleTravelFormSubmit} initialValues={currentPlanDetails} />
          ) : activeAgentName === 'Shopping Assistant' && showShoppingForm ? (
            <ShoppingAssistantForm onSubmit={handleShoppingFormSubmit} initialValues={currentShoppingDetails} />
          ) : (
            <>
              {messages.length === 0 && (
                <div className="mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentAgentInfo.suggestions.map((suggestion, i) => (
                      <div 
                        key={i} 
                        onClick={(e) => handleSendMessage(e, suggestion)} 
                        className="group p-4 border border-border/50 rounded-2xl hover:bg-accent/50 hover:border-primary/30 cursor-pointer transition-all duration-200 text-left text-sm text-muted-foreground animate-fade-in hover:shadow-lg hover:shadow-primary/5 backdrop-blur-sm" 
                        style={{animationDelay: `${i * 100}ms`}}
                      >
                        <p className="group-hover:text-foreground transition-colors">{suggestion}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-xs text-muted-foreground mt-4">
                    Try these suggestions or ask anything to {currentAgentInfo.title}
                  </p>
                </div>
              )}

              <form onSubmit={handleSendMessage} className="relative">
                {editingMessageId && (
                  <div className="text-xs text-primary font-medium absolute -top-6 left-4 animate-fade-in">
                    Editing message...
                  </div>
                )}
                <div className="relative">
                  <Input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Message ${currentAgentInfo.title}...`} 
                    className="h-16 rounded-2xl bg-background/80 backdrop-blur-sm border border-border/50 pl-6 pr-48 text-base shadow-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all" 
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    {editingMessageId ? (
                      <>
                        <Button type="submit" size="icon" className="rounded-full w-11 h-11 bg-primary hover:bg-primary/90 shadow-lg" disabled={!input.trim()}>
                          <Check className="h-5 w-5" />
                        </Button>
                        <Button onClick={cancelEdit} variant="ghost" size="icon" type="button" className="rounded-full w-11 h-11 hover:bg-muted">
                          <X className="h-5 w-5 text-muted-foreground" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="ghost" size="icon" type="button" className="rounded-full w-11 h-11 hover:bg-muted">
                          <Paperclip className="h-5 w-5 text-muted-foreground" />
                        </Button>
                        <Button variant="ghost" size="icon" type="button" className="rounded-full w-11 h-11 hover:bg-muted">
                          <Mic className="h-5 w-5 text-muted-foreground" />
                        </Button>
                        <Button type="submit" size="icon" className="rounded-full w-11 h-11 bg-primary hover:bg-primary/90 shadow-lg transition-all duration-200" disabled={!input.trim()}>
                          <ArrowRight className="h-5 w-5" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
