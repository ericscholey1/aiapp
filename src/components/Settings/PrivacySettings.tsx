import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Lock, Users, ArrowLeft } from 'lucide-react';

interface PrivacySettingsProps {
  onBack: () => void;
}

const PrivacySettings: React.FC<PrivacySettingsProps> = ({ onBack }) => {
  const [settings, setSettings] = useState({
    shareTasksWithClusters: true,
    shareCalendarWithClusters: false,
    allowClusterInsights: true,
    privateMessagesEncrypted: true,
    shareActivityStatus: true,
    allowDirectMessages: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const privacyOptions = [
    {
      key: 'shareTasksWithClusters' as const,
      title: 'Share Tasks with Clusters',
      description: 'Allow your clusters to see tasks you mark as shared',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      key: 'shareCalendarWithClusters' as const,
      title: 'Share Calendar Events',
      description: 'Show your availability and shared events to cluster members',
      icon: Eye,
      color: 'text-green-600'
    },
    {
      key: 'allowClusterInsights' as const,
      title: 'Cluster AI Insights',
      description: 'Let JUNO generate insights based on cluster activity',
      icon: Shield,
      color: 'text-purple-600'
    },
    {
      key: 'privateMessagesEncrypted' as const,
      title: 'End-to-End Encryption',
      description: 'All private messages are encrypted and only you can read them',
      icon: Lock,
      color: 'text-red-600',
      locked: true
    },
    {
      key: 'shareActivityStatus' as const,
      title: 'Activity Status',
      description: 'Show when you\'re active or away to cluster members',
      icon: Eye,
      color: 'text-orange-600'
    },
    {
      key: 'allowDirectMessages' as const,
      title: 'Direct Messages',
      description: 'Allow cluster members to send you direct messages',
      icon: Users,
      color: 'text-indigo-600'
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
            Privacy & Security
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Control what information you share with your clusters and how JUNO uses your data.
          </p>
        </div>

        {/* Privacy Overview */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-6 mb-8 text-white">
          <div className="flex items-center space-x-3 mb-3">
            <Shield className="w-8 h-8" />
            <h2 className="text-xl font-semibold">Your Privacy is Protected</h2>
          </div>
          <p className="text-green-100">
            All personal data is encrypted and you have complete control over what's shared with your clusters. 
            JUNO only processes data to provide you with better insights and automation.
          </p>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Data Sharing Preferences
          </h2>
          
          <div className="space-y-6">
            {privacyOptions.map((option) => (
              <div
                key={option.key}
                className="flex items-start justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg bg-white dark:bg-gray-600 ${option.color}`}>
                    <option.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                      {option.title}
                      {option.locked && (
                        <span className="ml-2 text-xs bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 px-2 py-1 rounded-full">
                          Always On
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {option.description}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => !option.locked && toggleSetting(option.key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                    option.locked 
                      ? 'bg-green-500 cursor-not-allowed' 
                      : settings[option.key] 
                        ? 'bg-green-500' 
                        : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  disabled={option.locked}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings[option.key] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-start space-x-3">
            <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                Security Information
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Your personal tasks, private messages, and sensitive data are always encrypted and never shared 
                without your explicit permission. Only you and JUNO can access your private information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;