
import { useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { MessageActions } from './MessageActions';
import { Message } from '../utils/chatHelpers';

interface ChatMessageListProps {
  messages: Message[];
  isLoading: boolean;
  activeAgentIcon: any;
  onCopy: (content: string) => void;
  onLike: () => void;
  onDislike: () => void;
  onRegenerate: () => void;
}

export function ChatMessageList({
  messages,
  isLoading,
  activeAgentIcon: ActiveIcon,
  onCopy,
  onLike,
  onDislike,
  onRegenerate
}: ChatMessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {messages.map((message) => (
          <div key={message.id} className="space-y-4">
            <ChatMessage
              message={{
                id: parseInt(message.id),
                text: message.content,
                sender: message.isUser ? 'user' : 'ai',
                isTravelPlan: message.isTravelPlan,
                planDetails: message.planDetails,
                isShoppingResponse: message.isShoppingResponse,
                shoppingQuery: message.shoppingQuery
              }}
              agentIcon={<ActiveIcon className="h-4 w-4 text-primary" />}
              onStartEdit={() => {}}
              onUpdatePlan={() => {}}
              onRegenerateShoppingResults={() => {}}
            />
            {!message.isUser && !message.isTravelPlan && !message.isShoppingResponse && (
              <MessageActions
                onCopy={() => onCopy(message.content)}
                onLike={onLike}
                onDislike={onDislike}
                onRegenerate={onRegenerate}
              />
            )}
          </div>
        ))}
        {isLoading && (
          <ChatMessage
            message={{
              id: Date.now(),
              text: "Thinking...",
              sender: 'ai'
            }}
            agentIcon={<ActiveIcon className="h-4 w-4 text-primary" />}
            onStartEdit={() => {}}
            onUpdatePlan={() => {}}
            onRegenerateShoppingResults={() => {}}
          />
        )}
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
}
