import { useState } from "react";
import { Button } from "@/components/ui/button";
import heroPortrait from "@/assets/hero-portrait.jpg";
import logo2 from "@/assets/logo2.2f3ded95.svg";

interface QuizLandingProps {
  onStart: () => void;
}

const QuizLanding = ({ onStart }: QuizLandingProps) => {
  const [isStarting, setIsStarting] = useState(false);

  const handleStart = () => {
    setIsStarting(true);
    setTimeout(onStart, 300);
  };

  return (
    <div className="w-full min-h-screen relative bg-cream">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-primary/20">
        <div className="flex items-center justify-center px-4 py-4">
          <img src={logo2} alt="Logo" className="h-10 w-auto" />
        </div>
      </div>

      

      {/* Main Content */}
      <div className="w-full min-h-screen flex flex-col items-center justify-center px-4 py-8 md:px-6 md:py-12 text-center space-y-8 md:space-y-12 animate-slide-in pb-24 md:pb-32 pt-20">
        
        {/* Hero Portrait */}
        <div className="relative w-full h-[50vh] md:h-auto md:aspect-square md:max-w-md md:mx-auto md:mt-12">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-primary-glow/20 animate-pulse-slow"></div>
          <img
            src={heroPortrait}
            alt="Beauty care consultation"
            className="relative w-full h-full object-cover rounded-3xl shadow-lg"
          />
        </div>

        {/* Headline */}
        <div className="space-y-4 md:space-y-6 max-w-3xl mx-auto px-2">
          <h1 className="text-3xl md:text-5xl lg:text-6xl leading-tight font-display">
            <span className="font-semibold text-foreground tracking-tight block">
              Get your custom plan
            </span>
            <span className="font-medium text-foreground/80 block mt-2 text-2xl md:text-4xl lg:text-4xl font-inter">
              with personalized beauty analysis
            </span>
          </h1>
          
          <p className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed font-inter">
            Answer a few questions about your skin, lifestyle, and goals to receive 
            a personalized beauty care routine.
          </p>
        </div>

        {/* Terms - Uncomment when needed */}
        {/* <div className="text-xs md:text-sm text-muted-foreground max-w-2xl mx-auto px-4 space-y-2">
          <p>By continuing you agree to our</p>
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <a href="#" className="text-primary hover:underline">Terms of Service</a>
            <span className="opacity-60">|</span>
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>
            <span className="opacity-60">|</span>
            <a href="#" className="text-primary hover:underline">Subscription</a>
            <span className="opacity-60">|</span>
            <a href="#" className="text-primary hover:underline">Cookies</a>
          </div>
        </div> */}
        
      </div>

      {/* Fixed CTA Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 bg-cream/95 backdrop-blur-sm border-t border-primary/20">
        <Button
          size="lg"
          className="w-full max-w-md mx-auto text-base md:text-lg py-6 md:py-7 font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 shadow-lg hover:shadow-xl"
          onClick={handleStart}
          disabled={isStarting}
        >
          {isStarting ? "Starting..." : "Continue"}
        </Button>
      </div>
    </div>
  );
};

export default QuizLanding;