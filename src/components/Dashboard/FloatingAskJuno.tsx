import React, { useState } from 'react';
import { MessageSquare, Send, X, Sparkles } from 'lucide-react';

interface FloatingAskJunoProps {
  personality: string;
}

const FloatingAskJuno: React.FC<FloatingAskJunoProps> = ({ personality }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<Array<{
    type: 'user' | 'juno';
    message: string;
    timestamp: Date;
  }>>([]);

  const getPersonalityResponse = (userMessage: string) => {
    const responses = {
      friendly: [
        "I'd be happy to help you with that! 😊",
        "Great question! Let me think about the best way to approach this.",
        "I love helping you figure things out! Here's what I suggest..."
      ],
      professional: [
        "I'll analyze this request and provide you with optimal solutions.",
        "Based on your requirements, here are my recommendations:",
        "Let me process this information and deliver actionable insights."
      ],
      casual: [
        "Sure thing! Let me see what I can do for you.",
        "No problem! Here's what I'm thinking...",
        "Got it! Let me help you sort this out."
      ],
      expert: [
        "Analyzing your query using advanced pattern recognition...",
        "Based on comprehensive data analysis, I recommend:",
        "Applying machine learning insights to your specific use case..."
      ]
    };

    const personalityResponses = responses[personality as keyof typeof responses] || responses.friendly;
    return personalityResponses[Math.floor(Math.random() * personalityResponses.length)];
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage = { type: 'user' as const, message, timestamp: new Date() };
    const junoResponse = { 
      type: 'juno' as const, 
      message: getPersonalityResponse(message), 
      timestamp: new Date() 
    };

    setConversation(prev => [...prev, userMessage, junoResponse]);
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 z-40"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
          <div className="absolute bottom-6 right-6 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-3xl shadow-2xl flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 rounded-t-3xl bg-gradient-to-r from-green-500 to-blue-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Ask JUNO</h3>
                    <p className="text-xs text-green-100 capitalize">{personality} mode</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Conversation */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {conversation.length === 0 ? (
                <div className="text-center py-8">
                  <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Hi! I'm JUNO. Ask me anything about your tasks, schedule, or how I can help you be more productive.
                  </p>
                </div>
              ) : (
                conversation.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-2xl ${
                        msg.type === 'user'
                          ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <p className={`text-xs mt-1 ${
                        msg.type === 'user' ? 'text-green-100' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask JUNO anything..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="p-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-xl transition-colors disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingAskJuno;