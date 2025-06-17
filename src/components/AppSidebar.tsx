
import { Bot, Plane, ShoppingBag, BrainCircuit, Plus, MessageSquare } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
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
import { useTheme } from './ThemeProvider';

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
  { text: 'Compare smartphones 2024', agent: 'Shopping Assistant' },
  { text: 'Climate change research', agent: 'Researcher' },
];

export function AppSidebar({ agents, onAgentChange, onNewChat }: AppSidebarProps) {
  const { theme } = useTheme();
  const activeAgent = agents.find(agent => agent.active);
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <img 
              src="/lovable-uploads/6ab808f8-ceb1-45d8-9f3a-cd60fbd0e429.png" 
              alt="PilottAI" 
              className={`h-8 w-8 object-contain ${isDark ? 'logo-filter-dark' : 'logo-filter-light'}`}
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

      <SidebarContent className="px-4 flex-1 overflow-hidden">
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

        <SidebarGroup className="mt-6 flex-1 min-h-0">
          <SidebarGroupLabel className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider mb-2">
            Recent Chats
          </SidebarGroupLabel>
          <SidebarGroupContent className="flex-1 min-h-0">
            <div className="overflow-y-auto max-h-full sidebar-scroll">
              <SidebarMenu className="space-y-1">
                {recentChats.map((chat, index) => (
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
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
