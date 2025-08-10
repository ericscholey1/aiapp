import React from 'react';
import { Calendar, MessageSquare, ShoppingCart, Clock, Plus } from 'lucide-react';

const QuickActions: React.FC = () => {
  const actions = [
    { icon: Calendar, label: 'Schedule Meeting', color: 'bg-blue-500' },
    { icon: Clock, label: 'Set Reminder', color: 'bg-purple-500' },
    { icon: ShoppingCart, label: 'Quick Order', color: 'bg-orange-500' },
    { icon: MessageSquare, label: 'Send Message', color: 'bg-green-500' },
    { icon: Plus, label: 'Add Task', color: 'bg-gray-500' }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Quick Actions
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            className="flex flex-col items-center p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
          >
            <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
              <action.icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;