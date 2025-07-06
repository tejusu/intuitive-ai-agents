
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign, 
  Download, 
  Map, 
  Edit, 
  ChevronDown,
  Plane,
  Hotel,
  Utensils,
  Camera,
  Clock,
  Star
} from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';

interface TravelItineraryViewProps {
  destination: string;
  date: Date;
  budget: string;
  travelers: number;
  preferences: string[];
  includeStay: boolean;
  onBackToChat: () => void;
}

export function TravelItineraryView({
  destination,
  date,
  budget,
  travelers,
  preferences,
  includeStay,
  onBackToChat
}: TravelItineraryViewProps) {
  const [openDays, setOpenDays] = useState<Record<number, boolean>>({ 1: true });

  const itinerary = [
    {
      day: 1,
      title: "Arrival & Local Exploration",
      activities: [
        { time: "10:00 AM", activity: "Arrive at destination", icon: Plane },
        { time: "12:00 PM", activity: "Check-in to hotel", icon: Hotel },
        { time: "2:00 PM", activity: "Local lunch experience", icon: Utensils },
        { time: "4:00 PM", activity: "City walking tour", icon: Camera },
        { time: "7:00 PM", activity: "Welcome dinner", icon: Utensils }
      ]
    },
    {
      day: 2,
      title: "Cultural & Heritage Tour",
      activities: [
        { time: "9:00 AM", activity: "Museum visit", icon: Camera },
        { time: "11:30 AM", activity: "Historic landmarks", icon: MapPin },
        { time: "1:00 PM", activity: "Traditional lunch", icon: Utensils },
        { time: "3:00 PM", activity: "Local market shopping", icon: Star },
        { time: "6:00 PM", activity: "Sunset viewpoint", icon: Camera }
      ]
    },
    {
      day: 3,
      title: "Adventure & Departure",
      activities: [
        { time: "8:00 AM", activity: "Adventure activity", icon: Star },
        { time: "12:00 PM", activity: "Farewell lunch", icon: Utensils },
        { time: "2:00 PM", activity: "Last-minute shopping", icon: Star },
        { time: "4:00 PM", activity: "Check-out & departure", icon: Plane }
      ]
    }
  ];

  const accommodations = [
    {
      name: "Grand Heritage Hotel",
      type: "4-star Hotel",
      price: "$120/night",
      rating: 4.5,
      image: "/lovable-uploads/239baafc-1c17-441e-bffa-c43e0db81aac.png"
    }
  ];

  const budgetBreakdown = [
    { category: "Accommodation", amount: 360, percentage: 40 },
    { category: "Food & Dining", amount: 270, percentage: 30 },
    { category: "Activities", amount: 180, percentage: 20 },
    { category: "Transportation", amount: 90, percentage: 10 }
  ];

  const totalBudget = budgetBreakdown.reduce((sum, item) => sum + item.amount, 0);

  const toggleDay = (day: number) => {
    setOpenDays(prev => ({ ...prev, [day]: !prev[day] }));
  };

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-b from-blue-50/30 to-white dark:from-blue-950/10 dark:to-background">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Button variant="ghost" onClick={onBackToChat} className="absolute left-6 top-6">
              ← Back to Chat
            </Button>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Your Travel Plan to {destination}
          </h1>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {format(date, 'MMM dd, yyyy')}
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {travelers} traveler{travelers > 1 ? 's' : ''}
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              {budget}
            </div>
          </div>
          
          <div className="flex justify-center gap-2">
            {preferences.map((pref) => (
              <Badge key={pref} variant="secondary">{pref}</Badge>
            ))}
          </div>
        </div>

        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="overflow-hidden">
            <div className="aspect-video relative">
              <img 
                src="/lovable-uploads/3e5579ad-76a1-49f7-87bd-c3d03033762a.png"
                alt={destination}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-semibold">{destination}</h3>
                <p className="text-sm opacity-90">Your dream destination awaits</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <Map className="h-12 w-12 mx-auto mb-2" />
                <p className="text-sm">Interactive map view</p>
                <p className="text-xs">Pinned locations</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Itinerary
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Map className="h-4 w-4" />
            View on Map
          </Button>
          <Button variant="outline" className="flex items-center gap-2" onClick={onBackToChat}>
            <Edit className="h-4 w-4" />
            Edit Plan
          </Button>
        </div>

        {/* Daily Itinerary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Daily Itinerary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {itinerary.map((day) => (
              <Collapsible key={day.day} open={openDays[day.day]} onOpenChange={() => toggleDay(day.day)}>
                <CollapsibleTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge className="bg-blue-600">Day {day.day}</Badge>
                          <h4 className="font-semibold">{day.title}</h4>
                        </div>
                        <ChevronDown className={`h-4 w-4 transition-transform ${openDays[day.day] ? 'rotate-180' : ''}`} />
                      </div>
                    </CardContent>
                  </Card>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="mt-2">
                  <Card className="ml-4">
                    <CardContent className="p-4 space-y-3">
                      {day.activities.map((activity, index) => (
                        <div key={index} className="flex items-center gap-3 text-sm">
                          <div className="flex items-center gap-2 w-20 text-gray-500">
                            <Clock className="h-3 w-3" />
                            {activity.time}
                          </div>
                          <activity.icon className="h-4 w-4 text-blue-600" />
                          <span>{activity.activity}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </CardContent>
        </Card>

        {/* Accommodation */}
        {includeStay && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hotel className="h-5 w-5" />
                Accommodation
              </CardTitle>
            </CardHeader>
            <CardContent>
              {accommodations.map((hotel, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img 
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <h4 className="font-semibold text-lg mb-2">{hotel.name}</h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">{hotel.type}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < Math.floor(hotel.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{hotel.rating}</span>
                      </div>
                      <p className="text-lg font-semibold text-blue-600">{hotel.price}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Budget Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Budget Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {budgetBreakdown.map((item) => (
                  <div key={item.category} className="flex justify-between items-center">
                    <span className="text-sm">{item.category}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded-full" 
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold w-16 text-right">${item.amount}</span>
                    </div>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between items-center font-semibold">
                  <span>Total Budget</span>
                  <span className="text-lg text-blue-600">${totalBudget}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">${totalBudget}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Total estimated cost</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">For {travelers} traveler{travelers > 1 ? 's' : ''}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Travel Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Travel Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Best Time to Visit</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {format(date, 'MMMM')} is a great time to visit {destination} with pleasant weather and fewer crowds.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Local Currency</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Make sure to have local currency for small purchases and tips.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Transportation</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Local taxis and public transport are readily available and affordable.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">What to Pack</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Comfortable walking shoes, light clothing, and don't forget your camera!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
