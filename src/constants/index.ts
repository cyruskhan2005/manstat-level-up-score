
import { Category, Step } from "../types";

// Quiz steps configuration
export const QUIZ_STEPS: Step[] = [
  {
    id: 'basic',
    title: 'Basic Information',
    description: 'Let\'s start with some basic information about you.'
  },
  {
    id: 'physical',
    title: 'Physical Stats',
    description: 'Tell us about your physical measurements.'
  },
  {
    id: 'strength',
    title: 'Strength & Fitness',
    description: 'Let\'s assess your current strength levels.'
  },
  {
    id: 'career',
    title: 'Career & Education',
    description: 'Information about your career and education.'
  },
  {
    id: 'social',
    title: 'Dating & Social Life',
    description: 'Let\'s understand your dating history and social connections.'
  },
  {
    id: 'selfRating',
    title: 'Self Assessment',
    description: 'How would you rate yourself in these areas?'
  },
  {
    id: 'lifestyle',
    title: 'Lifestyle',
    description: 'Additional lifestyle information.'
  }
];

// National averages for comparisons
export const NATIONAL_AVERAGES = {
  // Physical
  height: { 
    us: { feet: 5, inches: 9 }, // 5'9" average US male height
    cm: 175
  },
  weight: { 
    us: { lbs: 197.9 }, // Average US male weight
    kg: 89.8
  },
  bodyFatPercentage: 28, // Average US male body fat %
  
  // Strength - 1RM for average male who trains
  maxBench: 135,  
  maxSquat: 185,
  maxDeadlift: 225,
  
  // Career
  yearlyIncome: 57200, // Median US male income
  
  // Social & Dating
  womenSleptWith: 7, // Lifetime average for US men
  closeFreinds: 3, // Average number of close friends
  socialEventsPerMonth: 4 // Average social events per month
};

// Education levels
export const EDUCATION_LEVELS = [
  'High School',
  'Some College',
  'Associate Degree',
  'Bachelor\'s Degree',
  'Master\'s Degree',
  'Doctorate or Professional Degree'
];

// Relationship statuses
export const RELATIONSHIP_STATUSES = [
  'Single',
  'Dating',
  'Long-term Relationship',
  'Married'
];

// Countries
export const COUNTRIES = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'China',
  'Brazil',
  'India',
  'Other'
];

// Tips by category
export const LEVEL_UP_TIPS: Record<Category, string[]> = {
  attractiveness: [
    'Consider updating your wardrobe with well-fitting basics that enhance your frame.',
    'Regular grooming and a defined skincare routine can dramatically improve appearance.',
    'Good posture and confident body language instantly boost perceived attractiveness.',
    'A balanced diet and proper hydration directly improve skin and overall appearance.',
    'Find a signature scent - studies show scent significantly impacts attraction.'
  ],
  
  strengthFitness: [
    'Follow a progressive overload program to systematically increase strength.',
    'Improve your nutrition - adequate protein intake is crucial for muscle growth.',
    'Focus on compound movements for maximum strength and hormonal benefits.',
    'Ensure proper recovery through sleep and stress management.',
    'Consider working with a strength coach to optimize your technique.'
  ],
  
  incomeCareer: [
    'Invest in developing high-demand skills through online courses or certifications.',
    'Network strategically - join industry groups and attend relevant events.',
    'Negotiate salary increases by documenting your achievements and value.',
    'Create a side income stream through freelancing or entrepreneurship.',
    'Seek a mentor who has achieved what you\'re aiming for in your career.'
  ],
  
  relationshipDating: [
    'Improve your conversation skills by practicing active listening.',
    'Expand your social circle to meet more compatible potential partners.',
    'Work on emotional intelligence to build stronger connections.',
    'Address any insecurities or past relationship patterns with a therapist.',
    'Be authentic while putting your best foot forward in dating scenarios.'
  ],
  
  socialLife: [
    'Join interest-based groups or clubs to meet like-minded people.',
    'Initiate gatherings instead of waiting for invitations.',
    'Practice small talk and storytelling to become more engaging.',
    'Be consistent with maintaining friendships through regular contact.',
    'Develop a genuine interest in others - people value feeling understood.'
  ],
  
  lifestyle: [
    'Create morning and evening routines that set you up for success.',
    'Pursue hobbies that genuinely interest you rather than what\'s impressive.',
    'Build healthy financial habits through budgeting and systematic investing.',
    'Create a living space that energizes and inspires you.',
    'Practice intentionality in how you spend your time and energy.'
  ]
};

// Helper function to get random tip from a category
export const getRandomTip = (category: Category): string => {
  const tips = LEVEL_UP_TIPS[category];
  return tips[Math.floor(Math.random() * tips.length)];
};
