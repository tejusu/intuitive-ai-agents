
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from '@/components/AppSidebar';
import { Header } from '@/components/Header';
import { Bot, Plane, ShoppingBag, BrainCircuit, LucideIcon } from 'lucide-react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export interface Agent {
  name: string;
  icon: LucideIcon;
  active: boolean;
  chatHistory: any[];
  chatKey: number;
}

const initialAgents: Agent[] = [
  { name: 'AI Chat', icon: Bot, active: true, chatHistory: [], chatKey: 0 },
  { name: 'Travel Planner', icon: Plane, active: false, chatHistory: [], chatKey: 0 },
  { name: 'Shopping Assistant', icon: ShoppingBag, active: false, chatHistory: [], chatKey: 0 },
  { name: 'Researcher', icon: BrainCircuit, active: false, chatHistory: [], chatKey: 0 },
];

const Layout = () => {
  const [agents, setAgents] = useState(initialAgents);
  const [selectedModel, setSelectedModel] = useState('ChatGPT 4.1');

  const handleAgentChange = (agentName: string) => {
    setAgents(agents.map(agent => ({
      ...agent,
      active: agent.name === agentName,
    })));
  };

  const handleNewChat = () => {
    const activeAgent = agents.find(agent => agent.active);
    if (activeAgent) {
      setAgents(agents.map(agent => 
        agent.active 
          ? { ...agent, chatKey: agent.chatKey + 1, chatHistory: [] }
          : agent
      ));
    }
  };

  const activeAgent = agents.find(agent => agent.active) || initialAgents[0];

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar 
            agents={agents} 
            onAgentChange={handleAgentChange}
            onNewChat={handleNewChat}
          />
          <SidebarInset className="flex flex-col flex-1">
            <Header 
              agents={agents} 
              onAgentChange={handleAgentChange}
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
            />
            <div className="flex-1 overflow-hidden">
              <Outlet context={{ activeAgent, selectedModel }} />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
