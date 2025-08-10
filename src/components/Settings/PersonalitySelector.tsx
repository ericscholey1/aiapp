import React from 'react';
import { Brain, Briefcase, Coffee, GraduationCap, ArrowLeft } from 'lucide-react';
import { AgentPersonality } from '../../types';
import { personalityDescriptions } from '../../utils/mockData';

interface PersonalitySelectorProps {
  currentPersonality: AgentPersonality;
  onPersonalityChange: (personality: AgentPersonality) => void;
  onBack: () => void;
}

const PersonalitySelector: React.FC<PersonalitySelectorProps> = ({
  currentPersonality,
  onPersonalityChange,
  onBack
}) => {
  const personalities: Array<{
    type: AgentPersonality;
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    color: string;
  }> = [
    {
      type: 'friendly',
      icon: <Coffee className="w-8 h-8" />,
      title: 'Friendly',
      subtitle: 'Warm & Encouraging',
      color: 'from-pink-500 to-rose-500'
    },
    {
      type: 'professional',
      icon: <Briefcase className="w-8 h-8" />,
      title: 'Professional',
      subtitle: 'Business-Focused',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      type: 'casual',
      icon: <Brain className="w-8 h-8" />,
      title: 'Casual',
      subtitle: 'Relaxed & Conversational',
      color: 'from-green-500 to-teal-500'
    },
    {
      type: 'expert',
      icon: <GraduationCap className="w-8 h-8" />,
      title: 'Expert',
      subtitle: 'Analytical & Precise',
      color: 'from-purple-500 to-violet-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Choose JUNO's Personality
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Select how you'd like JUNO to communicate with you. You can change this anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {personalities.map((personality) => (
            <div
              key={personality.type}
              className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all transform hover:scale-105 ${
                currentPersonality === personality.type
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-lg'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
              onClick={() => onPersonalityChange(personality.type)}
            >
              {currentPersonality === personality.type && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              )}
              
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${personality.color} text-white flex-shrink-0`}>
                  {personality.icon}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {personality.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {personality.subtitle}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {personalityDescriptions[personality.type]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            Current Selection: {personalities.find(p => p.type === currentPersonality)?.title}
          </h3>
          <p className="text-blue-700 dark:text-blue-300">
            {personalityDescriptions[currentPersonality]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalitySelector;