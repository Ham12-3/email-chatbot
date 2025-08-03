
import { useToast } from "@/components/ui/use-toast"
import { 
  userRegistrationSchema,
  UserRegistrationFormData 
} from "@/schemas/auth.schema"
import { useSignUp } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

export const useSignUpForm = () => {
  const { toast } = useToast()
  const [loading, setLoading] = useState<boolean>(false)
  const { signUp, isLoaded, setActive } = useSignUp()
  const router = useRouter()

  // Initialize form with Zod resolver and validation
  const methods = useForm<UserRegistrationFormData>({
    resolver: zodResolver(userRegistrationSchema),
    defaultValues: {
      type: "owner", // Default value for onboarding form
      fullName: "",
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: "",
      otp: "",
    },
    mode: "onChange", // Real-time validation
  })

  // Form submission handler
  const onSubmit = async (data: UserRegistrationFormData) => {
    if (!isLoaded) return

    try {
      setLoading(true)

      // Start the sign-up process with Clerk
      const result = await signUp.create({
        emailAddress: data.email,
        password: data.password,
        firstName: data.fullName.split(' ')[0], // Extract first name
        lastName: data.fullName.split(' ').slice(1).join(' ') || '', // Extract last name
      })

      if (result.status === "complete") {
        // Sign-up successful
        await setActive({ session: result.createdSessionId })
        
        toast({
          title: "Success!",
          description: "Your account has been created successfully.",
          variant: "default",
        })

        // Redirect to dashboard or onboarding
        router.push("/dashboard")
      } else if (result.status === "missing_requirements") {
        // Handle OTP verification
        if (result.verifications.emailAddress?.status === "missing_requirements") {
          // Show OTP input form or redirect to verification page
          toast({
            title: "Verification Required",
            description: "Please check your email for the verification code.",
            variant: "default",
          })
          router.push("/verify-email")
        }
      }
    } catch (error: unknown) {
      console.error("Sign-up error:", error)
      
      const errorMessage = error instanceof Error ? error.message : "Something went wrong. Please try again."
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Handle OTP verification
  const verifyOTP = async (otp: string) => {
    if (!isLoaded) return

    try {
      setLoading(true)

      const result = await signUp.attemptEmailAddressVerification({
        code: otp,
      })

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId })
        
        toast({
          title: "Success!",
          description: "Email verified successfully.",
          variant: "default",
        })

        router.push("/dashboard")
      }
    } catch (error: unknown) {
      console.error("OTP verification error:", error)
      
      const errorMessage = error instanceof Error ? error.message : "Invalid verification code."
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return {
    methods,
    onSubmit: methods.handleSubmit(onSubmit),
    verifyOTP,
    loading,
    isLoaded,
  }
}