
import React from 'react';
import { FormProvider } from '@/context/FormContext';
import QuizForm from '@/components/quiz/QuizForm';
import Results from '@/components/results/Results';
import { useFormContext } from '@/context/FormContext';

// Wrapper component to use the form context
const AppContent = () => {
  const { showResults } = useFormContext();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto py-10">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold mb-3 gradient-heading">
            How Do You Compare to the Average Man?
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enter your stats, get your score, and find out where you stand—and how to level up.
          </p>
        </header>

        {showResults ? <Results /> : <QuizForm />}
      </div>
    </div>
  );
};

// Index page with the form provider
const Index = () => {
  return (
    <FormProvider>
      <AppContent />
    </FormProvider>
  );
};

export default Index;
