
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronDown, Settings, LogOut, Sparkles, User, CreditCard, HelpCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Agent } from './Layout';
import { ThemeToggle } from './ThemeToggle';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  agents: Agent[];
  onAgentChange: (name: string) => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}

export function Header({ agents, onAgentChange, selectedModel, setSelectedModel }: HeaderProps) {
  const navigate = useNavigate();
  const models = ['ChatGPT 4.1', 'O3-2025', 'O4-mini', 'GPT-4o'];
  const activeAgent = agents.find(agent => agent.active);

  return (
    <header className="flex h-16 items-center justify-between px-6 border-b border-border/50 bg-background dark:bg-black backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="h-8 w-8" />
        
        <div className="flex items-center gap-3">
          {activeAgent && (
            <>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <activeAgent.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-foreground dark:text-white">{activeAgent.name}</h2>
                <p className="text-xs text-muted-foreground dark:text-gray-400">Active Agent</p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 rounded-xl border-border/50 bg-background/50 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              {selectedModel}
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Select Model</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {models.map(model => (
              <DropdownMenuItem key={model} onClick={() => setSelectedModel(model)}>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${model === selectedModel ? 'bg-primary' : 'bg-muted'}`} />
                  {model}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <ThemeToggle />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">John Doe</p>
                <p className="text-xs leading-none text-muted-foreground">
                  john.doe@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/profile')}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/settings')}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
