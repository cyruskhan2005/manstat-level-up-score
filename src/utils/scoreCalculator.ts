
import { FormData, Results, Category, CategoryScore } from "../types";
import { NATIONAL_AVERAGES, getRandomTip } from "../constants";

// Helper to calculate percentile based on value and average
const calculatePercentile = (value: number, average: number, isHigherBetter = true): number => {
  const ratio = value / average;
  let percentile: number;
  
  if (isHigherBetter) {
    // Higher value is better (income, max lifts, etc.)
    percentile = Math.min(Math.round((ratio) * 50), 99);
  } else {
    // Lower value is better (body fat %)
    percentile = Math.min(Math.round((average / (value || average)) * 50), 99);
  }
  
  return Math.max(1, percentile); // Ensure at least 1 percentile
};

// Calculate BMI from height and weight
const calculateBMI = (data: FormData): number | null => {
  let heightInMeters: number | null = null;
  let weightInKg: number | null = null;
  
  // Get height in meters
  if (data.height.cm) {
    heightInMeters = data.height.cm / 100;
  } else if (data.height.feet && data.height.inches) {
    // Convert feet/inches to meters: 1 foot = 0.3048 meters, 1 inch = 0.0254 meters
    heightInMeters = (data.height.feet * 0.3048) + (data.height.inches * 0.0254);
  }
  
  // Get weight in kg
  if (data.weight.kg) {
    weightInKg = data.weight.kg;
  } else if (data.weight.lbs) {
    // Convert pounds to kg: 1 lb = 0.453592 kg
    weightInKg = data.weight.lbs * 0.453592;
  }
  
  // Calculate BMI if we have both height and weight
  if (heightInMeters && weightInKg) {
    return weightInKg / (heightInMeters * heightInMeters);
  }
  
  return null;
};

// Evaluate if BMI is ideal (around 22-26 is considered ideal for many men)
const evaluateBMI = (bmi: number | null): number => {
  if (!bmi) return 50; // Default to average if no BMI
  
  // BMI ranges and corresponding percentiles
  if (bmi >= 18.5 && bmi < 25) {
    // Normal weight - highest score
    return 80;
  } else if ((bmi >= 17 && bmi < 18.5) || (bmi >= 25 && bmi < 30)) {
    // Slightly under or overweight
    return 60;
  } else if ((bmi >= 16 && bmi < 17) || (bmi >= 30 && bmi < 35)) {
    // Moderately under or overweight
    return 40;
  } else {
    // Severely under or overweight
    return 20;
  }
};

// Evaluate age factor (prime age for physical performance is typically 25-35)
const evaluateAgeFactor = (age: number | null): number => {
  if (!age) return 1.0; // Default to neutral factor
  
  // Age adjustment factors:
  if (age >= 25 && age <= 35) {
    return 1.1; // Prime physical age gets a boost
  } else if ((age >= 20 && age < 25) || (age > 35 && age <= 45)) {
    return 1.0; // Neutral factor
  } else if ((age >= 18 && age < 20) || (age > 45 && age <= 55)) {
    return 0.9; // Slight reduction
  } else {
    return 0.8; // Larger reduction for ages > 55
  }
};

// Calculate score from 1-10 based on percentile
const percentileToScore = (percentile: number): number => {
  return Math.max(1, Math.min(10, Math.ceil(percentile / 10)));
};

// Calculate attractiveness score
const calculateAttractiveness = (data: FormData): CategoryScore => {
  // Self rated attractiveness and style are direct inputs
  const faceScore = data.facialAttractiveness || 5;
  const styleScore = data.styleGrooming || 5;
  
  // Calculate BMI influence on attractiveness
  const bmi = calculateBMI(data);
  const bmiPercentile = evaluateBMI(bmi);
  
  // Age factor - prime attractiveness age is considered to be 25-35
  const ageFactor = evaluateAgeFactor(data.age);
  
  // Combined score weighted with facial attractiveness, style, and physical attributes
  const rawScore = ((faceScore * 0.5) + (styleScore * 0.3) + (bmiPercentile / 10 * 0.2)) * ageFactor;
  const score = Math.round(Math.max(1, Math.min(10, rawScore)));
  const percentile = score * 10;
  
  let explanation = '';
  if (score >= 8) {
    explanation = "You're in the top tier of physical attractiveness, with strong facial features and excellent style.";
  } else if (score >= 6) {
    explanation = "You're above average in attractiveness with good style choices that complement your features.";
  } else if (score >= 4) {
    explanation = "You have average attractiveness, with room to optimize your style and grooming.";
  } else {
    explanation = "Your self-assessment suggests opportunities to improve your styling and grooming routine.";
  }
  
  return {
    score,
    percentile,
    explanation,
    levelUpTip: getRandomTip('attractiveness')
  };
};

// Calculate strength & fitness score
const calculateStrengthFitness = (data: FormData): CategoryScore => {
  // Body composition score (lower body fat % is better)
  const bodyFatPercentile = data.bodyFatPercentage ? 
    calculatePercentile(data.bodyFatPercentage, NATIONAL_AVERAGES.bodyFatPercentage, false) : 50;
  
  // Strength scores based on compound lifts
  const benchPercentile = data.maxBench ? 
    calculatePercentile(data.maxBench, NATIONAL_AVERAGES.maxBench) : 50;
  const squatPercentile = data.maxSquat ? 
    calculatePercentile(data.maxSquat, NATIONAL_AVERAGES.maxSquat) : 50;
  const deadliftPercentile = data.maxDeadlift ? 
    calculatePercentile(data.maxDeadlift, NATIONAL_AVERAGES.maxDeadlift) : 50;
  
  // BMI influence
  const bmi = calculateBMI(data);
  const bmiPercentile = evaluateBMI(bmi);
  
  // Age factor - adjust scores based on age (physical prime is typically 25-35)
  const ageFactor = evaluateAgeFactor(data.age);
  
  // Average percentile across all fitness metrics, including BMI influence
  const avgPercentile = Math.round(
    ((bodyFatPercentile + benchPercentile + squatPercentile + deadliftPercentile + bmiPercentile) / 5) * ageFactor
  );
  
  const score = percentileToScore(avgPercentile);
  
  let explanation = '';
  if (score >= 8) {
    explanation = "You're significantly stronger than average with excellent body composition.";
  } else if (score >= 6) {
    explanation = "You're stronger than most men and have above-average fitness levels.";
  } else if (score >= 4) {
    explanation = "You have average strength and fitness compared to other men.";
  } else {
    explanation = "Your strength metrics indicate room for improvement in your fitness regimen.";
  }
  
  return {
    score,
    percentile: avgPercentile,
    explanation,
    levelUpTip: getRandomTip('strengthFitness')
  };
};

// Calculate income & career score
const calculateIncomeCareer = (data: FormData): CategoryScore => {
  // Education score based on level
  const educationMap: Record<string, number> = {
    'High School': 30,
    'Some College': 45,
    'Associate Degree': 60,
    'Bachelor\'s Degree': 75,
    'Master\'s Degree': 85,
    'Doctorate or Professional Degree': 95
  };
  
  const educationPercentile = educationMap[data.educationLevel] || 50;
  
  // Income score based on yearly income
  const incomePercentile = data.yearlyIncome ? 
    calculatePercentile(data.yearlyIncome, NATIONAL_AVERAGES.yearlyIncome) : 50;
  
  // Age consideration - income typically increases with age, so younger people get a boost
  let ageAdjustment = 1.0;
  if (data.age) {
    if (data.age < 25) {
      ageAdjustment = 1.3; // Significant boost for young achievers
    } else if (data.age < 30) {
      ageAdjustment = 1.2; // Good boost for under 30
    } else if (data.age < 40) {
      ageAdjustment = 1.1; // Slight boost for 30s
    }
    // No adjustment for 40+ as that's when income is expected to be higher
  }
  
  // Average percentile across career metrics with age adjustment
  const avgPercentile = Math.min(99, Math.round(((educationPercentile + incomePercentile) / 2) * ageAdjustment));
  
  const score = percentileToScore(avgPercentile);
  
  let explanation = '';
  if (score >= 8) {
    explanation = "Your income and career achievements put you in the top tier professionally.";
  } else if (score >= 6) {
    explanation = "You're doing better than average in your professional life and earnings.";
  } else if (score >= 4) {
    explanation = "Your career metrics are on par with the average man in your country.";
  } else {
    explanation = "There's significant room for growth in your professional development and earning potential.";
  }
  
  return {
    score,
    percentile: avgPercentile,
    explanation,
    levelUpTip: getRandomTip('incomeCareer')
  };
};

// Calculate relationship & dating score
const calculateRelationshipDating = (data: FormData): CategoryScore => {
  // Relationship status score
  const relationshipMap: Record<string, number> = {
    'Single': 40,
    'Dating': 60,
    'Long-term Relationship': 75,
    'Married': 85
  };
  
  const relationshipPercentile = relationshipMap[data.relationshipStatus] || 50;
  
  // Dating history score
  const experiencePercentile = data.womenSleptWith ? 
    calculatePercentile(data.womenSleptWith, NATIONAL_AVERAGES.womenSleptWith) : 50;
  
  // Age consideration - expectations of relationship status change with age
  let ageAdjustment = 1.0;
  if (data.age) {
    if (data.age < 25) {
      // Less expectation to be in serious relationships when younger
      ageAdjustment = 1.2;
    } else if (data.age > 35 && data.relationshipStatus === 'Single') {
      // Higher expectation to be in relationships when older
      ageAdjustment = 0.8;
    }
  }
  
  // Combined score with relationship status weighted more, adjusted for age
  const avgPercentile = Math.round(((relationshipPercentile * 0.7) + (experiencePercentile * 0.3)) * ageAdjustment);
  
  const score = percentileToScore(avgPercentile);
  
  let explanation = '';
  if (score >= 8) {
    explanation = "You have exceptional relationship and dating success compared to most men.";
  } else if (score >= 6) {
    explanation = "Your relationship and dating life is above average, with good romantic prospects.";
  } else if (score >= 4) {
    explanation = "You have an average dating and relationship history compared to other men.";
  } else {
    explanation = "Your dating history suggests opportunities for improving your relationship outcomes.";
  }
  
  return {
    score,
    percentile: avgPercentile,
    explanation,
    levelUpTip: getRandomTip('relationshipDating')
  };
};

// Calculate social life score
const calculateSocialLife = (data: FormData): CategoryScore => {
  // Friends score
  const friendsPercentile = data.closeFreinds ? 
    calculatePercentile(data.closeFreinds, NATIONAL_AVERAGES.closeFreinds) : 50;
  
  // Social activity score
  const eventsPercentile = data.socialEventsPerMonth ? 
    calculatePercentile(data.socialEventsPerMonth, NATIONAL_AVERAGES.socialEventsPerMonth) : 50;
  
  // Age consideration - social expectations vary by age
  let ageAdjustment = 1.0;
  if (data.age) {
    if (data.age < 25) {
      // Higher social expectations for younger men
      ageAdjustment = 0.9;
    } else if (data.age > 40) {
      // Lower social expectations for older men
      ageAdjustment = 1.1;
    }
  }
  
  // Average percentile across social metrics
  const avgPercentile = Math.round(((friendsPercentile + eventsPercentile) / 2) * ageAdjustment);
  
  const score = percentileToScore(avgPercentile);
  
  let explanation = '';
  if (score >= 8) {
    explanation = "You have an exceptionally strong social network and active social calendar.";
  } else if (score >= 6) {
    explanation = "Your social life is above average, with a solid friend group and regular social activities.";
  } else if (score >= 4) {
    explanation = "You maintain an average social life compared to most men.";
  } else {
    explanation = "Your social connections could benefit from more active relationship building.";
  }
  
  return {
    score,
    percentile: avgPercentile,
    explanation,
    levelUpTip: getRandomTip('socialLife')
  };
};

// Calculate lifestyle score - more subjective based on notes
const calculateLifestyle = (data: FormData): CategoryScore => {
  // This is more subjective and based on the lifestyle notes
  // For now, giving a default middle score if no lifestyle notes provided
  const hasLifestyleNotes = data.lifestyleNotes && data.lifestyleNotes.trim().length > 10;
  const notesLength = data.lifestyleNotes ? data.lifestyleNotes.length : 0;
  
  // Age consideration - lifestyle expectations change with age
  let ageAdjustment = 1.0;
  if (data.age) {
    if (data.age < 25) {
      // Less expectation for an established lifestyle when younger
      ageAdjustment = 1.2;
    } else if (data.age > 40) {
      // Higher expectation for an established lifestyle when older
      ageAdjustment = 0.9;
    }
  }
  
  // Simple heuristic - more detailed notes correlate with more developed lifestyle
  const percentile = hasLifestyleNotes ? 
    Math.min(40 + Math.floor(notesLength / 10), 90) * ageAdjustment : 
    50 * ageAdjustment;
  
  const score = percentileToScore(Math.round(percentile));
  
  return {
    score,
    percentile: Math.round(percentile),
    explanation: "Lifestyle score is based on the richness and diversity of your interests and habits.",
    levelUpTip: getRandomTip('lifestyle')
  };
};

// Main function to calculate overall results
export const calculateResults = (data: FormData): Results => {
  // Calculate category scores
  const attractiveness = calculateAttractiveness(data);
  const strengthFitness = calculateStrengthFitness(data);
  const incomeCareer = calculateIncomeCareer(data);
  const relationshipDating = calculateRelationshipDating(data);
  const socialLife = calculateSocialLife(data);
  const lifestyle = calculateLifestyle(data);
  
  // Collect all categories
  const categories: Record<Category, CategoryScore> = {
    attractiveness,
    strengthFitness,
    incomeCareer, 
    relationshipDating,
    socialLife,
    lifestyle
  };
  
  // Calculate overall score
  const scores = Object.values(categories).map(cat => cat.score);
  const overallScore = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
  
  // Calculate overall percentile
  const percentiles = Object.values(categories).map(cat => cat.percentile);
  const overallPercentile = Math.round(percentiles.reduce((sum, percentile) => sum + percentile, 0) / percentiles.length);
  
  // Find strongest and weakest categories
  const categoryEntries = Object.entries(categories) as [Category, CategoryScore][];
  const sortedByScore = [...categoryEntries].sort((a, b) => b[1].score - a[1].score);
  
  const strongestCategory = sortedByScore[0][0];
  const weakestCategory = sortedByScore[sortedByScore.length - 1][0];
  
  // Generate summary
  let summary = "";
  if (overallScore >= 8) {
    summary = `You're in the top tier of men overall, with exceptional results across most categories.`;
  } else if (overallScore >= 6) {
    summary = `You're above average compared to most men, with solid performance in multiple areas.`;
  } else if (overallScore >= 4) {
    summary = `You're on par with the average man, with a balanced mix of strengths and areas for improvement.`;
  } else {
    summary = `Your current stats show room for growth across several key areas of manhood.`;
  }
  
  // Primary improvement focus - target the weakest category
  const primaryImprovement = `Focus on improving your ${getCategoryDisplayName(weakestCategory)} to see the biggest overall gains.`;
  
  return {
    overallScore,
    percentile: overallPercentile,
    strongestCategory,
    weakestCategory,
    categories,
    summary,
    primaryImprovement
  };
};

// Helper function to get display name for categories
export const getCategoryDisplayName = (category: Category): string => {
  switch (category) {
    case 'attractiveness':
      return 'Attractiveness';
    case 'strengthFitness':
      return 'Strength & Fitness';
    case 'incomeCareer':
      return 'Income & Career';
    case 'relationshipDating':
      return 'Relationship & Dating';
    case 'socialLife':
      return 'Social Life';
    case 'lifestyle':
      return 'Lifestyle';
    default:
      return category;
  }
};
