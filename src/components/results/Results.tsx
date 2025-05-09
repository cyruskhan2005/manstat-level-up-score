
import React from 'react';
import { useFormContext } from '@/context/FormContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft,
  TrendingUp,
  Award,
  TrendingDown,
  Medal,
  ChartBar
} from 'lucide-react';
import { getCategoryDisplayName } from '@/utils/scoreCalculator';
import { Category } from '@/types';
import { 
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

const Results: React.FC = () => {
  const { results, resetForm, formData } = useFormContext();

  if (!results) {
    return <div>No results available</div>;
  }

  const categoryData = Object.entries(results.categories).map(([category, data]) => ({
    name: getCategoryDisplayName(category as Category),
    score: data.score,
    percentile: data.percentile,
    category,
  }));

  const getBarColor = (category: string) => {
    if (category === results.strongestCategory) {
      return '#22c55e'; // Green
    } else if (category === results.weakestCategory) {
      return '#ef4444'; // Red
    }
    return '#9b87f5'; // Default purple
  };

  const getScoreGrade = (score: number) => {
    if (score >= 90) return 'A+';
    if (score >= 85) return 'A';
    if (score >= 80) return 'A-';
    if (score >= 75) return 'B+';
    if (score >= 70) return 'B';
    if (score >= 65) return 'B-';
    if (score >= 60) return 'C+';
    if (score >= 55) return 'C';
    if (score >= 50) return 'C-';
    if (score >= 45) return 'D+';
    if (score >= 40) return 'D';
    if (score >= 35) return 'D-';
    return 'F';
  };

  const ageGroup = formData.age ? 
    formData.age < 25 ? "your early 20s" :
    formData.age < 35 ? "your prime years" :
    formData.age < 45 ? "your 30s and 40s" :
    formData.age < 55 ? "midlife" : "your age group" 
    : "your age group";

  return (
    <div className="results-container">
      <Card className="p-6 shadow-lg border-manstat-blue/20 mb-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2 gradient-heading">Your ManStat Score</h2>
          <div className="flex items-center gap-4">
            <div className="bg-muted/30 p-4 rounded-lg text-center">
              <div className="text-5xl font-bold gradient-text">{results.overallScore}</div>
              <div className="text-sm text-muted-foreground">Overall Score</div>
              <div className="text-lg font-semibold mt-1">{getScoreGrade(results.overallScore)}</div>
            </div>
            <div>
              <p className="text-xl mb-2">
                <span className="font-semibold">Top {100 - results.percentile}%</span> of men
                {formData.age && <span className="text-muted-foreground text-sm"> in {ageGroup}</span>}
              </p>
              <p className="text-muted-foreground">{results.summary}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <ChartBar className="h-5 w-5 text-primary" />
            Where You Stack Up
          </h3>
          <div className="chart-container h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={100}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value, name, props) => {
                    const { percentile } = props.payload;
                    return [`Score: ${value}/100 (Top ${100 - percentile}%)`, ''];
                  }}
                  labelFormatter={(label) => label}
                />
                <ReferenceLine x={50} stroke="#666" strokeDasharray="3 3" label={{ value: 'Average', position: 'insideBottomRight', fill: '#666' }} />
                <Bar dataKey="score" minPointSize={2} barSize={20}>
                  {categoryData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={getBarColor(entry.category as string)}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mb-8 space-y-6">
          <div className="flex items-start gap-2 text-emerald-500">
            <Award size={20} className="mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold">Strongest Area: {getCategoryDisplayName(results.strongestCategory)}</h4>
              <p className="text-foreground text-sm">
                {results.categories[results.strongestCategory].explanation}
                {' '}
                <span className="font-medium">
                  (Score: {results.categories[results.strongestCategory].score}/100, Grade: {getScoreGrade(results.categories[results.strongestCategory].score)})
                </span>
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-2 text-red-500">
            <TrendingDown size={20} className="mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold">Weakest Area: {getCategoryDisplayName(results.weakestCategory)}</h4>
              <p className="text-foreground text-sm">
                {results.categories[results.weakestCategory].explanation}
                {' '}
                <span className="font-medium">
                  (Score: {results.categories[results.weakestCategory].score}/100, Grade: {getScoreGrade(results.categories[results.weakestCategory].score)})
                </span>
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-2 text-blue-500">
            <TrendingUp size={20} className="mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold">How to Level Up:</h4>
              <p className="text-foreground text-sm">{results.primaryImprovement}</p>
              <p className="text-sm mt-1 text-muted-foreground">
                {results.categories[results.weakestCategory].levelUpTip}
              </p>
            </div>
          </div>
        </div>

        <div className="category-details mt-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Medal className="h-5 w-5 text-primary" />
            Detailed Breakdown
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(results.categories).map(([category, data]) => (
              <Card key={category} className="p-4 border-muted/30">
                <h4 className="font-bold flex items-center justify-between">
                  {getCategoryDisplayName(category as Category)}
                  <div className="flex items-center gap-1">
                    <span className="bg-muted/30 text-sm px-2 py-1 rounded">
                      {data.score}/100
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Grade: {getScoreGrade(data.score)}
                    </span>
                  </div>
                </h4>
                <p className="text-sm mt-2 text-muted-foreground">{data.explanation}</p>
                <p className="text-xs mt-3 font-medium text-primary">
                  Tip: {data.levelUpTip}
                </p>
              </Card>
            ))}
          </div>
        </div>

        <Button 
          onClick={resetForm} 
          className="mt-8 flex items-center gap-1"
          variant="outline"
        >
          <ArrowLeft size={16} /> Retake Assessment
        </Button>
      </Card>
    </div>
  );
};

export default Results;
