import { z } from "zod";

// TypeScript type definitions for authentication forms
export type UserRegistrationProps = {
  type: string;
  fullName: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  otp: string;
};

export type UserLoginProps = {
  email: string;
  password: string;
};

export type ChangePasswordProps = {
  password: string;
  confirmPassword: string;
};

// User Registration Schema with comprehensive validation
export const userRegistrationSchema = z.object({
  type: z.string(), // Required field for user type
  fullName: z
    .string()
    .min(1, "Full name is required")
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must be less than 50 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  confirmEmail: z
    .string()
    .min(1, "Please confirm your email address")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be less than 64 characters")
    .refine(
      (password) => /^[a-zA-Z0-9]+$/.test(password),
      "Password should contain only alphabets and numbers"
    ),
  confirmPassword: z
    .string()
    .min(1, "Please confirm your password"),
  otp: z
    .string()
    .min(1, "OTP is required")
    .length(6, "OTP must be 6 digits")
    .refine(
      (otp) => /^\d{6}$/.test(otp),
      "OTP must contain only numbers"
    ),
}).refine(
  (schema) => schema.email === schema.confirmEmail,
  {
    message: "Email addresses do not match",
    path: ["confirmEmail"], // Error will be shown on confirmEmail field
  }
).refine(
  (schema) => schema.password === schema.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Error will be shown on confirmPassword field
  }
);

// User Login Schema
export const userLoginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be less than 64 characters"),
});

// Change Password Schema
export const changePasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be less than 64 characters")
    .refine(
      (password) => /^[a-zA-Z0-9]+$/.test(password),
      "Password should contain only alphabets and numbers"
    ),
  confirmPassword: z
    .string()
    .min(1, "Please confirm your password"),
}).refine(
  (schema) => schema.password === schema.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Error will be shown on confirmPassword field
  }
);

// Export schema types for use with React Hook Forms
export type UserRegistrationFormData = z.infer<typeof userRegistrationSchema>;
export type UserLoginFormData = z.infer<typeof userLoginSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

