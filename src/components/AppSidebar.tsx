import { Bot, Plane, ShoppingBag, BrainCircuit, Plus, MessageSquare, Sparkles } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Agent } from './Layout';

interface AppSidebarProps {
  agents: Agent[];
  onAgentChange: (name: string) => void;
  onNewChat: () => void;
}

const agentIcons = {
  'AI Chat': Bot,
  'Travel Planner': Plane,
  'Shopping Assistant': ShoppingBag,
  'Researcher': BrainCircuit,
};

const recentChats = [
  { text: 'How to optimize React performance?', agent: 'AI Chat' },
  { text: 'Plan a trip to Tokyo', agent: 'Travel Planner' },
  { text: 'Best budget laptops under $800', agent: 'Shopping Assistant' },
  { text: 'Latest AI research papers', agent: 'Researcher' },
  { text: 'JavaScript async/await explained', agent: 'AI Chat' },
  { text: 'Weekend getaway in Europe', agent: 'Travel Planner' },
];

export function AppSidebar({ agents, onAgentChange, onNewChat }: AppSidebarProps) {
  const activeAgent = agents.find(agent => agent.active);

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl">
            <img 
              src="/lovable-uploads/239baafc-1c17-441e-bffa-c43e0db81aac.png" 
              alt="PilottAI" 
              className="h-8 w-auto block dark:hidden"
            />
            <img 
              src="/lovable-uploads/b6cb5982-1616-40c9-a63f-51dbc930c3fe.png" 
              alt="PilottAI" 
              className="h-8 w-auto hidden dark:block"
            />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">PilottAI</h1>
            <p className="text-xs text-sidebar-foreground/60">Your AI Assistant</p>
          </div>
        </div>
        
        <Button 
          onClick={onNewChat}
          className="mt-4 w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl h-12 text-sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider mb-2">
            AI Agents
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {agents.map((agent) => {
                const IconComponent = agentIcons[agent.name] || Bot;
                return (
                  <SidebarMenuItem key={agent.name}>
                    <SidebarMenuButton
                      onClick={() => onAgentChange(agent.name)}
                      isActive={agent.active}
                      className={`w-full justify-start h-12 rounded-xl transition-all duration-200 ${
                        agent.active 
                          ? 'bg-primary text-primary-foreground shadow-lg hover:bg-primary/90' 
                          : 'hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground'
                      }`}
                    >
                      <IconComponent className="h-5 w-5" />
                      <span className="font-medium">{agent.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider mb-2">
            Recent Chats
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {recentChats.slice(0, 6).map((chat, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton className="w-full justify-start h-auto py-3 px-3 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground">
                    <MessageSquare className="h-4 w-4 shrink-0 text-sidebar-foreground/60" />
                    <div className="flex flex-col items-start gap-1 min-w-0">
                      <span className="text-sm truncate w-full">{chat.text}</span>
                      <span className="text-xs text-sidebar-foreground/50">{chat.agent}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        {/* User box removed */}
      </SidebarFooter>
    </Sidebar>
  );
}
