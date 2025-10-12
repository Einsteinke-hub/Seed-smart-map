import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, TreeDeciduous } from "lucide-react";
import { toast } from "sonner";

interface SpeciesRecommendationsProps {
  drawnArea: any;
}

const SpeciesRecommendations = ({ drawnArea }: SpeciesRecommendationsProps) => {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  const getRecommendations = async () => {
    if (!drawnArea) {
      toast.error("Please draw a project area on the map first");
      return;
    }

    setLoading(true);
    
    // Simulated AI recommendations - will be replaced with real AI integration
    setTimeout(() => {
      const mockRecommendations = [
        {
          species: "Quercus robur (English Oak)",
          suitability: 95,
          priority: "high",
          reason: "Excellent soil compatibility, native species, high biodiversity value",
          density: "400-600 trees/hectare",
          survival: "85-90%",
        },
        {
          species: "Fraxinus excelsior (European Ash)",
          suitability: 88,
          priority: "high",
          reason: "Good climate match, erosion control, fast-growing",
          density: "300-500 trees/hectare",
          survival: "80-85%",
        },
        {
          species: "Betula pendula (Silver Birch)",
          suitability: 82,
          priority: "medium",
          reason: "Pioneer species, soil improvement, moderate water needs",
          density: "500-800 trees/hectare",
          survival: "75-80%",
        },
        {
          species: "Acer pseudoplatanus (Sycamore)",
          suitability: 78,
          priority: "medium",
          reason: "Shade tolerant, good for mixed plantings",
          density: "350-450 trees/hectare",
          survival: "70-80%",
        },
      ];

      setRecommendations(mockRecommendations);
      setLoading(false);
      toast.success("AI recommendations generated!");
    }, 2000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-accent text-accent-foreground";
      case "medium":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getSuitabilityColor = (score: number) => {
    if (score >= 90) return "text-accent";
    if (score >= 75) return "text-primary";
    return "text-secondary";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TreeDeciduous className="w-5 h-5" />
            AI Species Recommendations
          </CardTitle>
          <CardDescription>
            Get intelligent native tree species recommendations based on your project area
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={getRecommendations}
            disabled={loading || !drawnArea}
            className="w-full sm:w-auto flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing Area...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate AI Recommendations
              </>
            )}
          </Button>

          {!drawnArea && (
            <p className="mt-4 text-sm text-muted-foreground">
              Please draw a project area on the map to get species recommendations
            </p>
          )}
        </CardContent>
      </Card>

      {recommendations.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Recommended Species for Your Project Area
          </h3>
          
          {recommendations.map((rec, index) => (
            <Card key={index} className="border-2 hover:shadow-[var(--shadow-elevated)] transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{rec.species}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getPriorityColor(rec.priority)}>
                        {rec.priority.toUpperCase()} PRIORITY
                      </Badge>
                      <span className={`text-2xl font-bold ${getSuitabilityColor(rec.suitability)}`}>
                        {rec.suitability}%
                      </span>
                      <span className="text-sm text-muted-foreground">suitability</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Analysis</p>
                  <p className="text-sm text-muted-foreground">{rec.reason}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">Planting Density</p>
                    <p className="text-sm font-semibold text-foreground">{rec.density}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">Survival Rate</p>
                    <p className="text-sm font-semibold text-foreground">{rec.survival}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpeciesRecommendations;
