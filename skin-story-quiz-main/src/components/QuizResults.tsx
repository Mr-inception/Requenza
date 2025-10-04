import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Target, Clock, Shield } from "lucide-react";
import logo2 from "@/assets/logo2.svg";

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
    <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:py-16 relative">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-primary/20">
        <div className="flex items-center justify-center px-4 py-4">
          <img src={logo2} alt="Logo" className="h-12 w-auto" />
        </div>
      </div>

      <div className="max-w-4xl lg:max-w-5xl xl:max-w-6xl w-full space-y-6 sm:space-y-8 lg:space-y-10 animate-slide-in pt-20">
        {/* Header */}
        <Card className="p-4 sm:p-6 md:p-8 lg:p-10 text-center">
          <div className="space-y-3 sm:space-y-4 lg:space-y-6">
            {/* <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary" />
            </div> */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold">Your Personalized Self-Care Plan</h1>
            <p className="text-foreground text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
              Based on your responses, we've created a customized skincare routine just for you.
            </p>
            
            {/* Profile Summary */}
            <div className="flex justify-center gap-2 sm:gap-3 lg:gap-4 flex-wrap mt-4 sm:mt-6 lg:mt-8">
              <Badge variant="secondary" className="text-sm sm:text-base lg:text-lg px-3 py-1 sm:px-4 sm:py-2">
                {results.skinType.charAt(0).toUpperCase() + results.skinType.slice(1)} Skin
              </Badge>
              {results.primaryConcerns.slice(0, 2).map((concern) => (
                <Badge key={concern} variant="outline" className="text-sm sm:text-base lg:text-lg px-3 py-1 sm:px-4 sm:py-2">
                  {concern.charAt(0).toUpperCase() + concern.slice(1)}
                </Badge>
              ))}
              <Badge variant="secondary" className="text-sm sm:text-base lg:text-lg px-3 py-1 sm:px-4 sm:py-2">
                {results.routineComplexity.charAt(0).toUpperCase() + results.routineComplexity.slice(1)} Routine
              </Badge>
            </div>
          </div>
        </Card>

        {/* Photos Section */}
        {photos && photos.front && photos.side ? (
          <Card className="p-4 sm:p-6 lg:p-8">
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-center border-b border-gray-300 pb-2 sm:pb-3">Your Photos</h3>
              <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                <div className="space-y-2 sm:space-y-3">
                  <h4 className="font-medium text-center text-sm sm:text-base lg:text-lg">Front View</h4>
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
                <div className="space-y-2 sm:space-y-3">
                  <h4 className="font-medium text-center text-sm sm:text-base lg:text-lg">Side View</h4>
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
              <p className="text-xs sm:text-sm lg:text-base text-muted-foreground text-center max-w-2xl mx-auto">
                These photos help us provide more personalized recommendations based on your skin analysis.
              </p>
            </div>
          </Card>
        ) : (
          <Card className="p-4 sm:p-6 lg:p-8">
            <div className="text-center space-y-4 sm:space-y-6">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold">Photos Not Available</h3>
              <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">
                Photos were not captured or are not available for display.
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Debug info: photos = {JSON.stringify(photos)}
              </p>
            </div>
          </Card>
        )}

        {/* Recommendations */}
        <div className="grid gap-4 sm:gap-6 lg:gap-8 md:grid-cols-2">
          {results.recommendations.map((rec, index) => (
            <Card key={index} className="p-4 sm:p-6 lg:p-8 space-y-3 sm:space-y-4 lg:space-y-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2 sm:space-y-3 flex-1">
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <Badge variant="outline" className="text-xs sm:text-sm lg:text-base">
                      {rec.category}
                    </Badge>
                    <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      {rec.frequency}
                    </div>
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg lg:text-xl">{rec.product}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm lg:text-base">{rec.reason}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-primary">
                <Target className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Recommended for your skin profile</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <Card className="p-4 sm:p-6 lg:p-8">
          <div className="text-center space-y-3 sm:space-y-4 lg:space-y-6">
            <h3 className="font-semibold text-base sm:text-lg lg:text-xl">Ready to start your journey?</h3>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
              Save your personalized routine and track your progress over time.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center items-center">
              <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary-glow text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Save My Routine
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5" onClick={onRestart}>
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