# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is an **AI Chatbot SaaS platform** that allows businesses to create, deploy, and manage AI-powered chatbots for their websites. The platform provides a complete solution with user management, chatbot creation, real-time chat, billing, and analytics.

## Development Commands

### Core Commands
- `npm run dev` - Start development server with Turbopack (faster builds)
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

### Database Operations
- `npx prisma generate` - Generate Prisma client after schema changes
- `npx prisma db push` - Push schema changes to database (development)
- `npx prisma studio` - Open Prisma Studio for database GUI
- `npx prisma migrate dev` - Create and apply new migration
- `npx prisma migrate reset` - Reset database and apply all migrations

## Current Architecture

### Tech Stack
- **Framework**: Next.js 15.4.5 with App Router (TypeScript)
- **Authentication**: Clerk for user management and auth
- **Database**: PostgreSQL with Prisma ORM (custom output: `src/generated/prisma`)
- **UI Components**: Radix UI with ShadCN/UI component system
- **Styling**: TailwindCSS v4 with CSS variables and custom design tokens
- **Forms**: React Hook Form with Zod validation
- **State Management**: React Context for auth state
- **Notifications**: Sonner for toast notifications
- **Icons**: Lucide React

### Database Schema (Current State)
The application uses a **multi-tenant architecture** centered around domains:

**Core Entities:**
- `User` - Application users with Clerk integration (`clerkId`, `type`, `role`)
- `Domain` - Business domains that host chatbots (one-to-many with User)
- `ChatBot` - AI chatbot configurations per domain with JSON config
- `Customer` - End users interacting with chatbots per domain
- `ChatRoom` - Real-time chat sessions between users and customers
- `ChatMessage` - Individual messages within chat rooms
- `Plan` - Subscription plans (STANDARD/PRO/ULTIMATE)
- `Billing` - Billing records with Stripe integration
- `HelpDesk` - FAQ system
- `FilteredQuestion` - Chatbot-specific training questions

**Key Schema Features:**
- Cascade delete relationships for data integrity
- JSON fields for flexible configuration storage
- Role-based access control (OWNER/CUSTOMER)
- Subscription management with credit tracking
- Soft delete patterns with `isActive` flags

### Authentication & User Flow

**Current Implementation:**
1. **Registration**: Multi-step form with Clerk integration
   - Type selection (owner/customer)
   - User details collection with validation
   - Email verification via OTP
   - Database user creation after Clerk success

2. **Login**: Clerk authentication + database data retrieval
3. **Routes**: 
   - `/auth/sign-in` - Clerk sign-in
   - `/auth/sign-up` - Custom multi-step registration
   - `/auth/verify-email` - OTP verification page
   - `/dashboard` - Main user dashboard

**Authentication Context:**
- `AuthContextProvider` manages registration steps
- `useAuthContextHook` provides step navigation
- Server actions handle database operations

### File Organization & Patterns

**Key Directories:**
- `src/app/` - Next.js App Router pages and layouts
- `src/actions/auth/` - Server actions for authentication
- `src/schemas/` - Zod validation schemas
- `src/hooks/` - Custom React hooks
- `src/context/` - React Context providers  
- `src/components/forms/sign-up/` - Multi-step registration components
- `src/components/ui/` - Reusable UI components (ShadCN-based)
- `src/lib/` - Utility functions and configurations
- `prisma/` - Database schema and migrations

**Development Patterns:**
- Server actions use "use server" directive
- Form validation with Zod + React Hook Form
- Type-safe database operations with Prisma
- Component composition with Radix UI primitives
- Custom toast notifications via Sonner
- Error boundaries and comprehensive error handling

### Current Component Library
The project uses **ShadCN/UI** components based on Radix UI:
- Form controls (input, button, select, checkbox)
- Layout components (card, sheet, dialog, tabs)
- Feedback components (alert, progress, skeleton)
- Navigation components (breadcrumb, pagination)
- Data display (table, avatar, badge)

## AI Chatbot SaaS Development Checklist

### ✅ **COMPLETED - Stage 1: Foundation & Authentication**
- [x] Next.js/TypeScript project setup with App Router
- [x] PostgreSQL database with Prisma ORM
- [x] User authentication with Clerk integration
- [x] Multi-step registration with email verification
- [x] User profile management and dashboard
- [x] Database schema for Users, Domains, ChatBots, etc.
- [x] Custom Prisma client generation
- [x] Form validation with Zod schemas
- [x] Toast notification system

### 🔄 **IN PROGRESS - Stage 2: Core Dashboard & Billing**
- [ ] Enhanced dashboard with analytics cards
- [ ] Stripe integration for payments
- [ ] Credit-based usage system
- [ ] Subscription tier management (Basic/Pro/Enterprise)
- [ ] Usage tracking and billing cycles
- [ ] Transaction history and invoicing

### ⏳ **UPCOMING - Stage 3: Chatbot Creation & Management**
- [ ] Chatbot creation wizard
- [ ] Knowledge base upload system (PDF, TXT, DOC)
- [ ] File storage integration (AWS S3)
- [ ] Vector database for semantic search (Pinecone/Weaviate)
- [ ] Chatbot personality/tone configuration
- [ ] Preview and testing interface

### ⏳ **UPCOMING - Stage 4: AI Integration & Chat Engine**
- [ ] OpenAI/Claude API integration
- [ ] RAG (Retrieval Augmented Generation) system
- [ ] WebSocket real-time chat infrastructure
- [ ] Context management and memory
- [ ] Message persistence and history
- [ ] Response generation with company data

### ⏳ **UPCOMING - Stage 5: Widget Development & Embedding**
- [ ] Standalone JavaScript chat widget
- [ ] Customizable widget appearance
- [ ] Mobile-responsive design
- [ ] CORS handling for cross-domain
- [ ] Embed code generation
- [ ] Widget analytics tracking

### ⏳ **UPCOMING - Stage 6: Advanced Integrations**
- [ ] Stripe payment requests via AI
- [ ] Calendar integration (Calendly)
- [ ] Email integration for follow-ups
- [ ] Meeting booking capabilities
- [ ] Integration management dashboard

### ⏳ **UPCOMING - Stage 7: Human Handoff System**
- [ ] Live chat takeover detection
- [ ] Operator dashboard for human agents
- [ ] Queue management system
- [ ] Customer context preservation
- [ ] Handoff analytics and tracking

### ⏳ **UPCOMING - Stage 8: Analytics & Reporting**
- [ ] Conversation analytics dashboard
- [ ] Usage statistics and metrics
- [ ] Popular queries identification
- [ ] Performance monitoring
- [ ] Exportable reports (PDF/CSV)
- [ ] ROI and engagement tracking

### ⏳ **UPCOMING - Stage 9: Advanced Features**
- [ ] Multi-language support
- [ ] Sentiment analysis
- [ ] Intent recognition
- [ ] A/B testing for responses
- [ ] Performance optimization
- [ ] CDN setup for widget delivery

### ⏳ **UPCOMING - Stage 10: Production & Launch**
- [ ] Comprehensive testing suite
- [ ] CI/CD pipeline setup
- [ ] Production monitoring
- [ ] Security audit and compliance
- [ ] Documentation and help center
- [ ] Marketing website and pricing

## Development Guidelines

### Code Style & Standards
- Use TypeScript for all new code
- Follow Next.js App Router patterns
- Implement proper error handling and logging
- Use Zod for runtime validation
- Follow Prisma best practices for database operations
- Maintain consistent component structure with ShadCN/UI

### Security Considerations
- Never expose Clerk secrets or API keys
- Implement proper CORS for widget embedding
- Use server actions for sensitive operations
- Validate all user inputs with Zod
- Implement rate limiting for API endpoints
- Follow GDPR compliance for user data

### Performance Guidelines
- Use Next.js Image component for optimizations
- Implement proper caching strategies
- Optimize database queries with Prisma
- Use React.memo for expensive components
- Implement proper loading states
- Monitor bundle size and performance metrics

### Current Status
The project has a solid foundation with authentication and basic dashboard functionality. The next major milestone is implementing billing and subscription management, followed by the core chatbot creation and AI integration features.