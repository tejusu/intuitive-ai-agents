
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Sparkles, Bot, Plane, ShoppingBag, BrainCircuit } from 'lucide-react';
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
  const [isFocused, setIsFocused] = useState(false);

  const agentOptions = [
    { name: 'AI Chat', icon: Bot, prompt: 'Hi! I need help with general questions.' },
    { name: 'Shopping Assistant', icon: ShoppingBag, prompt: 'Help me find products to buy.' },
    { name: 'Travel Planner', icon: Plane, prompt: 'I want to plan a trip.' },
    { name: 'Researcher', icon: BrainCircuit, prompt: 'I need help researching a topic.' },
  ];

  const handleAgentSelect = (agentPrompt: string) => {
    setInputValue(agentPrompt);
    setIsFocused(false);
  };
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
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="flex gap-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={onKeyPress}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 150)}
              placeholder={isFocused ? "Ask me anything..." : `Message ${activeAgentName}...`}
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
          
          {isFocused && (
            <div className="animate-fade-in">
              <p className="text-xs text-muted-foreground mb-2">Quick start with an AI agent:</p>
              <div className="flex gap-2 flex-wrap">
                {agentOptions.map((agent) => {
                  const AgentIcon = agent.icon;
                  return (
                    <Button
                      key={agent.name}
                      variant="outline"
                      size="sm"
                      onClick={() => handleAgentSelect(agent.prompt)}
                      className="rounded-full h-8 px-3 text-xs hover:bg-accent transition-colors"
                    >
                      <AgentIcon className="h-3 w-3 mr-1.5" />
                      {agent.name}
                    </Button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
