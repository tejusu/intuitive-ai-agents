
import { toast } from 'sonner';

export function useChatMessageActions() {
  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('Message copied to clipboard!');
  };

  const handleLike = () => {
    toast.success('Feedback recorded!');
  };

  const handleDislike = () => {
    toast.success('Feedback recorded!');
  };

  const handleRegenerate = () => {
    toast.success('Regenerating response...');
  };

  return {
    handleCopy,
    handleLike,
    handleDislike,
    handleRegenerate
  };
}
