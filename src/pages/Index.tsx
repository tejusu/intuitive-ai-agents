
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { ChatView } from '@/components/ChatView';
import { cn } from '@/lib/utils';

const Index = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground overflow-x-hidden">
      <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
      <main className={cn("flex-1 flex flex-col transition-all duration-300 ease-in-out", isSidebarCollapsed ? "ml-20" : "ml-80")}>
        <Header />
        <div className="flex-1 overflow-y-auto">
           <ChatView />
        </div>
      </main>
    </div>
  );
};

export default Index;
