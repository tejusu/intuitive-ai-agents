
import { Button } from '@/components/ui/button';
import { Copy, ThumbsUp, ThumbsDown, RefreshCcw } from 'lucide-react';

interface MessageActionsProps {
  onCopy: () => void;
  onLike: () => void;
  onDislike: () => void;
  onRegenerate: () => void;
}

export function MessageActions({ onCopy, onLike, onDislike, onRegenerate }: MessageActionsProps) {
  return (
    <div className="flex items-center gap-2 justify-end max-w-4xl mx-auto">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onCopy}
        className="text-muted-foreground hover:text-primary"
      >
        <Copy className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onLike}
        className="text-muted-foreground hover:text-primary"
      >
        <ThumbsUp className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onDislike}
        className="text-muted-foreground hover:text-destructive"
      >
        <ThumbsDown className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onRegenerate}
        className="text-muted-foreground hover:text-primary"
      >
        <RefreshCcw className="h-4 w-4" />
      </Button>
    </div>
  );
}
