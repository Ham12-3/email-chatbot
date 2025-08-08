import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import UserTypeCard from './user-type-card'

type Props = {
    register: UseFormRegister<FieldValues>
    userType:'owner' | 'individual'
    setUserType: React.Dispatch<React.SetStateAction<'owner' | 'individual'>>
}

const TypeSelectionForm = ({register,userType,setUserType}: Props) => {
  return (
 <div className="space-y-8">
   <div className="text-center space-y-3">
     <h2 className='text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>Choose Your Path</h2>
     <p className='text-gray-600 text-base max-w-md mx-auto'>
       Tell us about yourself! What brings you here? We&apos;ll tailor your experience to best suit your needs.
     </p>
   </div>
   
   <div className="space-y-4">
     <UserTypeCard
       register={register}
       setUserType={setUserType}
       userType={userType}
       value='owner'
       title='I own a business'
       text="Setting up chatbots for my company and team"
     />
     
     <UserTypeCard
       register={register}
       setUserType={setUserType}
       userType={userType}
       value='individual'
       title="I'm an individual"
       text="Using AI chatbots for personal or freelance projects"
     />
   </div>
 </div>
  )
}

export default TypeSelectionForm