
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from "next-themes";
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronDown, LucideIcon, Settings, LogOut, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Agent } from './Layout';

interface HeaderProps {
  agents: Agent[];
  onAgentChange: (name: string) => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}

export function Header({ agents, onAgentChange, selectedModel, setSelectedModel }: HeaderProps) {
  const models = ['ChatGPT 4.1', 'O3-2025', 'O4-mini', 'GPT-4o'];
  const { theme, setTheme } = useTheme();

  return (
    <header className="relative flex h-20 items-center justify-center px-8 border-b">
      <div className="flex items-center gap-2">
        {agents.map((agent) => (
          <Button key={agent.name} variant={agent.active ? 'secondary' : 'ghost'} className={cn('gap-2 rounded-full', agent.active && 'dark:bg-secondary bg-primary/10 text-primary dark:text-foreground font-semibold')} onClick={() => onAgentChange(agent.name)}>
            <agent.icon className="h-5 w-5" />
            {agent.name}
          </Button>
        ))}
      </div>
      <div className="absolute right-8 top-1/2 flex -translate-y-1/2 items-center justify-end gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 rounded-full">
              {selectedModel}
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {models.map(model => (
              <DropdownMenuItem key={model} onClick={() => setSelectedModel(model)}>
                {model}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>T</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Test User</p>
                <p className="text-xs leading-none text-muted-foreground">
                  test@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/profile-settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="cursor-pointer">
              {theme === 'dark' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
              <span>Toggle Theme</span>
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
