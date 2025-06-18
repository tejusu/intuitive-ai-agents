
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
import { ShoppingCart, Search, DollarSign } from "lucide-react";

const formSchema = z.object({
  query: z.string().min(2, { message: "Please describe what you're looking for." }),
  category: z.string(),
  budget: z.string(),
  preferences: z.string(),
});

export type ShoppingFormValues = z.infer<typeof formSchema>;

interface ShoppingAssistantFormProps {
  onSubmit: (values: ShoppingFormValues) => void;
  initialValues?: ShoppingFormValues;
}

export function ShoppingAssistantForm({ onSubmit, initialValues }: ShoppingAssistantFormProps) {
  const form = useForm<ShoppingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      query: "",
      category: "",
      budget: "",
      preferences: "",
    },
  });

  return (
    <div className="w-full max-w-4xl mx-auto p-6 sm:p-8 border rounded-lg bg-card animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-shrink-0 w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center ring-4 ring-blue-500/5">
          <ShoppingCart className="w-6 h-6 text-blue-500" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Great! To help me find the perfect items, please provide some details:</h2>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-blue-500" /> 
                  What are you looking for?
                </FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 'running shoes', 'laptop for coding'" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="clothing">Clothing & Fashion</SelectItem>
                      <SelectItem value="home">Home & Garden</SelectItem>
                      <SelectItem value="sports">Sports & Outdoors</SelectItem>
                      <SelectItem value="books">Books & Media</SelectItem>
                      <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
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
                  <FormLabel className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-blue-500" /> 
                    What's your budget?
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. $50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="preferences"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Any other preferences?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g. 'lightweight', 'noise-cancelling'"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full text-lg py-6 bg-blue-600 hover:bg-blue-700">
            Find Products
            <Search className="ml-2 h-5 w-5" />
          </Button>
        </form>
      </Form>
    </div>
  );
}
