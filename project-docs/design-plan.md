# Design Plan

_Draft created: 2026-04-29_

---

## Pages / Screens

### 1. Sign In
- **Purpose:** Entry point for returning borrowers and new applicants
- **Key elements:** Email + password fields (labeled, not placeholder-only — WCAG), "Sign in" CTA, "Apply for a loan" link for new users, "Forgot password" link. No jargon. Warm copy: "Welcome back." Heuristic #5 (error prevention): inline field validation before submit.
- **Entry points:** Direct URL, email link
- **Exit points:** Dashboard (returning user), Apply flow (new user)

### 2. Owner Dashboard
- **Purpose:** Primary home for a borrower who has an active loan. Answers "how am I doing?" in one glance. Treats the owner as a partner in their business, not just a borrower account.
- **Key elements:**
  - Greeting with first name ("Good morning, Rosa")
  - Loan status card: amount borrowed, remaining balance, next payment date + amount, repayment progress bar (% paid off)
  - Payment health indicator: plain-language status ("You're on track" / "Next payment in 3 days" / "Payment past due — let's talk") with icon + color + text — never color alone (WCAG)
  - Milestone moment: displayed when user hits 25%, 50%, 75% payoff milestones ("You've paid off half your loan — keep going!")
  - Quick actions: 3 maximum — Make a Payment, Draw Funds, Contact Support — as large tappable cards with icons
  - Business health snapshot: 2–3 lightweight metrics (cash flow trend spark line, days until full payoff, total paid to date) with plain-language labels
  - Repayment schedule: collapsible table showing future payment dates + amounts
  - Heuristics #1 (system status), #2 (real-world language), #8 (minimalist design)
- **Entry points:** Sign in, nav link
- **Exit points:** Loan Details, Apply (for additional loan), Contact

### 3. Loan Details
- **Purpose:** Full repayment schedule and payment history for the active loan
- **Key elements:** Loan summary header (amount, term, original start date), full repayment schedule table (date, payment amount, remaining balance after payment), payment history (past payments with confirmation status), Download PDF button, Make a Payment CTA. Heuristic #6 (recognition over recall): all data visible, no memorization required.
- **Entry points:** Dashboard quick link, nav
- **Exit points:** Dashboard, Make a Payment

### 4. Apply — Step 1: Funding Goal
- **Purpose:** Start the application with the owner's goal, not a form. Low-friction, goal-oriented opening.
- **Key elements:** Large headline "How much do you need?", amount input with slider (range $5K–$250K), purpose dropdown ("What's it for?" — Equipment, Inventory, Payroll, Cash flow, Other), step indicator (Step 1 of 7), progress bar, auto-save indicator. Plain label: "Your funding goal." No bank language. Heuristic #1 (system status via progress bar), #3 (user control — can go back).
- **Entry points:** "Apply for a loan" CTA from dashboard or sign-in
- **Exit points:** Step 2

### 5. Apply — Step 2: Your Business
- **Purpose:** Collect basic business info — 3 fields max, one screen
- **Key elements:** Business name, business type (dropdown), years in operation (dropdown). Step indicator, progress bar, Back button. Label: "Tell us about your business." Heuristic #4 (consistency: same layout as Step 1), #5 (error prevention: dropdowns prevent invalid entries).
- **Entry points:** Step 1
- **Exit points:** Step 3

### 6. Apply — Step 3: Revenue Check
- **Purpose:** Gauge eligibility with a single revenue field before asking for anything sensitive
- **Key elements:** "What's your average monthly revenue?" — single currency input. Helper text: "This helps us understand your cash flow — we'll verify it later." Step indicator, Back button. Heuristic #2 (real-world language), #5 (proactive context before concern arises).
- **Entry points:** Step 2
- **Exit points:** Step 4

### 7. Apply — Step 4: About You
- **Purpose:** Collect owner identity for soft credit check
- **Key elements:** Full name, date of birth, last 4 of SSN. Prominent reassurance: "This is a soft check — it won't affect your credit score." Encryption badge adjacent to SSN field. Heuristic #5 (proactive fear deflation), #4 (consistent trust signals at sensitive moments).
- **Entry points:** Step 3
- **Exit points:** Step 5 (soft eligibility result)

### 8. Apply — Step 5: Your Offer Preview (Soft Eligibility Result)
- **Purpose:** Show the owner what they may qualify for BEFORE asking for bank connection or documents. This is the critical trust gate. Converts anxiety into excitement.
- **Key elements:** "Based on what you've told us, you may qualify for:" — large dollar range ($25,000–$40,000), estimated rate range, estimated monthly payment. Clear disclaimer: "This is an estimate — your final offer may vary after we verify your info." Two CTAs: "Continue to get your final offer" (primary) and "Save and come back later" (secondary). Heuristic #1 (status), #3 (user control — can pause), #6 (recognition: they see the offer, not just a promise).
- **Entry points:** Step 4
- **Exit points:** Step 6 (bank connection)

### 9. Apply — Step 6: Verify Your Business
- **Purpose:** Connect a bank account or upload statements to enable final underwriting
- **Key elements:** Two paths presented equally: "Connect your bank (fastest)" — Plaid-style connection UI (simulated), or "Upload statements manually" — file upload. Explanation: "Connecting your bank helps us verify your cash flow and get you a faster decision." Upload path: drag-and-drop zone with file type guidance (PDF, 3 months of statements). Instant visual confirmation per upload. Heuristic #3 (user control — choice of path), #6 (recognition — clear options).
- **Entry points:** Step 5
- **Exit points:** Step 7

### 10. Apply — Step 7: Review & Submit
- **Purpose:** Full summary of everything entered before final submission — no surprises
- **Key elements:** Summary of all entered data (amount, purpose, business info, revenue, connection status) in a readable card format. Edit links next to each section. Plain-language disclosure: "By submitting, you agree to a soft credit check. This won't affect your score." Submit CTA. Estimated timeline: "We'll review your application and get back to you within 1–2 business days." Heuristic #6 (recognition — full review), #3 (control — can edit before submit).
- **Entry points:** Step 6
- **Exit points:** Application Tracker

### 11. Application Tracker
- **Purpose:** Post-submission status page. Clearly shows where the application is, what's happening, and — critically — whether the ball is in the lender's court or the owner's.
- **Key elements:**
  - Current status prominently displayed (large, plain-language: "We're reviewing your business information")
  - Time estimate: "Usually takes 1–2 business days — we'll email you when there's an update"
  - Vertical timeline with 5 stages:
    1. Application received ✓
    2. Identity verified ✓
    3. Business review (in progress)
    4. Decision / Offer
    5. Funds sent
  - Document request card (when action required): appears ABOVE the timeline as a prominent action banner — "We need one more document from you" with clear CTA + explanation + upload
  - Document checklist: what's been submitted vs. pending
  - "Have questions? Talk to someone" link — always visible
  - Heuristics #1 (system status), #2 (real-world language), #9 (error recovery — what to do if something's wrong)
- **Entry points:** Submit step, email link, nav
- **Exit points:** Offer Review (when decision made), document upload modal

### 12. Offer Review
- **Purpose:** Present the final approved offer clearly and calmly. This is the highest-anxiety moment — the design must make it feel safe, not pressured.
- **Key elements:**
  - Approved amount in large type: "You're approved for $35,000"
  - Total repayment in plain dollars: "You'll repay $40,250 total over 18 months"
  - Payment schedule: "$2,236/month, automatically debited"
  - Simple breakdown card: Principal, Total fees, Total repayment — no APR jargon upfront, available via "Learn more" tooltip
  - "Talk to someone about this offer" — always visible, one click
  - Accept CTA (primary, large), Decline CTA (present, visually secondary — no artificial urgency)
  - No "Offer expires in 4 hours!" — trust-destroying
  - Heuristics #2 (real-world language), #3 (control — can decline), #8 (minimalist — no confusing extras)
- **Entry points:** Application Tracker (when decision made), email link
- **Exit points:** Dashboard (after accept), Application Tracker (after decline)

---

## Navigation Structure

**Top navigation bar** (persistent on all post-login screens, hidden during application wizard steps):
- Left: Groundwork wordmark / logo
- Center: Dashboard · My Loan · Apply
- Right: Notification bell · Profile avatar (initials)

**Application wizard:** Full-screen, no persistent nav. Top bar shows only: Groundwork logo (left), step indicator "Step X of 7" (center), Save & exit link (right). Back button always visible in lower left of content area.

**Mobile considerations:** Navigation collapses to a bottom tab bar: Dashboard · My Loan · Apply · Account.

---

## User Flows

### Flow 1: New Applicant (Rosa's path)
1. Lands on Sign In page → clicks "Apply for a loan" (new user CTA)
2. Apply Step 1: enters $30,000, selects "Equipment"
3. Apply Step 2: enters business name, type, years
4. Apply Step 3: enters average monthly revenue
5. Apply Step 4: enters name, DOB, last 4 SSN — sees soft check reassurance
6. **Apply Step 5: Sees offer preview** — "$25,000–$40,000" — anxiety lifts
7. Apply Step 6: Chooses "Upload statements manually" — uploads 3 PDFs, sees confirmations
8. Apply Step 7: Reviews summary, submits
9. → Application Tracker: "Application received" — sees estimated 1–2 day timeline
10. Returns next day → Tracker shows "Document needed" → uploads one more doc
11. Tracker updates to "Decision ready" → Offer Review appears
12. Reviews offer, clicks "Talk to someone" → contacts support
13. Accepts offer → lands on Dashboard with active loan

### Flow 2: Returning Borrower (Marcus's path)
1. Signs in → lands on Dashboard
2. Sees "You're on track — next payment $2,236 in 8 days"
3. Clicks "Make a Payment" quick action → payment flow (modal)
4. Navigates to "My Loan" → views full repayment schedule
5. Downloads PDF of repayment schedule for records

### Flow 3: Tech-Native Owner (Priya's path)
1. Signs in → Dashboard
2. Sees 50% milestone moment ("You've paid off half your loan!")
3. Checks business health snapshot — reviews cash flow trend spark line
4. Navigates to Loan Details — reviews payment history
5. Clicks "Apply for additional funding" → enters application wizard

---

## Key Interactions to Prototype

- **Application wizard progression** — form steps advance with validation, Back works correctly, progress bar fills
- **Soft eligibility reveal (Step 5)** — animated result card appears with dollar range after entering Step 4 data
- **Document upload simulation** — drag-and-drop zone accepts files, shows per-file confirmation checkmarks
- **Dashboard quick actions** — Make a Payment opens a modal with amount input and confirm step
- **Application tracker document request** — banner appears above timeline, upload triggers tracker state update
- **Offer accept flow** — Accept CTA transitions to Dashboard with active loan state
- **Milestone moment display** — Dashboard shows congratulations card when milestone % is reached
- **Repayment schedule expand/collapse** — collapsible table on Dashboard
- **"Talk to someone" contact** — opens a simple contact drawer/modal (name, message, send)

---

## Out of Scope for Prototype

- Real bank account linking (Plaid or similar) — simulated with a mock connect UI
- Actual document processing or OCR
- Real credit check or underwriting engine
- Email/SMS notification system
- Multi-loan management (more than one active loan)
- Admin/lender-side views
- Native mobile apps (prototype is web-responsive)
- Payment processing (Make a Payment shows UI only, no actual transaction)
- Account settings, password reset, profile management
