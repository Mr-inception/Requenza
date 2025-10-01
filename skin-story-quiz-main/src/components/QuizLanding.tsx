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
    <div className="max-w-7xl mx-auto flex items-center justify-center px-6 py-12">
      <Card className="max-w-md w-full p-8 text-center space-y-8 animate-slide-in">
        {/* Hero Portrait */}
        <div className="relative mx-auto w-48 h-48">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-primary-glow/20 animate-pulse-slow"></div>
          <img
            src={heroPortrait}
            alt="Beauty care consultation"
            className="relative w-full h-full object-cover rounded-3xl shadow-lg"
          />
        </div>

        {/* Headline */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold leading-tight">
            <span className="text-primary">Get your custom plan</span>
            <br />
            <span className="text-foreground">with personalized beauty analysis</span>
          </h1>
          
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Answer a few questions about your skin, lifestyle, and goals to receive 
            a personalized beauty care routine.
          </p>
        </div>

        {/* CTA Button */}
        <Button
          size="lg"
          className="w-full text-lg py-6 font-semibold bg-primary hover:bg-primary-glow transition-all duration-300 animate-glow"
          onClick={handleStart}
          disabled={isStarting}
        >
          {isStarting ? "Starting..." : "Continue"}
        </Button>

        {/* Terms */}
        {/* <div className="text-xs text-muted-foreground space-x-2">
          <span>By continuing you agree to our</span>
          <a href="#" className="text-primary hover:underline">Terms of Service</a>
          <span>|</span>
          <a href="#" className="text-primary hover:underline">Privacy Policy</a>
        </div> */}
      </Card>
    </div>
  );
};

export default QuizLanding;