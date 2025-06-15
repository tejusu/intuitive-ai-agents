
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  ChevronsLeft,
  Plus,
  Search,
  MessageSquare,
  Compass,
  ShoppingCart,
  FlaskConical,
  MoreHorizontal,
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

const navItems = [
  { icon: MessageSquare, label: 'Chat' },
  { icon: Compass, label: 'Travel Planner' },
  { icon: ShoppingCart, label: 'Shopping Assistant' },
  { icon: FlaskConical, label: 'Research' },
];

const recentChats = [
  'How can I increase the number ...',
  "What's the best approach to ...",
  "What's the best approach to ...",
];

export function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  return (
    <div
      className={cn(
        "relative flex h-screen flex-col bg-card text-card-foreground border-r transition-all duration-300 ease-in-out",
        isCollapsed ? 'w-20' : 'w-80 p-4'
      )}
    >
      <div className={cn("flex items-center", isCollapsed ? 'justify-center p-4' : 'justify-between')}>
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <img src="/lovable-uploads/3e5579ad-76a1-49f7-87bd-c3d03033762a.png" alt="PilottAi Logo" className="h-8 w-8" />
            <span className="text-xl font-bold">PilottAi</span>
          </div>
        )}
        <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className={cn(isCollapsed && 'absolute top-4 right-1/2 translate-x-1/2')}>
          <ChevronsLeft className={cn("h-5 w-5", isCollapsed && "rotate-180")} />
        </Button>
      </div>

      <div className={cn("flex flex-col gap-4 mt-4", isCollapsed ? 'px-2' : '')}>
        <Button className={cn("w-full bg-primary/90 hover:bg-primary text-primary-foreground", isCollapsed ? 'px-2' : 'justify-start gap-2')}>
          <Plus className="h-5 w-5" />
          {!isCollapsed && <span>New Chat</span>}
        </Button>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder={!isCollapsed ? "Search" : ""} className="pl-10" />
        </div>
      </div>

      <nav className="mt-8 flex-1">
        {!isCollapsed && <h3 className="mb-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider">Category</h3>}
        <ul className="space-y-1">
          {navItems.map(item => (
            <li key={item.label}>
              <a href="#" className={cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground", isCollapsed ? 'justify-center' : '')}>
                <item.icon className="h-5 w-5" />
                {!isCollapsed && <span>{item.label}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto">
        {!isCollapsed && <h3 className="mb-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider">Recent Chats</h3>}
        <ul className="space-y-1">
          {recentChats.map((chat, index) => (
            <li key={index}>
              <a href="#" className={cn("flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground", isCollapsed ? 'justify-center' : '')}>
                <div className="flex items-center gap-3 truncate">
                  <MessageSquare className="h-5 w-5" />
                  {!isCollapsed && <span className="truncate">{chat}</span>}
                </div>
                {!isCollapsed && <MoreHorizontal className="h-5 w-5 text-muted-foreground" />}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
