
import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Paperclip, Mic, ArrowRight, LucideIcon, ThumbsUp, ThumbsDown, RefreshCcw, Edit } from 'lucide-react';
import { ChatMessage } from './ChatMessage';

const agentInfo = {
  'AI Chat': {
    title: 'AI Chat',
    subtitle: 'Your AI Chat Companion',
    suggestions: [
      'Draft an email to my team about the new project timeline.',
      'Give me 10 ideas for a blog post about sustainable living.',
      "Explain the concept of 'machine learning' in simple terms.",
    ],
  },
  'Travel Planner': {
    title: 'Travel Planner',
    subtitle: 'Let me help you plan your next adventure.',
    suggestions: [
      'Create a 5-day itinerary for a relaxing beach vacation in Bali.',
      'What are the must-see historical sites in Rome?',
      'Find me unique, non-touristy experiences in Paris.',
    ],
  },
  'Shopping Assistant': {
    title: 'Shopping Assistant',
    subtitle: 'Your personal guide to smart shopping.',
    suggestions: [
      'What are the top-rated noise-cancelling headphones for under $200?',
      'Help me find a sustainable and ethical brand for everyday basics.',
      'Compare the new iPhone with the latest Google Pixel.',
    ],
  },
  'Researcher': {
    title: 'Researcher',
    subtitle: 'Get in-depth information on any topic.',
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
}

interface ChatViewProps {
  activeAgentName: string;
  activeAgentIcon: LucideIcon;
}

export function ChatView({ activeAgentName, activeAgentIcon: ActiveAgentIcon }: ChatViewProps) {
  const currentAgentInfo = agentInfo[activeAgentName] || agentInfo['AI Chat'];
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (e: React.FormEvent, messageText?: string) => {
    e.preventDefault();
    const text = (messageText || input).trim();
    if (!text) return;

    const newMessage = { id: Date.now(), text, sender: 'user' as const };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
  };

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender === 'user') {
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
  }, [messages, currentAgentInfo.title]);
  
  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }, [messages]);


  return (
    <div className="flex h-full flex-col">
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="w-full max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <div className="text-center mt-16 animate-fade-in">
              <div className="inline-block p-4 bg-muted rounded-full">
                <ActiveAgentIcon className="h-12 w-12 text-primary" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mt-4">
                {currentAgentInfo.title}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                {currentAgentInfo.subtitle}
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} agentIcon={<ActiveAgentIcon className="h-full w-full text-primary" />} />
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="px-4 md:px-6 pb-8">
        <div className="w-full max-w-4xl mx-auto">
          {messages.length === 0 && (
             <div className="mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {currentAgentInfo.suggestions.map((s, i) => (
                   <div key={i} onClick={(e) => handleSendMessage(e, s)} className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors text-left text-sm text-muted-foreground animate-fade-in" style={{animationDelay: `${i * 100}ms`}}>
                    {s}
                  </div>
                ))}
              </div>
               <p className="text-center text-xs text-muted-foreground mt-3">Suggestions for {currentAgentInfo.title}</p>
            </div>
          )}

          <form onSubmit={handleSendMessage} className="relative">
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Message ${currentAgentInfo.title}...`} 
              className="h-14 rounded-full bg-card/80 backdrop-blur-sm pl-6 pr-40 text-base" 
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <Button variant="ghost" size="icon" type="button">
                <Paperclip className="h-5 w-5 text-muted-foreground" />
              </Button>
              <Button variant="ghost" size="icon" type="button">
                <Mic className="h-5 w-5 text-muted-foreground" />
              </Button>
              <Button type="submit" size="icon" className="rounded-full w-10 h-10 bg-primary/90 hover:bg-primary" disabled={!input.trim()}>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
