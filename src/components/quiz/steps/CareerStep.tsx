
import React from 'react';
import { useFormContext } from '@/context/FormContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const EDUCATION_LEVELS = [
  'High School',
  'Some College',
  'Associate Degree',
  'Bachelor\'s Degree',
  'Master\'s Degree',
  'Doctorate or Professional Degree'
];

const CareerStep: React.FC = () => {
  const { formData, updateField } = useFormContext();
  
  const handleJobTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateField('jobTitle', e.target.value);
  };
  
  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : null;
    updateField('yearlyIncome', value);
  };
  
  const handleEducationChange = (value: string) => {
    updateField('educationLevel', value);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold gradient-heading mb-2">Career & Education</h2>
        <p className="text-muted-foreground">Tell us about your professional life.</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="jobTitle">Current Job Title</Label>
          <Input
            id="jobTitle"
            type="text"
            placeholder="e.g., Software Engineer"
            value={formData.jobTitle}
            onChange={handleJobTitleChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="income">Yearly Income (USD)</Label>
          <Input
            id="income"
            type="number"
            placeholder="e.g., 75000"
            min="0"
            max="10000000"
            value={formData.yearlyIncome || ''}
            onChange={handleIncomeChange}
          />
          <p className="text-xs text-muted-foreground">
            Average U.S. income is approximately $60,000
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="education">Highest Education Level</Label>
          <Select 
            value={formData.educationLevel} 
            onValueChange={handleEducationChange}
          >
            <SelectTrigger id="education">
              <SelectValue placeholder="Select education level" />
            </SelectTrigger>
            <SelectContent>
              {EDUCATION_LEVELS.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default CareerStep;
