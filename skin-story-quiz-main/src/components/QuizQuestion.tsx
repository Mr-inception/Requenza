import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import logo2 from "@/assets/logo2.svg";

export interface Question {
  id: string;
  title: string;
  subtitle?: string;
  type: 'single' | 'multiple';
  options: {
    id: string;
    label: string;
    description?: string;
  }[];
}

interface QuizQuestionProps {
  question: Question;
  currentQuestion: number;
  totalQuestions: number;
  selectedAnswers: string[];
  onAnswerChange: (answers: string[]) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
}

const QuizQuestion = ({
  question,
  currentQuestion,
  totalQuestions,
  selectedAnswers,
  onAnswerChange,
  onNext,
  onPrevious,
  canGoNext
}: QuizQuestionProps) => {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleSingleSelect = (value: string) => {
    onAnswerChange([value]);
  };

  const handleMultipleSelect = (optionId: string, checked: boolean) => {
    if (checked) {
      onAnswerChange([...selectedAnswers, optionId]);
    } else {
      onAnswerChange(selectedAnswers.filter(id => id !== optionId));
    }
  };

  return (
    <div className="min-h-screen w-full bg-cream text-foreground relative">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-primary/20">
        <div className="flex items-center justify-between px-4 py-4">
          <button
            onClick={onPrevious}
            disabled={currentQuestion === 0}
            className="p-2 text-foreground hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <img src={logo2} alt="Logo" className="h-12 w-auto" />
          <div className="w-10"></div> {/* Spacer for balance */}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full min-h-screen flex flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12 space-y-6 sm:space-y-8 lg:space-y-10 animate-slide-in pb-24 sm:pb-28 lg:pb-32 pt-20">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm sm:text-base text-muted-foreground">
            <span>Question {currentQuestion + 1} of {totalQuestions}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2 sm:h-3" />
        </div>

        {/* Question */}
        <div className="space-y-3 sm:space-y-4 lg:space-y-6 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground font-display">
            {question.title}
          </h2>
          {question.subtitle && (
            <p className="text-muted-foreground text-base sm:text-lg lg:text-xl font-inter">
              {question.subtitle}
            </p>
          )}
        </div>

        {/* Options */}
        <div className="space-y-3 sm:space-y-4 lg:space-y-5 flex-1">
          {question.type === 'single' ? (
            <div className="space-y-3 sm:space-y-4">
              {question.options.map((option) => (
                <div 
                  key={option.id} 
                  onClick={() => handleSingleSelect(option.id)}
                  className={`p-4 sm:p-5 lg:p-6 rounded-lg border transition-colors cursor-pointer ${
                    selectedAnswers.includes(option.id) 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border hover:border-primary/50 bg-background/50'
                  }`}
                >
                  <div className="font-medium text-base sm:text-lg lg:text-xl text-foreground">{option.label}</div>
                  {option.description && (
                    <div className="text-sm sm:text-base lg:text-lg text-muted-foreground mt-1 sm:mt-2">
                      {option.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2 sm:space-y-3 lg:space-y-4">
              {question.options.map((option) => (
                <div 
                  key={option.id} 
                  onClick={() => handleMultipleSelect(option.id, !selectedAnswers.includes(option.id))}
                  className={`p-4 sm:p-5 lg:p-6 rounded-lg border transition-colors cursor-pointer ${
                    selectedAnswers.includes(option.id) 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border hover:border-primary/50 bg-background/50'
                  }`}
                >
                  <div className="font-medium text-base sm:text-lg lg:text-xl text-foreground">{option.label}</div>
                  {option.description && (
                    <div className="text-sm sm:text-base lg:text-lg text-muted-foreground mt-1 sm:mt-2">
                      {option.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Fixed Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-4 sm:p-6 bg-cream/95 backdrop-blur-sm border-t border-primary/20">
        <div className="flex justify-center max-w-4xl mx-auto">
          <Button
            onClick={onNext}
            disabled={!canGoNext}
            className="w-full sm:w-auto bg-primary hover:bg-primary-glow text-primary-foreground text-sm sm:text-base lg:text-lg py-3 sm:py-4 lg:py-5"
          >
            {currentQuestion === totalQuestions - 1 ? "Get Results" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;