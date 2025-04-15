
import React from 'react';
import { useFormContext } from '@/context/FormContext';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

const SelfRatingStep: React.FC = () => {
  const { formData, updateField } = useFormContext();
  
  const handleFacialAttractiveness = (value: number[]) => {
    updateField('facialAttractiveness', value[0]);
  };
  
  const handleStyleGrooming = (value: number[]) => {
    updateField('styleGrooming', value[0]);
  };
  
  const getRatingLabel = (score: number) => {
    if (score <= 2) return 'Very Poor';
    if (score <= 4) return 'Below Average';
    if (score <= 6) return 'Average';
    if (score <= 8) return 'Above Average';
    return 'Excellent';
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold gradient-heading mb-2">Self Assessment</h2>
        <p className="text-muted-foreground">Rate yourself honestly for the most accurate results.</p>
      </div>
      
      <div className="space-y-8">
        <div className="space-y-4">
          <div>
            <Label htmlFor="facial" className="mb-6 block">Facial Attractiveness</Label>
            <Slider
              id="facial"
              defaultValue={[formData.facialAttractiveness]}
              max={10}
              min={1}
              step={1}
              onValueChange={handleFacialAttractiveness}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Poor</span>
              <span>Average</span>
              <span>Excellent</span>
            </div>
          </div>
          <div className="text-center">
            <span className="inline-block bg-muted/30 px-3 py-1 rounded text-sm">
              Rating: {formData.facialAttractiveness}/10 ({getRatingLabel(formData.facialAttractiveness)})
            </span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="style" className="mb-6 block">Style & Grooming</Label>
            <Slider
              id="style"
              defaultValue={[formData.styleGrooming]}
              max={10}
              min={1}
              step={1}
              onValueChange={handleStyleGrooming}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Poor</span>
              <span>Average</span>
              <span>Excellent</span>
            </div>
          </div>
          <div className="text-center">
            <span className="inline-block bg-muted/30 px-3 py-1 rounded text-sm">
              Rating: {formData.styleGrooming}/10 ({getRatingLabel(formData.styleGrooming)})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfRatingStep;
