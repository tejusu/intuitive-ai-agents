import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, RefreshCcw, Edit, Copy, Download, Repeat, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { toast } from 'sonner';
import jsPDF from 'jspdf';
import { TravelPlanFormValues } from './TravelPlannerForm';
import { Input } from '@/components/ui/input';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  isTravelPlan?: boolean;
  planDetails?: TravelPlanFormValues;
  isShoppingResponse?: boolean;
  shoppingQuery?: string;
}

interface ChatMessageProps {
  message: Message;
  agentIcon: React.ReactNode;
  onStartEdit: (message: Message) => void;
  onUpdatePlan?: () => void;
  onRegenerateShoppingResults?: (query: string) => void;
}

export function ChatMessage({ message, agentIcon, onStartEdit, onUpdatePlan, onRegenerateShoppingResults }: ChatMessageProps) {
  const isAi = message.sender === 'ai';
  const [changeRequest, setChangeRequest] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text).then(() => {
      toast.success('Message copied to clipboard!');
    });
  };

  const handleDownloadPdf = () => {
    try {
      const doc = new jsPDF();
      const splitText = doc.splitTextToSize(message.text, 180);
      doc.text(splitText, 10, 10);
      doc.save('travel-plan.pdf');
      toast.success('PDF Downloaded!');
    } catch (error) {
      console.error("Failed to generate PDF", error);
      toast.error("Failed to download PDF.");
    }
  };

  const handleSubmitChanges = () => {
    if (changeRequest.trim() && onUpdatePlan) {
      toast.success('Changes requested! Updating plan...');
      onUpdatePlan();
      setChangeRequest('');
    }
  };

  const handleRegenerateProducts = () => {
    if (message.shoppingQuery && onRegenerateShoppingResults) {
      onRegenerateShoppingResults(message.shoppingQuery);
    }
  };

  return (
    <div className={cn('group flex items-start gap-4 animate-fade-in', isAi ? '' : 'justify-end')}>
      {isAi && (
        <Avatar className="h-8 w-8 border p-0.5">
          {agentIcon}
        </Avatar>
      )}

      {!isAi && (
        <div className="flex items-center self-center opacity-0 group-hover:opacity-100 transition-opacity pr-2">
            <Button onClick={() => onStartEdit(message)} variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full">
            <Edit className="h-4 w-4" />
            </Button>
        </div>
      )}

      <div className={cn(
        'max-w-md lg:max-w-xl xl:max-w-2xl rounded-2xl p-4 relative transition-all',
        isAi 
          ? 'bg-muted rounded-bl-none' 
          : 'bg-primary text-primary-foreground rounded-br-none',
        isAi && 'group-hover:pb-12'
      )}>
        {message.isTravelPlan ? (
          <div className="space-y-6 bg-white rounded-lg p-6 shadow-lg">
            {/* Header with purple background */}
            <div className="bg-purple-500 text-white p-4 rounded-t-lg -m-6 mb-6">
              <h2 className="text-xl font-bold text-center">
                {message.planDetails?.destination?.toUpperCase() || 'DESTINATION'}
              </h2>
              <p className="text-center text-purple-100">Complete Travel Itinerary</p>
            </div>

            {/* Trip Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-purple-600 text-sm font-medium">Trip Duration</div>
                <div className="text-lg font-bold text-purple-800">{message.planDetails?.days} Days</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-purple-600 text-sm font-medium">Travelers</div>
                <div className="text-lg font-bold text-purple-800">{message.planDetails?.travelers}</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-purple-600 text-sm font-medium">Budget</div>
                <div className="text-lg font-bold text-purple-800">{message.planDetails?.budget}</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-purple-600 text-sm font-medium">Focus</div>
                <div className="text-lg font-bold text-purple-800">{message.planDetails?.interests}</div>
              </div>
            </div>

            {/* Day-by-Day Itinerary */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-4 text-purple-800">Day-by-Day Itinerary</h3>
              <div className="space-y-4">
                {Array.from({ length: Number(message.planDetails?.days) || 3 }, (_, i) => (
                  <div key={i} className="border border-purple-200 rounded-lg overflow-hidden">
                    <div className="bg-purple-100 p-4 border-b border-purple-200">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                          {i + 1}
                        </div>
                        <h4 className="font-semibold text-purple-800">
                          Day {i + 1}: {i === 0 ? 'Arrival & First Impressions' : i === Number(message.planDetails?.days) - 1 ? 'Final Day & Departure' : 'Exploration & Adventure'}
                        </h4>
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="text-sm font-medium text-purple-600">9:00 AM</span>
                        <div>
                          <div className="font-medium text-sm">Local Breakfast Experience</div>
                          <div className="text-xs text-gray-600">Start your day with authentic local cuisine</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-sm font-medium text-purple-600">11:00 AM</span>
                        <div>
                          <div className="font-medium text-sm">Main Attraction Visit</div>
                          <div className="text-xs text-gray-600">Explore the most iconic landmarks</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-sm font-medium text-purple-600">7:00 PM</span>
                        <div>
                          <div className="font-medium text-sm">Evening Cultural Experience</div>
                          <div className="text-xs text-gray-600">Immerse in local culture and traditions</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Budget Breakdown */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-4 text-purple-800">Estimated Budget Breakdown</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="text-2xl mb-2">✈️</div>
                  <div className="text-xs font-medium text-purple-600">Flights</div>
                  <div className="text-lg font-bold text-purple-800">$1,200</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="text-2xl mb-2">🏨</div>
                  <div className="text-xs font-medium text-purple-600">Hotels</div>
                  <div className="text-lg font-bold text-purple-800">$800</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="text-2xl mb-2">🍽️</div>
                  <div className="text-xs font-medium text-purple-600">Food</div>
                  <div className="text-lg font-bold text-purple-800">$400</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="text-2xl mb-2">🎯</div>
                  <div className="text-xs font-medium text-purple-600">Activities</div>
                  <div className="text-lg font-bold text-purple-800">$300</div>
                </div>
              </div>
            </div>

            {/* Customization Section */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3 text-purple-800">Want to customize your plan?</h3>
              <div className="flex gap-2">
                <Input
                  value={changeRequest}
                  onChange={(e) => setChangeRequest(e.target.value)}
                  placeholder="e.g., 'Add more adventure activities' or 'Find cheaper accommodations'"
                  className="flex-1 border-purple-200 focus:border-purple-500"
                />
                <Button 
                  onClick={handleSubmitChanges}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6"
                  disabled={!changeRequest.trim()}
                >
                  Update Plan
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4 border-t border-purple-200">
              <Button onClick={handleDownloadPdf} variant="outline" size="sm" className="flex-1 border-purple-200 text-purple-600 hover:bg-purple-50">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button onClick={onUpdatePlan} variant="outline" size="sm" className="flex-1 border-purple-200 text-purple-600 hover:bg-purple-50">
                <Repeat className="h-4 w-4 mr-2" />
                Regenerate
              </Button>
            </div>
          </div>
        ) : message.isShoppingResponse ? (
          <div className="space-y-6 bg-white rounded-lg p-6 shadow-lg">
            <div className="bg-blue-500 text-white p-4 rounded-t-lg -m-6 mb-6">
              <h2 className="text-lg font-bold">PRODUCT RECOMMENDATIONS</h2>
              <p className="text-blue-100">Curated just for you</p>
            </div>
            
            <div className="mb-4">
              <h3 className="text-md font-semibold mb-3">Here are some suggestions for "{message.shoppingQuery}"</h3>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border rounded-lg p-4 border-blue-200">
                <div className="h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                  <div className="text-4xl">🎧</div>
                </div>
                <h4 className="font-semibold text-sm mb-1">Premium Wireless Headphones</h4>
                <p className="text-xs text-gray-600 mb-3">Noise-cancelling over-ear headphones with 30-hour battery life</p>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-lg">$199.99</span>
                  <span className="text-xs text-yellow-600 flex items-center gap-1">
                    ★★★★★ 4.8/5
                  </span>
                </div>
                <Button size="sm" variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50">
                  View Product
                </Button>
              </div>

              <div className="border rounded-lg p-4 border-blue-200">
                <div className="h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                  <div className="text-4xl">⌚</div>
                </div>
                <h4 className="font-semibold text-sm mb-1">Smart Fitness Watch</h4>
                <p className="text-xs text-gray-600 mb-3">Track your workouts, heart rate, and sleep patterns</p>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-lg">$249.50</span>
                  <span className="text-xs text-yellow-600 flex items-center gap-1">
                    ★★★★☆ 4.6/5
                  </span>
                </div>
                <Button size="sm" variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50">
                  View Product
                </Button>
              </div>
            </div>

            {/* Why These Recommendations */}
            <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Why these recommendations?</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex items-center gap-2">
                  <div className="text-blue-600">🎯</div>
                  <div>
                    <div className="text-sm font-medium text-blue-800">Best Match</div>
                    <div className="text-xs text-blue-600">Based on your preferences</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-blue-600">💰</div>
                  <div>
                    <div className="text-sm font-medium text-blue-800">Great Value</div>
                    <div className="text-xs text-blue-600">Within your budget</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-blue-600">⭐</div>
                  <div>
                    <div className="text-sm font-medium text-blue-800">Top Rated</div>
                    <div className="text-xs text-blue-600">Highly reviewed products</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4 border-t border-blue-200">
              <Button onClick={handleRegenerateProducts} variant="outline" size="sm" className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50">
                <RefreshCcw className="h-4 w-4 mr-2" />
                Regenerate
              </Button>
              <Button variant="outline" size="sm" className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50">
                <ThumbsUp className="h-4 w-4 mr-2" />
                Like Results
              </Button>
            </div>
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{message.text}</p>
        )}
        
        {isAi && !message.isTravelPlan && !message.isShoppingResponse && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
            <Button onClick={handleCopy} variant="ghost" size="icon" className="h-7 w-7 hover:text-primary hover:bg-primary/10 rounded-full">
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 hover:text-primary hover:bg-primary/10 rounded-full">
              <ThumbsUp className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 hover:text-destructive hover:bg-destructive/10 rounded-full">
              <ThumbsDown className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 hover:text-primary hover:bg-primary/10 rounded-full">
              <RefreshCcw className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
       {!isAi && (
         <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>U</AvatarFallback>
         </Avatar>
      )}
    </div>
  );
}
