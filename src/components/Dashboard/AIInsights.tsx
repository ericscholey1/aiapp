import React from 'react';
import { Brain, TrendingUp, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { AIInsight } from '../../types';

interface AIInsightsProps {
  insights: AIInsight[];
  personality: string;
}

const AIInsights: React.FC<AIInsightsProps> = ({ insights, personality }) => {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'suggestion': return TrendingUp;
      case 'reminder': return AlertCircle;
      case 'analysis': return CheckCircle;
      default: return Brain;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'suggestion': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
      case 'reminder': return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20';
      case 'analysis': return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      default: return 'text-purple-600 bg-purple-50 dark:bg-purple-900/20';
    }
  };

  const getPersonalizedGreeting = () => {
    switch (personality) {
      case 'friendly': return "Here's what I've noticed for you today! 😊";
      case 'professional': return "Strategic insights and recommendations:";
      case 'casual': return "Just a heads up on a few things:";
      case 'expert': return "Data-driven insights and analytical findings:";
      default: return "AI-powered insights for you:";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-green-500" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">JUNO Insights</h2>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
          {personality} mode
        </span>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {getPersonalizedGreeting()}
      </p>

      <div className="space-y-3">
        {insights.map((insight) => {
          const Icon = getInsightIcon(insight.type);
          return (
            <div
              key={insight.id}
              className={`p-4 rounded-xl border transition-all hover:shadow-sm ${
                insight.actionable 
                  ? 'border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-700' 
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg flex-shrink-0 ${getInsightColor(insight.type)}`}>
                  <Icon className="w-4 h-4" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {insight.title}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatTimestamp(insight.timestamp)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {insight.description}
                  </p>
                  
                  {insight.actionable && (
                    <button className="flex items-center space-x-1 text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors">
                      <span>Take action</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AIInsights;