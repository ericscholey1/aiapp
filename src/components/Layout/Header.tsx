import React from 'react';
import { Moon, Sun, Settings, Bell } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { User } from '../../types';

interface HeaderProps {
  user: User;
  onSettingsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onSettingsClick }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 sticky top-0 z-50 backdrop-blur-sm bg-white/95 dark:bg-gray-800/95">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">J</span>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              {user.agentName}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
              {user.personality} mode
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? 
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" /> : 
              <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            }
          </button>
          
          <button 
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          
          <button 
            onClick={onSettingsClick}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>

          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">
              {user.firstName.charAt(0)}{user.lastName.charAt(0)}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;