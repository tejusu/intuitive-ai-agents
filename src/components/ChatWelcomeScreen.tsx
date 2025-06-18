
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Sparkles } from 'lucide-react';
import { AgentPrompts } from './AgentPrompts';

interface ChatWelcomeScreenProps {
  activeAgentName: string;
  activeAgentIcon: any;
  selectedModel: string;
  inputValue: string;
  setInputValue: (value: string) => void;
  onSendMessage: (message?: string) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export function ChatWelcomeScreen({
  activeAgentName,
  activeAgentIcon: ActiveIcon,
  selectedModel,
  inputValue,
  setInputValue,
  onSendMessage,
  onKeyPress
}: ChatWelcomeScreenProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-8">
        <div className="text-center space-y-4 animate-fade-in-up">
          <div className="flex justify-center">
            <div className="p-4 bg-primary/10 rounded-2xl">
              <ActiveIcon className="h-12 w-12 text-primary" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Welcome to {activeAgentName}
            </h2>
            <p className="text-muted-foreground">
              {selectedModel}
            </p>
          </div>
        </div>

        <AgentPrompts activeAgentName={activeAgentName} onSendMessage={onSendMessage} />
      </div>

      <div className="p-6 border-t border-border/50">
        <div className="flex gap-3 max-w-4xl mx-auto">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder={`Message ${activeAgentName}...`}
            className="flex-1 rounded-xl border-border/50 bg-background/50 backdrop-blur-sm"
          />
          <Button 
            onClick={() => onSendMessage()}
            disabled={!inputValue.trim()}
            className="rounded-xl bg-primary hover:bg-primary/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
