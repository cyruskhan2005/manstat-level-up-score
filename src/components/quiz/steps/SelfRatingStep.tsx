
import React from 'react';
import { useFormContext } from '@/context/FormContext';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const COMPLIMENT_OPTIONS = [
  'very frequently',
  'frequently',
  'occasionally',
  'rarely',
  'never'
];

const SelfRatingStep: React.FC = () => {
  const { formData, updateField } = useFormContext();
  
  const handleFacialAttractiveness = (value: number[]) => {
    updateField('facialAttractiveness', value[0]);
  };
  
  const handleStyleGrooming = (value: number[]) => {
    updateField('styleGrooming', value[0]);
  };
  
  const handleFacialSymmetry = (value: number[]) => {
    updateField('facialSymmetry', value[0]);
  };
  
  const handleJawlineDefinition = (value: number[]) => {
    updateField('jawlineDefinition', value[0]);
  };
  
  const handleAttentionFromWomen = (value: number[]) => {
    updateField('attentionFromWomen', value[0]);
  };
  
  const handleComplimentsChange = (value: string) => {
    updateField('complimentsReceived', value);
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
            <Label htmlFor="facial" className="mb-6 block">Overall Facial Attractiveness</Label>
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
        
        {/* New facial feature sliders */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="symmetry" className="mb-6 block">Facial Symmetry</Label>
            <Slider
              id="symmetry"
              defaultValue={[formData.facialSymmetry]}
              max={10}
              min={1}
              step={1}
              onValueChange={handleFacialSymmetry}
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
              Rating: {formData.facialSymmetry}/10 ({getRatingLabel(formData.facialSymmetry)})
            </span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="jawline" className="mb-6 block">Jawline Definition</Label>
            <Slider
              id="jawline"
              defaultValue={[formData.jawlineDefinition]}
              max={10}
              min={1}
              step={1}
              onValueChange={handleJawlineDefinition}
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
              Rating: {formData.jawlineDefinition}/10 ({getRatingLabel(formData.jawlineDefinition)})
            </span>
          </div>
        </div>
        
        {/* Attention from women section */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="attention" className="mb-6 block">Attention You Get From Women</Label>
            <Slider
              id="attention"
              defaultValue={[formData.attentionFromWomen]}
              max={10}
              min={1}
              step={1}
              onValueChange={handleAttentionFromWomen}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Little/None</span>
              <span>Average</span>
              <span>High</span>
            </div>
          </div>
          <div className="text-center">
            <span className="inline-block bg-muted/30 px-3 py-1 rounded text-sm">
              Rating: {formData.attentionFromWomen}/10 ({getRatingLabel(formData.attentionFromWomen)})
            </span>
          </div>
        </div>
        
        {/* Compliments received dropdown */}
        <div className="space-y-2">
          <Label htmlFor="compliments">How often do you receive compliments on your appearance?</Label>
          <Select 
            value={formData.complimentsReceived} 
            onValueChange={handleComplimentsChange}
          >
            <SelectTrigger id="compliments">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              {COMPLIMENT_OPTIONS.map((option) => (
                <SelectItem key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default SelfRatingStep;
