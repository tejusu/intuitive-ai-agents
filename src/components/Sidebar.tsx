import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  ChevronsLeft,
  Plus,
  MessageSquare,
  Compass,
  ShoppingCart,
  FlaskConical,
  MoreHorizontal,
  History,
  Plane,
  ShoppingBag,
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

const navItems = [
  { icon: MessageSquare, label: 'Chat', history: ['How to use Tailwind CSS?', 'React best practices'] },
  { icon: Compass, label: 'Travel Planner', history: ['Trip to Japan', 'Weekend getaway ideas'] },
  { icon: ShoppingCart, label: 'Shopping Assistant', history: ['Best budget laptops', 'Camera recommendations'] },
  { icon: FlaskConical, label: 'Research', history: ['AI impact on jobs', 'Quantum computing explained'] },
];

const recentChats = [
    { text: 'How can I increase the number ...', icon: MessageSquare },
    { text: "What's the best approach to ...", icon: MessageSquare },
    { text: 'Plan a trip to Italy', icon: Plane },
    { text: 'Find deals on electronics', icon: ShoppingBag },
];

export function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <div
        className={cn(
          "relative flex h-screen flex-col bg-card text-card-foreground border-r transition-all duration-300 ease-in-out",
          isCollapsed ? 'w-20 p-2' : 'w-80 p-4'
        )}
      >
        <Button variant="outline" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="absolute top-5 -right-4 z-10 h-8 w-8 rounded-full">
          <ChevronsLeft className={cn("h-4 w-4", isCollapsed && "rotate-180")} />
        </Button>

        <div className={cn("flex items-center", isCollapsed ? 'justify-center' : 'justify-start')}>
          <img src="/lovable-uploads/3e5579ad-76a1-49f7-87bd-c3d03033762a.png" alt="PilottAi Logo" className="h-8 w-8" />
        </div>

        <div className={cn("flex gap-2 mt-8", isCollapsed ? 'flex-col items-center' : 'items-center')}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="w-10 h-10 rounded-lg">
                        <Plus className="h-5 w-5" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="right"><p>New Chat</p></TooltipContent>
            </Tooltip>
             <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="w-10 h-10 rounded-lg">
                        <History className="h-5 w-5" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="right"><p>Chat History</p></TooltipContent>
            </Tooltip>
        </div>

        <nav className="mt-8 flex-1">
          {!isCollapsed && <h3 className="mb-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider">Category</h3>}
          {isCollapsed ? (
            <ul className="space-y-1">
              {navItems.map(item => (
                <li key={item.label}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a href="#" className="flex items-center justify-center gap-3 rounded-md p-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
                        <item.icon className="h-5 w-5" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="right"><p>{item.label}</p></TooltipContent>
                  </Tooltip>
                </li>
              ))}
            </ul>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {navItems.map(item => (
                <AccordionItem value={item.label} key={item.label} className="border-none">
                  <AccordionTrigger className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground hover:no-underline">
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="pl-11 space-y-1 py-1">
                      {item.history.map((chat, index) => (
                        <li key={index} className="text-sm text-muted-foreground hover:text-foreground cursor-pointer truncate">{chat}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </nav>
        
        {!isCollapsed && (
          <div className="mt-auto">
            <h3 className="mb-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider">Recent Chats</h3>
            <ul className="space-y-1">
              {recentChats.map((chat, index) => (
                <li key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a href="#" className={cn("flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground")}>
                        <div className="flex items-center gap-3 truncate">
                          <chat.icon className="h-5 w-5" />
                          <span className="truncate">{chat.text}</span>
                        </div>
                        <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
                      </a>
                    </TooltipTrigger>
                  </Tooltip>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
