import React from 'react'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'dots' | 'pulse' | 'gear' | 'ripple' | 'bounce'
  color?: string
  className?: string
}

const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'md', 
  variant = 'dots', 
  color = '#3B82F6',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return (
          <svg 
            className={`animate-spin ${sizeClasses[size]} ${className}`}
            viewBox="0 0 24 24" 
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle 
              cx="12" 
              cy="12" 
              r="10" 
              stroke={color} 
              strokeWidth="2" 
              strokeLinecap="round"
              strokeDasharray="31.416"
              strokeDashoffset="31.416"
              className="animate-spin"
              style={{
                animation: 'spin 1s linear infinite',
                transformOrigin: 'center'
              }}
            />
            <circle 
              cx="12" 
              cy="12" 
              r="6" 
              stroke={color} 
              strokeWidth="2" 
              strokeLinecap="round"
              strokeDasharray="18.85"
              strokeDashoffset="18.85"
              className="animate-spin"
              style={{
                animation: 'spin 1.5s linear infinite reverse',
                transformOrigin: 'center'
              }}
            />
            <circle 
              cx="12" 
              cy="12" 
              r="2" 
              fill={color}
              className="animate-pulse"
            />
          </svg>
        )

      case 'pulse':
        return (
          <svg 
            className={`${sizeClasses[size]} ${className}`}
            viewBox="0 0 24 24" 
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle 
              cx="12" 
              cy="12" 
              r="10" 
              fill={color}
              className="animate-pulse"
              style={{ opacity: 0.3 }}
            />
            <circle 
              cx="12" 
              cy="12" 
              r="6" 
              fill={color}
              className="animate-pulse"
              style={{ 
                animationDelay: '0.2s',
                opacity: 0.6 
              }}
            />
            <circle 
              cx="12" 
              cy="12" 
              r="2" 
              fill={color}
              className="animate-pulse"
              style={{ 
                animationDelay: '0.4s',
                opacity: 1 
              }}
            />
          </svg>
        )

      case 'gear':
        return (
          <svg 
            className={`animate-spin ${sizeClasses[size]} ${className}`}
            viewBox="0 0 24 24" 
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M12 2L14.5 8.5L21 9L16 14L17.5 20.5L12 17L6.5 20.5L8 14L3 9L9.5 8.5L12 2Z" 
              fill={color}
              className="animate-spin"
              style={{
                animation: 'spin 2s linear infinite',
                transformOrigin: 'center'
              }}
            />
            <circle 
              cx="12" 
              cy="12" 
              r="3" 
              fill="white"
            />
          </svg>
        )

      case 'ripple':
        return (
          <svg 
            className={`${sizeClasses[size]} ${className}`}
            viewBox="0 0 24 24" 
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle 
              cx="12" 
              cy="12" 
              r="2" 
              stroke={color}
              strokeWidth="2"
              className="animate-ping"
            />
            <circle 
              cx="12" 
              cy="12" 
              r="6" 
              stroke={color}
              strokeWidth="2"
              className="animate-ping"
              style={{ animationDelay: '0.2s' }}
            />
            <circle 
              cx="12" 
              cy="12" 
              r="10" 
              stroke={color}
              strokeWidth="2"
              className="animate-ping"
              style={{ animationDelay: '0.4s' }}
            />
          </svg>
        )

      case 'bounce':
        return (
          <svg 
            className={`${sizeClasses[size]} ${className}`}
            viewBox="0 0 24 24" 
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle 
              cx="6" 
              cy="12" 
              r="2" 
              fill={color}
              className="animate-bounce"
            />
            <circle 
              cx="12" 
              cy="12" 
              r="2" 
              fill={color}
              className="animate-bounce"
              style={{ animationDelay: '0.1s' }}
            />
            <circle 
              cx="18" 
              cy="12" 
              r="2" 
              fill={color}
              className="animate-bounce"
              style={{ animationDelay: '0.2s' }}
            />
          </svg>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex items-center justify-center">
      {renderSpinner()}
    </div>
  )
}

// Export individual spinner components for specific use cases
export const DotsSpinner: React.FC<Omit<SpinnerProps, 'variant'>> = (props) => (
  <Spinner variant="dots" {...props} />
)

export const PulseSpinner: React.FC<Omit<SpinnerProps, 'variant'>> = (props) => (
  <Spinner variant="pulse" {...props} />
)

export const GearSpinner: React.FC<Omit<SpinnerProps, 'variant'>> = (props) => (
  <Spinner variant="gear" {...props} />
)

export const RippleSpinner: React.FC<Omit<SpinnerProps, 'variant'>> = (props) => (
  <Spinner variant="ripple" {...props} />
)

export const BounceSpinner: React.FC<Omit<SpinnerProps, 'variant'>> = (props) => (
  <Spinner variant="bounce" {...props} />
)

export default Spinner
