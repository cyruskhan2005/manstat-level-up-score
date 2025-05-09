
// User form data type definitions
export type FormData = {
  // Basic Info
  age: number | null;
  country: string;
  
  // Physical
  height: { feet: number | null; inches: number | null; cm: number | null };
  weight: { lbs: number | null; kg: number | null };
  bodyFatPercentage: number | null;
  
  // Strength
  maxBench: number | null;
  maxSquat: number | null;
  maxDeadlift: number | null;
  
  // Career & Education
  jobTitle: string;
  yearlyIncome: number | null;
  educationLevel: string;
  
  // Dating & Social
  womenSleptWith: number | null;
  relationshipStatus: string;
  closeFreinds: number | null;
  socialEventsPerMonth: number | null;
  
  // Self Rating - extended with new facial features
  facialAttractiveness: number;
  styleGrooming: number;
  facialSymmetry: number;
  jawlineDefinition: number;
  attentionFromWomen: number;
  complimentsReceived: string;
  
  // Lifestyle
  livingSituation: string;
  exerciseFrequency: string;
  hobbies: string[]; // Array of top 3 hobbies
  carOwnership: string;
};

// Category and score types
export type Category = 
  | 'attractiveness'
  | 'strengthFitness'
  | 'incomeCareer'
  | 'relationshipDating'
  | 'socialLife'
  | 'lifestyle';

export type CategoryScore = {
  score: number; // 1-100
  percentile: number; // 0-100
  explanation: string;
  levelUpTip: string;
};

export type Results = {
  overallScore: number; // now 1-100
  percentile: number; // 0-100
  strongestCategory: Category;
  weakestCategory: Category;
  categories: Record<Category, CategoryScore>;
  summary: string;
  primaryImprovement: string;
};

export type StepId = 
  | 'basic'
  | 'physical' 
  | 'strength'
  | 'career'
  | 'social'
  | 'selfRating'
  | 'lifestyle';

export type Step = {
  id: StepId;
  title: string;
  description: string;
};

// Hobby type with quality rating for scoring
export type HobbyOption = {
  id: string;
  label: string;
  quality: 'excellent' | 'good' | 'neutral' | 'poor';
};
