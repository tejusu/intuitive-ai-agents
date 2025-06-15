
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { ChatView } from '@/components/ChatView';
import { cn } from '@/lib/utils';
import { Bot, Plane, ShoppingBag, BrainCircuit } from 'lucide-react';

const initialAgents = [
  { name: 'AI Chat', icon: Bot, active: true },
  { name: 'Travel Planner', icon: Plane, active: false },
  { name: 'Shopping Assistant', icon: ShoppingBag, active: false },
  { name: 'Researcher', icon: BrainCircuit, active: false },
];

const Index = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [agents, setAgents] = useState(initialAgents);

  const handleAgentChange = (agentName: string) => {
    setAgents(agents.map(agent => ({
      ...agent,
      active: agent.name === agentName,
    })));
  };

  const activeAgent = agents.find(agent => agent.active);

  return (
    <div className="flex min-h-screen bg-background text-foreground overflow-x-hidden">
      <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
      <main className={cn("flex-1 flex flex-col transition-all duration-300 ease-in-out", isSidebarCollapsed ? "ml-20" : "ml-80")}>
        <Header agents={agents} onAgentChange={handleAgentChange} />
        <div className="flex-1">
           <ChatView activeAgentName={activeAgent?.name || 'AI Chat'} />
        </div>
      </main>
    </div>
  );
};

export default Index;
