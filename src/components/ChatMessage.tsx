
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, RefreshCcw, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

interface ChatMessageProps {
  message: Message;
  agentIcon: React.ReactNode;
}

export function ChatMessage({ message, agentIcon }: ChatMessageProps) {
  const isAi = message.sender === 'ai';

  return (
    <div className={cn('flex items-start gap-4 animate-fade-in', isAi ? '' : 'justify-end')}>
      {isAi && (
        <Avatar className="h-8 w-8 border p-0.5">
          {agentIcon}
        </Avatar>
      )}
      <div className={cn(
        'max-w-md lg:max-w-xl xl:max-w-2xl rounded-2xl p-4',
        isAi 
          ? 'bg-muted rounded-bl-none' 
          : 'bg-primary text-primary-foreground rounded-br-none'
      )}>
        <p className="whitespace-pre-wrap">{message.text}</p>
        {isAi && (
          <div className="mt-3 flex items-center gap-1 text-muted-foreground">
            <Button variant="ghost" size="icon" className="h-7 w-7 hover:text-primary hover:bg-primary/10 rounded-full">
              <ThumbsUp className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 hover:text-destructive hover:bg-destructive/10 rounded-full">
              <ThumbsDown className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 hover:text-primary hover:bg-primary/10 rounded-full">
              <RefreshCcw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 hover:text-primary hover:bg-primary/10 rounded-full">
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
       {!isAi && (
         <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>U</AvatarFallback>
         </Avatar>
      )}
    </div>
  );
}
