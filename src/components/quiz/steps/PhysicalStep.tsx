
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
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';

const PhysicalStep: React.FC = () => {
  const { formData, updateField } = useFormContext();
  
  const handleHeightChange = (unit: 'feet' | 'inches' | 'cm', value: string) => {
    const newValue = value ? Number(value) : null;
    updateField('height', {
      ...formData.height,
      [unit]: newValue
    });
  };
  
  const handleWeightChange = (unit: 'lbs' | 'kg', value: string) => {
    const newValue = value ? Number(value) : null;
    updateField('weight', {
      ...formData.weight,
      [unit]: newValue
    });
  };
  
  const handleBodyFatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : null;
    updateField('bodyFatPercentage', value);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold gradient-heading mb-2">Physical Stats</h2>
        <p className="text-muted-foreground">Let's get info about your physical attributes.</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label>Height</Label>
          <div className="flex flex-col sm:flex-row gap-2 mt-1.5">
            <div className="flex-1 space-y-1">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="feet" className="text-xs">Feet</Label>
                  <Input
                    id="feet"
                    type="number"
                    placeholder="ft"
                    min="4"
                    max="8"
                    value={formData.height.feet || ''}
                    onChange={(e) => handleHeightChange('feet', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="inches" className="text-xs">Inches</Label>
                  <Input
                    id="inches"
                    type="number"
                    placeholder="in"
                    min="0"
                    max="11"
                    value={formData.height.inches || ''}
                    onChange={(e) => handleHeightChange('inches', e.target.value)}
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Imperial (ft/in)</p>
            </div>
            <div className="text-center self-center hidden sm:block text-muted-foreground">or</div>
            <div className="flex-1 space-y-1">
              <div>
                <Label htmlFor="cm" className="text-xs">Centimeters</Label>
                <Input
                  id="cm"
                  type="number"
                  placeholder="cm"
                  min="120"
                  max="240"
                  value={formData.height.cm || ''}
                  onChange={(e) => handleHeightChange('cm', e.target.value)}
                />
              </div>
              <p className="text-xs text-muted-foreground">Metric (cm)</p>
            </div>
          </div>
        </div>
        
        <div>
          <Label>Weight</Label>
          <div className="flex flex-col sm:flex-row gap-2 mt-1.5">
            <div className="flex-1 space-y-1">
              <div>
                <Label htmlFor="lbs" className="text-xs">Pounds</Label>
                <Input
                  id="lbs"
                  type="number"
                  placeholder="lbs"
                  min="80"
                  max="500"
                  value={formData.weight.lbs || ''}
                  onChange={(e) => handleWeightChange('lbs', e.target.value)}
                />
              </div>
              <p className="text-xs text-muted-foreground">Imperial (lbs)</p>
            </div>
            <div className="text-center self-center hidden sm:block text-muted-foreground">or</div>
            <div className="flex-1 space-y-1">
              <div>
                <Label htmlFor="kg" className="text-xs">Kilograms</Label>
                <Input
                  id="kg"
                  type="number"
                  placeholder="kg"
                  min="40"
                  max="230"
                  value={formData.weight.kg || ''}
                  onChange={(e) => handleWeightChange('kg', e.target.value)}
                />
              </div>
              <p className="text-xs text-muted-foreground">Metric (kg)</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bodyFat">Estimated Body Fat Percentage</Label>
          <Input
            id="bodyFat"
            type="number"
            placeholder="e.g., 15"
            min="3"
            max="50"
            value={formData.bodyFatPercentage || ''}
            onChange={handleBodyFatChange}
          />
          <p className="text-xs text-muted-foreground">
            If unsure, use this guide: 
            8-12% (Very Lean), 
            13-18% (Lean), 
            19-24% (Average), 
            25%+ (Above Average)
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhysicalStep;
