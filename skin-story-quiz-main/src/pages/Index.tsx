import { useState } from "react";
import QuizLanding from "@/components/QuizLanding";
import QuizQuestion from "@/components/QuizQuestion";
import CameraCapture from "@/components/CameraCapture";
import QuizResults from "@/components/QuizResults";
import { questions } from "@/data/questions";
import { useToast } from "@/hooks/use-toast";

type QuizStep = "landing" | "quiz" | "camera" | "results";

const Index = () => {
  const [step, setStep] = useState<QuizStep>("landing");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [photos, setPhotos] = useState<{ front: string; side: string } | null>(null);
  const { toast } = useToast();

  const handleStart = () => {
    setStep("quiz");
    setCurrentQuestionIndex(0);
    setAnswers({});
    setPhotos(null);
  };

  const handleAnswerChange = (questionId: string, selectedAnswers: string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: selectedAnswers
    }));
  };

  const handleNext = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswers = answers[currentQuestion.id] || [];
    
    if (currentAnswers.length === 0) {
      toast({
        title: "Please select an answer",
        description: "Choose at least one option to continue.",
        variant: "destructive"
      });
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setStep("camera");
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setStep("landing");
    setCurrentQuestionIndex(0);
    setAnswers({});
    setPhotos(null);
  };

  const handleCameraComplete = (capturedPhotos: { front: string; side: string }) => {
    console.log("Index - received photos:", capturedPhotos);
    setPhotos(capturedPhotos);
    setStep("results");
  };

  const handleCameraBack = () => {
    setStep("quiz");
    setCurrentQuestionIndex(questions.length - 1);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswers = answers[currentQuestion?.id] || [];
  const canGoNext = currentAnswers.length > 0;

  if (step === "landing") {
    return <QuizLanding onStart={handleStart} />;
  }

  if (step === "quiz") {
    return (
      <QuizQuestion
        question={currentQuestion}
        currentQuestion={currentQuestionIndex}
        totalQuestions={questions.length}
        selectedAnswers={currentAnswers}
        onAnswerChange={(selectedAnswers) => handleAnswerChange(currentQuestion.id, selectedAnswers)}
        onNext={handleNext}
        onPrevious={handlePrevious}
        canGoNext={canGoNext}
      />
    );
  }

  if (step === "camera") {
    return (
      <CameraCapture
        onComplete={handleCameraComplete}
        onBack={handleCameraBack}
      />
    );
  }

  return <QuizResults answers={answers} photos={photos} onRestart={handleRestart} />;
};

export default Index;
