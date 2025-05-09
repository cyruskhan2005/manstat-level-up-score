
import React from 'react';
import { useFormContext } from '@/context/FormContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

const StrengthStep: React.FC = () => {
  const { formData, updateField } = useFormContext();
  
  const handleBenchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : null;
    updateField('maxBench', value);
  };
  
  const handleSquatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : null;
    updateField('maxSquat', value);
  };
  
  const handleDeadliftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : null;
    updateField('maxDeadlift', value);
  };
  
  // Check if user has entered height and weight data to provide relative analysis
  const hasHeightWeight = (
    (formData.height.feet && formData.height.inches) || 
    formData.height.cm
  ) && (
    formData.weight.lbs || 
    formData.weight.kg
  );
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold gradient-heading mb-2">Strength Stats</h2>
        <p className="text-muted-foreground">Enter your one-rep max lifts (in pounds).</p>
      </div>
      
      {hasHeightWeight && (
        <Alert className="bg-blue-50 border-blue-200">
          <InfoIcon className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-blue-700">
            Your strength will be evaluated relative to your body height and weight for more accurate scoring.
          </AlertDescription>
        </Alert>
      )}
      
      {!hasHeightWeight && (
        <Alert className="bg-amber-50 border-amber-200">
          <InfoIcon className="h-4 w-4 text-amber-500" />
          <AlertDescription className="text-amber-700">
            For more accurate strength scoring, please go back and complete your height and weight information.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="bench">Max Bench Press (lbs)</Label>
          <Input
            id="bench"
            type="number"
            placeholder="e.g., 225"
            min="45"
            max="700"
            value={formData.maxBench || ''}
            onChange={handleBenchChange}
          />
          <p className="text-xs text-muted-foreground">
            For reference: Beginner (135), Intermediate (185), Advanced (275+)
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="squat">Max Squat (lbs)</Label>
          <Input
            id="squat"
            type="number"
            placeholder="e.g., 275"
            min="45"
            max="800"
            value={formData.maxSquat || ''}
            onChange={handleSquatChange}
          />
          <p className="text-xs text-muted-foreground">
            For reference: Beginner (185), Intermediate (275), Advanced (365+)
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="deadlift">Max Deadlift (lbs)</Label>
          <Input
            id="deadlift"
            type="number"
            placeholder="e.g., 315"
            min="65"
            max="900"
            value={formData.maxDeadlift || ''}
            onChange={handleDeadliftChange}
          />
          <p className="text-xs text-muted-foreground">
            For reference: Beginner (225), Intermediate (315), Advanced (405+)
          </p>
        </div>
      </div>
    </div>
  );
};

export default StrengthStep;
