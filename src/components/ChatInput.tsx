
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface ChatInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isLoading: boolean;
  activeAgentName: string;
  selectedModel: string;
}

export function ChatInput({
  inputValue,
  setInputValue,
  onSendMessage,
  onKeyPress,
  isLoading,
  activeAgentName,
  selectedModel
}: ChatInputProps) {
  return (
    <div className="p-6 border-t border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div className="text-xs text-muted-foreground">
          {selectedModel}
        </div>
        <div className="flex gap-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder={`Message ${activeAgentName}...`}
            className="flex-1 rounded-xl border-border/50 bg-background/50 backdrop-blur-sm"
          />
          <Button 
            onClick={onSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="rounded-xl bg-primary hover:bg-primary/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
