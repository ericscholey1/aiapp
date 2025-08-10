import React from 'react';
import { Users, Calendar, CheckSquare, TrendingUp, ArrowLeft, UserPlus } from 'lucide-react';
import { Cluster } from '../../types';

interface ClusterViewProps {
  clusters: Cluster[];
  onBack: () => void;
}

const ClusterView: React.FC<ClusterViewProps> = ({ clusters, onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Your Clusters
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Connect and collaborate with others who share your last name
              </p>
            </div>
            <button className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-blue-600 transition-colors">
              <UserPlus className="w-5 h-5" />
              <span>Invite Members</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {clusters.map((cluster) => (
            <div
              key={cluster.id}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {cluster.name}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {cluster.members.length} members
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm rounded-full">
                  {cluster.lastName}
                </span>
              </div>

              {/* Cluster Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <CheckSquare className="w-5 h-5 text-green-500 mx-auto mb-1" />
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {cluster.sharedTasks.length}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Tasks</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">12</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Events</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">85%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Active</div>
                </div>
              </div>

              {/* Shared Tasks */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Recent Shared Tasks
                </h3>
                <div className="space-y-2">
                  {cluster.sharedTasks.slice(0, 2).map((task) => (
                    <div
                      key={task.id}
                      className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {task.title}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          task.priority === 'high' 
                            ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                            : task.priority === 'medium'
                            ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400'
                            : 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Updates */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Recent Updates
                </h3>
                <div className="space-y-2">
                  {cluster.recentUpdates.slice(0, 3).map((update, index) => (
                    <div
                      key={index}
                      className="text-sm text-gray-600 dark:text-gray-400 flex items-center space-x-2"
                    >
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                      <span>{update}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {clusters.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No clusters yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Start connecting with others who share your last name
            </p>
            <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-blue-600 transition-colors">
              Create Your First Cluster
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClusterView;