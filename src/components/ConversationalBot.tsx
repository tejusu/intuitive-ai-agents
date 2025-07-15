import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Bot, Plane, ShoppingBag, BrainCircuit, Send, RefreshCw, ArrowLeft } from 'lucide-react';
import { ConversationalShoppingAssistant } from './ConversationalShoppingAssistant';
import { ConversationalTravelPlanner } from './ConversationalTravelPlanner';
import { ConversationalResearchAssistant } from './ConversationalResearchAssistant';

interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  options?: string[];
  showAgentSwitch?: boolean;
}

type Agent = 'none' | 'travel' | 'shopping' | 'research';

interface AgentInfo {
  id: Agent;
  name: string;
  icon: any;
  emoji: string;
  description: string;
  prompt: string;
}

export function ConversationalBot() {
  const [currentAgent, setCurrentAgent] = useState<Agent>('none');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: "👋 Hi! I'm your AI Assistant. Which type of help would you like today?",
      timestamp: new Date(),
      options: ['✈️ Travel Planning', '🛍️ Shopping Assistant', '🔬 Research Help']
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [showAgentSwitcher, setShowAgentSwitcher] = useState(false);

  const agents: AgentInfo[] = [
    {
      id: 'travel',
      name: 'Travel Planner',
      icon: Plane,
      emoji: '✈️',
      description: 'Plan your perfect trip',
      prompt: 'I want to plan a trip'
    },
    {
      id: 'shopping',
      name: 'Shopping Assistant',
      icon: ShoppingBag,
      emoji: '🛍️',
      description: 'Find the best deals',
      prompt: 'Help me find products to buy'
    },
    {
      id: 'research',
      name: 'Research Assistant',
      icon: BrainCircuit,
      emoji: '🔬',
      description: 'Research any topic',
      prompt: 'I need help researching something'
    }
  ];

  const addMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = (callback: () => void, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  };

  const handleAgentSelection = (selection: string) => {
    addMessage({ type: 'user', content: selection });

    let selectedAgent: Agent = 'none';
    let botResponse = '';

    if (selection.includes('Travel')) {
      selectedAgent = 'travel';
      botResponse = "✈️ Great! Switching you to the Travel Planner Assistant. Let's plan your perfect trip!";
    } else if (selection.includes('Shopping')) {
      selectedAgent = 'shopping';
      botResponse = "🛍️ Sure! Let's find you the best deals with the Shopping Assistant!";
    } else if (selection.includes('Research')) {
      selectedAgent = 'research';
      botResponse = "🔬 Perfect! The Research Assistant is here to help you find information on any topic.";
    }

    simulateTyping(() => {
      addMessage({
        type: 'bot',
        content: botResponse,
        showAgentSwitch: true
      });
      
      setTimeout(() => {
        setCurrentAgent(selectedAgent);
      }, 1500);
    });
  };

  const handleAgentSwitch = (newAgent: Agent) => {
    if (newAgent === currentAgent) return;
    
    const agentInfo = agents.find(a => a.id === newAgent);
    if (!agentInfo) return;

    addMessage({
      type: 'bot',
      content: `🔄 Switching to ${agentInfo.name}... ${agentInfo.emoji}`
    });

    simulateTyping(() => {
      setCurrentAgent(newAgent);
      setShowAgentSwitcher(false);
    });
  };

  const handleCustomInput = () => {
    if (!customInput.trim()) return;
    
    addMessage({ type: 'user', content: customInput });
    setCustomInput('');

    simulateTyping(() => {
      addMessage({
        type: 'bot',
        content: "I understand you have a specific request. Let me connect you with the right assistant for better help.",
        options: ['✈️ Travel Planning', '🛍️ Shopping Assistant', '🔬 Research Help']
      });
    });
  };

  const handleBackToSelection = () => {
    setCurrentAgent('none');
    setShowAgentSwitcher(false);
    addMessage({
      type: 'bot',
      content: "👋 Back to the main menu! Which assistant would you like to use?",
      options: ['✈️ Travel Planning', '🛍️ Shopping Assistant', '🔬 Research Help']
    });
  };

  // Render specific agent interface
  if (currentAgent === 'travel') {
    return (
      <div className="h-full flex flex-col">
        {/* Agent Header */}
        <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-sky-50 dark:from-blue-950/20 dark:to-sky-950/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                <Plane className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">Travel Planner Assistant</h3>
                <p className="text-xs text-blue-600 dark:text-blue-300">Plan your perfect trip</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAgentSwitcher(!showAgentSwitcher)}
                className="text-xs"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Switch
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToSelection}
                className="text-xs"
              >
                <ArrowLeft className="h-3 w-3 mr-1" />
                Back
              </Button>
            </div>
          </div>
          
          {/* Agent Switcher */}
          {showAgentSwitcher && (
            <div className="mt-4 p-3 bg-white/80 dark:bg-gray-800/80 rounded-lg border backdrop-blur-sm">
              <p className="text-xs text-muted-foreground mb-2">Switch to:</p>
              <div className="flex gap-2">
                {agents.filter(a => a.id !== currentAgent).map(agent => {
                  const AgentIcon = agent.icon;
                  return (
                    <Button
                      key={agent.id}
                      variant="outline"
                      size="sm"
                      onClick={() => handleAgentSwitch(agent.id)}
                      className="text-xs"
                    >
                      <AgentIcon className="h-3 w-3 mr-1" />
                      {agent.name}
                    </Button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        
        {/* Travel Planner Component */}
        <div className="flex-1">
          <ConversationalTravelPlanner />
        </div>
      </div>
    );
  }

  if (currentAgent === 'shopping') {
    return (
      <div className="h-full flex flex-col">
        {/* Agent Header */}
        <div className="p-4 border-b bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                <ShoppingBag className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-green-900 dark:text-green-100">Shopping Assistant</h3>
                <p className="text-xs text-green-600 dark:text-green-300">Find the best deals</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAgentSwitcher(!showAgentSwitcher)}
                className="text-xs"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Switch
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToSelection}
                className="text-xs"
              >
                <ArrowLeft className="h-3 w-3 mr-1" />
                Back
              </Button>
            </div>
          </div>
          
          {/* Agent Switcher */}
          {showAgentSwitcher && (
            <div className="mt-4 p-3 bg-white/80 dark:bg-gray-800/80 rounded-lg border backdrop-blur-sm">
              <p className="text-xs text-muted-foreground mb-2">Switch to:</p>
              <div className="flex gap-2">
                {agents.filter(a => a.id !== currentAgent).map(agent => {
                  const AgentIcon = agent.icon;
                  return (
                    <Button
                      key={agent.id}
                      variant="outline"
                      size="sm"
                      onClick={() => handleAgentSwitch(agent.id)}
                      className="text-xs"
                    >
                      <AgentIcon className="h-3 w-3 mr-1" />
                      {agent.name}
                    </Button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        
        {/* Shopping Assistant Component */}
        <div className="flex-1">
          <ConversationalShoppingAssistant />
        </div>
      </div>
    );
  }

  if (currentAgent === 'research') {
    return (
      <div className="h-full flex flex-col">
        {/* Agent Header */}
        <div className="p-4 border-b bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center">
                <BrainCircuit className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-purple-900 dark:text-purple-100">Research Assistant</h3>
                <p className="text-xs text-purple-600 dark:text-purple-300">Research any topic</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAgentSwitcher(!showAgentSwitcher)}
                className="text-xs"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Switch
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToSelection}
                className="text-xs"
              >
                <ArrowLeft className="h-3 w-3 mr-1" />
                Back
              </Button>
            </div>
          </div>
          
          {/* Agent Switcher */}
          {showAgentSwitcher && (
            <div className="mt-4 p-3 bg-white/80 dark:bg-gray-800/80 rounded-lg border backdrop-blur-sm">
              <p className="text-xs text-muted-foreground mb-2">Switch to:</p>
              <div className="flex gap-2">
                {agents.filter(a => a.id !== currentAgent).map(agent => {
                  const AgentIcon = agent.icon;
                  return (
                    <Button
                      key={agent.id}
                      variant="outline"
                      size="sm"
                      onClick={() => handleAgentSwitch(agent.id)}
                      className="text-xs"
                    >
                      <AgentIcon className="h-3 w-3 mr-1" />
                      {agent.name}
                    </Button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        
        {/* Research Assistant Component */}
        <div className="flex-1">
          <ConversationalResearchAssistant />
        </div>
      </div>
    );
  }

  // Main agent selection interface
  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-950/20 dark:to-background">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : ''}`}>
              {message.type === 'bot' && (
                <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-full flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
              )}
              
              <div className={`max-w-xs lg:max-w-md space-y-3 ${message.type === 'user' ? 'order-first' : ''}`}>
                <div className={`rounded-lg px-4 py-3 ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white ml-auto' 
                    : 'bg-white dark:bg-gray-800 shadow-sm border'
                }`}>
                  <p className="text-sm">{message.content}</p>
                </div>
                
                {message.options && (
                  <div className="flex flex-wrap gap-2">
                    {message.options.map((option) => (
                      <Button
                        key={option}
                        variant="outline"
                        size="sm"
                        className="text-xs hover:bg-accent transition-colors"
                        onClick={() => handleAgentSelection(option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                )}

                {message.showAgentSwitch && (
                  <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg border">
                    <p className="text-xs text-muted-foreground mb-2">Need a different assistant?</p>
                    <div className="flex gap-2 flex-wrap">
                      {agents.map(agent => {
                        const AgentIcon = agent.icon;
                        return (
                          <Button
                            key={agent.id}
                            variant="outline"
                            size="sm"
                            onClick={() => handleAgentSwitch(agent.id)}
                            className="text-xs"
                          >
                            <AgentIcon className="h-3 w-3 mr-1" />
                            {agent.name}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              
              {message.type === 'user' && (
                <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300">U</span>
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-3 shadow-sm border">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom Input Section */}
      <div className="p-6 border-t border-border/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="flex gap-3">
            <Input
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCustomInput()}
              placeholder="Or describe what you need help with..."
              className="flex-1 rounded-xl border-border/50 bg-background/50 backdrop-blur-sm"
            />
            <Button 
              onClick={handleCustomInput}
              disabled={!customInput.trim()}
              className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Choose an assistant above or describe your needs</p>
          </div>
        </div>
      </div>
    </div>
  );
}