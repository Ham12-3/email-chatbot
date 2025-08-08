
"use client"
import { useAuthContextHook } from '@/context/use-auth-context'
import { Button } from '@/components/ui/button'
import { useSignUpForm } from '@/hooks/sign-up/use-sign-up'
import { useFormContext } from 'react-hook-form'
import React from 'react'
import { ArrowLeft, ArrowRight, Loader2, CheckCircle, UserPlus } from 'lucide-react'

const ButtonHandler = () => {
    const { setCurrentStep, currentStep } = useAuthContextHook()
    const { onSubmit, verifyOTP, loading } = useSignUpForm()
    const { watch, trigger } = useFormContext()
    
    // Only watch specific fields to prevent unnecessary re-renders
    const email = watch('email')
    const confirmEmail = watch('confirmEmail') 
    const password = watch('password')
    const confirmPassword = watch('confirmPassword')
    const otp = watch('otp')
    
    const handleContinue = async () => {
        if (currentStep === 1) {
            // Validate step 1 (type selection)
            const isValid = await trigger(['type'])
            if (isValid) {
                setCurrentStep(2)
            }
        } else if (currentStep === 2) {
            // Validate step 2 (account details) and create Clerk account
            const isValid = await trigger(['fullName', 'email', 'confirmEmail', 'password', 'confirmPassword'])
            if (isValid && email === confirmEmail && password === confirmPassword) {
                // Submit to Clerk
                onSubmit()
            }
        } else if (currentStep === 3) {
            // Verify OTP
            if (otp && otp.length === 6) {
                await verifyOTP(otp)
            }
        }
    }
    
    const getButtonText = () => {
        if (loading) return 'Processing...'
        if (currentStep === 2) return 'Create Account'
        if (currentStep === 3) return 'Verify & Complete'
        return 'Continue'
    }

    
    return (
        <div className="flex justify-between items-center pt-2">
            {currentStep > 1 && (
                <Button 
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    disabled={loading}
                    className="h-12 px-6 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-medium rounded-xl transition-all duration-200 hover:bg-gray-50"
                >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back
                </Button>
            )}
            
            <Button 
                type="button"
                className={`h-12 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] ${
                    currentStep === 1 ? 'ml-auto' : ''
                }`}
                onClick={handleContinue}
                disabled={loading}
            >
                {currentStep === 3 ? (
                    <>
                        {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <CheckCircle className="mr-2 h-5 w-5" />}
                        {getButtonText()}
                    </>
                ) : currentStep === 2 ? (
                    <>
                        {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <UserPlus className="mr-2 h-5 w-5" />}
                        {getButtonText()}
                    </>
                ) : (
                    <>
                        {getButtonText()}
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                )}
            </Button>
        </div>
    )
}

export default ButtonHandler