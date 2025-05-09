
import React from 'react';
import { useFormContext } from '@/context/FormContext';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { 
  RadioGroup, 
  RadioGroupItem 
} from '@/components/ui/radio-group';

const LifestyleStep: React.FC = () => {
  const { formData, updateField } = useFormContext();
  
  const handleLivingSituationChange = (value: string) => {
    updateField('livingSituation', value);
  };
  
  const handleExerciseFrequencyChange = (value: string) => {
    updateField('exerciseFrequency', value);
  };
  
  const handleHobbiesChange = (value: string) => {
    updateField('hobbies', value);
  };
  
  const handleCarOwnershipChange = (value: string) => {
    updateField('carOwnership', value);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold gradient-heading mb-2">Lifestyle Details</h2>
        <p className="text-muted-foreground">Tell us about your lifestyle.</p>
      </div>
      
      <div className="space-y-5">
        <div className="space-y-3">
          <Label>Living Situation</Label>
          <RadioGroup 
            value={formData.livingSituation} 
            onValueChange={handleLivingSituationChange}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="with-parents" id="with-parents" />
              <Label htmlFor="with-parents" className="cursor-pointer">Living with parents</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="renting" id="renting" />
              <Label htmlFor="renting" className="cursor-pointer">Renting apartment/house</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="own" id="own" />
              <Label htmlFor="own" className="cursor-pointer">Own home/condo</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other" className="cursor-pointer">Other arrangement</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="exercise">Exercise Frequency</Label>
          <Select 
            value={formData.exerciseFrequency} 
            onValueChange={handleExerciseFrequencyChange}
          >
            <SelectTrigger id="exercise">
              <SelectValue placeholder="Select how often you exercise" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="never">Never</SelectItem>
              <SelectItem value="rarely">Rarely (few times a month)</SelectItem>
              <SelectItem value="sometimes">Sometimes (once a week)</SelectItem>
              <SelectItem value="regularly">Regularly (2-3 times a week)</SelectItem>
              <SelectItem value="frequently">Frequently (4-5 times a week)</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="hobbies">Primary Hobbies/Interests</Label>
          <Select 
            value={formData.hobbies} 
            onValueChange={handleHobbiesChange}
          >
            <SelectTrigger id="hobbies">
              <SelectValue placeholder="Select your main interest" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sports">Sports & Athletics</SelectItem>
              <SelectItem value="gaming">Gaming</SelectItem>
              <SelectItem value="reading">Reading & Literature</SelectItem>
              <SelectItem value="travel">Travel & Adventure</SelectItem>
              <SelectItem value="arts">Arts & Music</SelectItem>
              <SelectItem value="tech">Technology & Computers</SelectItem>
              <SelectItem value="outdoors">Outdoors & Nature</SelectItem>
              <SelectItem value="cooking">Cooking & Food</SelectItem>
              <SelectItem value="wellness">Fitness & Wellness</SelectItem>
              <SelectItem value="social">Social Activities</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-3">
          <Label>Car Ownership</Label>
          <RadioGroup 
            value={formData.carOwnership} 
            onValueChange={handleCarOwnershipChange}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="no-car" />
              <Label htmlFor="no-car" className="cursor-pointer">No car</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="economy" id="economy" />
              <Label htmlFor="economy" className="cursor-pointer">Economy car</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="standard" id="standard" />
              <Label htmlFor="standard" className="cursor-pointer">Mid-range car</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="luxury" id="luxury" />
              <Label htmlFor="luxury" className="cursor-pointer">Luxury car</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sports" id="sports" />
              <Label htmlFor="sports" className="cursor-pointer">Sports car</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default LifestyleStep;
