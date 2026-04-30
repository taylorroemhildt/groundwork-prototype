# Changelog

## 2026-04-29 — Prototype v1 Created

**Pages built:**
- Sign In
- Owner Dashboard (with payment modal, contact drawer, milestone card)
- Loan Details (full 18-payment table)
- Apply — 7-step wizard (Goal, Business, Revenue, Identity, Eligibility Result, Verify, Review)
- Application Tracker (document needed / under review states)
- Offer Review

**Interactions implemented:**
- Application wizard step progression with back/next and progress bar
- Soft eligibility animated reveal at Step 5
- Mock Plaid bank connection flow + document upload in Step 6
- Dashboard payment modal (Make a Payment)
- Contact drawer (slide-in panel)
- Tracker document upload → auto state switch to Under Review
- Offer accept → Dashboard transition
- Milestone congratulations card (triggers at 39% paid)
- Repayment schedule expand/collapse
- Demo toggle on Tracker for state switching

**Design system used:** Custom Tailwind components (shadcn/ui-inspired, no dependency)
**To run:** `cd prototype && npm install && npm run dev`
