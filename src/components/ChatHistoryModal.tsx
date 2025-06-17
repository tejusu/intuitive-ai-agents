
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Trash2 } from 'lucide-react';
import { Agent } from './Layout';

interface ChatHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agents: Agent[];
}

interface ChatHistoryItem {
  id: string;
  title: string;
  timestamp: Date;
  agentType: string;
}

// Mock chat history data
const mockChatHistory: ChatHistoryItem[] = [
  { id: '1', title: 'Plan a trip to Tokyo', timestamp: new Date(Date.now() - 86400000), agentType: 'Travel Planner' },
  { id: '2', title: 'Best budget laptops under $800', timestamp: new Date(Date.now() - 172800000), agentType: 'Shopping Assistant' },
  { id: '3', title: 'Explain machine learning concepts', timestamp: new Date(Date.now() - 259200000), agentType: 'AI Chat' },
  { id: '4', title: 'Research on renewable energy', timestamp: new Date(Date.now() - 345600000), agentType: 'Researcher' },
  { id: '5', title: 'Weekend getaway in Europe', timestamp: new Date(Date.now() - 432000000), agentType: 'Travel Planner' },
  { id: '6', title: 'Compare iPhone vs Android', timestamp: new Date(Date.now() - 518400000), agentType: 'Shopping Assistant' },
];

const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
};

export function ChatHistoryModal({ open, onOpenChange, agents }: ChatHistoryModalProps) {
  const [selectedTab, setSelectedTab] = useState('AI Chat');

  const filteredHistory = mockChatHistory.filter(item => item.agentType === selectedTab);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Chat History</DialogTitle>
        </DialogHeader>
        
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            {agents.map(agent => (
              <TabsTrigger key={agent.name} value={agent.name} className="text-xs">
                {agent.name.split(' ')[0]}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {agents.map(agent => (
            <TabsContent key={agent.name} value={agent.name} className="mt-4 space-y-2 max-h-96 overflow-y-auto">
              {filteredHistory.length > 0 ? (
                filteredHistory.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <MessageSquare className="h-4 w-4 text-muted-foreground shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{formatTimeAgo(item.timestamp)}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No chat history for {agent.name}</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
