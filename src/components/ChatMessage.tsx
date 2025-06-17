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
                COMPLETE TRAVEL PLAN FOR {message.planDetails?.destination?.toUpperCase() || 'DESTINATION'}
              </h2>
            </div>

            {/* Cover Image and Map Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Cover Image */}
              <div className="relative h-48 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=200&fit=crop" 
                  alt="Travel destination" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 p-4 text-white bg-gradient-to-t from-black/60 to-transparent w-full">
                  <h3 className="text-lg font-bold">
                    {message.planDetails?.destination || 'Destination'}
                  </h3>
                  <p className="text-sm opacity-90">
                    {message.planDetails?.days}-Day Adventure
                  </p>
                </div>
              </div>
              
              {/* Map Section */}
              <div className="relative h-48 rounded-lg overflow-hidden bg-slate-100 border">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(message.planDetails?.destination || 'India')}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                />
                <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md">
                  <MapPin className="h-4 w-4 text-purple-500" />
                </div>
              </div>
            </div>

            {/* Destination Overview */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3">Destination Overview</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {message.planDetails?.destination || 'This destination'} is a vibrant location offering a perfect blend of culture, adventure, and relaxation. This {message.planDetails?.days}-day itinerary is specially crafted for {message.planDetails?.travelers} traveler(s) with a focus on {message.planDetails?.interests}.
              </p>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-blue-600 text-sm font-medium">Travel Dates</div>
                <div className="text-xs text-gray-600">July 10-17, 2025</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-green-600 text-sm font-medium">Travelers</div>
                <div className="text-xs text-gray-600">{message.planDetails?.travelers} person(s)</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-purple-600 text-sm font-medium">Budget</div>
                <div className="text-xs text-gray-600">{message.planDetails?.budget}</div>
              </div>
            </div>

            {/* Travel Logistics */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3">Travel Logistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="text-blue-600 mt-1">✈️</div>
                  <div>
                    <div className="font-medium text-sm">Flights</div>
                    <div className="text-xs text-gray-600">Book round-trip with IndiGo for ₹12,500 via Skyscanner. Direct flights with 7kg cabin baggage included.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                  <div className="text-purple-600 mt-1">🏨</div>
                  <div>
                    <div className="font-medium text-sm">Accommodation</div>
                    <div className="text-xs text-gray-600">Stay at premium hotel, centrally located with modern amenities, rooftop pool and spa. ₹3,500/night via MakeMyTrip.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Day-by-Day Itinerary */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3">Day-by-Day Itinerary</h3>
              <div className="space-y-4">
                {Array.from({ length: Number(message.planDetails?.days) || 3 }, (_, i) => (
                  <div key={i} className="border-l-4 border-blue-500 pl-4 py-3 bg-gray-50 rounded-r-lg">
                    <h4 className="font-semibold text-sm mb-2">Day {i + 1}: {i === 0 ? 'Arrival & Exploration' : i === Number(message.planDetails?.days) - 1 ? 'Departure' : 'Adventure & Culture'}</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-medium">⭐ 9:00 AM</span>
                        <span className="text-gray-600">Breakfast at local cafe</span>
                      </div>
                      <div className="text-xs text-blue-600 ml-4">📍 Popular location, {message.planDetails?.destination}</div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-medium">⭐ 2:00 PM</span>
                        <span className="text-gray-600">Main attraction visit</span>
                      </div>
                      <div className="text-xs text-blue-600 ml-4">📍 Tourist hotspot, {message.planDetails?.destination}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Budget Overview */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3">Budget Overview</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-blue-600 text-2xl mb-1">✈️</div>
                  <div className="text-xs font-medium">Flights</div>
                  <div className="text-sm font-bold">₹12,500</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-green-600 text-2xl mb-1">🏨</div>
                  <div className="text-xs font-medium">Accommodation</div>
                  <div className="text-sm font-bold">₹25,500</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-orange-600 text-2xl mb-1">🍽️</div>
                  <div className="text-xs font-medium">Food & Activities</div>
                  <div className="text-sm font-bold">₹14,050</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-red-600 text-2xl mb-1">💰</div>
                  <div className="text-xs font-medium">Total Cost</div>
                  <div className="text-sm font-bold">₹60,800</div>
                </div>
              </div>
            </div>

            {/* Tips for smooth trip */}
            <div className="mb-4">
              <h3 className="text-lg font-bold mb-3">Tips for smooth trip</h3>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <ul className="text-xs space-y-1 text-gray-600">
                  <li>• Book flights and hotels through apps like MakeMyTrip for deals</li>
                  <li>• Use BookMyForex for better currency exchange rates</li>
                  <li>• Consider travel insurance from Policy Bazaar for added security</li>
                  <li>• Download offline maps and translation apps</li>
                </ul>
              </div>
            </div>

            {/* Want to make changes section */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3">Want to make changes?</h3>
              <div className="flex gap-2">
                <Input
                  value={changeRequest}
                  onChange={(e) => setChangeRequest(e.target.value)}
                  placeholder="e.g., 'Add more adventure activities' or 'Find cheaper hotels'"
                  className="flex-1"
                />
                <Button 
                  onClick={handleSubmitChanges}
                  className="bg-slate-800 hover:bg-slate-700 text-white px-6"
                  disabled={!changeRequest.trim()}
                >
                  Update Plan
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4 border-t">
              <Button onClick={handleDownloadPdf} variant="outline" size="sm" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button onClick={onUpdatePlan} variant="outline" size="sm" className="flex-1">
                <Repeat className="h-4 w-4 mr-2" />
                Update Plan
              </Button>
            </div>
          </div>
        ) : message.isShoppingResponse ? (
          <div className="space-y-6 bg-white rounded-lg p-6 shadow-lg">
            <div className="bg-blue-500 text-white p-4 rounded-t-lg -m-6 mb-6">
              <h2 className="text-lg font-bold">Here are some product recommendations for you!</h2>
            </div>
            
            <div className="mb-4">
              <h3 className="text-md font-semibold mb-3">Here are some suggestions for "{message.shoppingQuery}"</h3>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border rounded-lg p-4">
                <div className="h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                  <div className="text-gray-400">📱</div>
                </div>
                <h4 className="font-semibold text-sm">Premium Wireless Headphones</h4>
                <p className="text-xs text-gray-600 mb-2">Noise-cancelling over-ear headphones with 30-hour battery life</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">$199.99</span>
                  <span className="text-xs text-gray-500">Rating: 4.8/5</span>
                </div>
                <Button size="sm" variant="outline" className="w-full mt-2">
                  View Product
                </Button>
              </div>

              <div className="border rounded-lg p-4">
                <div className="h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                  <div className="text-gray-400">⌚</div>
                </div>
                <h4 className="font-semibold text-sm">Smart Fitness Watch</h4>
                <p className="text-xs text-gray-600 mb-2">Track your workouts, heart rate, and sleep patterns</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">$249.50</span>
                  <span className="text-xs text-gray-500">Rating: 4.6/5</span>
                </div>
                <Button size="sm" variant="outline" className="w-full mt-2">
                  View Product
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4 border-t">
              <Button onClick={handleRegenerateProducts} variant="outline" size="sm" className="flex-1">
                <RefreshCcw className="h-4 w-4 mr-2" />
                Regenerate
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <ThumbsUp className="h-4 w-4 mr-2" />
                Like
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
