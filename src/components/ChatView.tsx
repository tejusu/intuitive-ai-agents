
import { ConversationalBot } from './ConversationalBot';
import { Agent } from './Layout';

interface ChatViewProps {
  activeAgent: Agent;
  selectedModel: string;
}

export function ChatView({ activeAgent, selectedModel }: ChatViewProps) {
  // Use the new conversational bot interface for all interactions
  return <ConversationalBot />;
}
