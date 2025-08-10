import React, { useState } from 'react';
import { Brain, Clock, CheckCircle, SunSnow as Snooze, UserPlus, Sparkles, TrendingUp } from 'lucide-react';

interface SuggestedTask {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  estimatedTime: string;
  category: string;
  confidence: number;
  reasoning: string;
}

interface UpcomingSuggestedTasksProps {
  onAcceptTask: (taskId: string) => void;
  onSnoozeTask: (taskId: string) => void;
  onDelegateTask: (taskId: string) => void;
}

const UpcomingSuggestedTasks: React.FC<UpcomingSuggestedTasksProps> = ({
  onAcceptTask,
  onSnoozeTask,
  onDelegateTask
}) => {
  const [dismissedTasks, setDismissedTasks] = useState<string[]>([]);

  const suggestedTasks: SuggestedTask[] = [
    {
      id: 'st1',
      title: 'Review and respond to client emails',
      description: 'You have 3 unread emails from clients that require responses',
      priority: 'high',
      estimatedTime: '15 min',
      category: 'Communication',
      confidence: 95,
      reasoning: 'Based on your email patterns, you typically respond within 2 hours'
    },
    {
      id: 'st2',
      title: 'Prepare for tomorrow\'s team meeting',
      description: 'Review agenda and gather status updates from your projects',
      priority: 'medium',
      estimatedTime: '30 min',
      category: 'Planning',
      confidence: 88,
      reasoning: 'Meeting is scheduled for 9 AM tomorrow, preparation usually takes 30 minutes'
    },
    {
      id: 'st3',
      title: 'Update project documentation',
      description: 'Documentation hasn\'t been updated in 5 days, consider adding recent changes',
      priority: 'low',
      estimatedTime: '45 min',
      category: 'Documentation',
      confidence: 72,
      reasoning: 'You typically update docs weekly, and it\'s been 5 days since last update'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 dark:text-green-400';
    if (confidence >= 75) return 'text-orange-600 dark:text-orange-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  const handleAccept = (taskId: string) => {
    setDismissedTasks(prev => [...prev, taskId]);
    onAcceptTask(taskId);
  };

  const handleSnooze = (taskId: string) => {
    setDismissedTasks(prev => [...prev, taskId]);
    onSnoozeTask(taskId);
  };

  const handleDelegate = (taskId: string) => {
    setDismissedTasks(prev => [...prev, taskId]);
    onDelegateTask(taskId);
  };

  const visibleTasks = suggestedTasks.filter(task => !dismissedTasks.includes(task.id));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">AI Suggestions</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Curated tasks based on your patterns</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-purple-500" />
          <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">Smart</span>
        </div>
      </div>

      <div className="space-y-4">
        {visibleTasks.map((task, index) => (
          <div
            key={task.id}
            className="group p-5 bg-gradient-to-r from-gray-50 to-gray-50 dark:from-gray-700 dark:to-gray-700 rounded-2xl border border-gray-200 dark:border-gray-600 hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/20 dark:hover:to-pink-900/20 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 transform hover:scale-[1.01]"
            style={{
              animationDelay: `${index * 100}ms`,
              animation: 'slideUp 0.5s ease-out forwards'
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3 flex-1">
                <div className={`w-3 h-3 ${getPriorityColor(task.priority)} rounded-full mt-2 flex-shrink-0`}></div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {task.title}
                    </h3>
                    <span className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
                      {task.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {task.description}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{task.estimatedTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3" />
                      <span className={getConfidenceColor(task.confidence)}>
                        {task.confidence}% confidence
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mb-4">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Why JUNO suggests this:</strong> {task.reasoning}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleAccept(task.id)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors transform hover:scale-105"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Accept</span>
                </button>
                <button
                  onClick={() => handleSnooze(task.id)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                >
                  <Snooze className="w-4 h-4" />
                  <span className="text-sm font-medium">Snooze</span>
                </button>
                <button
                  onClick={() => handleDelegate(task.id)}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/20 hover:bg-purple-200 dark:hover:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  <span className="text-sm font-medium">Delegate</span>
                </button>
              </div>
              
              <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {task.priority} priority
              </span>
            </div>
          </div>
        ))}

        {visibleTasks.length === 0 && (
          <div className="text-center py-8">
            <Brain className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 dark:text-gray-400">
              All caught up! JUNO will suggest new tasks as patterns emerge.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingSuggestedTasks;