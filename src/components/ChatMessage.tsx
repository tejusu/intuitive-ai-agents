import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, RefreshCcw, Edit, Copy, Download, Repeat, MapPin, Calendar, Users, DollarSign } from 'lucide-react';
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
      
      // Header
      doc.setFontSize(20);
      doc.setTextColor(139, 69, 255);
      doc.text('TRAVEL PLAN', 20, 30);
      
      // Destination
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      doc.text(`Destination: ${message.planDetails?.destination || 'N/A'}`, 20, 50);
      
      // Trip details
      doc.setFontSize(12);
      doc.text(`Duration: ${message.planDetails?.days} days`, 20, 70);
      doc.text(`Travelers: ${message.planDetails?.travelers}`, 20, 85);
      doc.text(`Budget: ${message.planDetails?.budget}`, 20, 100);
      doc.text(`Interests: ${message.planDetails?.interests}`, 20, 115);
      
      // Itinerary
      doc.setFontSize(14);
      doc.text('Day-by-Day Itinerary:', 20, 140);
      
      let yPosition = 160;
      for (let i = 1; i <= Number(message.planDetails?.days || 3); i++) {
        doc.setFontSize(12);
        doc.text(`Day ${i}:`, 20, yPosition);
        doc.text(`- Morning: Breakfast and local exploration`, 30, yPosition + 15);
        doc.text(`- Afternoon: Main attraction visit`, 30, yPosition + 30);
        doc.text(`- Evening: Dinner and relaxation`, 30, yPosition + 45);
        yPosition += 65;
        
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 30;
        }
      }
      
      doc.save(`travel-plan-${message.planDetails?.destination || 'destination'}.pdf`);
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
          <div className="space-y-6 bg-background rounded-lg p-6 shadow-xl border border-border">
            {/* Header with gradient background */}
            <div className="bg-gradient-to-r from-primary to-primary/90 text-white p-6 rounded-lg -m-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    {message.planDetails?.destination?.toUpperCase() || 'DESTINATION'}
                  </h2>
                  <p className="text-white/80">Complete Travel Itinerary</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-white/80">Trip Duration</div>
                  <div className="text-xl font-bold">{message.planDetails?.days} Days</div>
                </div>
              </div>
            </div>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-primary/5 p-4 rounded-lg text-center border border-primary/20">
                <Calendar className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-sm font-medium text-foreground">Duration</div>
                <div className="text-lg font-bold text-primary">{message.planDetails?.days} Days</div>
              </div>
              <div className="bg-primary/5 p-4 rounded-lg text-center border border-primary/20">
                <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-sm font-medium text-foreground">Travelers</div>
                <div className="text-lg font-bold text-primary">{message.planDetails?.travelers}</div>
              </div>
              <div className="bg-primary/5 p-4 rounded-lg text-center border border-primary/20">
                <DollarSign className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-sm font-medium text-foreground">Budget</div>
                <div className="text-sm font-bold text-primary">{message.planDetails?.budget}</div>
              </div>
              <div className="bg-primary/5 p-4 rounded-lg text-center border border-primary/20">
                <MapPin className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-sm font-medium text-foreground">Focus</div>
                <div className="text-sm font-bold text-primary">{message.planDetails?.interests}</div>
              </div>
            </div>

            {/* Day-by-Day Itinerary */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4 text-foreground">Day-by-Day Itinerary</h3>
              <div className="space-y-4">
                {Array.from({ length: Number(message.planDetails?.days) || 3 }, (_, i) => (
                  <div key={i} className="border-l-4 border-primary pl-6 py-4 bg-muted/50 rounded-r-lg relative">
                    <div className="absolute -left-3 top-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {i + 1}
                    </div>
                    <h4 className="font-bold text-lg mb-3 text-foreground">
                      Day {i + 1}: {i === 0 ? 'Arrival & First Impressions' : i === Number(message.planDetails?.days) - 1 ? 'Final Day & Departure' : 'Exploration & Adventure'}
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                          9:00 AM
                        </div>
                        <div>
                          <div className="font-medium text-foreground">Local Breakfast Experience</div>
                          <div className="text-sm text-muted-foreground">Start your day with authentic local cuisine</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                          11:00 AM
                        </div>
                        <div>
                          <div className="font-medium text-foreground">Main Attraction Visit</div>
                          <div className="text-sm text-muted-foreground">Explore the most iconic landmarks</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                          7:00 PM
                        </div>
                        <div>
                          <div className="font-medium text-foreground">Evening Cultural Experience</div>
                          <div className="text-sm text-muted-foreground">Immerse in local culture and traditions</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Budget Breakdown */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4 text-foreground">Estimated Budget Breakdown</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="text-2xl mb-2">✈️</div>
                  <div className="text-sm font-medium text-foreground">Flights</div>
                  <div className="text-lg font-bold text-primary">$1,200</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="text-2xl mb-2">🏨</div>
                  <div className="text-sm font-medium text-foreground">Hotels</div>
                  <div className="text-lg font-bold text-primary">$800</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="text-2xl mb-2">🍽️</div>
                  <div className="text-sm font-medium text-foreground">Food</div>
                  <div className="text-lg font-bold text-primary">$400</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="text-2xl mb-2">🎯</div>
                  <div className="text-sm font-medium text-foreground">Activities</div>
                  <div className="text-lg font-bold text-primary">$300</div>
                </div>
              </div>
            </div>

            {/* Interactive Customization */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3 text-foreground">Want to customize your plan?</h3>
              <div className="flex gap-2">
                <Input
                  value={changeRequest}
                  onChange={(e) => setChangeRequest(e.target.value)}
                  placeholder="e.g., 'Add more adventure activities' or 'Find cheaper accommodations'"
                  className="flex-1"
                />
                <Button 
                  onClick={handleSubmitChanges}
                  className="bg-primary hover:bg-primary/90 text-white px-6"
                  disabled={!changeRequest.trim()}
                >
                  Update Plan
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4 border-t border-border">
              <Button onClick={handleDownloadPdf} variant="outline" size="sm" className="flex-1 border-primary/20 hover:bg-primary/5">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button onClick={onUpdatePlan} variant="outline" size="sm" className="flex-1 border-primary/20 hover:bg-primary/5">
                <Repeat className="h-4 w-4 mr-2" />
                Regenerate
              </Button>
            </div>
          </div>
        ) : message.isShoppingResponse ? (
          <div className="space-y-6 bg-background rounded-lg p-6 shadow-xl border border-border">
            <div className="bg-gradient-to-r from-primary to-primary/90 text-white p-6 rounded-lg -m-6 mb-6">
              <h2 className="text-2xl font-bold">PRODUCT RECOMMENDATIONS</h2>
              <p className="text-white/80">Curated just for you</p>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-3 text-foreground">Here are some suggestions for "{message.shoppingQuery}"</h3>
            </div>

            {/* Product Grid with Purple Theme */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border border-primary/20 rounded-lg p-4 bg-primary/5">
                <div className="h-32 bg-primary/10 rounded-lg mb-3 flex items-center justify-center">
                  <div className="text-4xl text-primary">🎧</div>
                </div>
                <h4 className="font-semibold text-lg text-foreground">Premium Wireless Headphones</h4>
                <p className="text-sm text-muted-foreground mb-3">Noise-cancelling over-ear headphones with 30-hour battery life</p>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-xl text-primary">$199.99</span>
                  <div className="flex items-center gap-1">
                    <span className="text-primary">★★★★★</span>
                    <span className="text-sm text-muted-foreground">4.8/5</span>
                  </div>
                </div>
                <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-white">
                  View Product
                </Button>
              </div>

              <div className="border border-primary/20 rounded-lg p-4 bg-primary/5">
                <div className="h-32 bg-primary/10 rounded-lg mb-3 flex items-center justify-center">
                  <div className="text-4xl text-primary">⌚</div>
                </div>
                <h4 className="font-semibold text-lg text-foreground">Smart Fitness Watch</h4>
                <p className="text-sm text-muted-foreground mb-3">Track your workouts, heart rate, and sleep patterns</p>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-xl text-primary">$249.50</span>
                  <div className="flex items-center gap-1">
                    <span className="text-primary">★★★★☆</span>
                    <span className="text-sm text-muted-foreground">4.6/5</span>
                  </div>
                </div>
                <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-white">
                  View Product
                </Button>
              </div>
            </div>

            {/* Enhanced Features Section */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-4 text-foreground">Why these recommendations?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="text-2xl mb-2">🎯</div>
                  <div className="text-sm font-medium text-primary">Best Match</div>
                  <div className="text-xs text-muted-foreground">Based on your preferences</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="text-2xl mb-2">💰</div>
                  <div className="text-sm font-medium text-primary">Great Value</div>
                  <div className="text-xs text-muted-foreground">Within your budget</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="text-2xl mb-2">⭐</div>
                  <div className="text-sm font-medium text-primary">Top Rated</div>
                  <div className="text-xs text-muted-foreground">Highly reviewed products</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4 border-t border-border">
              <Button onClick={handleRegenerateProducts} variant="outline" size="sm" className="flex-1 border-primary/20 hover:bg-primary/5">
                <RefreshCcw className="h-4 w-4 mr-2" />
                Regenerate
              </Button>
              <Button variant="outline" size="sm" className="flex-1 border-primary/20 hover:bg-primary/5">
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
