
'use client'
import { AuthContextProvider } from '@/context/use-auth-context'
import React from 'react'
import { useSignUpForm } from '@/hooks/sign-up/use-sign-up'
import { FormProvider } from 'react-hook-form'

type Props = {
    children : React.ReactNode
}

const SignUpFormProvider = ({children} : Props) => {
    const { methods } = useSignUpForm()
    
    return (
        <AuthContextProvider>
            <FormProvider {...methods}>
                {children}
            </FormProvider>
        </AuthContextProvider>
    )
}

export default SignUpFormProvider