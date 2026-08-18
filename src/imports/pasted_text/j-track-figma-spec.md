# J-TRACK — FIGMA MAKE PRODUCTION UI/UX BUILD

You are designing the complete frontend experience for **J-Track**, a modern job platform with two user roles:

* Jobseeker
* Recruiter

The backend is already implemented as a production-oriented Express + TypeScript microservice system with:

* Auth service
* User service
* Job service
* Utils/AI service
* PostgreSQL
* Redis
* Kafka
* Cloudinary
* AI streaming via SSE
* async email/event flows

The existing backend API is the source of truth for product capabilities.

The frontend must be designed as a **real production web application**, not a generic landing-page concept.

---

# GLOBAL RULES — MUST APPLY TO EVERY PHASE

## 1. Product quality

Design this like a serious modern SaaS/product platform.

Avoid:

* generic AI-generated dashboard aesthetics
* excessive gradients
* random glassmorphism
* oversized rounded cards everywhere
* inconsistent spacing
* decorative elements with no product purpose
* fake functionality
* placeholder pages that look unfinished

Use:

* clear hierarchy
* strong typography
* compact but comfortable information density
* intentional whitespace
* consistent spacing scale
* consistent component variants
* strong visual grouping
* accessible contrast
* subtle motion
* meaningful empty/loading/error states

The visual language should feel comparable to a modern production product such as Linear, Vercel, Notion, Stripe, Raycast, or a polished hiring platform — but do NOT copy any one product.

---

# 2. Design system first

Before creating many pages, establish a reusable design system.

Define:

### Color system

* background
* elevated background
* foreground
* muted foreground
* border
* primary
* primary foreground
* success
* warning
* danger
* info
* role-specific accents only when useful

Support:

* light mode
* dark mode

Do not hardcode random colors per component.

---

### Typography

Define:

* display
* page title
* section title
* card title
* body
* small
* caption
* label
* metric/KPI

Use one coherent type scale.

---

### Spacing

Use a consistent spacing scale.

Avoid arbitrary margins for every component.

---

### Radius

Use a small set of radius tokens:

* sm
* md
* lg
* xl
* pill

Do not make every component extremely rounded.

---

### Shadows

Use subtle elevation.

Avoid heavy glowing shadows.

---

### Icons

Use one coherent icon family.

Avoid mixing unrelated icon styles.

---

# 3. CORE COMPONENT SYSTEM

Create reusable components before building all pages.

At minimum:

* Button
* IconButton
* Input
* SearchInput
* PasswordInput
* Textarea
* Select
* MultiSelect
* Checkbox
* Radio
* Switch
* Tabs
* Badge
* Avatar
* AvatarGroup
* Tooltip
* Dropdown
* Popover
* Modal
* AlertDialog
* Toast
* Breadcrumb
* Pagination
* DataTable
* Card
* StatCard
* EmptyState
* ErrorState
* LoadingState
* Skeleton
* FileUpload
* ResumeUpload
* JobCard
* CompanyCard
* ApplicationCard
* CandidateCard
* JobStatusBadge
* ApplicationStatusBadge
* NotificationItem
* UserMenu
* Sidebar
* MobileNavigation
* TopHeader
* Command/search interface where appropriate
* Chart containers
* AI streaming container
* AI score ring
* Timeline
* ActivityFeed
* FilterBar
* FilterDrawer
* SortMenu
* Confirmation dialog

Every component needs consistent variants.

---

# 4. IMPORTANT UX STATES

Every relevant screen must intentionally handle:

* loading
* skeleton
* empty
* populated
* error
* retry
* disabled
* submitting
* success
* partial failure
* unauthorized
* not found
* network failure
* mobile layout
* tablet layout
* desktop layout

Do NOT design only the happy path.

---

# 5. RESPONSIVE DESIGN

Desktop is not enough.

Every screen must work at:

* mobile
* tablet
* desktop
* large desktop

Use deliberate responsive behavior.

Examples:

Desktop sidebar:
→ collapses/replaces with mobile navigation.

Filter sidebar:
→ becomes mobile drawer.

Tables:
→ become cards or horizontally scrollable structures where appropriate.

Large dashboard grids:
→ collapse into logical stacks.

Do NOT merely shrink desktop layouts.

---

# 6. ACCESSIBILITY

Design for:

* keyboard navigation
* visible focus states
* sufficient contrast
* readable text sizes
* semantic controls
* clear error messaging
* accessible modal behavior
* accessible form labels
* non-color-only status communication

---

# 7. API REALITY

Do not invent backend capabilities.

Use the provided backend/API documentation as the source of truth.

When a frontend feature requires an API endpoint that does not currently exist:

* design the UX honestly,
* mark the integration point clearly,
* do not fake a successful backend response.

Known frontend/backend mismatch:

### Career Guidance

The earlier Next.js frontend inventory references:

`/api/ai/career-guidance`

but the provided J-Track backend exposes:

`POST /api/utils/ai/career-guidance`

The final frontend architecture should use the real backend through the correct frontend proxy/server integration.

### Resume Analysis

Backend exists:

`POST /api/utils/ai/analyze`

with SSE streaming.

### AI Match

Backend exists:

`POST /api/jobs/analyze-match/:jobId`

through SSE.

---

# 8. ROLE-SPECIFIC UX

## Jobseeker

The primary mental model is:

Discover → Evaluate → Apply → Track → Improve

The experience should emphasize:

* finding jobs
* filtering
* job details
* resume readiness
* applications
* AI matching
* resume analysis
* career guidance
* profile completeness

---

## Recruiter

The primary mental model is:

Create → Manage → Review → Decide → Measure

The experience should emphasize:

* companies
* job creation
* job management
* candidate review
* status changes
* hiring pipeline
* analytics

---

# 9. DO NOT DESIGN ONLY STATIC SCREENS

Where useful, create realistic interactions:

* filters
* sorting
* tabs
* drawers
* modals
* dropdowns
* application states
* upload states
* streaming AI states
* pagination
* role-based navigation
* success/error feedback

Figma Make is intended to create functional prototypes/web apps, so use interaction where it improves the product experience.

---

# PHASE 0 — FOUNDATION / DESIGN SYSTEM

DO NOT BUILD ALL PAGES YET.

First build:

1. Design tokens
2. Typography system
3. Color themes
4. Component library
5. Navigation system
6. Buttons and controls
7. Form system
8. Cards
9. Badges
10. Tables
11. Loading/empty/error states
12. Modal/drawer system
13. Toasts
14. Responsive rules
15. Accessibility rules

Create a small visual playground showing all major components and variants.

The goal is:

ONE consistent visual language for the entire application.

Do not proceed to all pages until this foundation is coherent.

---