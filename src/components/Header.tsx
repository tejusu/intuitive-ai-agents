
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThemeToggle } from './ThemeToggle';
import { ChevronDown, Bot, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const agents = [
  { name: 'Pilott Ai', icon: Bot, active: true },
  { name: 'Voyagee', icon: Bot, active: false },
  { name: 'Shopora', icon: Search, active: false },
  { name: 'Intellic', icon: Bot, active: false },
];

export function Header() {
  return (
    <header className="flex h-20 items-center justify-between px-8 border-b">
      <div className="flex items-center gap-2">
        {agents.map((agent) => (
          <Button key={agent.name} variant={agent.active ? 'secondary' : 'ghost'} className={cn('gap-2 rounded-full', agent.active && 'dark:bg-secondary bg-primary/10 text-primary-foreground dark:text-foreground font-semibold')}>
            <agent.icon className="h-5 w-5" />
            {agent.name}
          </Button>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" className="gap-2 rounded-full">
          ChatGPT 4
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
        <ThemeToggle />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>T</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
