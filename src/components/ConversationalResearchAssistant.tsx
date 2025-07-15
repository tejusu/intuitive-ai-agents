import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { BrainCircuit, Bot, Send, BookOpen, Search, FileText, Globe } from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  options?: string[];
  showInput?: boolean;
}

interface ResearchData {
  topic: string;
  type: string;
  depth: string;
  timeframe: string;
  focusArea?: string;
  questions?: string;
}

export function ConversationalResearchAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: "🔬 Hi! I'm your Research Assistant. What topic would you like me to research for you?",
      timestamp: new Date(),
      options: ['Technology Trends', 'Market Analysis', 'Academic Research', 'Industry Reports', 'Custom Topic']
    }
  ]);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [researchData, setResearchData] = useState<Partial<ResearchData>>({});
  const [isTyping, setIsTyping] = useState(false);
  const [customTopic, setCustomTopic] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [followUpInput, setFollowUpInput] = useState('');

  const addMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = (callback: () => void, delay = 1200) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  };

  const handleTopicSelect = (topic: string) => {
    if (topic === 'Custom Topic') {
      setShowCustomInput(true);
      return;
    }

    addMessage({ type: 'user', content: topic });
    setResearchData(prev => ({ ...prev, topic }));

    simulateTyping(() => {
      addMessage({
        type: 'bot',
        content: `📚 Great choice! What type of research approach would you prefer for "${topic}"?`,
        options: ['Comprehensive Overview', 'Quick Summary', 'Deep Dive Analysis', 'Comparative Study', 'Recent Developments']
      });
      setCurrentStep(2);
    });
  };

  const handleCustomTopic = () => {
    if (!customTopic.trim()) return;
    
    addMessage({ type: 'user', content: customTopic });
    setResearchData(prev => ({ ...prev, topic: customTopic }));
    setShowCustomInput(false);
    setCustomTopic('');

    simulateTyping(() => {
      addMessage({
        type: 'bot',
        content: `📚 Excellent topic! What type of research approach would you prefer for "${customTopic}"?`,
        options: ['Comprehensive Overview', 'Quick Summary', 'Deep Dive Analysis', 'Comparative Study', 'Recent Developments']
      });
      setCurrentStep(2);
    });
  };

  const handleResearchTypeSelect = (type: string) => {
    addMessage({ type: 'user', content: type });
    setResearchData(prev => ({ ...prev, type }));

    simulateTyping(() => {
      addMessage({
        type: 'bot',
        content: '⏰ What timeframe should I focus on for this research?',
        options: ['Latest (Past Month)', 'Recent (Past 6 Months)', 'Current Year', 'Past 2-3 Years', 'Historical Overview']
      });
      setCurrentStep(3);
    });
  };

  const handleTimeframeSelect = (timeframe: string) => {
    addMessage({ type: 'user', content: timeframe });
    setResearchData(prev => ({ ...prev, timeframe }));

    simulateTyping(() => {
      addMessage({
        type: 'bot',
        content: '🎯 Any specific focus area or aspect you want me to emphasize?',
        options: ['Key Statistics', 'Expert Opinions', 'Case Studies', 'Future Predictions', 'No Specific Focus']
      });
      setCurrentStep(4);
    });
  };

  const handleFocusSelect = (focus: string) => {
    addMessage({ type: 'user', content: focus });
    setResearchData(prev => ({ ...prev, focusArea: focus }));

    simulateTyping(() => {
      addMessage({
        type: 'bot',
        content: '✨ Perfect! Let me compile comprehensive research findings for you...',
      });
      
      setTimeout(() => {
        setShowResults(true);
      }, 2500);
    }, 2000);
  };

  const handleFollowUp = () => {
    if (!followUpInput.trim()) return;

    addMessage({ type: 'user', content: followUpInput });
    setFollowUpInput('');

    simulateTyping(() => {
      addMessage({
        type: 'bot',
        content: "I've updated the research based on your additional requirements. The new information has been integrated into your research findings."
      });
    });
  };

  if (showResults && researchData.topic) {
    return (
      <div className="h-full flex flex-col">
        {/* Research Results */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-100">Research Results</h2>
              <p className="text-purple-600 dark:text-purple-300">{researchData.topic}</p>
              <div className="flex justify-center gap-2">
                <Badge variant="secondary">{researchData.type}</Badge>
                <Badge variant="outline">{researchData.timeframe}</Badge>
                {researchData.focusArea && <Badge variant="outline">{researchData.focusArea}</Badge>}
              </div>
            </div>

            {/* Key Findings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-purple-600" />
                  Key Findings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <h4 className="font-semibold mb-2">Market Overview</h4>
                    <p className="text-sm text-muted-foreground">
                      Current market size, growth trends, and key players in the {researchData.topic} industry.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <h4 className="font-semibold mb-2">Recent Developments</h4>
                    <p className="text-sm text-muted-foreground">
                      Latest innovations, regulatory changes, and emerging trends within the specified timeframe.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Detailed Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <h4>Executive Summary</h4>
                  <p>
                    Based on the {researchData.type?.toLowerCase()} approach for {researchData.topic}, 
                    focusing on {researchData.timeframe?.toLowerCase()} data with emphasis on {researchData.focusArea?.toLowerCase()}.
                  </p>
                  
                  <h4>Key Statistics</h4>
                  <ul>
                    <li>Market growth rate: 15-20% annually</li>
                    <li>Key adoption metrics and user engagement data</li>
                    <li>Investment trends and funding patterns</li>
                  </ul>
                  
                  <h4>Future Outlook</h4>
                  <p>
                    Projected developments and potential challenges in the coming years, 
                    based on current trends and expert predictions.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Sources & References */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-green-600" />
                  Sources & References
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  <div className="flex items-center gap-2 p-2 border rounded">
                    <Globe className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Industry Research Reports (2024)</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 border rounded">
                    <Globe className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Academic Publications & Journals</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 border rounded">
                    <Globe className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Expert Interviews & Market Analysis</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Items */}
            <Card>
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 flex-wrap">
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                  <Button variant="outline" size="sm">
                    <Search className="h-4 w-4 mr-2" />
                    Deep Dive Research
                  </Button>
                  <Button variant="outline" size="sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Save to Library
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Follow-up input */}
        <div className="p-4 border-t bg-background/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto flex gap-3">
            <Input
              value={followUpInput}
              onChange={(e) => setFollowUpInput(e.target.value)}
              placeholder="Ask follow-up questions or request additional research..."
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleFollowUp()}
            />
            <Button onClick={handleFollowUp} disabled={!followUpInput.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-purple-50/50 to-white dark:from-purple-950/20 dark:to-background">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : ''}`}>
              {message.type === 'bot' && (
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center shrink-0">
                  <BrainCircuit className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
              )}
              
              <div className={`max-w-xs lg:max-w-md space-y-3 ${message.type === 'user' ? 'order-first' : ''}`}>
                <div className={`rounded-lg px-4 py-3 ${
                  message.type === 'user' 
                    ? 'bg-purple-600 text-white ml-auto' 
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
                        className="text-xs"
                        onClick={() => {
                          if (currentStep === 1) handleTopicSelect(option);
                          else if (currentStep === 2) handleResearchTypeSelect(option);
                          else if (currentStep === 3) handleTimeframeSelect(option);
                          else if (currentStep === 4) handleFocusSelect(option);
                        }}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
              
              {message.type === 'user' && (
                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300">U</span>
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center">
                <BrainCircuit className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-3 shadow-sm border">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom Topic Input */}
      {showCustomInput && (
        <div className="p-4 border-t bg-purple-50/50 dark:bg-purple-950/20">
          <div className="max-w-2xl mx-auto space-y-3">
            <p className="text-sm text-purple-700 dark:text-purple-300">Enter your research topic:</p>
            <div className="flex gap-3">
              <Input
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                placeholder="e.g., AI impact on healthcare..."
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleCustomTopic()}
              />
              <Button onClick={handleCustomTopic} disabled={!customTopic.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}