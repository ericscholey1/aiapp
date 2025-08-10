import React from 'react';
import { TrendingUp, Target, Zap, Clock, Award, Calendar } from 'lucide-react';

interface ProgressMetricsProps {
  completionRate: number;
  currentStreak: number;
  timeSavedThisWeek: number;
  tasksCompletedThisWeek: number;
}

const ProgressMetrics: React.FC<ProgressMetricsProps> = ({
  completionRate,
  currentStreak,
  timeSavedThisWeek,
  tasksCompletedThisWeek
}) => {
  const metrics = [
    {
      icon: Target,
      label: 'Completion Rate',
      value: `${completionRate}%`,
      change: '+5%',
      changeType: 'positive' as const,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      icon: Award,
      label: 'Current Streak',
      value: `${currentStreak} days`,
      change: '+2 days',
      changeType: 'positive' as const,
      color: 'from-purple-500 to-violet-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      icon: Clock,
      label: 'Time Saved',
      value: `${timeSavedThisWeek}h`,
      change: '+1.2h',
      changeType: 'positive' as const,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      icon: Zap,
      label: 'Tasks Done',
      value: `${tasksCompletedThisWeek}`,
      change: '+3',
      changeType: 'positive' as const,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    }
  ];

  const categories = [
    { name: 'Work', count: 12, color: 'bg-blue-500', percentage: 40 },
    { name: 'Personal', count: 8, color: 'bg-green-500', percentage: 27 },
    { name: 'Learning', count: 6, color: 'bg-purple-500', percentage: 20 },
    { name: 'Health', count: 4, color: 'bg-orange-500', percentage: 13 }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Progress & Impact</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Your productivity insights</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Calendar className="w-4 h-4" />
          <span>This week</span>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className={`${metric.bgColor} rounded-2xl p-4 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-200 transform hover:scale-105`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 bg-gradient-to-r ${metric.color} rounded-lg`}>
                <metric.icon className="w-4 h-4 text-white" />
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                metric.changeType === 'positive' 
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                  : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
              }`}>
                {metric.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {metric.value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {metric.label}
            </div>
          </div>
        ))}
      </div>

      {/* Task Categories */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Task Categories</h3>
        <div className="space-y-3">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 ${category.color} rounded-full`}></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {category.name}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className={`h-2 ${category.color} rounded-full transition-all duration-500`}
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 w-8 text-right">
                  {category.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Progress</h3>
        <div className="flex items-end justify-between h-20 space-x-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
            const height = Math.floor(Math.random() * 60) + 20;
            return (
              <div key={day} className="flex flex-col items-center flex-1">
                <div
                  className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg transition-all duration-500 hover:from-blue-600 hover:to-purple-600"
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-xs text-gray-600 dark:text-gray-400 mt-2">{day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressMetrics;