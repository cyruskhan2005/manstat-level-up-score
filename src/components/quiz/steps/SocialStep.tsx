
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
            For reference: The average adult male has ~7 lifetime partners
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
