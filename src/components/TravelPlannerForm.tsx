
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, DollarSign, MapPin, Plane, Users } from "lucide-react";

const formSchema = z.object({
  destination: z.string().min(2, { message: "Destination must be at least 2 characters." }),
  days: z.coerce.number().min(1, { message: "Must be at least 1 day." }),
  travelers: z.string(),
  budget: z.string(),
  interests: z.string().min(5, { message: "Please tell us your interests." }),
  style: z.string(),
});

export type TravelPlanFormValues = z.infer<typeof formSchema>;

interface TravelPlannerFormProps {
  onSubmit: (values: TravelPlanFormValues) => void;
  initialValues?: TravelPlanFormValues;
}

export function TravelPlannerForm({ onSubmit, initialValues }: TravelPlannerFormProps) {
  const form = useForm<TravelPlanFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      destination: "",
      days: 3,
      travelers: "1",
      budget: "Mid-range",
      interests: "",
      style: "Balanced",
    },
  });

  return (
    <div className="w-full max-w-4xl mx-auto p-6 sm:p-8 border rounded-lg bg-card animate-fade-in">
        <div className="flex items-center gap-4 mb-6">
             <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center ring-4 ring-primary/5">
                <Plane className="w-6 h-6 text-primary" />
             </div>
             <div>
                <h2 className="text-xl font-semibold">I'd love to help you plan your trip!</h2>
                <p className="text-muted-foreground">Please provide some details:</p>
             </div>
        </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Destination</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Goa, India" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="days"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> Number of Days</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="travelers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" /> Number of Travelers</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of travelers" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1 person</SelectItem>
                      <SelectItem value="2">2 people</SelectItem>
                      <SelectItem value="3">3 people</SelectItem>
                      <SelectItem value="4">4 people</SelectItem>
                      <SelectItem value="5+">5+ people</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2"><DollarSign className="h-4 w-4 text-primary" /> Budget Range</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Budget-friendly">Budget-friendly</SelectItem>
                      <SelectItem value="Mid-range">Mid-range</SelectItem>
                      <SelectItem value="Luxury">Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="interests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interests & Preferences</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., beaches, adventure, culture, food, nightlife, history"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
              control={form.control}
              name="style"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Travel Style</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select travel style" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Relaxing">Relaxing</SelectItem>
                      <SelectItem value="Adventurous">Adventurous</SelectItem>
                      <SelectItem value="Cultural">Cultural</SelectItem>
                       <SelectItem value="Balanced">Balanced</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          <Button type="submit" className="w-full text-lg py-6 bg-primary hover:bg-primary/90">
            Generate My Travel Plan
            <Plane className="ml-2 h-5 w-5" />
          </Button>
        </form>
      </Form>
    </div>
  );
}
