
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { agentPrompts } from '../utils/chatHelpers';

interface AgentPromptsProps {
  activeAgentName: string;
  onSendMessage: (message?: string) => void;
}

export function AgentPrompts({ activeAgentName, onSendMessage }: AgentPromptsProps) {
  const prompts = agentPrompts[activeAgentName] || agentPrompts['AI Chat'];

  return (
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
            onClick={() => onSendMessage(prompt)}
          >
            <div className="flex items-start gap-3">
              <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm">{prompt}</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
