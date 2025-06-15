
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, RefreshCcw, Edit, Copy, Download, Repeat } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';
import { toast } from 'sonner';
import jsPDF from 'jspdf';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  isTravelPlan?: boolean;
}

interface ChatMessageProps {
  message: Message;
  agentIcon: React.ReactNode;
  onStartEdit: (message: Message) => void;
  onUpdatePlan?: () => void;
}

export function ChatMessage({ message, agentIcon, onStartEdit, onUpdatePlan }: ChatMessageProps) {
  const isAi = message.sender === 'ai';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text).then(() => {
      toast.success('Message copied to clipboard!');
    });
  };

  const handleDownloadPdf = () => {
    try {
      const doc = new jsPDF();
      const splitText = doc.splitTextToSize(message.text, 180);
      doc.text(splitText, 10, 10);
      doc.save('travel-plan.pdf');
      toast.success('PDF Downloaded!');
    } catch (error) {
      console.error("Failed to generate PDF", error);
      toast.error("Failed to download PDF.");
    }
  };

  return (
    <div className={cn('group flex items-start gap-4 animate-fade-in', isAi ? '' : 'justify-end')}>
      {isAi && (
        <Avatar className="h-8 w-8 border p-0.5">
          {agentIcon}
        </Avatar>
      )}

      {!isAi && (
        <div className="flex items-center self-center opacity-0 group-hover:opacity-100 transition-opacity pr-2">
            <Button onClick={() => onStartEdit(message)} variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full">
            <Edit className="h-4 w-4" />
            </Button>
        </div>
      )}

      <div className={cn(
        'max-w-md lg:max-w-xl xl:max-w-2xl rounded-2xl p-4 relative transition-all',
        isAi 
          ? 'bg-muted rounded-bl-none' 
          : 'bg-primary text-primary-foreground rounded-br-none',
        isAi && 'group-hover:pb-12'
      )}>
        <p className="whitespace-pre-wrap">{message.text}</p>
        {isAi && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
             {message.isTravelPlan ? (
              <>
                <Button onClick={handleDownloadPdf} variant="ghost" size="icon" className="h-7 w-7 hover:text-primary hover:bg-primary/10 rounded-full">
                  <Download className="h-4 w-4" />
                </Button>
                <Button onClick={onUpdatePlan} variant="ghost" size="icon" className="h-7 w-7 hover:text-primary hover:bg-primary/10 rounded-full">
                  <Repeat className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Button onClick={handleCopy} variant="ghost" size="icon" className="h-7 w-7 hover:text-primary hover:bg-primary/10 rounded-full">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 hover:text-primary hover:bg-primary/10 rounded-full">
                  <ThumbsUp className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 hover:text-destructive hover:bg-destructive/10 rounded-full">
                  <ThumbsDown className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 hover:text-primary hover:bg-primary/10 rounded-full">
                  <RefreshCcw className="h-4 w-4" />
                </Button>
              </>
            )}
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
