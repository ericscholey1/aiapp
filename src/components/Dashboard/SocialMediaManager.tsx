import React, { useState } from 'react';
import { 
  Instagram, 
  Facebook, 
  Linkedin, 
  Twitter, 
  Calendar, 
  Clock, 
  TrendingUp, 
  MessageSquare,
  Edit3,
  Send,
  Eye,
  Heart,
  Share2,
  Hash,
  Image as ImageIcon,
  Sparkles
} from 'lucide-react';
import { Task } from '../../types';

interface SocialMediaManagerProps {
  socialTasks: Task[];
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onCompleteTask: (taskId: string) => void;
}

const SocialMediaManager: React.FC<SocialMediaManagerProps> = ({
  socialTasks,
  onUpdateTask,
  onCompleteTask
}) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editingContent, setEditingContent] = useState(false);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return Instagram;
      case 'facebook': return Facebook;
      case 'linkedin': return Linkedin;
      case 'twitter': return Twitter;
      default: return MessageSquare;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'instagram': return 'from-pink-500 to-purple-500';
      case 'facebook': return 'from-blue-600 to-blue-700';
      case 'linkedin': return 'from-blue-700 to-blue-800';
      case 'twitter': return 'from-sky-400 to-sky-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const mockEngagementStats = {
    instagram: { likes: 127, comments: 23, shares: 8 },
    facebook: { likes: 89, comments: 15, shares: 12 },
    linkedin: { likes: 156, comments: 31, shares: 24 },
    twitter: { likes: 203, comments: 45, shares: 67 }
  };

  const aiSuggestions = [
    "Post performs 40% better when published between 6-8 PM",
    "Adding 3-5 hashtags increases engagement by 25%",
    "Questions in captions boost comments by 60%",
    "Stories with polls get 2x more interaction"
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl">
            <Share2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Social Media Hub</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Manage posts across all platforms</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-pink-500" />
          <span className="text-sm text-pink-600 dark:text-pink-400 font-medium">AI-Powered</span>
        </div>
      </div>

      {/* Platform Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {['instagram', 'facebook', 'linkedin', 'twitter'].map((platform) => {
          const Icon = getPlatformIcon(platform);
          const stats = mockEngagementStats[platform as keyof typeof mockEngagementStats];
          const platformTasks = socialTasks.filter(task => task.socialPlatform === platform);
          
          return (
            <div key={platform} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 bg-gradient-to-r ${getPlatformColor(platform)} rounded-lg`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 px-2 py-1 rounded-full">
                  {platformTasks.length} pending
                </span>
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white capitalize mb-2">{platform}</h3>
              <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <Heart className="w-3 h-3" />
                  <span>{stats.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageSquare className="w-3 h-3" />
                  <span>{stats.comments}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Share2 className="w-3 h-3" />
                  <span>{stats.shares}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Social Tasks */}
      <div className="space-y-4">
        {socialTasks.map((task) => {
          const Icon = getPlatformIcon(task.socialPlatform || '');
          return (
            <div
              key={task.id}
              className="group p-5 bg-gradient-to-r from-gray-50 to-gray-50 dark:from-gray-700 dark:to-gray-700 rounded-2xl border border-gray-200 dark:border-gray-600 hover:from-pink-50 hover:to-purple-50 dark:hover:from-pink-900/20 dark:hover:to-purple-900/20 hover:border-pink-300 dark:hover:border-pink-600 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedTask(task)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`p-2 bg-gradient-to-r ${getPlatformColor(task.socialPlatform || '')} rounded-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                        {task.title}
                      </h3>
                      {task.tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {task.description}
                    </p>
                    {task.postContent && (
                      <div className="bg-white dark:bg-gray-600 rounded-lg p-3 mb-2">
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                          {task.postContent.text}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                          <Hash className="w-3 h-3" />
                          <span>{task.postContent.hashtags.slice(0, 3).join(' ')}</span>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{task.estimatedTime}</span>
                      </div>
                      {task.postContent?.scheduledTime && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>Scheduled for {new Date(task.postContent.scheduledTime).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCompleteTask(task.id);
                    }}
                    className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition-colors"
                  >
                    Post Now
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTask(task);
                      setEditingContent(true);
                    }}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Insights */}
      <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
        <div className="flex items-center space-x-2 mb-3">
          <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-semibold text-blue-900 dark:text-blue-100">AI Insights & Tips</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {aiSuggestions.map((suggestion, index) => (
            <div key={index} className="text-sm text-blue-800 dark:text-blue-200 bg-white dark:bg-blue-900/20 rounded-lg p-3">
              {suggestion}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaManager;