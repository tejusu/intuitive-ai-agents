
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
import { Search, BookOpen, Target } from "lucide-react";

const formSchema = z.object({
  topic: z.string().min(2, { message: "Please enter a research topic." }),
  researchType: z.string(),
  researchDepth: z.string(),
  focusArea: z.string(),
  timeframe: z.string(),
  specificQuestions: z.string(),
});

export type ResearchFormValues = z.infer<typeof formSchema>;

interface ResearchAssistantFormProps {
  onSubmit: (values: ResearchFormValues) => void;
  initialValues?: ResearchFormValues;
}

export function ResearchAssistantForm({ onSubmit, initialValues }: ResearchAssistantFormProps) {
  const form = useForm<ResearchFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      topic: "",
      researchType: "",
      researchDepth: "",
      focusArea: "",
      timeframe: "",
      specificQuestions: "",
    },
  });

  return (
    <div className="w-full max-w-4xl mx-auto p-6 sm:p-8 border rounded-lg bg-card animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-shrink-0 w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center ring-4 ring-purple-500/5">
          <BookOpen className="w-6 h-6 text-purple-500" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">I'll help you research that topic! Please provide some details:</h2>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-purple-500" /> 
                  Research Topic
                </FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 'Artificial Intelligence trends', 'Climate change impact'" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="researchType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Research Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select research type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="academic">Academic Research</SelectItem>
                      <SelectItem value="market">Market Research</SelectItem>
                      <SelectItem value="competitive">Competitive Analysis</SelectItem>
                      <SelectItem value="trend">Trend Analysis</SelectItem>
                      <SelectItem value="technical">Technical Research</SelectItem>
                      <SelectItem value="general">General Information</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="researchDepth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Research Depth</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select depth level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="overview">High-level Overview</SelectItem>
                      <SelectItem value="detailed">Detailed Analysis</SelectItem>
                      <SelectItem value="comprehensive">Comprehensive Study</SelectItem>
                      <SelectItem value="deep-dive">Deep Dive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="focusArea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-purple-500" /> 
                    Focus Area (optional)
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 'business impact', 'technical aspects'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="timeframe"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Timeframe</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeframe" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="current">Current/Recent</SelectItem>
                      <SelectItem value="past-year">Past Year</SelectItem>
                      <SelectItem value="past-5-years">Past 5 Years</SelectItem>
                      <SelectItem value="historical">Historical</SelectItem>
                      <SelectItem value="future">Future Trends</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="specificQuestions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specific Questions (optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any specific questions you want answered or areas you want to focus on..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full text-lg py-6 bg-purple-600 hover:bg-purple-700">
            Start Research
            <Search className="ml-2 h-5 w-5" />
          </Button>
        </form>
      </Form>
    </div>
  );
}
