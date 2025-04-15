
import React from 'react';
import { useFormContext } from '@/context/FormContext';
import { COUNTRIES } from '@/constants';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const BasicInfoStep: React.FC = () => {
  const { formData, updateField } = useFormContext();
  
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseInt(e.target.value) : null;
    updateField('age', value);
  };
  
  const handleCountryChange = (value: string) => {
    updateField('country', value);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold gradient-heading mb-2">Basic Information</h2>
        <p className="text-muted-foreground">Let's start with the basics about you.</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            min="18"
            max="100"
            placeholder="Enter your age"
            value={formData.age || ''}
            onChange={handleAgeChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Select 
            value={formData.country} 
            onValueChange={handleCountryChange}
          >
            <SelectTrigger id="country">
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoStep;
