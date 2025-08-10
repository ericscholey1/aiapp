import React, { useState } from 'react';
import { AppScreen, User, AgentPersonality } from './types';
import { mockUser, mockTasks, mockCalendarEvents, mockClusters, mockAIInsights } from './utils/mockData';
import { useTheme } from './hooks/useTheme';

// Components
import SignUp from './components/Auth/SignUp';
import Onboarding from './components/Auth/Onboarding';
import Dashboard from './components/Dashboard/Dashboard';
import Header from './components/Layout/Header';
import PersonalitySelector from './components/Settings/PersonalitySelector';
import ClusterView from './components/Clusters/ClusterView';
import PrivacySettings from './components/Settings/PrivacySettings';

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('signup');
  const [user, setUser] = useState<User>(mockUser);
  const [tasks, setTasks] = useState(mockTasks);
  const { theme } = useTheme();

  const handleSignUp = (firstName: string, lastName: string, email: string) => {
    const newUser: User = {
      id: '1',
      firstName,
      lastName,
      email,
      agentName: `JUNO – Works for ${lastName}`,
      personality: 'friendly',
      clusters: [`${lastName.toLowerCase()}-family`, `${lastName.toLowerCase()}-work`]
    };
    setUser(newUser);
    setCurrentScreen('onboarding');
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen('dashboard');
  };

  const handleToggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const handlePersonalityChange = (personality: AgentPersonality) => {
    setUser(prev => ({ ...prev, personality }));
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'signup':
        return <SignUp onSignUp={handleSignUp} />;
      
      case 'onboarding':
        return (
          <Onboarding 
            onComplete={handleOnboardingComplete}
            agentName={user.agentName}
          />
        );
      
      case 'dashboard':
        return (
          <>
            <Header 
              user={user} 
              onSettingsClick={() => setCurrentScreen('personality')} 
            />
            <Dashboard
              user={user}
              tasks={tasks}
              events={mockCalendarEvents}
              insights={mockAIInsights}
              onToggleTask={handleToggleTask}
            />
          </>
        );
      
      case 'personality':
        return (
          <PersonalitySelector
            currentPersonality={user.personality}
            onPersonalityChange={handlePersonalityChange}
            onBack={() => setCurrentScreen('dashboard')}
          />
        );
      
      case 'clusters':
        return (
          <ClusterView
            clusters={mockClusters}
            onBack={() => setCurrentScreen('dashboard')}
          />
        );
      
      case 'privacy':
        return (
          <PrivacySettings
            onBack={() => setCurrentScreen('dashboard')}
          />
        );
      
      default:
        return <SignUp onSignUp={handleSignUp} />;
    }
  };

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        {renderScreen()}
      </div>
    </div>
  );
}

export default App;