import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

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
      {/* Main Content */}
      <div className="w-full min-h-screen flex flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12 space-y-6 sm:space-y-8 lg:space-y-10 animate-slide-in pb-24 sm:pb-28 lg:pb-32">
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
            <RadioGroup
              value={selectedAnswers[0] || ""}
              onValueChange={handleSingleSelect}
              className="space-y-3 sm:space-y-4"
            >
              {question.options.map((option) => (
                <div key={option.id} className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 lg:p-6 rounded-lg border border-border hover:border-primary/50 transition-colors bg-background/50">
                  <RadioGroupItem value={option.id} id={option.id} className="shrink-0 mt-1" />
                  <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                    <div className="font-medium text-base sm:text-lg lg:text-xl text-foreground">{option.label}</div>
                    {option.description && (
                      <div className="text-sm sm:text-base lg:text-lg text-muted-foreground mt-1 sm:mt-2">
                        {option.description}
                      </div>
                    )}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          ) : (
            <div className="space-y-2 sm:space-y-3 lg:space-y-4">
              {question.options.map((option) => (
                <div key={option.id} className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 lg:p-6 rounded-lg border border-border hover:border-primary/50 transition-colors bg-background/50">
                  <Checkbox
                    id={option.id}
                    checked={selectedAnswers.includes(option.id)}
                    onCheckedChange={(checked) => handleMultipleSelect(option.id, checked as boolean)}
                    className="mt-1"
                  />
                  <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                    <div className="font-medium text-base sm:text-lg lg:text-xl text-foreground">{option.label}</div>
                    {option.description && (
                      <div className="text-sm sm:text-base lg:text-lg text-muted-foreground mt-1 sm:mt-2">
                        {option.description}
                      </div>
                    )}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Fixed Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-4 sm:p-6 bg-cream/95 backdrop-blur-sm border-t border-primary/20">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-between max-w-4xl mx-auto">
          <Button
            variant="outline"
            className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/80 border-border text-sm sm:text-base lg:text-lg py-3 sm:py-4 lg:py-5"
            onClick={onPrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          
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