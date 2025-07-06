
import { ConversationalTravelPlanner } from './ConversationalTravelPlanner';
import { ChatWelcomeScreen } from './ChatWelcomeScreen';
import { ChatMessageList } from './ChatMessageList';
import { ChatInput } from './ChatInput';
import { AgentFormHandler } from './AgentFormHandler';
import { useChatLogic } from '../hooks/useChatLogic';
import { useChatMessageActions } from './ChatMessageActions';
import { Agent } from './Layout';

interface ChatViewProps {
  activeAgent: Agent;
  selectedModel: string;
}

export function ChatView({ activeAgent, selectedModel }: ChatViewProps) {
  const {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    showShoppingForm,
    showResearchForm,
    handleShoppingFormSubmit,
    handleResearchFormSubmit,
    handleSendMessage
  } = useChatLogic(activeAgent);

  const {
    handleCopy,
    handleLike,
    handleDislike,
    handleRegenerate
  } = useChatMessageActions();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Show conversational travel planner for Travel Planner agent
  if (activeAgent.name === 'Travel Planner' && messages.length === 0) {
    return <ConversationalTravelPlanner />;
  }

  // Handle agent-specific forms
  const formHandler = (
    <AgentFormHandler
      showShoppingForm={showShoppingForm}
      showResearchForm={showResearchForm}
      onShoppingSubmit={handleShoppingFormSubmit}
      onResearchSubmit={handleResearchFormSubmit}
    />
  );

  if (showShoppingForm || showResearchForm) {
    return formHandler;
  }

  if (messages.length === 0) {
    return (
      <ChatWelcomeScreen
        activeAgentName={activeAgent.name}
        activeAgentIcon={activeAgent.icon}
        selectedModel={selectedModel}
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSendMessage={handleSendMessage}
        onKeyPress={handleKeyPress}
      />
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ChatMessageList
        messages={messages}
        isLoading={isLoading}
        activeAgentIcon={activeAgent.icon}
        onCopy={handleCopy}
        onLike={handleLike}
        onDislike={handleDislike}
        onRegenerate={handleRegenerate}
      />
      <ChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSendMessage={handleSendMessage}
        onKeyPress={handleKeyPress}
        isLoading={isLoading}
        activeAgentName={activeAgent.name}
        selectedModel={selectedModel}
      />
    </div>
  );
}
