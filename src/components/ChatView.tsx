import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Paperclip, Mic, ArrowRight, LucideIcon, Check, X } from 'lucide-react';
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
  selectedModel: string;
}

export function ChatView({ activeAgentName, activeAgentIcon: ActiveAgentIcon, selectedModel }: ChatViewProps) {
  const currentAgentInfo = agentInfo[activeAgentName] || agentInfo['AI Chat'];
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

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
    }
    setInput('');
  };

  useEffect(() => {
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
  }, [messages, currentAgentInfo.title, editingMessageId]);
  
  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }, [messages]);


  return (
    <div className="flex h-full flex-col">
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 md:p-6">
        {messages.length === 0 ? (
          <div className="flex justify-center">
            <div className="w-full max-w-4xl mx-auto text-center animate-fade-in pt-16 md:pt-24">
              <div className="inline-block p-4 bg-primary/10 rounded-full ring-8 ring-primary/5">
                <ActiveAgentIcon className="h-12 w-12 text-primary" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mt-6">
                {currentAgentInfo.title}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                {currentAgentInfo.subtitle}
              </p>
              <div className="mt-4 inline-flex items-center justify-center px-4 py-2 bg-muted rounded-full text-sm font-medium">
                <span className="text-muted-foreground mr-2">Model:</span>
                <span className="font-semibold text-foreground">{selectedModel}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-4xl mx-auto">
            <div className="space-y-8">
              {messages.map((message) => (
                <ChatMessage 
                  key={message.id} 
                  message={message} 
                  agentIcon={<ActiveAgentIcon className="h-full w-full text-primary" />} 
                  onStartEdit={handleStartEdit}
                />
              ))}
            </div>
          </div>
        )}
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
            {editingMessageId && (
              <div className="text-xs text-muted-foreground absolute -top-6 left-2">Editing message...</div>
            )}
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Message ${currentAgentInfo.title}...`} 
              className="h-14 rounded-full bg-card/80 backdrop-blur-sm pl-6 pr-40 text-base" 
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {editingMessageId ? (
                <>
                  <Button type="submit" size="icon" className="rounded-full w-10 h-10 bg-primary/90 hover:bg-primary" disabled={!input.trim()}>
                    <Check className="h-5 w-5" />
                  </Button>
                  <Button onClick={cancelEdit} variant="ghost" size="icon" type="button" className="rounded-full w-10 h-10">
                    <X className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="icon" type="button">
                    <Paperclip className="h-5 w-5 text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="icon" type="button">
                    <Mic className="h-5 w-5 text-muted-foreground" />
                  </Button>
                  <Button type="submit" size="icon" className="rounded-full w-10 h-10 bg-primary/90 hover:bg-primary" disabled={!input.trim()}>
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
