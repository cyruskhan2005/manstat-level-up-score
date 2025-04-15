
import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ChevronRight, 
  ChevronLeft, 
  BarChart2
} from 'lucide-react';

import BasicInfoStep from './steps/BasicInfoStep';
import PhysicalStep from './steps/PhysicalStep';
import StrengthStep from './steps/StrengthStep';
import CareerStep from './steps/CareerStep';
import SocialStep from './steps/SocialStep';
import SelfRatingStep from './steps/SelfRatingStep';
import LifestyleStep from './steps/LifestyleStep';

const QuizForm: React.FC = () => {
  const {
    currentStep,
    totalSteps,
    currentStepId,
    goToNextStep,
    goToPreviousStep,
    isFirstStep,
    isLastStep,
    calculateAndSetResults
  } = useFormContext();

  const renderStepContent = () => {
    switch (currentStepId) {
      case 'basic':
        return <BasicInfoStep />;
      case 'physical':
        return <PhysicalStep />;
      case 'strength':
        return <StrengthStep />;
      case 'career':
        return <CareerStep />;
      case 'social':
        return <SocialStep />;
      case 'selfRating':
        return <SelfRatingStep />;
      case 'lifestyle':
        return <LifestyleStep />;
      default:
        return <BasicInfoStep />;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLastStep) {
      calculateAndSetResults();
    } else {
      goToNextStep();
    }
  };

  return (
    <div className="quiz-container">
      <form onSubmit={handleSubmit}>
        <Card className="p-6 shadow-lg border-manstat-blue/20">
          <div className="mb-8">
            <div className="step-indicator mb-2">
              <div 
                className="step-indicator-progress" 
                style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {totalSteps}
            </p>
          </div>

          <div className="space-y-6 mb-8">
            {renderStepContent()}
          </div>

          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={goToPreviousStep}
              disabled={isFirstStep}
              className="flex items-center gap-1"
            >
              <ChevronLeft size={16} /> Back
            </Button>

            <Button 
              type="submit" 
              className={`flex items-center gap-1 ${isLastStep ? 'bg-gradient-to-r from-manstat-blue to-manstat-purple' : ''}`}
            >
              {isLastStep ? (
                <>View Your Results <BarChart2 size={16} /></>
              ) : (
                <>Continue <ChevronRight size={16} /></>
              )}
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default QuizForm;
