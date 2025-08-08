'use client'

import { useAuthContextHook } from '@/context/use-auth-context'
import React, { useState, useEffect, useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import TypeSelectionForm from './type-selection-form'
import { User, Mail, Lock, Eye, EyeOff, Shield } from 'lucide-react'

type Props = Record<string, never>

const RegistrationFormStep = (props: Props) => {
    const {
        register , formState : {errors},setValue
    } = useFormContext()
    const {currentStep } = useAuthContextHook()
    const [onOTP,setOnOTP] = useState<string>("")
    const [onUserType, setOnUserType] = useState<'owner' | 'individual'>("owner")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [focusedField, setFocusedField] = useState<string | null>(null)
    
    // Fix: Only update setValue when onOTP actually changes
    useEffect(() => {
        setValue('otp', onOTP)
    }, [onOTP, setValue])

    // Memoized style calculations to prevent re-renders
    const getInputClassName = useCallback((fieldName: string, hasError: boolean, isPassword: boolean = false) => {
        const paddingClass = isPassword ? "pr-12" : "pr-4"
        const baseClasses = `w-full pl-12 ${paddingClass} py-4 bg-gray-50/50 border-2 rounded-xl text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:bg-white`
        
        if (focusedField === fieldName) {
            return `${baseClasses} border-blue-500 shadow-lg shadow-blue-100`
        } else if (hasError) {
            return `${baseClasses} border-red-500 shadow-lg shadow-red-100`
        } else {
            return `${baseClasses} border-gray-200 hover:border-gray-300`
        }
    }, [focusedField])

    // Optimized OTP change handler
    const handleOTPChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        e.target.value = value;
        setOnOTP(value);
    }, [])

switch(currentStep){
    case 1:
        return (
            <TypeSelectionForm
                register={register}
                userType={onUserType}
                setUserType={setOnUserType}
            />
        )
    case 2:
        return (
            <div className="space-y-8">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        Account Details
                    </h2>
                    <p className="text-gray-600 text-base">
                        Create your secure account credentials
                    </p>
                </div>
                
                <div className="space-y-6">
                    {/* Full Name Field */}
                    <div className="space-y-2">
                        <div className="relative">
                            <User className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors ${
                                focusedField === 'fullName' ? 'text-blue-500' : 'text-gray-400'
                            }`} />
                            <input
                                {...register('fullName', { required: 'Full name is required' })}
                                type="text"
                                onFocus={() => setFocusedField('fullName')}
                                onBlur={() => setFocusedField(null)}
                                className={getInputClassName('fullName', !!errors.fullName)}
                                placeholder="Full name"
                            />
                        </div>
                        {errors.fullName && (
                            <p className="text-red-500 text-sm mt-1">{errors.fullName.message as string}</p>
                        )}
                    </div>
                    
                    {/* Email Field */}
                    <div className="space-y-2">
                        <div className="relative">
                            <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors ${
                                focusedField === 'email' ? 'text-blue-500' : 'text-gray-400'
                            }`} />
                            <input
                                {...register('email', { 
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: 'Please enter a valid email'
                                    }
                                })}
                                type="email"
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField(null)}
                                className={getInputClassName('email', !!errors.email)}
                                placeholder="Email address"
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>
                        )}
                    </div>
                    
                    {/* Confirm Email Field */}
                    <div className="space-y-2">
                        <div className="relative">
                            <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors ${
                                focusedField === 'confirmEmail' ? 'text-blue-500' : 'text-gray-400'
                            }`} />
                            <input
                                {...register('confirmEmail', { required: 'Please confirm your email' })}
                                type="email"
                                onFocus={() => setFocusedField('confirmEmail')}
                                onBlur={() => setFocusedField(null)}
                                className={getInputClassName('confirmEmail', !!errors.confirmEmail)}
                                placeholder="Confirm email address"
                            />
                        </div>
                        {errors.confirmEmail && (
                            <p className="text-red-500 text-sm mt-1">{errors.confirmEmail.message as string}</p>
                        )}
                    </div>
                    
                    {/* Password Field */}
                    <div className="space-y-2">
                        <div className="relative">
                            <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors ${
                                focusedField === 'password' ? 'text-blue-500' : 'text-gray-400'
                            }`} />
                            <input
                                {...register('password', { 
                                    required: 'Password is required',
                                    minLength: {
                                        value: 8,
                                        message: 'Password must be at least 8 characters'
                                    }
                                })}
                                type={showPassword ? 'text' : 'password'}
                                onFocus={() => setFocusedField('password')}
                                onBlur={() => setFocusedField(null)}
                                className={getInputClassName('password', !!errors.password, true)}
                                placeholder="Create a password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message as string}</p>
                        )}
                    </div>
                    
                    {/* Confirm Password Field */}
                    <div className="space-y-2">
                        <div className="relative">
                            <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors ${
                                focusedField === 'confirmPassword' ? 'text-blue-500' : 'text-gray-400'
                            }`} />
                            <input
                                {...register('confirmPassword', { required: 'Please confirm your password' })}
                                type={showConfirmPassword ? 'text' : 'password'}
                                onFocus={() => setFocusedField('confirmPassword')}
                                onBlur={() => setFocusedField(null)}
                                className={getInputClassName('confirmPassword', !!errors.confirmPassword, true)}
                                placeholder="Confirm your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message as string}</p>
                        )}
                    </div>

                    {/* Password Requirements */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                            <Shield className="h-4 w-4 text-blue-600 mr-2" />
                            <span className="text-sm font-medium text-blue-800">Password Requirements</span>
                        </div>
                        <ul className="text-xs text-blue-700 space-y-1 ml-6">
                            <li>• At least 8 characters long</li>
                            <li>• Contains uppercase and lowercase letters</li>
                            <li>• Includes at least one number</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    case 3:
        return (
            <div className="space-y-8">
                <div className="text-center space-y-4">
                    <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mb-6">
                        <Mail className="h-10 w-10 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        Verify Your Email
                    </h2>
                    <p className="text-gray-600 text-base max-w-sm mx-auto">
                        We've sent a 6-digit verification code to your email address. Please enter it below.
                    </p>
                </div>
                
                <div className="space-y-6">
                    <div className="space-y-2">
                        <div className="relative">
                            <input
                                {...register('otp', { 
                                    required: 'Verification code is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Code must be 6 digits'
                                    },
                                    pattern: {
                                        value: /^\d{6}$/,
                                        message: 'Please enter a valid 6-digit code'
                                    }
                                })}
                                type="text"
                                maxLength={6}
                                className="w-full px-4 py-6 bg-gray-50/50 border-2 rounded-xl text-gray-900 text-center text-2xl font-mono tracking-[0.5em] transition-all duration-200 focus:outline-none focus:bg-white border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-100"
                                placeholder="000000"
                                onFocus={() => setFocusedField('otp')}
                                onBlur={() => setFocusedField(null)}
                                onChange={handleOTPChange}
                            />
                        </div>
                        {errors.otp && (
                            <p className="text-red-500 text-sm mt-1 text-center">{errors.otp.message as string}</p>
                        )}
                    </div>

                    {/* Resend Code */}
                    <div className="text-center">
                        <p className="text-gray-600 text-sm mb-3">
                            Didn&apos;t receive the code?
                        </p>
                        <button
                            type="button"
                            className="text-blue-600 hover:text-blue-500 font-medium text-sm transition-colors underline"
                        >
                            Resend verification code
                        </button>
                    </div>

                    {/* Security Notice */}
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <div className="flex items-start">
                            <Shield className="h-5 w-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-amber-800 mb-1">
                                    Security Notice
                                </p>
                                <p className="text-xs text-amber-700">
                                    This verification code will expire in 10 minutes. Never share this code with anyone.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    default:
        return (
            <div className="text-center">
                <h2 className="text-gray-800 text-2xl font-bold">Registration Complete!</h2>
            </div>
        )
}
}

export default RegistrationFormStep