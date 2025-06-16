
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, RefreshCcw, Edit, Copy, Download, Repeat, MapPin } from 'lucide-react';
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
        {message.isTravelPlan ? (
          <div className="space-y-6">
            {/* Cover Image and Map Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Cover Image */}
              <div className="relative h-48 rounded-lg overflow-hidden bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
                <img 
                  src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=200&fit=crop" 
                  alt="Travel destination" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-lg font-bold">
                      {message.planDetails?.destination || 'Travel Destination'}
                    </h3>
                    <p className="text-sm opacity-90">
                      {message.planDetails?.days} days • {message.planDetails?.travelers} travelers
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Map Section */}
              <div className="relative h-48 rounded-lg overflow-hidden bg-slate-100">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Interactive Map</p>
                    <p className="text-xs text-muted-foreground">
                      {message.planDetails?.destination || 'Location'}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 to-blue-100/50"></div>
              </div>
            </div>
            
            {/* Travel Plan Content */}
            <div className="prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">{message.text}</pre>
            </div>
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{message.text}</p>
        )}
        
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
