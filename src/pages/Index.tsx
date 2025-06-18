
import { ChatView } from '@/components/ChatView';
import { useOutletContext } from 'react-router-dom';
import { Agent } from '@/components/Layout';

interface OutletContextType {
  activeAgent: Agent;
  selectedModel: string;
  chatKey: number;
}

const Index = () => {
  const { activeAgent, selectedModel, chatKey } = useOutletContext<OutletContextType>();

  if (!activeAgent) {
    return null;
  }

  return (
    <div className="h-full">
      <ChatView 
        activeAgentName={activeAgent.name} 
        activeAgentIcon={activeAgent.icon} 
        selectedModel={selectedModel}
        chatKey={chatKey}
      />
    </div>
  );
};

export default Index;
