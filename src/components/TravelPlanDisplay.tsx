
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, DollarSign, Plane, Camera, Download } from "lucide-react";
import { TravelPlanFormValues } from "./TravelPlannerForm";

interface TravelPlanDisplayProps {
  planDetails: TravelPlanFormValues;
}

export function TravelPlanDisplay({ planDetails }: TravelPlanDisplayProps) {
  const sampleItinerary = [
    {
      day: 1,
      title: "Arrival & Beach Exploration",
      activities: ["Check-in to hotel", "Visit Calangute Beach", "Sunset at Anjuna Beach"],
      image: "/lovable-uploads/239baafc-1c17-441e-bffa-c43e0db81aac.png"
    },
    {
      day: 2,
      title: "Cultural Heritage Tour",
      activities: ["Old Goa Churches", "Spice Plantation Visit", "Local Market Shopping"],
      image: "/lovable-uploads/3e5579ad-76a1-49f7-87bd-c3d03033762a.png"
    },
    {
      day: 3,
      title: "Adventure & Departure",
      activities: ["Water Sports at Baga Beach", "Fort Aguada", "Departure"],
      image: "/lovable-uploads/b6cb5982-1616-40c9-a63f-51dbc930c3fe.png"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Trip Overview */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Plane className="h-6 w-6 text-primary" />
            Your {planDetails.days}-Day {planDetails.destination} Adventure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm">{planDetails.destination}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-sm">{planDetails.days} days</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm">{planDetails.travelers} traveler(s)</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <span className="text-sm">{planDetails.budget}</span>
            </div>
          </div>
          <div className="mt-4">
            <Badge variant="secondary" className="mr-2">{planDetails.style}</Badge>
            <Badge variant="outline">{planDetails.interests}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Daily Itinerary */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Daily Itinerary</h3>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Plan
          </Button>
        </div>
        
        {sampleItinerary.slice(0, planDetails.days).map((day) => (
          <Card key={day.day} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img 
                  src={day.image} 
                  alt={day.title}
                  className="w-full h-48 md:h-full object-cover"
                />
              </div>
              <div className="md:w-2/3 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-primary text-primary-foreground">Day {day.day}</Badge>
                  <h4 className="font-semibold text-lg">{day.title}</h4>
                </div>
                <ul className="space-y-2">
                  {day.activities.map((activity, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-2 w-2 bg-primary rounded-full" />
                      {activity}
                    </li>
                  ))}
                </ul>
                <Button variant="ghost" size="sm" className="mt-4">
                  <Camera className="h-4 w-4 mr-2" />
                  View Photos
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
