'use client'

import { useState } from 'react'
import { useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { onCompleteUserRegistration } from '@/actions/auth'
import { Loader2 } from 'lucide-react'

export default function VerifyEmailPage() {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { signUp, setActive } = useSignUp()
  const router = useRouter()
  const { toast } = useToast()

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!signUp || !code) return

    setIsLoading(true)

    try {
      // Attempt email verification with Clerk
      const result = await signUp.attemptEmailAddressVerification({
        code: code.trim(),
      })

      if (result.status === 'complete') {
        // Get user data from Clerk
        const clerkUser = result.createdUserId
        const userData = signUp.emailAddress
        const firstName = signUp.firstName || ''
        const lastName = signUp.lastName || ''
        const fullName = `${firstName} ${lastName}`.trim()

        // Set active session first
        await setActive({ session: result.createdSessionId })

        // Create user in our database
        const dbResult = await onCompleteUserRegistration(
          fullName,
          clerkUser!,
          'owner', // Default type, you might want to get this from form context
          userData!
        )

        if (dbResult.status === 200) {
          toast({
            title: 'Success!',
            description: 'Email verified and account created successfully.',
            variant: 'default',
          })
          
          router.push('/dashboard')
        } else {
          toast({
            title: 'Database Error',
            description: dbResult.message || 'Failed to complete registration.',
            variant: 'destructive',
          })
        }
      }
    } catch (error) {
      console.error('Verification error:', error)
      toast({
        title: 'Verification Failed',
        description: 'Invalid verification code. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const resendCode = async () => {
    if (!signUp) return

    try {
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      toast({
        title: 'Code Sent',
        description: 'A new verification code has been sent to your email.',
        variant: 'default',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to resend verification code.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Verify your email</CardTitle>
          <CardDescription>
            Enter the verification code sent to your email address
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerification} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enter 6-digit code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={6}
                className="text-center text-lg tracking-widest"
                disabled={isLoading}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || !code || code.length !== 6}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify Email'
              )}
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="ghost"
                onClick={resendCode}
                disabled={isLoading}
                className="text-sm"
              >
                Didn&apos;t receive a code? Resend
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}