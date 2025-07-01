import { ChatView } from '@/components/ChatView';
import { useOutletContext } from 'react-router-dom';
import { Agent } from '@/components/Layout';

interface OutletContextType {
  activeAgent: Agent;
  selectedModel: string;
}

const Index = () => {
  const { activeAgent, selectedModel } = useOutletContext<OutletContextType>();

  if (!activeAgent) {
    return null;
  }

  return (
    <div className="h-full">
      <ChatView 
        activeAgent={activeAgent}
        selectedModel={selectedModel}
      />
    </div>
  );
};

export default Index;
