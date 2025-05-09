
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

const RELATIONSHIP_STATUSES = [
  'Single',
  'Dating',
  'Long-term Relationship',
  'Married'
];

const SocialStep: React.FC = () => {
  const { formData, updateField } = useFormContext();
  
  const handleRelationshipChange = (value: string) => {
    updateField('relationshipStatus', value);
  };
  
  const handleWomenSleptWithChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : null;
    updateField('womenSleptWith', value);
  };
  
  const handleCloseFriendsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : null;
    updateField('closeFreinds', value);
  };
  
  const handleSocialEventsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : null;
    updateField('socialEventsPerMonth', value);
  };
  
  // Get age-appropriate relationship context text
  const getRelationshipContextText = () => {
    if (!formData.age) return "For reference: The average adult male has ~7 lifetime partners";
    
    if (formData.age < 25) {
      return "Being single or dating casually is very normal at your age";
    } else if (formData.age < 35) {
      return "At this age, men typically have had 5-10 partners and many are in relationships";
    } else if (formData.age < 45) {
      return "By this age, most men are in long-term relationships or married";
    } else {
      return "At this stage of life, stable relationships are the norm for most men";
    }
  };
  
  // Get age-appropriate partners context text
  const getPartnersContextText = () => {
    if (!formData.age) return "For reference: The average adult male has ~7 lifetime partners";
    
    if (formData.age < 21) {
      return "For reference: Men your age have typically had 0-3 partners";
    } else if (formData.age < 25) {
      return "For reference: Men your age have typically had 1-5 partners";
    } else if (formData.age < 35) {
      return "For reference: Men your age have typically had 5-10 partners";
    } else if (formData.age < 45) {
      return "For reference: Men your age have typically had 7-14 partners";
    } else {
      return "For reference: Men your age have typically had 10+ lifetime partners";
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold gradient-heading mb-2">Dating & Social Life</h2>
        <p className="text-muted-foreground">Tell us about your relationships and social circle.</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="relationship">Current Relationship Status</Label>
          <Select 
            value={formData.relationshipStatus} 
            onValueChange={handleRelationshipChange}
          >
            <SelectTrigger id="relationship">
              <SelectValue placeholder="Select relationship status" />
            </SelectTrigger>
            <SelectContent>
              {RELATIONSHIP_STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground mt-1">
            {getRelationshipContextText()}
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="partners">Total Number of Sexual Partners</Label>
          <Input
            id="partners"
            type="number"
            placeholder="Enter number"
            min="0"
            max="1000"
            value={formData.womenSleptWith || ''}
            onChange={handleWomenSleptWithChange}
          />
          <p className="text-xs text-muted-foreground">
            {getPartnersContextText()}
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="friends">Number of Close Friends</Label>
          <Input
            id="friends"
            type="number"
            placeholder="e.g., 5"
            min="0"
            max="20"
            value={formData.closeFreinds || ''}
            onChange={handleCloseFriendsChange}
          />
          <p className="text-xs text-muted-foreground">
            Close friends = people you talk to at least once a week
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="events">Social Events Per Month</Label>
          <Input
            id="events"
            type="number"
            placeholder="e.g., 4"
            min="0"
            max="30"
            value={formData.socialEventsPerMonth || ''}
            onChange={handleSocialEventsChange}
          />
          <p className="text-xs text-muted-foreground">
            Social gatherings, parties, group outings, etc.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialStep;
