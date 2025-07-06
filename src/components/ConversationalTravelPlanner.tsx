
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MapPin, Calendar as CalendarIcon, DollarSign, Users, Plane, Bot, Send } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { TravelItineraryView } from './TravelItineraryView';

interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  options?: string[];
  showInput?: boolean;
}

interface TravelPlan {
  destination: string;
  date: Date;
  budget: string;
  travelers: number;
  preferences: string[];
  includeStay: boolean;
}

export function ConversationalTravelPlanner() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: "✈️ Hi! I'm your Travel Planner Assistant. Where would you like to travel?",
      timestamp: new Date(),
      options: ['Goa', 'Paris', 'Bali', 'Tokyo', 'Custom']
    }
  ]);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [travelPlan, setTravelPlan] = useState<Partial<TravelPlan>>({});
  const [isTyping, setIsTyping] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [customLocation, setCustomLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [showItinerary, setShowItinerary] = useState(false);
  const [followUpInput, setFollowUpInput] = useState('');

  const addMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = (callback: () => void, delay = 1500) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  };

  const handleDestinationSelect = (destination: string) => {
    if (destination === 'Custom') {
      setShowLocationModal(true);
      return;
    }

    addMessage({ type: 'user', content: destination });
    setTravelPlan(prev => ({ ...prev, destination }));

    simulateTyping(() => {
      addMessage({
        type: 'bot',
        content: `🗓️ Great choice! ${destination} is amazing. When do you plan to go?`,
        options: ['Next Week', 'July 15', 'August 10', 'Custom Date']
      });
      setCurrentStep(2);
    });
  };

  const handleCustomLocation = () => {
    if (!customLocation.trim()) return;
    
    addMessage({ type: 'user', content: customLocation });
    setTravelPlan(prev => ({ ...prev, destination: customLocation }));
    setShowLocationModal(false);
    setCustomLocation('');

    simulateTyping(() => {
      addMessage({
        type: 'bot',
        content: `🗓️ Excellent! ${customLocation} sounds wonderful. When do you plan to go?`,
        options: ['Next Week', 'July 15', 'August 10', 'Custom Date']
      });
      setCurrentStep(2);
    });
  };

  const handleDateSelect = (dateOption: string) => {
    if (dateOption === 'Custom Date') {
      setShowCalendar(true);
      return;
    }

    addMessage({ type: 'user', content: dateOption });
    const date = dateOption === 'Next Week' ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : new Date(dateOption);
    setTravelPlan(prev => ({ ...prev, date }));

    simulateTyping(() => {
      addMessage({
        type: 'bot',
        content: '💰 Perfect! Any preferences on budget or travel type?',
        options: ['Luxury', 'Mid-Range', 'Budget', 'Adventure', 'Romantic']
      });
      setCurrentStep(3);
    });
  };

  const handleCustomDate = (date: Date | undefined) => {
    if (!date) return;
    
    addMessage({ type: 'user', content: format(date, 'PPP') });
    setTravelPlan(prev => ({ ...prev, date }));
    setShowCalendar(false);

    simulateTyping(() => {
      addMessage({
        type: 'bot',
        content: '💰 Perfect timing! Any preferences on budget or travel type?',
        options: ['Luxury', 'Mid-Range', 'Budget', 'Adventure', 'Romantic']
      });
      setCurrentStep(3);
    });
  };

  const handleBudgetSelect = (budget: string) => {
    addMessage({ type: 'user', content: budget });
    setTravelPlan(prev => ({ ...prev, budget, preferences: [budget] }));

    simulateTyping(() => {
      addMessage({
        type: 'bot',
        content: '🏨 Do you want us to plan your stay, food, and activities?',
        options: ['Yes, everything!', 'Just places to visit', 'Stay & activities only']
      });
      setCurrentStep(4);
    });
  };

  const handleStayPreference = (preference: string) => {
    addMessage({ type: 'user', content: preference });
    const includeStay = preference !== 'Just places to visit';
    setTravelPlan(prev => ({ ...prev, includeStay, travelers: 2 }));

    simulateTyping(() => {
      addMessage({
        type: 'bot',
        content: '✨ Amazing! Let me create your perfect travel plan...',
      });
      
      setTimeout(() => {
        setShowItinerary(true);
      }, 2000);
    }, 2000);
  };

  const handleFollowUp = () => {
    if (!followUpInput.trim()) return;

    addMessage({ type: 'user', content: followUpInput });
    setFollowUpInput('');

    simulateTyping(() => {
      addMessage({
        type: 'bot',
        content: "I've updated your itinerary based on your request! The changes have been applied to your travel plan."
      });
    });
  };

  if (showItinerary && travelPlan.destination && travelPlan.date) {
    return (
      <div className="h-full flex flex-col">
        <TravelItineraryView
          destination={travelPlan.destination}
          date={travelPlan.date}
          budget={travelPlan.budget || 'Mid-Range'}
          travelers={travelPlan.travelers || 2}
          preferences={travelPlan.preferences || []}
          includeStay={travelPlan.includeStay || true}
          onBackToChat={() => setShowItinerary(false)}
        />
        
        {/* Follow-up chat input */}
        <div className="p-4 border-t bg-background/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto flex gap-3">
            <Input
              value={followUpInput}
              onChange={(e) => setFollowUpInput(e.target.value)}
              placeholder="Ask me to modify your itinerary..."
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
    <div className="h-full flex flex-col bg-gradient-to-b from-blue-50/50 to-white dark:from-blue-950/20 dark:to-background">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : ''}`}>
              {message.type === 'bot' && (
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
              )}
              
              <div className={`max-w-xs lg:max-w-md space-y-3 ${message.type === 'user' ? 'order-first' : ''}`}>
                <div className={`rounded-lg px-4 py-3 ${
                  message.type === 'user' 
                    ? 'bg-blue-600 text-white ml-auto' 
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
                          if (currentStep === 1) handleDestinationSelect(option);
                          else if (currentStep === 2) handleDateSelect(option);
                          else if (currentStep === 3) handleBudgetSelect(option);
                          else if (currentStep === 4) handleStayPreference(option);
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
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-3 shadow-sm border">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom Location Modal */}
      <Dialog open={showLocationModal} onOpenChange={setShowLocationModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Where do you want to go?
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              value={customLocation}
              onChange={(e) => setCustomLocation(e.target.value)}
              placeholder="Enter destination..."
              onKeyPress={(e) => e.key === 'Enter' && handleCustomLocation()}
            />
            <Button onClick={handleCustomLocation} className="w-full">
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Custom Date Modal */}
      <Dialog open={showCalendar} onOpenChange={setShowCalendar}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              When do you want to travel?
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date);
                if (date) handleCustomDate(date);
              }}
              disabled={(date) => date < new Date()}
              className="rounded-md border"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
