import React from 'react'

interface ChatbotSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  className?: string
  message?: string
}

const ChatbotSpinner: React.FC<ChatbotSpinnerProps> = ({ 
  size = 'md', 
  color = '#3B82F6',
  className = '',
  message = 'Processing...'
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  }

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      {/* Main Chatbot Spinner */}
      <div className="relative">
        <svg 
          className={`${sizeClasses[size]} animate-spin`}
          viewBox="0 0 48 48" 
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer ring - email symbol */}
          <path 
            d="M8 16L24 28L40 16" 
            stroke={color} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="animate-pulse"
            style={{ opacity: 0.6 }}
          />
          
          {/* Chat bubble outline */}
          <path 
            d="M12 20C12 18.8954 12.8954 18 14 18H34C35.1046 18 36 18.8954 36 20V32C36 33.1046 35.1046 34 34 34H24L20 38V34H14C12.8954 34 12 33.1046 12 32V20Z" 
            stroke={color} 
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
            style={{ opacity: 0.8 }}
          />
          
          {/* AI dots */}
          <circle 
            cx="20" 
            cy="26" 
            r="1.5" 
            fill={color}
            className="animate-bounce"
          />
          <circle 
            cx="24" 
            cy="26" 
            r="1.5" 
            fill={color}
            className="animate-bounce"
            style={{ animationDelay: '0.1s' }}
          />
          <circle 
            cx="28" 
            cy="26" 
            r="1.5" 
            fill={color}
            className="animate-bounce"
            style={{ animationDelay: '0.2s' }}
          />
          
          {/* Spinning dots around the chat bubble */}
          <circle 
            cx="24" 
            cy="24" 
            r="18" 
            stroke={color} 
            strokeWidth="1" 
            strokeDasharray="4 4"
            fill="none"
            className="animate-spin"
            style={{
              animation: 'spin 3s linear infinite',
              opacity: 0.4
            }}
          />
          
          {/* Inner rotating element */}
          <circle 
            cx="24" 
            cy="24" 
            r="12" 
            stroke={color} 
            strokeWidth="1.5" 
            strokeLinecap="round"
            fill="none"
            className="animate-spin"
            style={{
              animation: 'spin 2s linear infinite reverse',
              opacity: 0.7
            }}
          />
        </svg>
        
        {/* Floating dots */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
          <div className="w-1 h-1 bg-blue-500 rounded-full animate-ping absolute" style={{ animationDelay: '0.5s' }}></div>
          <div className="w-1 h-1 bg-blue-600 rounded-full animate-ping absolute" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>
      
      {/* Loading message */}
      {message && (
        <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
          <span className="inline-block animate-pulse">
            {message}
          </span>
          <span className="inline-block animate-pulse" style={{ animationDelay: '0.2s' }}>.</span>
          <span className="inline-block animate-pulse" style={{ animationDelay: '0.4s' }}>.</span>
          <span className="inline-block animate-pulse" style={{ animationDelay: '0.6s' }}>.</span>
        </div>
      )}
    </div>
  )
}

// Specialized variants for different use cases
export const EmailSpinner: React.FC<Omit<ChatbotSpinnerProps, 'message'>> = (props) => (
  <ChatbotSpinner message="Sending email..." {...props} />
)

export const ProcessingSpinner: React.FC<Omit<ChatbotSpinnerProps, 'message'>> = (props) => (
  <ChatbotSpinner message="Processing request..." {...props} />
)

export const LoadingSpinner: React.FC<Omit<ChatbotSpinnerProps, 'message'>> = (props) => (
  <ChatbotSpinner message="Loading..." {...props} />
)

export default ChatbotSpinner 