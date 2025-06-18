
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { cn } from '@/lib/utils';
import { Bot, Plane, ShoppingBag, BrainCircuit, LucideIcon } from 'lucide-react';

export interface Agent {
  name: string;
  icon: LucideIcon;
  active: boolean;
}

const initialAgents: Agent[] = [
  { name: 'AI Chat', icon: Bot, active: true },
  { name: 'Travel Planner', icon: Plane, active: false },
  { name: 'Shopping Assistant', icon: ShoppingBag, active: false },
  { name: 'Researcher', icon: BrainCircuit, active: false },
];

const Layout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [agents, setAgents] = useState(initialAgents);
  const [selectedModel, setSelectedModel] = useState('ChatGPT 4.1');

  const handleAgentChange = (agentName: string) => {
    setAgents(agents.map(agent => ({
      ...agent,
      active: agent.name === agentName,
    })));
  };

  const activeAgent = agents.find(agent => agent.active) || initialAgents[0];

  return (
    <div className="flex min-h-screen bg-background text-foreground overflow-x-hidden">
      <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
      <main className={cn("flex-1 flex flex-col transition-all duration-300 ease-in-out", isSidebarCollapsed ? "ml-20" : "ml-80")}>
        <Header 
          agents={agents} 
          onAgentChange={handleAgentChange}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
        />
        <div className="flex-1 overflow-y-auto">
           <Outlet context={{ activeAgent, selectedModel }} />
        </div>
      </main>
    </div>
  );
};

export default Layout;
