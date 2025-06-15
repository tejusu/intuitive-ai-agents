
import { ChatView } from '@/components/ChatView';
import { useOutletContext } from 'react-router-dom';
import { Agent } from '@/components/Layout';

interface OutletContextType {
  activeAgent: Agent;
}

const Index = () => {
  const { activeAgent } = useOutletContext<OutletContextType>();

  if (!activeAgent) {
    return null; // Or a loading state
  }

  return (
    <div className="h-full">
      <ChatView activeAgentName={activeAgent.name} activeAgentIcon={activeAgent.icon} />
    </div>
  );
};

export default Index;
