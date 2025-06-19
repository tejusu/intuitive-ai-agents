
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageActions } from './MessageActions';
import { TravelPlanDisplay } from './TravelPlanDisplay';
import { ShoppingResultsDisplay } from './ShoppingResultsDisplay';
import { ResearchResultsDisplay } from './ResearchResultsDisplay';
import { Message } from '../utils/chatHelpers';
import { LucideIcon } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  agentIcon: LucideIcon;
  onCopy: (content: string) => void;
  onLike: () => void;
  onDislike: () => void;
  onRegenerate: () => void;
}

export function ChatMessage({ 
  message, 
  agentIcon: AgentIcon, 
  onCopy, 
  onLike, 
  onDislike, 
  onRegenerate 
}: ChatMessageProps) {
  return (
    <div className={`flex gap-4 p-6 ${message.isUser ? 'flex-row-reverse' : ''}`}>
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback className={message.isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'}>
          {message.isUser ? 'U' : <AgentIcon className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>
      
      <div className={`flex-1 space-y-3 ${message.isUser ? 'text-right' : ''}`}>
        <div className={`inline-block rounded-lg px-4 py-3 max-w-3xl ${
          message.isUser 
            ? 'bg-primary text-primary-foreground ml-auto' 
            : 'bg-muted'
        }`}>
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
        
        {/* Special displays for different message types */}
        {message.isTravelPlan && message.planDetails && (
          <div className="mt-4">
            <TravelPlanDisplay planDetails={message.planDetails} />
          </div>
        )}
        
        {message.isShoppingResponse && message.shoppingQuery && (
          <div className="mt-4">
            <ShoppingResultsDisplay query={message.shoppingQuery} />
          </div>
        )}
        
        {message.isResearchResponse && message.researchTopic && message.researchDetails && (
          <div className="mt-4">
            <ResearchResultsDisplay 
              topic={message.researchTopic} 
              researchDetails={message.researchDetails} 
            />
          </div>
        )}
        
        {!message.isUser && (
          <MessageActions
            onCopy={() => onCopy(message.content)}
            onLike={onLike}
            onDislike={onDislike}
            onRegenerate={onRegenerate}
          />
        )}
      </div>
    </div>
  );
}
