import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
    <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
      <Card className="max-w-2xl lg:max-w-3xl xl:max-w-4xl w-full p-4 sm:p-6 md:p-8 lg:p-10 space-y-6 sm:space-y-8 lg:space-y-10 animate-slide-in bg-slate-900 text-white border-slate-700">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Question {currentQuestion + 1} of {totalQuestions}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <div className="space-y-3 sm:space-y-4 lg:space-y-6 text-center">
          <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white">
            {question.title}
          </h2>
          {question.subtitle && (
            <p className="text-muted-primary text-base sm:text-lg lg:text-xl">
              {question.subtitle}
            </p>
          )}
        </div>

        {/* Options */}
        <div className="space-y-3 sm:space-y-4 lg:space-y-5">
          {question.type === 'single' ? (
            <RadioGroup
              value={selectedAnswers[0] || ""}
              onValueChange={handleSingleSelect}
              className="space-y-3 sm:space-y-4"
            >
              {question.options.map((option) => (
                <div key={option.id} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 lg:p-5 rounded-lg border border-border hover:border-primary/50 transition-colors">
                  <RadioGroupItem value={option.id} id={option.id} className="shrink-0 mt-1" />
                  <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                    <div className="font-medium text-sm sm:text-base lg:text-lg">{option.label}</div>
                    {option.description && (
                      <div className="text-xs sm:text-sm lg:text-base text-muted-foreground mt-1 sm:mt-2">
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
                <div key={option.id} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 lg:p-5 rounded-lg border border-border hover:border-primary/50 transition-colors">
                  <Checkbox
                    id={option.id}
                    checked={selectedAnswers.includes(option.id)}
                    onCheckedChange={(checked) => handleMultipleSelect(option.id, checked as boolean)}
                    className="mt-1"
                  />
                  <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                    <div className="font-medium text-sm sm:text-base lg:text-lg">{option.label}</div>
                    {option.description && (
                      <div className="text-xs sm:text-sm lg:text-base text-muted-foreground mt-1 sm:mt-2">
                        {option.description}
                      </div>
                    )}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-between pt-4 sm:pt-6 lg:pt-8">
          <Button
            variant="outline"
            className="w-full sm:w-auto bg-slate-700 text-white hover:bg-slate-600 border-slate-700 text-sm sm:text-base lg:text-lg py-2 sm:py-3 lg:py-4"
            onClick={onPrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          
          <Button
            onClick={onNext}
            disabled={!canGoNext}
            className="w-full sm:w-auto bg-primary hover:bg-primary-glow text-sm sm:text-base lg:text-lg py-2 sm:py-3 lg:py-4"
          >
            {currentQuestion === totalQuestions - 1 ? "Get Results" : "Next"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default QuizQuestion;