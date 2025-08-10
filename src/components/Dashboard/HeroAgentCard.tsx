import React from 'react';
import { MessageSquare, Plus, Calendar, Zap, Sparkles } from 'lucide-react';
import { User } from '../../types';

interface HeroAgentCardProps {
  user: User;
  onAskJuno: () => void;
  onAddTask: () => void;
  onSchedule: () => void;
  onAutomate: () => void;
}

const HeroAgentCard: React.FC<HeroAgentCardProps> = ({
  user,
  onAskJuno,
  onAddTask,
  onSchedule,
  onAutomate
}) => {
  const getPersonalizedGreeting = () => {
    const hour = new Date().getHours();
    const timeOfDay = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';
    
    switch (user.personality) {
      case 'friendly':
        return `Good ${timeOfDay}, ${user.firstName}! Ready to make today amazing?`;
      case 'professional':
        return `Good ${timeOfDay}, ${user.firstName}. Let's optimize your productivity.`;
      case 'casual':
        return `Hey ${user.firstName}! What's on the agenda today?`;
      case 'expert':
        return `Good ${timeOfDay}, ${user.firstName}. Your performance metrics are ready.`;
      default:
        return `Good ${timeOfDay}, ${user.firstName}!`;
    }
  };

  const getPersonalityAvatar = () => {
    const colors = {
      friendly: 'from-pink-500 to-rose-500',
      professional: 'from-blue-600 to-indigo-600',
      casual: 'from-green-500 to-teal-500',
      expert: 'from-purple-600 to-violet-600'
    };
    return colors[user.personality] || colors.friendly;
  };

  const quickActions = [
    { icon: Plus, label: 'Add Task', action: onAddTask, color: 'bg-green-500 hover:bg-green-600' },
    { icon: MessageSquare, label: 'Ask JUNO', action: onAskJuno, color: 'bg-blue-500 hover:bg-blue-600' },
    { icon: Calendar, label: 'Schedule', action: onSchedule, color: 'bg-purple-500 hover:bg-purple-600' },
    { icon: Zap, label: 'Automate', action: onAutomate, color: 'bg-orange-500 hover:bg-orange-600' }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-3xl p-8 text-white shadow-2xl">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-green-400 to-blue-500 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-400 to-pink-500 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className={`w-16 h-16 bg-gradient-to-br ${getPersonalityAvatar()} rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200`}>
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                {user.agentName}
              </h1>
              <p className="text-gray-300 capitalize font-medium">
                {user.personality} mode • Active
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">Online</span>
          </div>
        </div>

        <p className="text-xl text-gray-100 mb-8 font-light leading-relaxed">
          {getPersonalizedGreeting()}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className={`${action.color} p-4 rounded-2xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg group`}
            >
              <action.icon className="w-6 h-6 text-white mb-2 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm font-medium text-white block">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroAgentCard;