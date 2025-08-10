import React, { useState } from 'react';
import { 
  ShoppingBag, 
  DollarSign, 
  Package, 
  Clock, 
  MapPin, 
  Star,
  TrendingUp,
  Eye,
  MessageSquare,
  Truck,
  Edit3,
  Camera,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { Task } from '../../types';

interface MarketplaceManagerProps {
  marketplaceTasks: Task[];
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onCompleteTask: (taskId: string) => void;
}

const MarketplaceManager: React.FC<MarketplaceManagerProps> = ({
  marketplaceTasks,
  onUpdateTask,
  onCompleteTask
}) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'new': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'like-new': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      case 'good': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'fair': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400';
      case 'poor': return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const mockMarketplaceStats = {
    totalListings: 8,
    activeBids: 3,
    soldThisWeek: 2,
    totalEarnings: 340,
    avgResponseTime: '2h',
    rating: 4.8
  };

  const aiPricingSuggestions = [
    { item: 'Vintage Camera', suggested: 180, current: 200, reason: 'Similar items sold for $175-185 this week' },
    { item: 'Desk Lamp', suggested: 45, current: 50, reason: 'Price 10% above market average' },
    { item: 'Books Bundle', suggested: 25, current: 30, reason: 'High competition in this category' }
  ];

  const urgentReminders = [
    { type: 'shipping', message: '2 items need to be shipped today', priority: 'high' },
    { type: 'expiring', message: '1 listing expires in 2 days', priority: 'medium' },
    { type: 'messages', message: '3 buyer inquiries pending', priority: 'high' }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Marketplace Hub</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Manage your listings and sales</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-green-500" />
          <span className="text-sm text-green-600 dark:text-green-400 font-medium">Smart Pricing</span>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl">
          <div className="flex items-center space-x-2 mb-2">
            <ShoppingBag className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-xs text-green-600 dark:text-green-400 font-medium">Active</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{mockMarketplaceStats.totalListings}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Listings</div>
        </div>

        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
          <div className="flex items-center space-x-2 mb-2">
            <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Bids</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{mockMarketplaceStats.activeBids}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Active</div>
        </div>

        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl">
          <div className="flex items-center space-x-2 mb-2">
            <Package className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">Sold</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{mockMarketplaceStats.soldThisWeek}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">This week</div>
        </div>

        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">Earnings</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">${mockMarketplaceStats.totalEarnings}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Total</div>
        </div>

        <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-2xl">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">Response</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{mockMarketplaceStats.avgResponseTime}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Avg time</div>
        </div>

        <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-2xl">
          <div className="flex items-center space-x-2 mb-2">
            <Star className="w-4 h-4 text-pink-600 dark:text-pink-400" />
            <span className="text-xs text-pink-600 dark:text-pink-400 font-medium">Rating</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{mockMarketplaceStats.rating}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Stars</div>
        </div>
      </div>

      {/* Urgent Reminders */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Urgent Reminders</h3>
        <div className="space-y-3">
          {urgentReminders.map((reminder, index) => (
            <div
              key={index}
              className={`p-4 rounded-2xl border-l-4 ${
                reminder.priority === 'high' 
                  ? 'bg-red-50 dark:bg-red-900/20 border-red-500' 
                  : 'bg-orange-50 dark:bg-orange-900/20 border-orange-500'
              }`}
            >
              <div className="flex items-center space-x-3">
                <AlertCircle className={`w-5 h-5 ${
                  reminder.priority === 'high' ? 'text-red-600 dark:text-red-400' : 'text-orange-600 dark:text-orange-400'
                }`} />
                <span className="text-sm font-medium text-gray-900 dark:text-white">{reminder.message}</span>
                <button className="ml-auto px-3 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  Handle
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marketplace Tasks */}
      <div className="space-y-4 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active Listings & Tasks</h3>
        {marketplaceTasks.map((task) => (
          <div
            key={task.id}
            className="group p-5 bg-gradient-to-r from-gray-50 to-gray-50 dark:from-gray-700 dark:to-gray-700 rounded-2xl border border-gray-200 dark:border-gray-600 hover:from-green-50 hover:to-blue-50 dark:hover:from-green-900/20 dark:hover:to-blue-900/20 hover:border-green-300 dark:hover:border-green-600 transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedTask(task)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4 flex-1">
                {task.marketplaceItem?.images?.[0] && (
                  <img
                    src={task.marketplaceItem.images[0]}
                    alt={task.marketplaceItem.title}
                    className="w-16 h-16 object-cover rounded-xl"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
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
                  {task.marketplaceItem && (
                    <div className="bg-white dark:bg-gray-600 rounded-lg p-3 mb-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900 dark:text-white">
                          ${task.marketplaceItem.price}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getConditionColor(task.marketplaceItem.condition)}`}>
                          {task.marketplaceItem.condition}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{task.marketplaceItem.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Package className="w-3 h-3" />
                          <span>{task.marketplaceItem.category}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{task.estimatedTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>24 views</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="w-3 h-3" />
                      <span>3 inquiries</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {task.category === 'marketplace' && task.marketplaceItem ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCompleteTask(task.id);
                    }}
                    className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition-colors"
                  >
                    Publish
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCompleteTask(task.id);
                    }}
                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors"
                  >
                    <Truck className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTask(task);
                  }}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <Edit3 className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Pricing Suggestions */}
      <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl border border-green-200 dark:border-green-800">
        <div className="flex items-center space-x-2 mb-3">
          <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
          <h3 className="font-semibold text-green-900 dark:text-green-100">Smart Pricing Suggestions</h3>
        </div>
        <div className="space-y-3">
          {aiPricingSuggestions.map((suggestion, index) => (
            <div key={index} className="bg-white dark:bg-green-900/20 rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-gray-900 dark:text-white">{suggestion.item}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400 line-through">${suggestion.current}</span>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">${suggestion.suggested}</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">{suggestion.reason}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketplaceManager;