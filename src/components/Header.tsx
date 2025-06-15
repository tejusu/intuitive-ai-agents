
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThemeToggle } from './ThemeToggle';
import { ChevronDown, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Agent {
  name: string;
  icon: LucideIcon;
  active: boolean;
}

interface HeaderProps {
  agents: Agent[];
  onAgentChange: (name: string) => void;
}

export function Header({ agents, onAgentChange }: HeaderProps) {
  const [selectedModel, setSelectedModel] = useState('ChatGPT 4.1');
  const models = ['ChatGPT 4.1', 'O3-2025', 'O4-mini', 'GPT-4o'];

  return (
    <header className="flex h-20 items-center justify-between px-8 border-b">
      <div className="flex-1" />
      <div className="flex items-center gap-2 justify-center">
        {agents.map((agent) => (
          <Button key={agent.name} variant={agent.active ? 'secondary' : 'ghost'} className={cn('gap-2 rounded-full', agent.active && 'dark:bg-secondary bg-primary/10 text-primary dark:text-foreground font-semibold')} onClick={() => onAgentChange(agent.name)}>
            <agent.icon className="h-5 w-5" />
            {agent.name}
          </Button>
        ))}
      </div>
      <div className="flex flex-1 items-center justify-end gap-4">
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
        <ThemeToggle />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>T</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
