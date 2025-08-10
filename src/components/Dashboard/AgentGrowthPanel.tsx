import React from 'react';
import { Brain, Zap, TrendingUp, BookOpen, Settings, Sparkles } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  recentlyLearned: boolean;
}

interface Automation {
  name: string;
  description: string;
  timeSaved: string;
  status: 'active' | 'learning' | 'suggested';
}

interface AgentGrowthPanelProps {
  personality: string;
}

const AgentGrowthPanel: React.FC<AgentGrowthPanelProps> = ({ personality }) => {
  const skills: Skill[] = [
    { name: 'Email Management', level: 95, recentlyLearned: false },
    { name: 'Calendar Optimization', level: 88, recentlyLearned: true },
    { name: 'Task Prioritization', level: 92, recentlyLearned: false },
    { name: 'Meeting Scheduling', level: 76, recentlyLearned: true },
    { name: 'Document Analysis', level: 64, recentlyLearned: true }
  ];

  const automations: Automation[] = [
    {
      name: 'Smart Email Sorting',
      description: 'Automatically categorizes and prioritizes incoming emails',
      timeSaved: '2.5h/week',
      status: 'active'
    },
    {
      name: 'Meeting Buffer Time',
      description: 'Adds 5-minute buffers between back-to-back meetings',
      timeSaved: '1.2h/week',
      status: 'active'
    },
    {
      name: 'Daily Standup Prep',
      description: 'Compiles project updates for team meetings',
      timeSaved: '45min/week',
      status: 'learning'
    },
    {
      name: 'Expense Tracking',
      description: 'Automatically categorizes business expenses from receipts',
      timeSaved: '1h/week',
      status: 'suggested'
    }
  ];

  const recommendations = [
    'Connect your project management tool to improve task insights',
    'Enable location services for smarter meeting scheduling',
    'Add your preferred restaurants for automated lunch ordering',
    'Connect your fitness tracker for health-based scheduling'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'learning': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      case 'suggested': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getPersonalityMessage = () => {
    switch (personality) {
      case 'friendly':
        return "I'm learning new ways to help you every day! 🌟";
      case 'professional':
        return "Continuously optimizing performance and capabilities.";
      case 'casual':
        return "Getting smarter and more helpful as we go!";
      case 'expert':
        return "Advanced learning algorithms are expanding my skill matrix.";
      default:
        return "Growing and learning to serve you better.";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">JUNO Growth</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{getPersonalityMessage()}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-green-500" />
          <span className="text-sm text-green-600 dark:text-green-400 font-medium">Learning</span>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <BookOpen className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Skills & Capabilities</h3>
        </div>
        <div className="space-y-3">
          {skills.map((skill, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {skill.name}
                </span>
                {skill.recentlyLearned && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 text-xs rounded-full">
                    New!
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className="h-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 w-8 text-right">
                  {skill.level}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Automations Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Zap className="w-5 h-5 text-purple-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active Automations</h3>
        </div>
        <div className="space-y-3">
          {automations.map((automation, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {automation.name}
                    </h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(automation.status)}`}>
                      {automation.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {automation.description}
                  </p>
                </div>
                <div className="text-right ml-4">
                  <div className="text-sm font-medium text-green-600 dark:text-green-400">
                    {automation.timeSaved}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">saved</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations Section */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-5 h-5 text-orange-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Growth Recommendations</h3>
        </div>
        <div className="space-y-2">
          {recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
              <Settings className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-orange-800 dark:text-orange-200">
                  {recommendation}
                </p>
              </div>
              <button className="text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium">
                Setup
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentGrowthPanel;