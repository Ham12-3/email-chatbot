"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Building2, User, CheckCircle } from "lucide-react";
import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  value: string;
  title: string;
  text: string;
  register: UseFormRegister<FieldValues>;

  userType: "owner" | "individual";
  setUserType: React.Dispatch<React.SetStateAction<"owner" | "individual">>;
};

const UserTypeCard = ({
  register,
  value,
  title,
  text,
  userType,
  setUserType,
}: Props) => {
  const isSelected = userType === value;
  const Icon = value === 'owner' ? Building2 : User;

  return (
    <Label htmlFor={value} className="cursor-pointer">
      <Card className={cn(
        'w-full border-2 rounded-xl transition-all duration-200 hover:shadow-lg',
        isSelected 
          ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg shadow-blue-100' 
          : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
      )}>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            {/* Icon */}
            <div className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200',
              isSelected 
                ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white' 
                : 'bg-gray-100 text-gray-500'
            )}>
              <Icon className="h-6 w-6" />
            </div>
            
            {/* Content */}
            <div className="flex-1 space-y-1">
              <h3 className={cn(
                "font-semibold transition-colors",
                isSelected ? "text-blue-900" : "text-gray-900"
              )}>
                {title}
              </h3>
              <p className={cn(
                "text-sm transition-colors",
                isSelected ? "text-blue-700" : "text-gray-600"
              )}>
                {text}
              </p>
            </div>

            {/* Radio Button / Check Mark */}
            <div className={cn(
              'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200',
              isSelected 
                ? 'bg-blue-500 border-blue-500' 
                : 'border-gray-300 bg-white'
            )}>
              {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
            </div>
          </div>

          <Input 
            {...register('type', {
              onChange: (event) => setUserType(event.target.value)
            })}
            value={value}
            id={value}
            className="hidden"
            type="radio"
          />
        </CardContent>
      </Card>
    </Label>
  )
};

export default UserTypeCard;
