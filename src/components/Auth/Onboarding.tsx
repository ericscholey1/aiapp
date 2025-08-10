import React, { useState } from 'react';
import { CheckCircle, Users, Brain, Shield, ArrowRight } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
  agentName: string;
}

const OnboardingStep: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  isActive: boolean;
  isCompleted: boolean;
}> = ({ icon, title, description, isActive, isCompleted }) => (
  <div className={`p-6 rounded-xl border-2 transition-all ${
    isActive 
      ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
      : isCompleted 
        ? 'border-green-300 bg-green-25 dark:bg-green-900/10' 
        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
  }`}>
    <div className="flex items-start space-x-4">
      <div className={`p-2 rounded-lg ${
        isActive || isCompleted 
          ? 'bg-green-500 text-white' 
          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
      }`}>
        {isCompleted ? <CheckCircle className="w-6 h-6" /> : icon}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  </div>
);

const Onboarding: React.FC<OnboardingProps> = ({ onComplete, agentName }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'Meet Your AI Agent',
      description: `${agentName} is now active and ready to help you with tasks, scheduling, and insights. Your agent learns from your preferences and works exclusively for you.`
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Join Your Clusters',
      description: 'Connect with family and colleagues who share your last name. Share tasks, events, and get AI-powered group insights while maintaining your privacy.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Privacy Controls',
      description: 'You have complete control over what data is shared with your clusters. All private messages are end-to-end encrypted and your personal tasks remain private.'
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">J</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome to JUNO
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Let's get you set up in just a few steps
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <div className="flex justify-center space-x-2 mb-6">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index <= currentStep 
                      ? 'bg-green-500' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {steps.map((step, index) => (
              <OnboardingStep
                key={index}
                icon={step.icon}
                title={step.title}
                description={step.description}
                isActive={index === currentStep}
                isCompleted={index < currentStep}
              />
            ))}
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
              className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                currentStep === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              disabled={currentStep === 0}
            >
              Previous
            </button>
            
            <button
              onClick={nextStep}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-xl font-medium hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 flex items-center space-x-2"
            >
              <span>{currentStep === steps.length - 1 ? 'Get Started' : 'Next'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;