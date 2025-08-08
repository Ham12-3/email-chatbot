import ButtonHandler from '@/components/forms/sign-up/button-handlers'
import SignUpFormProvider from '@/components/forms/sign-up/form-provider'
import RegistrationFormStep from '@/components/forms/sign-up/registration-step'
import React from 'react'
import Link from 'next/link'

const SignUp = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-lg w-full'>
        <SignUpFormProvider>
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-8 space-y-8'>
            {/* Brand Logo */}
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded"></div>
                </div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Create Account
              </h1>
              <p className="text-gray-600 mt-2">
                Join thousands of businesses using our AI chatbots
              </p>
            </div>
            
            <RegistrationFormStep/>
            <ButtonHandler/>
            
            {/* Sign In Link */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-gray-600 text-sm">
                Already have an account?{' '}
                <Link 
                  href="/auth/sign-in" 
                  className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </SignUpFormProvider>
        
        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            🔒 Your information is secure and encrypted
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp