
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Paperclip, Mic, ArrowRight } from 'lucide-react';

const agentInfo = {
  'AI Chat': {
    title: 'AI Chat',
    subtitle: 'Your AI Chat Companion',
    suggestions: [
      'What can I ask you to do?',
      'Which one of my projects is performing the best?',
      'What projects should I be concerned about right now?',
    ],
  },
  'Travel Planner': {
    title: 'Travel Planner',
    subtitle: 'Let me help you plan your next adventure.',
    suggestions: [
      'Plan a 7-day trip to Japan for me.',
      'What are some budget-friendly European destinations?',
      'Find me a flight to New York for next weekend.',
    ],
  },
  'Shopping Assistant': {
    title: 'Shopping Assistant',
    subtitle: 'Your personal guide to smart shopping.',
    suggestions: [
      'Find the best deals on 4K TVs.',
      'Compare the latest smartphones.',
      'I need a gift for a coffee lover under $50.',
    ],
  },
  'Researcher': {
    title: 'Researcher',
    subtitle: 'Get in-depth information on any topic.',
    suggestions: [
      'What is the impact of AI on modern science?',
      'Summarize the theory of relativity.',
      'Find recent papers on quantum computing.',
    ],
  },
};


interface ChatViewProps {
  activeAgentName: string;
}

export function ChatView({ activeAgentName }: ChatViewProps) {
  const currentAgentInfo = agentInfo[activeAgentName] || agentInfo['AI Chat'];

  return (
    <div className="flex h-full flex-col p-8">
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
             <Button key={i} variant="outline" className="h-auto text-left justify-start text-muted-foreground hover:bg-accent hover:text-accent-foreground">
              {s}
            </Button>
          ))}
        </div>
         <p className="text-center text-xs text-muted-foreground mt-2">Suggestions for {currentAgentInfo.title}</p>
      </div>
    </div>
  );
}
