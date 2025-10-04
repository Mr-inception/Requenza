import { useState } from "react";
import { Button } from "@/components/ui/button";
import heroPortrait from "@/assets/hero-portrait.jpg";

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
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:py-16 text-center space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 animate-slide-in">
      {/* Hero Portrait */}
      <div className="relative mx-auto w-[80vw] max-w-[400px] aspect-square md:w-64 lg:w-72">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-primary-glow/20 animate-pulse-slow"></div>
        <img
          src={heroPortrait}
          alt="Beauty care consultation"
          className="relative w-full h-full object-cover rounded-3xl shadow-lg"
        />
      </div>

      {/* Headline */}
      <div className="space-y-4 sm:space-y-5 lg:space-y-6 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight font-display">
          <span className="font-semibold text-foreground tracking-tight block">Get your custom plan</span>
          <span className="font-medium text-foreground/80 block mt-2">with personalized beauty analysis</span>
        </h1>
        
        <p className="text-muted-foreground text-lg sm:text-xl lg:text-2xl max-w-2xl mx-auto leading-relaxed">
          Answer a few questions about your skin, lifestyle, and goals to receive 
          a personalized beauty care routine.
        </p>
      </div>

      {/* CTA Button */}
      <div className="w-full max-w-sm sm:max-w-md">
        <Button
          size="lg"
          className="w-full text-lg sm:text-xl lg:text-2xl py-6 sm:py-8 lg:py-10 font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 shadow-lg hover:shadow-xl"
          onClick={handleStart}
          disabled={isStarting}
        >
          {isStarting ? "Starting..." : "Continue"}
        </Button>
      </div>

      {/* Terms */}
      <div className="text-xs sm:text-sm lg:text-base text-muted-foreground flex flex-wrap items-center justify-center gap-1 sm:gap-2 lg:gap-3 max-w-4xl mx-auto px-4">
        <span>By continuing you agree to our</span>
        <a href="#" className="text-primary hover:underline">Terms of Service</a>
        <span className="opacity-60">|</span>
        <a href="#" className="text-primary hover:underline">Privacy Policy</a>
        <span className="hidden sm:inline opacity-60">|</span>
        <a href="#" className="hidden sm:inline text-primary hover:underline">Subscription Policy</a>
        <span className="hidden sm:inline opacity-60">|</span>
        <a href="#" className="hidden sm:inline text-primary hover:underline">Cookie Policy</a>
      </div>
    </div>
  );
};

export default QuizLanding;