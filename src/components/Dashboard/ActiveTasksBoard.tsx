import React, { useState } from 'react';
import { CheckCircle, Circle, Clock, User, ChevronRight, Paperclip, Users, Brain } from 'lucide-react';
import { Task } from '../../types';

interface ActiveTasksBoardProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
}

interface TaskDetailDrawerProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onToggleTask: (taskId: string) => void;
}

const TaskDetailDrawer: React.FC<TaskDetailDrawerProps> = ({ task, isOpen, onClose, onToggleTask }) => {
  if (!isOpen) return null;

  const aiSuggestions = [
    "Break this into 3 smaller subtasks for better progress tracking",
    "Schedule a 30-minute focus block for this task tomorrow at 9 AM",
    "Consider delegating the research portion to your team cluster"
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white dark:bg-gray-800 shadow-2xl transform transition-transform duration-300 ease-out">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <button
                  onClick={() => onToggleTask(task.id)}
                  className="mt-1"
                >
                  {task.completed ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-400 hover:text-green-500 transition-colors" />
                  )}
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {task.title}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{task.createdBy === 'juno' ? 'JUNO' : 'You'}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Description</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {task.description}
              </p>
            </div>

            {/* Subtasks */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Subtasks</h3>
              <div className="space-y-2">
                {['Research market trends', 'Analyze competitor data', 'Prepare presentation slides'].map((subtask, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Circle className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">{subtask}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Assignment */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Assignment</h3>
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                  <User className="w-4 h-4" />
                  <span>Assign to me</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                  <Users className="w-4 h-4" />
                  <span>Assign to cluster</span>
                </button>
              </div>
            </div>

            {/* Attachments */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Attachments</h3>
              <button className="flex items-center space-x-2 px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                <Paperclip className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-400">Add files or links</span>
              </button>
            </div>

            {/* AI Suggestions */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Brain className="w-5 h-5 text-green-500" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">JUNO Suggestions</h3>
              </div>
              <div className="space-y-3">
                {aiSuggestions.map((suggestion, index) => (
                  <div key={index} className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <p className="text-green-800 dark:text-green-200 mb-2">{suggestion}</p>
                    <button className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium">
                      Apply suggestion
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActiveTasksBoard: React.FC<ActiveTasksBoardProps> = ({ tasks, onToggleTask }) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400';
      case 'low': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getProgressPercentage = (task: Task) => {
    // Mock progress calculation
    return task.completed ? 100 : Math.floor(Math.random() * 80) + 10;
  };

  const formatTimeRemaining = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return '1 day left';
    if (diffDays > 1) return `${diffDays} days left`;
    if (diffDays === -1) return '1 day overdue';
    return `${Math.abs(diffDays)} days overdue`;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'social': return '📱';
      case 'marketplace': return '🛒';
      case 'business': return '💼';
      case 'work': return '⚡';
      case 'personal': return '👤';
      case 'life': return '🏠';
      default: return '📋';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'social': return 'bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400';
      case 'marketplace': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'business': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      case 'work': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400';
      case 'personal': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400';
      case 'life': return 'bg-teal-100 text-teal-700 dark:bg-teal-900/20 dark:text-teal-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const activeTasks = tasks.filter(task => !task.completed);

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Active Tasks</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {activeTasks.length} active
            </span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <div className="grid gap-4">
          {activeTasks.map((task) => {
            const progress = getProgressPercentage(task);
            return (
              <div
                key={task.id}
                onClick={() => setSelectedTask(task)}
                className="group p-5 bg-gray-50 dark:bg-gray-700 rounded-2xl border border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-600 hover:shadow-md transition-all duration-200 cursor-pointer transform hover:scale-[1.02]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3 flex-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleTask(task.id);
                      }}
                      className="mt-1 flex-shrink-0"
                    >
                      <Circle className="w-5 h-5 text-gray-400 hover:text-green-500 transition-colors" />
                    </button>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                        {task.title}
                      </h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(task.category)}`}>
                          {getCategoryIcon(task.category)} {task.category}
                        </span>
                        {task.tags && task.tags.map((tag, index) => (
                          <span key={index} className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {task.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 ml-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="relative w-8 h-8">
                        <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                          <circle
                            cx="16"
                            cy="16"
                            r="14"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            className="text-gray-200 dark:text-gray-600"
                          />
                          <circle
                            cx="16"
                            cy="16"
                            r="14"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 14}`}
                            strokeDashoffset={`${2 * Math.PI * 14 * (1 - progress / 100)}`}
                            className="text-green-500 transition-all duration-300"
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-700 dark:text-gray-300">
                          {progress}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="w-4 h-4 inline mr-1" />
                      {formatTimeRemaining(task.dueDate)}
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {task.createdBy === 'juno' ? 'JUNO' : 'You'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <TaskDetailDrawer
        task={selectedTask!}
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        onToggleTask={onToggleTask}
      />
    </>
  );
};

export default ActiveTasksBoard;