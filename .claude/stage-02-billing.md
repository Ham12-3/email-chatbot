# Stage 2: Core Dashboard & Billing (Weeks 3-4)
**Status**: 🔄 IN PROGRESS - Next Priority

## Dashboard Frontend
- [ ] React/Next.js dashboard setup → **Base dashboard exists, needs enhancement**
- [ ] User onboarding flow
- [ ] Basic navigation and layout
- [ ] Analytics cards and metrics display
- [ ] Domain management interface

## Billing & Credits System
- [ ] Stripe integration for payments
- [ ] Credit-based system (track usage)
- [ ] Subscription tiers (Basic, Pro, Enterprise)
- [ ] Usage tracking and billing cycles
- [ ] Payment method management
- [ ] Invoice generation and history

## Database Extensions
**Need to implement:**
```sql
-- Subscription management (already exists in schema)
Subscriptions: id, user_id, stripe_subscription_id, tier, credits_remaining, billing_cycle

-- Transaction tracking (already exists as Billing table)
Transactions: id, user_id, amount, credits_purchased, stripe_payment_id

-- Usage tracking (new table needed)
Usage: id, user_id, chatbot_id, usage_type, amount, date, billing_period

-- Credit transactions (new table needed)  
CreditTransactions: id, user_id, amount, transaction_type (purchase/usage/refund), description, created_at
```

## Implementation Tasks

### 1. Enhanced Dashboard
- [ ] Create analytics widgets for:
  - Total conversations
  - Credit usage
  - Active chatbots
  - Customer engagement metrics
- [ ] Add navigation sidebar with billing section
- [ ] Implement domain switching interface
- [ ] Add quick action buttons (create chatbot, view analytics)

### 2. Stripe Integration
- [ ] Set up Stripe account and webhooks
- [ ] Create Stripe customer on user registration
- [ ] Implement subscription creation flow
- [ ] Handle payment method updates
- [ ] Process subscription upgrades/downgrades
- [ ] Handle failed payments and dunning

### 3. Credit System
- [ ] Define credit costs for different actions:
  - Chat messages: 1 credit per AI response
  - File uploads: 10 credits per document
  - Advanced features: Variable credits
- [ ] Implement credit deduction logic
- [ ] Create credit purchase flow
- [ ] Add credit balance monitoring
- [ ] Implement usage alerts and limits

### 4. Subscription Tiers
**Basic Plan ($19/month)**:
- 1,000 credits/month
- 1 chatbot
- Basic analytics
- Email support

**Pro Plan ($49/month)**:
- 5,000 credits/month
- 5 chatbots
- Advanced analytics
- Priority support
- Custom branding

**Enterprise Plan ($199/month)**:
- 25,000 credits/month
- Unlimited chatbots
- White-label solution
- API access
- Dedicated support

### 5. Billing Dashboard
- [ ] Current subscription status
- [ ] Credit usage graphs
- [ ] Billing history
- [ ] Payment method management
- [ ] Usage alerts and notifications
- [ ] Upgrade/downgrade options

## File Structure to Create

```
src/
├── actions/billing/
│   ├── stripe.ts           # Stripe server actions
│   ├── subscriptions.ts    # Subscription management
│   └── credits.ts          # Credit system logic
├── app/dashboard/
│   ├── billing/
│   │   └── page.tsx        # Billing management page
│   └── analytics/
│       └── page.tsx        # Analytics dashboard
├── components/billing/
│   ├── subscription-card.tsx
│   ├── credit-balance.tsx
│   ├── payment-method.tsx
│   └── billing-history.tsx
├── lib/
│   ├── stripe.ts           # Stripe client setup
│   └── credits.ts          # Credit calculation utilities
└── webhooks/
    └── stripe.ts           # Stripe webhook handlers
```

## Environment Variables Needed
```env
STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## API Endpoints to Create
- `POST /api/billing/create-subscription` - Create new subscription
- `POST /api/billing/update-subscription` - Modify subscription
- `POST /api/billing/purchase-credits` - Buy additional credits
- `GET /api/billing/usage` - Get usage statistics
- `POST /api/webhooks/stripe` - Handle Stripe webhooks

## Testing Checklist
- [ ] Subscription creation and cancellation
- [ ] Credit deduction on chatbot usage
- [ ] Payment failure handling
- [ ] Webhook processing
- [ ] Usage limit enforcement
- [ ] Billing cycle transitions

## Success Criteria
- Users can subscribe to plans and manage billing
- Credit system accurately tracks and deducts usage
- Stripe integration handles all payment scenarios
- Dashboard provides clear billing information
- System prevents overuse when credits are depleted