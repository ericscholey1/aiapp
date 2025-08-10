import React from 'react';
import { User, Task, CalendarEvent, AIInsight } from '../../types';
import HeroAgentCard from './HeroAgentCard';
import ActiveTasksBoard from './ActiveTasksBoard';
import UpcomingSuggestedTasks from './UpcomingSuggestedTasks';
import ProgressMetrics from './ProgressMetrics';
import AgentGrowthPanel from './AgentGrowthPanel';
import FloatingAskJuno from './FloatingAskJuno';
import SocialMediaManager from './SocialMediaManager';
import MarketplaceManager from './MarketplaceManager';

interface DashboardProps {
  user: User;
  tasks: Task[];
  events: CalendarEvent[];
  insights: AIInsight[];
  onToggleTask: (taskId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  user, 
  tasks, 
  events, 
  insights, 
  onToggleTask 
}) => {
  const handleAskJuno = () => {
    console.log('Ask JUNO clicked');
  };

  const handleAddTask = () => {
    console.log('Add Task clicked');
  };

  const handleSchedule = () => {
    console.log('Schedule clicked');
  };

  const handleAutomate = () => {
    console.log('Automate clicked');
  };

  const handleAcceptTask = (taskId: string) => {
    console.log('Accept task:', taskId);
  };

  const handleSnoozeTask = (taskId: string) => {
    console.log('Snooze task:', taskId);
  };

  const handleDelegateTask = (taskId: string) => {
    console.log('Delegate task:', taskId);
  };

  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
    console.log('Update task:', taskId, updates);
  };

  // Filter tasks by category
  const socialTasks = tasks.filter(task => task.category === 'social' || task.category === 'business');
  const marketplaceTasks = tasks.filter(task => task.category === 'marketplace');
  const regularTasks = tasks.filter(task => !['social', 'business', 'marketplace'].includes(task.category));

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto p-6 space-y-8">
          {/* Hero Agent Card */}
          <HeroAgentCard
            user={user}
            onAskJuno={handleAskJuno}
            onAddTask={handleAddTask}
            onSchedule={handleSchedule}
            onAutomate={handleAutomate}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Tasks */}
            <div className="xl:col-span-2 space-y-8">
              <ActiveTasksBoard tasks={regularTasks} onToggleTask={onToggleTask} />
              
              {/* Social Media Management */}
              {socialTasks.length > 0 && (
                <SocialMediaManager
                  socialTasks={socialTasks}
                  onUpdateTask={handleUpdateTask}
                  onCompleteTask={onToggleTask}
                />
              )}
              
              {/* Marketplace Management */}
              {marketplaceTasks.length > 0 && (
                <MarketplaceManager
                  marketplaceTasks={marketplaceTasks}
                  onUpdateTask={handleUpdateTask}
                  onCompleteTask={onToggleTask}
                />
              )}
              
              <UpcomingSuggestedTasks
                onAcceptTask={handleAcceptTask}
                onSnoozeTask={handleSnoozeTask}
                onDelegateTask={handleDelegateTask}
              />
            </div>

            {/* Right Column - Metrics & Growth */}
            <div className="space-y-8">
              <ProgressMetrics
                completionRate={87}
                currentStreak={12}
                timeSavedThisWeek={8.5}
                tasksCompletedThisWeek={24}
              />
              <AgentGrowthPanel personality={user.personality} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Ask JUNO Button */}
      <FloatingAskJuno personality={user.personality} />
    </>
  );
};

export default Dashboard;