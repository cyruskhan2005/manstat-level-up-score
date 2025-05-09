
import React, { useState } from 'react';
import { useFormContext } from '@/context/FormContext';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
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
import { HobbyOption } from '@/types';
import { Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Define hobbies with quality ratings
const HOBBY_OPTIONS: HobbyOption[] = [
  { id: 'sports', label: 'Sports & Athletics', quality: 'excellent' },
  { id: 'fitness', label: 'Fitness & Weight Training', quality: 'excellent' },
  { id: 'reading', label: 'Reading & Literature', quality: 'good' },
  { id: 'travel', label: 'Travel & Adventure', quality: 'good' },
  { id: 'arts', label: 'Arts & Music', quality: 'good' },
  { id: 'tech', label: 'Technology & Computers', quality: 'neutral' },
  { id: 'outdoors', label: 'Outdoors & Nature', quality: 'good' },
  { id: 'cooking', label: 'Cooking & Food', quality: 'good' },
  { id: 'social', label: 'Social Activities', quality: 'good' },
  { id: 'investing', label: 'Investing & Finance', quality: 'good' },
  { id: 'martial-arts', label: 'Martial Arts', quality: 'excellent' },
  { id: 'meditation', label: 'Meditation & Mindfulness', quality: 'good' },
  { id: 'writing', label: 'Writing & Blogging', quality: 'good' },
  { id: 'photography', label: 'Photography', quality: 'neutral' },
  { id: 'gaming', label: 'Gaming', quality: 'poor' },
  { id: 'collecting', label: 'Collecting', quality: 'neutral' },
  { id: 'watching-tv', label: 'Watching TV/Movies', quality: 'poor' },
  { id: 'social-media', label: 'Social Media', quality: 'poor' }
];

const LifestyleStep: React.FC = () => {
  const { formData, updateField } = useFormContext();
  const [selectedHobby, setSelectedHobby] = useState<string>('');
  
  const handleLivingSituationChange = (value: string) => {
    updateField('livingSituation', value);
  };
  
  const handleExerciseFrequencyChange = (value: string) => {
    updateField('exerciseFrequency', value);
  };
  
  const handleCarOwnershipChange = (value: string) => {
    updateField('carOwnership', value);
  };
  
  const handleAddHobby = () => {
    if (!selectedHobby || formData.hobbies.includes(selectedHobby) || formData.hobbies.length >= 3) {
      return;
    }
    
    const updatedHobbies = [...formData.hobbies, selectedHobby].slice(0, 3);
    updateField('hobbies', updatedHobbies);
    setSelectedHobby('');
  };
  
  const handleRemoveHobby = (hobbyToRemove: string) => {
    const updatedHobbies = formData.hobbies.filter(hobby => hobby !== hobbyToRemove);
    updateField('hobbies', updatedHobbies);
  };
  
  const getHobbyLabel = (id: string): string => {
    const hobby = HOBBY_OPTIONS.find(option => option.id === id);
    return hobby ? hobby.label : id;
  };
  
  const getHobbyQualityColor = (id: string): string => {
    const hobby = HOBBY_OPTIONS.find(option => option.id === id);
    if (!hobby) return 'bg-gray-500';
    
    switch (hobby.quality) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'neutral': return 'bg-yellow-500';
      case 'poor': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
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
        
        <div className="space-y-3">
          <Label>Top 3 Hobbies/Interests</Label>
          <div className="flex flex-wrap gap-2 mb-3">
            {formData.hobbies.map((hobby, index) => (
              <Badge key={hobby} className="flex items-center gap-1 py-1.5">
                <span className={`w-2 h-2 rounded-full ${getHobbyQualityColor(hobby)}`}></span>
                <span>{index + 1}. {getHobbyLabel(hobby)}</span>
                <button 
                  type="button" 
                  onClick={() => handleRemoveHobby(hobby)}
                  className="ml-1 text-muted hover:text-foreground"
                >
                  <X size={14} />
                </button>
              </Badge>
            ))}
            
            {formData.hobbies.length === 0 && (
              <p className="text-sm text-muted-foreground">No hobbies selected yet. Select up to 3.</p>
            )}
          </div>
          
          <div className="flex gap-2">
            <div className="flex-1">
              <Select 
                value={selectedHobby}
                onValueChange={setSelectedHobby}
                disabled={formData.hobbies.length >= 3}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a hobby" />
                </SelectTrigger>
                <SelectContent>
                  {HOBBY_OPTIONS.map(option => (
                    <SelectItem 
                      key={option.id} 
                      value={option.id}
                      disabled={formData.hobbies.includes(option.id)}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${getHobbyQualityColor(option.id)}`}></span>
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              type="button" 
              size="sm"
              onClick={handleAddHobby}
              disabled={!selectedHobby || formData.hobbies.length >= 3}
              className="flex items-center"
            >
              <Check size={16} className="mr-1" /> Add
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground italic">
            Tip: Hobbies are color-coded by quality. Green hobbies tend to be most beneficial for overall well-being and attractiveness.
          </p>
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
