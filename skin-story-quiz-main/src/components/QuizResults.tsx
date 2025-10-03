import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Target, Clock, Shield } from "lucide-react";

interface QuizResultsProps {
  answers: Record<string, string[]>;
  photos: { front: string; side: string } | null;
  onRestart: () => void;
}

const QuizResults = ({ answers, photos, onRestart }: QuizResultsProps) => {
  
  console.log("QuizResults - photos:", photos);
  
  // Generate personalized recommendations based on answers
  const generateRecommendations = () => {
    const skinType = answers['skin-type']?.[0] || 'normal';
    const concerns = answers['skin-concerns'] || [];
    const routine = answers['routine-time']?.[0] || 'moderate';
    
    return {
      skinType: skinType,
      primaryConcerns: concerns,
      routineComplexity: routine,
      recommendations: [
        {
          category: "Cleanser",
          product: `Gentle ${skinType === 'oily' ? 'Foaming' : skinType === 'dry' ? 'Cream' : 'Gel'} Cleanser`,
          reason: `Perfect for ${skinType} skin to maintain balance`,
          frequency: "Twice daily"
        },
        {
          category: "Treatment",
          product: concerns.includes('acne') ? 'Salicylic Acid Serum' : 
                  concerns.includes('aging') ? 'Retinol Serum' : 
                  'Vitamin C Serum',
          reason: `Targets your main concern: ${concerns[0] || 'overall skin health'}`,
          frequency: routine === 'minimal' ? '3x per week' : 'Daily (evening)'
        },
        {
          category: "Moisturizer",
          product: `${skinType === 'oily' ? 'Lightweight Gel' : skinType === 'dry' ? 'Rich Cream' : 'Daily'} Moisturizer`,
          reason: `Hydrates without overwhelming ${skinType} skin`,
          frequency: "Twice daily"
        },
        {
          category: "Sun Protection",
          product: "Broad Spectrum SPF 30+",
          reason: "Essential for preventing premature aging and protecting skin",
          frequency: "Every morning"
        }
      ]
    };
  };

  const results = generateRecommendations();

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl w-full space-y-8 animate-slide-in">
        {/* Header */}
        <Card className="p-8 text-center">
          <div className="space-y-4">
            {/* <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary" />
            </div> */}
            <h1 className="text-3xl font-bold">Your Personalized Self-Care Plan</h1>
            <p className="text-foreground text-lg">
              Based on your responses, we've created a customized skincare routine just for you.
            </p>
            
            {/* Profile Summary */}
            <div className="flex justify-center gap-2 flex-wrap mt-6">
              <Badge variant="secondary" className="text-sm">
                {results.skinType.charAt(0).toUpperCase() + results.skinType.slice(1)} Skin
              </Badge>
              {results.primaryConcerns.slice(0, 2).map((concern) => (
                <Badge key={concern} variant="outline" className="text-sm">
                  {concern.charAt(0).toUpperCase() + concern.slice(1)}
                </Badge>
              ))}
              <Badge variant="secondary" className="text-sm">
                {results.routineComplexity.charAt(0).toUpperCase() + results.routineComplexity.slice(1)} Routine
              </Badge>
            </div>
          </div>
        </Card>

        {/* Photos Section */}
        {photos && photos.front && photos.side ? (
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-center border-b border-gray-300 pb-2 ">Your Photos</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium text-center">Front View</h4>
                  <div className="relative bg-slate-800 rounded-lg overflow-hidden aspect-video">
                    <img
                      src={photos.front}
                      alt="Front view"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error("Error loading front photo:", e);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-center">Side View</h4>
                  <div className="relative bg-slate-800 rounded-lg overflow-hidden aspect-video">
                    <img
                      src={photos.side}
                      alt="Side view"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error("Error loading side photo:", e);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                These photos help us provide more personalized recommendations based on your skin analysis.
              </p>
            </div>
          </Card>
        ) : (
          <Card className="p-6">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold">Photos Not Available</h3>
              <p className="text-muted-foreground">
                Photos were not captured or are not available for display.
              </p>
              <p className="text-sm text-muted-foreground">
                Debug info: photos = {JSON.stringify(photos)}
              </p>
            </div>
          </Card>
        )}

        {/* Recommendations */}
        <div className="grid gap-6 md:grid-cols-2">
          {results.recommendations.map((rec, index) => (
            <Card key={index} className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {rec.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {rec.frequency}
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg">{rec.product}</h3>
                  <p className="text-muted-foreground text-sm">{rec.reason}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-primary">
                <Target className="w-3 h-3" />
                <span>Recommended for your skin profile</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <Card className="p-6">
          <div className="text-center space-y-4">
            <h3 className="font-semibold text-lg">Ready to start your journey?</h3>
            <p className="text-muted-foreground">
              Save your personalized routine and track your progress over time.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="bg-primary hover:bg-primary-glow">
                <Shield className="w-4 h-4 mr-2" />
                Save My Routine
              </Button>
              <Button variant="outline" size="lg" onClick={onRestart}>
                Retake Quiz
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default QuizResults;