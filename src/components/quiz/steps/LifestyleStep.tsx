
import React from 'react';
import { useFormContext } from '@/context/FormContext';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const LifestyleStep: React.FC = () => {
  const { formData, updateField } = useFormContext();
  
  const handleLifestyleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateField('lifestyleNotes', e.target.value);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold gradient-heading mb-2">Lifestyle Details</h2>
        <p className="text-muted-foreground">Final step! Share additional info about your lifestyle.</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="lifestyle">Other Lifestyle Information</Label>
          <Textarea
            id="lifestyle"
            placeholder="Tell us about your other lifestyle aspects: 
- What kind of car you drive
- Travel frequency and destinations
- Hobbies and interests
- Living situation
- Exercise routine
- Anything else you think is relevant"
            rows={6}
            value={formData.lifestyleNotes}
            onChange={handleLifestyleNotesChange}
            className="resize-y min-h-[150px]"
          />
          <p className="text-xs text-muted-foreground">
            The more details you share, the more personalized your results will be.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LifestyleStep;
