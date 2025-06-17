
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  ChevronsLeft,
  Plus,
  MessageSquare,
  Compass,
  ShoppingCart,
  FlaskConical,
  MoreHorizontal,
  Bot,
  Plane,
  ShoppingBag,
  BrainCircuit,
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface AppSidebarProps {
  agents: Array<{
    name: string;
    icon: any;
    active: boolean;
    chatHistory: any[];
  }>;
  onAgentChange: (agentName: string) => void;
  onNewChat: () => void;
}

const recentChats = [
    { text: 'How can I increase the number ...', icon: MessageSquare },
    { text: "What's the best approach to ...", icon: MessageSquare },
    { text: 'Plan a trip to Italy', icon: Plane },
    { text: 'Find deals on electronics', icon: ShoppingBag },
];

export function AppSidebar({ agents, onAgentChange, onNewChat }: AppSidebarProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <div className="relative flex h-screen flex-col bg-sidebar text-sidebar-foreground border-r transition-all duration-300 ease-in-out w-80 p-4">
        <div className="flex items-center justify-start">
          <img 
            src="/lovable-uploads/84da8da3-13f9-4250-8f63-2347b6c4b44b.png" 
            alt="PilottAi Logo" 
            className="h-10 w-10" 
          />
        </div>

        <div className="mt-8">
          <Button 
            className="w-full justify-start text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground" 
            size="lg"
            onClick={onNewChat}
          >
            <Plus className="h-5 w-5" />
            New Chat
          </Button>
        </div>

        <nav className="mt-8">
          <h3 className="mb-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider">AI Agents</h3>
          <ul className="space-y-1">
            {agents.map(agent => (
              <li key={agent.name}>
                <button
                  onClick={() => onAgentChange(agent.name)}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium w-full text-left transition-colors",
                    agent.active 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <agent.icon className="h-5 w-5" />
                  <span>{agent.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="mt-8">
          <h3 className="mb-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider">Recent Chats</h3>
          <ul className="space-y-1">
            {recentChats.map((chat, index) => (
              <li key={index}>
                <a href="#" className="flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
                  <div className="flex items-center gap-3 truncate">
                    <chat.icon className="h-5 w-5" />
                    <span className="truncate">{chat.text}</span>
                  </div>
                  <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </TooltipProvider>
  );
}
