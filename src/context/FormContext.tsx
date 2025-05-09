import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FormData, Results, StepId } from '../types';
import { QUIZ_STEPS } from '../constants';
import { calculateResults } from '../utils/scoreCalculator';

// Default form values
const defaultFormData: FormData = {
  // Basic info
  age: null,
  country: 'United States',
  
  // Physical
  height: { feet: null, inches: null, cm: null },
  weight: { lbs: null, kg: null },
  bodyFatPercentage: null,
  
  // Strength
  maxBench: null,
  maxSquat: null,
  maxDeadlift: null,
  
  // Career & Education
  jobTitle: '',
  yearlyIncome: null,
  educationLevel: '',
  
  // Dating & Social
  womenSleptWith: null,
  relationshipStatus: '',
  closeFreinds: null,
  socialEventsPerMonth: null,
  
  // Self Rating
  facialAttractiveness: 5,
  styleGrooming: 5,
  
  // Lifestyle - structured options instead of free text
  livingSituation: '',
  exerciseFrequency: '',
  hobbies: '',
  carOwnership: '',
};

interface FormContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  totalSteps: number;
  currentStepId: StepId;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
  results: Results | null;
  calculateAndSetResults: () => void;
  resetForm: () => void;
  showResults: boolean;
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
  updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [results, setResults] = useState<Results | null>(null);
  const [showResults, setShowResults] = useState(false);
  
  const totalSteps = QUIZ_STEPS.length;
  const currentStepId = QUIZ_STEPS[currentStep].id as StepId;
  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;
  
  const goToNextStep = () => {
    if (!isLastStep) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const goToPreviousStep = () => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const calculateAndSetResults = () => {
    const calculatedResults = calculateResults(formData);
    setResults(calculatedResults);
    setShowResults(true);
  };
  
  const resetForm = () => {
    setFormData(defaultFormData);
    setCurrentStep(0);
    setResults(null);
    setShowResults(false);
  };
  
  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        currentStep,
        setCurrentStep,
        totalSteps,
        currentStepId,
        goToNextStep,
        goToPreviousStep,
        isLastStep,
        isFirstStep,
        results,
        calculateAndSetResults,
        resetForm,
        showResults,
        setShowResults,
        updateField
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = (): FormContextType => {
  const context = useContext(FormContext);
  
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  
  return context;
};
