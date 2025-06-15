
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Paperclip, Mic, ArrowRight, Sparkles } from 'lucide-react';

const suggestions = [
  'What can I ask you to do?',
  'Which one of my projects is performing the best?',
  'What projects should I be concerned about right now?',
];

export function ChatView() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center p-8">
       <div className="absolute top-10 left-10 h-8 w-8 rounded-full bg-primary/20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 h-4 w-4 rounded-full bg-primary/20 animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 left-1/3 h-6 w-6 rounded-full bg-primary/20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/2 right-1/2 h-5 w-5 rounded-full bg-primary/20 animate-pulse delay-750"></div>
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl flex items-center justify-center gap-2">
            PilottAi <span className="text-muted-foreground">Your AI Chat Companion</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Hi, I'm Pilot—your smart AI assistant for quick answers, creative ideas, and deep chats.
        </p>
      </div>

      <div className="absolute bottom-8 w-full max-w-4xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {suggestions.map((s, i) => (
             <Button key={i} variant="outline" className="h-auto text-left justify-start text-muted-foreground hover:bg-accent hover:text-accent-foreground">
              {s}
            </Button>
          ))}
        </div>
        <div className="relative">
          <Button variant="ghost" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2">
            <Paperclip className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Input placeholder="Ask me anything" className="h-14 rounded-full bg-card/80 backdrop-blur-sm pl-12 pr-28 text-base" />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Mic className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Button size="icon" className="rounded-full w-10 h-10 bg-primary/90 hover:bg-primary">
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
         <p className="text-center text-xs text-muted-foreground mt-2">Suggestions on what to ask Our Pilott AI</p>
      </div>
    </div>
  );
}
