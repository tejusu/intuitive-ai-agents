
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BrainCircuit, FileText, ExternalLink, Download } from "lucide-react";
import { ResearchFormValues } from './ResearchAssistantForm';

interface ResearchResultsDisplayProps {
  topic: string;
  researchDetails: ResearchFormValues;
}

export function ResearchResultsDisplay({ topic, researchDetails }: ResearchResultsDisplayProps) {
  const sampleFindings = [
    {
      title: "Market Analysis Overview",
      summary: "Current market trends show significant growth in the sector with emerging opportunities.",
      source: "Industry Research Report 2024",
      type: "Market Data"
    },
    {
      title: "Technical Innovations",
      summary: "Latest technological developments are reshaping the landscape with new possibilities.",
      source: "Tech Innovation Journal",
      type: "Technology"
    },
    {
      title: "Future Projections",
      summary: "Expert predictions indicate continued expansion over the next 5-year period.",
      source: "Future Trends Analysis",
      type: "Forecast"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Research Overview */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <BrainCircuit className="h-6 w-6 text-purple-600" />
            Research Results: {topic}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-purple-600" />
              <span className="text-sm">{researchDetails.type}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{researchDetails.depth}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">{researchDetails.timeframe}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Research Findings */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Key Findings</h3>
        
        {sampleFindings.map((finding, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-semibold text-lg">{finding.title}</h4>
                <Badge className="bg-purple-600 text-white">{finding.type}</Badge>
              </div>
              
              <p className="text-muted-foreground mb-4">{finding.summary}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Source: {finding.source}</span>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
