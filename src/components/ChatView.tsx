
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Paperclip, Mic, ArrowRight } from 'lucide-react';

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


interface ChatViewProps {
  activeAgentName: string;
}

export function ChatView({ activeAgentName }: ChatViewProps) {
  const currentAgentInfo = agentInfo[activeAgentName] || agentInfo['AI Chat'];

  return (
    <div className="flex h-full flex-col p-4 md:p-8">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          {currentAgentInfo.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          {currentAgentInfo.subtitle}
        </p>
      </div>

      <div className="w-full max-w-4xl mx-auto">
        <div className="relative mb-4">
          <Button variant="ghost" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2">
            <Paperclip className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Input placeholder={`Message ${currentAgentInfo.title}...`} className="h-14 rounded-full bg-card/80 backdrop-blur-sm pl-12 pr-28 text-base" />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Mic className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Button size="icon" className="rounded-full w-10 h-10 bg-primary/90 hover:bg-primary">
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
          {currentAgentInfo.suggestions.map((s, i) => (
             <div key={i} className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors text-left text-sm text-muted-foreground">
              {s}
            </div>
          ))}
        </div>
         <p className="text-center text-xs text-muted-foreground mt-2">Suggestions for {currentAgentInfo.title}</p>
      </div>
    </div>
  );
}
