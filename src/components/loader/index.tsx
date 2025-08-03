import React from "react"
import Spinner, { DotsSpinner, PulseSpinner, GearSpinner, RippleSpinner, BounceSpinner } from "../spinner/index"
import ChatbotSpinner, { EmailSpinner, ProcessingSpinner, LoadingSpinner } from "../spinner/chatbot-spinner"

interface LoaderProps {
  // Loading state
  loading?: boolean
  
  // Spinner configuration
  variant?: 'dots' | 'pulse' | 'gear' | 'ripple' | 'bounce' | 'chatbot' | 'email' | 'processing'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  
  // Display options
  overlay?: boolean
  fullScreen?: boolean
  centered?: boolean
  
  // Content
  message?: string
  children?: React.ReactNode
  
  // Styling
  className?: string
  backdropClassName?: string
}

const Loader: React.FC<LoaderProps> = ({
  loading = true,
  variant = 'chatbot',
  size = 'md',
  color = '#3B82F6',
  overlay = false,
  fullScreen = false,
  centered = true,
  message,
  children,
  className = '',
  backdropClassName = ''
}) => {
  // Don't render anything if not loading
  if (!loading) {
    return <>{children}</>
  }

  // Render spinner based on variant
  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return <DotsSpinner size={size} color={color} />
      case 'pulse':
        return <PulseSpinner size={size} color={color} />
      case 'gear':
        return <GearSpinner size={size} color={color} />
      case 'ripple':
        return <RippleSpinner size={size} color={color} />
      case 'bounce':
        return <BounceSpinner size={size} color={color} />
      case 'email':
        return <EmailSpinner size={size} color={color} />
      case 'processing':
        return <ProcessingSpinner size={size} color={color} />
      case 'chatbot':
      default:
        return <ChatbotSpinner size={size} color={color} message={message} />
    }
  }

  // Base spinner component
  const spinnerComponent = (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {renderSpinner()}
      {message && variant !== 'chatbot' && (
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 font-medium">
          {message}
        </p>
      )}
    </div>
  )

  // Full screen loader
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900">
        {spinnerComponent}
      </div>
    )
  }

  // Overlay loader
  if (overlay) {
    return (
      <div className="relative">
        {children}
        <div className={`absolute inset-0 z-10 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm ${backdropClassName}`}>
          {spinnerComponent}
        </div>
      </div>
    )
  }

  // Inline loader
  if (centered) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        {spinnerComponent}
      </div>
    )
  }

  // Simple inline loader
  return spinnerComponent
}

// Specialized loader components for common use cases
export const FullScreenLoader: React.FC<Omit<LoaderProps, 'fullScreen'>> = (props) => (
  <Loader fullScreen={true} {...props} />
)

export const OverlayLoader: React.FC<Omit<LoaderProps, 'overlay'>> = (props) => (
  <Loader overlay={true} {...props} />
)

export const InlineLoader: React.FC<Omit<LoaderProps, 'centered' | 'overlay' | 'fullScreen'>> = (props) => (
  <Loader centered={false} {...props} />
)

// Email-specific loaders
export const EmailLoader: React.FC<Omit<LoaderProps, 'variant'>> = (props) => (
  <Loader variant="email" message="Sending email..." {...props} />
)

export const ProcessingLoader: React.FC<Omit<LoaderProps, 'variant'>> = (props) => (
  <Loader variant="processing" message="Processing request..." {...props} />
)

export const ChatbotLoader: React.FC<Omit<LoaderProps, 'variant'>> = (props) => (
  <Loader variant="chatbot" message="AI is thinking..." {...props} />
)

// Button loader for form submissions
interface ButtonLoaderProps {
  loading?: boolean
  children: React.ReactNode
  className?: string
}

export const ButtonLoader: React.FC<ButtonLoaderProps> = ({ 
  loading = false, 
  children, 
  className = '' 
}) => {
  return (
    <button 
      className={`relative ${className}`} 
      disabled={loading}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <DotsSpinner size="sm" color="currentColor" />
        </div>
      )}
      <span className={loading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
    </button>
  )
}

// Page loader for route transitions
export const PageLoader: React.FC<{ message?: string }> = ({ message = "Loading page..." }) => (
  <FullScreenLoader 
    variant="chatbot" 
    size="lg" 
    message={message}
  />
)

// Form loader for form submissions
export const FormLoader: React.FC<{ loading?: boolean; children: React.ReactNode }> = ({ 
  loading = false, 
  children 
}) => (
  <OverlayLoader 
    loading={loading} 
    variant="processing" 
    size="md"
    message="Submitting form..."
  >
    {children}
  </OverlayLoader>
)

export default Loader