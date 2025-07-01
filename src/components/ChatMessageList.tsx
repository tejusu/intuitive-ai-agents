
import { useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { Message } from '../utils/chatHelpers';
import { LucideIcon } from 'lucide-react';

interface ChatMessageListProps {
  messages: Message[];
  isLoading: boolean;
  activeAgentIcon: LucideIcon;
  onCopy: (content: string) => void;
  onLike: () => void;
  onDislike: () => void;
  onRegenerate: () => void;
}

export function ChatMessageList({
  messages,
  isLoading,
  activeAgentIcon,
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
          <ChatMessage
            key={message.id}
            message={message}
            agentIcon={activeAgentIcon}
            onCopy={onCopy}
            onLike={onLike}
            onDislike={onDislike}
            onRegenerate={onRegenerate}
          />
        ))}
        {isLoading && (
          <ChatMessage
            message={{
              id: 'loading',
              content: "Thinking...",
              isUser: false,
              timestamp: new Date()
            }}
            agentIcon={activeAgentIcon}
            onCopy={onCopy}
            onLike={onLike}
            onDislike={onDislike}
            onRegenerate={onRegenerate}
          />
        )}
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
}
