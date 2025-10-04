import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
    <div className="w-full min-h-screen flex items-center justify-center px-4 py-6 sm:px-6 sm:py-12 lg:py-16">
      <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl max-h-full p-6 sm:p-8 md:p-10 lg:p-12 text-center space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 animate-slide-in">
        {/* Hero Portrait */}
        <div className="relative mx-auto w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 aspect-square">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-primary-glow/20 animate-pulse-slow"></div>
          <img
            src={heroPortrait}
            alt="Beauty care consultation"
            className="relative w-full h-full object-cover rounded-3xl shadow-lg"
          />
        </div>

        {/* Headline */}
        <div className="space-y-3 sm:space-y-4 lg:space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
            <span className="font-display font-semibold text-foreground tracking-tight">Get your custom plan</span>
            <br />
            <span className="font-medium text-foreground/80">with personalized beauty analysis</span>
          </h1>
          
          <p className="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-md sm:max-w-lg lg:max-w-xl mx-auto">
            Answer a few questions about your skin, lifestyle, and goals to receive 
            a personalized beauty care routine.
          </p>
        </div>

        {/* CTA Button */}
        <Button
          size="lg"
          className="w-full text-base sm:text-lg lg:text-xl py-4 sm:py-6 lg:py-8 font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300"
          onClick={handleStart}
          disabled={isStarting}
        >
          {isStarting ? "Starting..." : "Continue"}
        </Button>

        {/* Terms */}
        <div className="text-[11px] sm:text-xs lg:text-sm text-muted-foreground flex flex-wrap items-center justify-center gap-1 sm:gap-2 lg:gap-3">
          <span>By continuing you agree to our</span>
          <a href="#" className="text-primary hover:underline">Terms of Service</a>
          <span className="opacity-60">|</span>
          <a href="#" className="text-primary hover:underline">Privacy Policy</a>
          <span className="hidden sm:inline opacity-60">|</span>
          <a href="#" className="hidden sm:inline text-primary hover:underline">Subscription Policy</a>
          <span className="hidden sm:inline opacity-60">|</span>
          <a href="#" className="hidden sm:inline text-primary hover:underline">Cookie Policy</a>
        </div>
      </Card>
    </div>
  );
};

export default QuizLanding;