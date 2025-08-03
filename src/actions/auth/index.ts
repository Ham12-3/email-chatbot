"use server"

import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { client } from "@/lib/prisma"

// Types for better type safety
interface DomainData {
  id: string
  name: string
  image?: string
  isActive: boolean
  chatBots: Array<{
    id: string
    name: string
    description?: string
    isActive: boolean
    filteredQuestions: Array<{
      id: string
      question: string
      isActive: boolean
    }>
  }>
  customers: Array<{
    id: string
    email: string
    name?: string
    isActive: boolean
    chatRooms: Array<{
      id: string
      isActive: boolean
      messages: Array<{
        id: string
        content: string
        image?: string
        isFromBot: boolean
        createdAt: Date
      }>
    }>
  }>
}

interface UserData {
  id: string
  fullName: string
  type: string
  domains?: DomainData[]
}

interface AuthResponse {
  status: number
  data?: UserData
  message?: string
}

/**
 * Complete user registration by creating a new user in the database
 * This function is called after successful Clerk registration
 */
export const onCompleteUserRegistration = async (
  fullName: string,
  clerkId: string,
  type: string
): Promise<AuthResponse> => {
  try {
    // Validate input parameters
    if (!fullName || !clerkId || !type) {
      return {
        status: 400,
        message: "Missing required parameters: fullName, clerkId, or type"
      }
    }

    // Check if user already exists
    const existingUser = await client.user.findUnique({
      where: {
        clerkId: clerkId
      }
    })

    if (existingUser) {
      return {
        status: 409,
        message: "User already exists with this Clerk ID"
      }
    }

    // Create new user in database
    const newUser = await client.user.create({
      data: {
        fullName: fullName,
        clerkId: clerkId,
        type: type,
        email: "", // Will be updated from Clerk data
        role: type === "owner" ? "OWNER" : "CUSTOMER",
        // Initialize with default values
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    // Return success response with user data
    return {
      status: 200,
      data: {
        id: newUser.id,
        fullName: newUser.fullName,
        type: newUser.type
      }
    }

  } catch (error) {
    console.error("Error in onCompleteUserRegistration:", error)
    
    return {
      status: 500,
      message: "Internal server error during user registration"
    }
  }
}

/**
 * Authenticate user and retrieve their data with associated domains
 * This function handles the login process and data retrieval
 */
export const onLoginUser = async (): Promise<AuthResponse> => {
  try {
    // Get current user from Clerk
    const user = await currentUser()
    
    if (!user) {
      // Redirect to sign-in page if no user found
      redirect("/sign-in")
    }

    // Find user in database using Clerk ID
    const dbUser = await client.user.findUnique({
      where: {
        clerkId: user.id
      },
      include: {
        domains: {
          where: {
            isActive: true
          },
          include: {
            chatBots: {
              where: {
                isActive: true
              }
            },
            customers: {
              where: {
                isActive: true
              }
            }
          }
        }
      }
    })

    if (!dbUser) {
      return {
        status: 404,
        message: "User not found in database"
      }
    }

    // Get all account domains for the user
    const userDomains = await getAllAccountDomains(dbUser.id)

    // Return success response with user data and domains
    return {
      status: 200,
      data: {
        id: dbUser.id,
        fullName: dbUser.fullName,
        type: dbUser.type,
        domains: userDomains
      }
    }

  } catch (error) {
    console.error("Error in onLoginUser:", error)
    
    return {
      status: 500,
      message: "Internal server error during login"
    }
  }
}

/**
 * Get all domains associated with a user account
 * This is a helper function used by onLoginUser
 */
const getAllAccountDomains = async (userId: string) => {
  try {
    const domains = await client.domain.findMany({
      where: {
        userId: userId,
        isActive: true
      },
      include: {
        chatBots: {
          where: {
            isActive: true
          },
          include: {
            filteredQuestions: {
              where: {
                isActive: true
              }
            }
          }
        },
        customers: {
          where: {
            isActive: true
          },
          include: {
            chatRooms: {
              where: {
                isActive: true
              },
              include: {
                messages: {
                  orderBy: {
                    createdAt: 'desc'
                  },
                  take: 10 // Get last 10 messages
                }
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return domains

  } catch (error) {
    console.error("Error fetching user domains:", error)
    return []
  }
}

/**
 * Update user profile information
 * This function allows updating user details
 */
export const updateUserProfile = async (
  userId: string,
  updates: {
    fullName?: string
    type?: string
  }
): Promise<AuthResponse> => {
  try {
    const updatedUser = await client.user.update({
      where: {
        id: userId
      },
      data: {
        ...updates,
        updatedAt: new Date()
      }
    })

    return {
      status: 200,
      data: {
        id: updatedUser.id,
        fullName: updatedUser.fullName,
        type: updatedUser.type
      }
    }

  } catch (error) {
    console.error("Error updating user profile:", error)
    
    return {
      status: 500,
      message: "Failed to update user profile"
    }
  }
}

/**
 * Delete user account and all associated data
 * This function handles complete account deletion
 */
export const deleteUserAccount = async (userId: string): Promise<AuthResponse> => {
  try {
    // Delete user and all associated data (cascade delete)
    await client.user.delete({
      where: {
        id: userId
      }
    })

    return {
      status: 200,
      message: "User account deleted successfully"
    }

  } catch (error) {
    console.error("Error deleting user account:", error)
    
    return {
      status: 500,
      message: "Failed to delete user account"
    }
  }
}