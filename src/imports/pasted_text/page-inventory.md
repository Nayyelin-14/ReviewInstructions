I read the entire codebase. Here's the complete page inventory.
J-Track — Complete Page Map (App Router, Next.js 16)
3 route groups: (public) = guest-facing, (dashboard) = auth-protected, ai = AI features.
A. PUBLIC PAGES (6 route groups, 11 pages) — wrapped by (public)/layout.tsx (passthrough) + SiteHeader/SiteFooter
#	Route	Page	Access	Purpose & key UI
1	/	Landing	Public	Marketing hero: search bar (title + location → /jobs?title=&location=), trust logos, featured jobs grid (1 large + 2 medium + AI Match CTA card + 2 small cards), "No open roles" empty state. Auth-aware: "Get started" → /register if logged out, /ai/resume-analysis if logged in. Loading = skeleton cards.
2	/login	Login	Public (GuestGuard)	Split-screen: left form (email, password, "Remember me", forgot-password link, error via toast), right brand panel. Handles unverified email state inline (amber alert + "Resend verification"). On success → /dashboard.
3	/register	Register	Public (GuestGuard)	Split-screen. Jobseeker/Recruiter toggle, name/email/phone/password (live strength meter), role-dependent resume drag-drop upload (PDF ≤5MB, jobseeker only), optional bio. Brand panel w/ feature cards. → /login.
4	/forgot-password	Forgot Password	Public (GuestGuard)	Email form → success state "Check your inbox" with resend option (always shows success per spec). Brand panel.
5	/reset-password	Reset Password redirect	Public	Invisible page: reads ?token= param, redirects to /reset-password/[token] or /forgot-password.
6	/reset-password/[token]	Set New Password	Public	New password + confirm (strength meter), success state "Password Successfully Reset". Right side: brand panel + testimonial.
7	/verify-email	Email Verification	Public (GuestGuard)	4 states: verifying (spinner), verified (success + "Log In Now"), expired, invalid. Expired/invalid → resend-form inline.
8	/jobs	Browse Jobs	Public (no auth needed)	JobFeed component: sticky filter sidebar (keywords, location, job-type checkboxes, work-mode chips, result count), mobile filter drawer, debounced search, 10/page pagination. Cards have salary/type/location badges, Quick Apply (jobseekers only, checks resume exists first), AI Match link. States: skeleton cards, error+retry, "No jobs found" empty.
9	/jobs/[jobId]	Job Detail	Public (apply/match need auth)	Header w/ company logo/title/salary/badges, back button, Apply button (turns "Applied ✓"), AI Match Analysis dialog. If seeker: checks if already applied. States: spinner, error+retry, blank if no job.
10	/companies	Explore Companies	Public	Industry pill filters, search, sort (Most Open Roles / Recently Added / A-Z), Featured Employers (2 cards), company grid w/ logo, open-role counts (from live job data), infinite scroll "Load More". States: skeleton, error, empty.
/agents      11	/companies/[id]	Company Profile	Public	Hero header (logo, name, location, website, size, industry), About Us, Company Snapshot (stats), Open Positions grid with "Apply Now". States: skeleton, "Company not found" error. Switch agent
/compact      Compact session
Build·DeepSeek V4 Flash FreeOpenCode Zen·high
/home/nay/projects/jtrack123.8K (62%)ctrl+p commands
B. DASHBOARD PAGES (18 pages) — (dashboard)/layout.tsx = AuthGuard + SiteHeader + left DashboardNav sidebar (role-based links) + main scroll area
Jobseeker sidebar: Dashboard, Applications, Skills, Resume + common: Profile, Settings.
Recruiter sidebar: Dashboard, Analytics, Companies, Jobs, Post a Job + common: Profile, Settings.
Jobseeker (7 pages)
#	Route	Purpose & key UI
12	/dashboard	Seeker Home — greeting (time-based), big Applications count card, Browse Jobs + Skills quick cards, AI Career Guidance promo banner. Recruiters auto-redirected to /dashboard/recruiter.
13	/dashboard/applications	My Applications — filter chips All/Active/Past w/ counts; cards w/ status color bar + badge (Submitted=blue, Applied=amber, Hired=green, Rejected=red/dimmed), applied-time; skeleton/error/empty states.
14	/dashboard/skills	Skills Manager — add-skill input + animated skill chips (framer-motion layout anims), remove w/ hover.
15	/dashboard/resume	Resume — "Resume on file" state w/ View PDF, or drag-drop upload zone (PDF ≤10MB).
16	/dashboard/profile	Profile — banner photo, avatar w/ camera upload button, name/role/email/phone/bio, Edit Profile + Privacy Settings buttons, Technical Skills chips, Resume upload zone, sidebar: Activity Overview (apps/skills/profile-match-rate % ring), Recommended jobs.
17	/dashboard/profile/edit	Edit Profile — name, phone, bio fields; two save buttons (profile / bio).
18	/dashboard/settings	Settings / Security — left sub-nav (Personal Info / Security & Password), Change Password form w/ strength checklist (8 chars, uppercase, number/symbol), show/hide toggles, "logged out on all devices" warning banner.
Recruiter (11 pages)
#	Route	Purpose & key UI
19	/dashboard/recruiter	Recruiter Overview — KPI cards (New Applications / Active Postings / Total Hires), Hiring Pipeline funnel (Submitted→Applied→Hired bars), Recent Activity feed (avatar, name, status badge, time-ago). Review Applicants + Post buttons.
20	/dashboard/analytics	Analytics Overview — KPI cards (Total Views / Total Apps / Conversion), bar chart "Applications by Status", Daily Activity table (date, role, views, apps, status-split bar), sidebar: Post/Manage buttons + Active Roles list. Export button (disabled).
21	/dashboard/companies	My Companies — recruiter's own companies grid w/ logo/industry/location/size, New Company button, empty state.
22	/dashboard/companies/new	Create Company — form: name*, description, website, industry, size (select), location, logo upload.
23	/dashboard/companies/[id]	Company Detail (recruiter) — header w/ logo & meta, description, Open Positions list (link to job detail), Delete w/ AlertDialog confirm (recruiter only).
24	/dashboard/jobs	Job Listings — search + tabs (All/Active/Paused w/ counts), table: title/location, status badge, applicants count, posted date, row actions (view applicants / analytics / edit), pagination (5/page).
25	/dashboard/jobs/create	Create Job — 4-section wizard w/ sticky step nav: (1) Basic Info: company select (warns if none), title, employment type, department, openings; (2) Description; (3) Compensation & Location: salary, location, work-setup radios; (4) Stack & Benefits: skill tag input + benefit checkboxes.
26	/dashboard/jobs/[id]	Job Detail (recruiter) — status badges, title/location/salary/company, Description + Role cards, Applications + Analytics shortcut buttons. "Job not found" card.
27	/dashboard/jobs/[id]/edit	Edit Job — pre-filled Basics/Description/Details (key requirements list add/remove, salary) + Active/Paused toggle switch. ⚠️ Submit currently shows "API not yet implemented" toast — needs backend wiring.
28	/dashboard/jobs/[id]/analytics	Job Analytics — 3 KPI cards (views/apps/conversion), Daily Views & Applications bar chart (recharts).
29	/dashboard/jobs/[id]/applications	Job Applications (candidate review) — job header card (REQ-#### id), search + status filter + sort (match score/date/name), candidate cards: avatar, name, Premium crown badge, email, resume link, match-score badge, bio, Preview Resume, status change dropdown (Submitted/Applied/Hired/Rejected; terminal = "Final").
C. AI PAGES (3 pages) — use SiteHeader, no dashboard chrome
#	Route	Purpose & key UI
30	/ai/career-guidance	AI Career Chat — full-height chat UI: suggestion chips on first message, user/assistant bubbles, streaming text w/ typing cursor, stop button, autosizing textarea. ⚠️ Calls /api/ai/career-guidance which doesn't exist in this repo (no app/api dir) — currently fails with error bubble.
31	/ai/match/[jobId]	AI Match Analysis page — embedded AnalyzeMatch panel: Run analysis → SSE streaming progress → result: score ring, recommendation (Strong/Weak/Moderate), summary, strengths, gaps, re-run. (Also reachable as a dialog from job detail / job feed.)
32	/ai/resume-analysis	Resume Analysis — upload zone (PDF ≤10MB) + Analyze button. ⚠️ Result is placeholder ("available soon", 1s setTimeout) — SSE endpoint TODO.
D. SYSTEM / SPECIAL PAGES
Route	File	Purpose
— (all routes)	app/loading.tsx	Global loading — full-screen centered spinner (border-primary/30 + top border). Shown during route streaming.
— (all routes)	app/error.tsx	Root error boundary — "This page didn't load" + Try again (reset) / Go home buttons. Logs error to console.
MISSING	app/not-found.tsx	⚠️ DOES NOT EXIST. Unknown URLs currently fall through to Next's default 404. A custom 404 design needs to be created.
E. PROTECTION / INFRASTRUCTURE (relevant for UX design)
- middleware.ts — server-side: blocks unauthenticated access to /dashboard/*, /ai/*, /companies*? (redirects to /login); blocks recruiters from seeker routes (/dashboard/applications, /dashboard/resume) and jobseekers from recruiter routes (/dashboard/companies, /dashboard/jobs, /dashboard/recruiter).
- AuthGuard — client-side spinner "Checking session…" / "Redirecting…" before dashboard render.
- GuestGuard — hides auth pages from logged-in users (redirects to /jobs).
- SiteHeader — sticky; auth-aware: theme toggle, bell popover ("No notifications yet" placeholder, count 0), avatar dropdown (Dashboard/Profile/Settings/Sign out). Mobile menu button reserved (onMenuClick prop) but not wired — dashboard sidebar is hidden on mobile (hidden md:flex), so mobile users have no navigation menu (UX gap).
Totals: 32 actual page routes + 2 system pages (loading, error) = 34. Missing for a complete app: not-found (404) page and global-error page.
Want me to create the missing not-found.tsx (and optionally global-error.tsx) now, or is this report enough for the design AI?I've now read the entire codebase in detail (all 4 services, shared package, Kafka eventing layer, nginx, docker-compose, seed, e2e, CI). Here is the complete breakdown.
j-track-services — Full Backend Analysis
0. What this repo is
A backend-only pnpm monorepo. There are zero frontend pages (no HTML/React/Next.js/view files). It is a set of 4 Express microservices meant to be consumed by a separate Next.js frontend (expected at http://localhost:3000). The only "HTML" in the repo are 3 email templates. UI/UX design must be derived entirely from the API surface described below.
Next.js FE (:3000) ──HTTP──► nginx (:80)
                                  │
        ┌──────────────┬──────────┼──────────┬───────────────┐
        ▼              ▼          ▼          ▼               │
   auth (:7000)    user (:7001) job (:7002)  utils (:6001)   │
        │              │          │               │           │
        ├──────────────┴──────────┴───────────────┤           │  internal HTTP
        │                                         │           │
   ┌────┴───────────┐   ┌──────────┐   ┌──────────┴─────┐     │
   │  PostgreSQL    │   │  Redis   │   │     Kafka      │     │
   │ (Prisma, 10    │   │ cache +  │   │ send-mail,     │     │
   │  tables)       │   │ rate-limit│   │ job-events (+DLQs) │ │
   └────────────────┘   └──────────┘   └────────────────┘     │
   Cloudinary (media) · Groq/Gemini (AI) · SMTP (email) ──────┘
Tech: Express 5, TypeScript, Prisma 6 (PostgreSQL), Redis 7, Kafka (kafkajs), Zod 4, JWT cookies, bcrypt, Cloudinary, Groq, Gemini, Nodemailer, Vitest.
Two user roles (global enum user_role): recruiter and jobseeker. Almost every endpoint is role-gated.
1. AUTH SERVICE (:7000) — services/auth
Job: registration, login/logout, email verification, password management. Sets JWT as httpOnly cookies.
Entry point flow
- index.ts: connects Redis (5 retries w/ backoff) → runs Prisma migrations (initDB) → ensures send-mail topic → connects Kafka producer → listens on port 7000.
- app.ts: helmet → express.json → cookieParser → correlation middleware → morgan logger → CORS (origin = FRONTEND_URL, credentials true) → global rate limit (200 req / 15min) → stricter limiter (100 req / 15min) on login, register, forgot-password, verify-email, resend-verification → routes → error middleware.
Endpoints (/api/auth/*)
Method	Path	Auth	Role	Purpose
POST	/register	No	Any	Create account. multipart/form-data: name, email, password, phone_number, role, bio (optional), file (optional resume for jobseeker). Jobseeker resume is uploaded to Cloudinary via Utils. Creates user then sends a verification email (Kafka send-mail, VERIFY_EMAIL). Responds 201 but user cannot log in until verified (is_verified).
POST	/login	No	Any	email + password → sets accessToken (15min) + refreshToken (7d) httpOnly cookies. 403 if email not verified. Returns user {user_id, name, email, role}.
POST	/logout	Yes	Any	Clears cookies; revokes server-side refresh token only if it matches this session (idempotent).
GET	/me	Yes	Any	Current user: user_id, name, email, role, phone_number, bio, resume, profile_pic, created_at. Redis-cached 5min (auth:user:<id>).
POST	/forgot-password	No	Any	email → sends reset email (Kafka send-mail, RESET_PASSWORD) with link FRONTEND_URL/reset-password?token=.... Rate-limited per email via Redis (3 req / 15min). Always returns generic "If that email exists..." response (anti-enumeration).
POST	/reset-password/:token	No	Any	newPassword (≥8 chars). Verifies JWT reset token + Redis stored token, tracks failed attempts (5 / 15min), then resets.
POST	/verify-email	No	Any	body {token} → verifies email via Redis-stored verify token (15min TTL).
POST	/resend-verification	No	Any	body {email} → resends verify email if unverified.
PATCH	/change-password	Yes	Any	currentPassword + newPassword (≥8, must differ). Invalidates refresh token → forces re-login.
GET	/health	No	—	Reports {service, status, kafka, database, redis}. 200 healthy / 503 degraded.
Email templates (in template.ts)
- resetPasswordEmailTemplate — branded HTML email: gradient header (#4F46E5→#7C3AED), CTA button, expiry notice, fallback link, security note, footer.
- verifyEmailTemplate — same design, 📧 icon, "Verify Email →" CTA.
UI note: the frontend must have a /verify-email?token= and /reset-password?token= page to catch these links.
Internal behavior worth knowing for UI
- Registration is not silent for jobseekers — they may upload a resume during signup (optional). A recruiter registration has no resume field.
- Login failure reasons: invalid credentials (401), email not verified (403 with message).
- /me exists on both auth and user services.
2. USER SERVICE (:7001) — services/user
Job: profile management, bio, profile picture + resume uploads, skills management.
Entry point flow
- index.ts: connects Redis → listens on 7001. No Kafka, no migrations (migrations run by auth service).
- app.ts: CORS → helmet → global limiter (200/15min) → json+urlencoded (10mb) → cookieParser → correlation → logger → /api/users routes → health at /health.
Endpoints (/api/users/*)
Method	Path	Auth	Role	Purpose / data
GET	/me	Yes	Any	Full profile with skills: user_id, name, email, role, phone_number, bio, resume, profile_pic, created_at, subscription (date or null), skills[]. Redis-cached 5min (user:me:<id>).
GET	/:id	No	Public	Public profile (no email/phone/resume): user_id, name, role, bio, profile_pic, created_at, skills[]. Redis-cached 5min (user:<id>).
PUT	/update	Yes	Any	Update name (≥2 chars), phone_number (regex ^\+?[0-9\s\-().]{7,20}$), bio. Validates at least one field. Invalidates cache.
PUT	/bio	Yes	Any	Update bio only (≤2000 chars, non-empty).
POST	/profile-pic	Yes	Any	multipart field profile_pic (image/jpeg,png,webp; ≤5MB). Uploads to Cloudinary (Utils), replaces old image (deletes old public_id), updates user, invalidates cache.
POST	/resume	Yes	jobseeker only	multipart field resume (PDF only, ≤5MB). Uploads to Cloudinary, replaces old, invalidates cache.
POST	/add-skill	Yes	Any	body {skills: string[]} (≤30). Each skill is upserted into skills table (lowercased, ≤100 chars), then linked to user. Returns user's skill list.
DELETE	/remove-skill	Yes	Any	body {skill_ids: number[]}. Removes links. Returns remaining skills.
GET	/skills	No	Public	All available skills (skill_id, name, A-Z). Redis-cached 1 hour (skills:all).
Caching keys
user:me:<id>, auth:user:<id> (shared with auth service's /me cache — both are invalidated together so auth /me and user /me stay consistent), user:<id>, skills:all.
Cross-service call
- Uploads call UTILS_SERVICE_URL → POST /api/utils/upload with {buffer (data URI), public_id?}. If Utils is down, returns 502 "Upload service unavailable".
UI note: jobseeker is blocked from applying without a resume, so the profile page must prompt/force resume upload before applying. Resume is PDF-only.
3. JOB SERVICE (:7002) — services/jobservice
Job: companies, job postings, applications, AI match analysis (SSE proxy), recruiter analytics, and the analytics Kafka consumer + outbox worker. This is the most complex service.
Entry point flow
- index.ts: connects Redis → migrations no-op → ensures send-mail + job-events topics → connects Kafka producer → starts analytics consumer (job-analytics-group on job-events) → starts outbox worker (job-service-outbox) → listens on 7002.
- app.ts: same middleware stack as user + global limiter (200/15min). Routes at /api/jobs.
Endpoints (/api/jobs/*)
Companies:
Method	Path	Auth	Role	Notes
POST	/create-com	Yes	recruiter	multipart field logo (jpeg/png/webp ≤5MB, optional) + name (unique, case-insensitive → 409), description (≤5000), website (valid http/https URL). Logo → Cloudinary via Utils. 201.
GET	/	No	Public	Paginated companies list: ?page&limit (default 1/20, limit ≤100). Returns count, total, page, totalPages, companies[] (company_id, name, description, website, location, logo, created_at). Redis cached 5min w/ version-key invalidation (companies:list:v<N>;page=..;limit=..).
GET	/:company_id	No	Public	Single company (no location selected though schema has it — controller omits location here). Cached 5min.
GET	/detail/:company_id	Yes	recruiter	Own company + recruiter info + all its jobs (raw SQL JSON_AGG). Recruiter can only see their own company (403 otherwise). Cached 5min w/ ownership check.
DELETE	/:id	Yes	recruiter	Delete own company (cascade deletes jobs). Deletes logo from Cloudinary. 404 if not found, 403 if not owner.
Jobs:
Method	Path	Auth	Role	Notes
POST	/create-job	Yes	recruiter	title (≤255), description (≤5000), role (≤255), location (≤255), job_type (`Full-time
GET	/active-jobs	No	Public	Paginated active jobs with filters: ?title&location&job_type&work_location&page&limit. job_type/work_location accept comma-separated or repeated values. Returns count, total, page, totalPages, jobs[] with flattened company_name, company_logo, company_id. Redis cached 60s w/ version key.
GET	/jobs/:job_id	No	Public	Job detail: all job fields + company info (name, description, website, logo) + total_applications count. Cached 10min. Publishes job.viewed event to Kafka (job-events, partition key job-<id>) — feeds analytics.
PATCH	/jobs/:job_id	Yes	recruiter	Partial update (title, description, location, role, job_type, work_location, openings, salary, is_active, details). Must own company. Invalidates caches.
DELETE	/jobs/:job_id	Yes	recruiter	Delete own job. Invalidates caches.
Applications:
Method	Path	Auth	Role	Notes
POST	/apply	Yes	jobseeker	body {jobId}. Requires a resume uploaded. Creates application in a DB transaction and enqueues a job.applied outbox event (→ job-events). Sets subscribed = whether user has a future subscription timestamp (premium feature flag). 409 if already applied (unique job+applicant).
GET	/my-applications	Yes	jobseeker	Applications with job + company info (job_title, job_salary, job_location, job_type, work_location, is_active, company_id/name/logo), status, applied_at, subscribed. Cached 5min. 404 if none.
GET	/applications-by-job/:job_id	Yes	recruiter	All applications for own job with applicant profiles (name, email, phone, bio, profile_pic) + resume URL + status + subscribed. Sorted: subscribed applicants first, then earliest applied. Cached 5min. 404 if job not found/not theirs.
PATCH	/applications/:application_id	Yes	recruiter	body {status}: `Submitted
AI / Analytics:
Method	Path	Auth	Role	Notes
POST	/analyze-match/:jobId	Yes	jobseeker	SSE passthrough to Utils /ai/analyze-match. Requires resume uploaded. 60s timeout, aborts on client disconnect. Streams Utils chunks straight through.
GET	/analytics/:job_id	Yes	recruiter	Own job analytics: total_views, total_applications, total_status_changes + daily[] last 90 days (date, views, applications, status_changes).
Analytics consumer (analytics/consumer.ts)
Consumer group job-analytics-group on job-events. Processes job.viewed, job.applied, application.status_changed. Uses transactional idempotency (markProcessedInTx — dedup row + analytics upsert commit atomically), increments per-day counters in job_analytics table. Failures → job-events-dlq after retries.
Outbox worker (@jtrack/shared/kafka/outbox)
Polls outbox_events table (PENDING → PROCESSING → SENT), publishes to Kafka, retries w/ exponential backoff + jitter (max 5 attempts), sweeps stale PROCESSING claims every 15s.
Redis cache invalidation model
- Jobs list: version counter (jobs:list:version) — every create/update/delete INCRs it, making all list caches stale at once. Also deletes job:<id>.
- Companies: same pattern (companies:list:version + company:<id> + company:detail:<id>).
- Applications: direct DEL of applications:user:<id> and applications:job:<id>.
UI note: recruiter has a full dashboard surface: my company + jobs, view applications per job (with candidate profiles), update status (Submitted/Hired/Rejected), and an analytics view (90-day daily trend). Jobseeker has: browse + filter jobs, job detail (with "total applicants" badge), apply (needs resume), "my applications" tracker with live status, and an AI match analyzer.
4. UTILS SERVICE (:6001) — services/utils
Job: Cloudinary file storage, AI (Gemini + Groq) with SSE streaming, and two Kafka consumers (email + recruiter notifications). No auth middleware — relies on network isolation; endpoints are rate-limited instead.
Entry point flow
- index.ts: init Cloudinary config → starts HTTP on 6001 → ensures topics send-mail, send-mail-dlq, job-events → starts mail consumer + notification consumer → /health reports both consumers' health.
- app.ts: helmet → json/urlencoded (50mb — handles base64 uploads) → correlation → logger → CORS. No global limiter here (rate limits are per-route).
Endpoints (/api/utils/*)
Method	Path	Limit	Purpose
POST	/upload	—	body {buffer: base64-data-uri, public_id?}. Validates buffer ≤10MB. If public_id given, destroys old asset first. Uploads to Cloudinary folder j-track, resource auto (jpg/jpeg/png/webp/pdf), 800×800 limit crop. Returns {success, url, public_id}.
DELETE	/:public_id	—	Destroys Cloudinary asset by public_id (regex ^[\w/-]+$).
POST	/ai/generate	10/min	Test endpoint: Gemini generateContent "Explain how AI works". Returns model + text (not SSE).
POST	/ai/career-guidance	5/min	SSE (Gemini gemini-2.0-flash-lite, temp 0.7, max 4096 tokens). Input (Zod): {skills: string[] (1–20), experienceLevel?: junior/mid/senior (default mid), targetRole?: string}. Emits: {status:"start"} → many {status:"chunk", chunk} → {status:"done", result, meta:{responseTime, model}}. Result JSON shape (from prompt): {summary, jobOptions[]: {title, category, description, matchScore, responsibilities[], requiredSkills[], missingSkills[]}, learningPath[]: {skill, category, reason, whyItMatters, resources[]}, topRecommendation: {title, reason}}.
POST	/ai/analyze-match	5/min	SSE (Groq llama-3.3-70b-versatile, temp 0.3, max 2048). Input (Zod): {resumeUrl, job: {title, description, salary?, location?, job_type?, work_location?, role?, company_name?, details?}}. Downloads the resume PDF from Cloudinary URL, parses it (pdf-parse). Emits progress events: {status:"progress", stage:"download"} → {status:"progress", stage:"analyze"} → {status:"chunk", text} → {status:"complete", result: {matchScore, strengths[], gaps[], recommendation: yes/maybe/no, recommendationReason, summary, fullAnalysis}}.
POST	/ai/analyze	3/min	SSE (Groq). multipart field resume (PDF ≤5MB, .pdf extension). Parses PDF → streams {status:"extracting"} → {status:"analyzing"} → {status:"done", result: {atsScore: {overall, breakdown: {formatting(20), keywords(25), experience(25), education(10), skills(10), achievements(10)} w/ score+max+reason}}, candidateProfile: {name, email, phone, location, currentLevel, primaryDomain, yearsOfExperience, currentTitle}, summary, detectedSkills: {technical[], soft[], tools[], certifications[], languages[]}, missingKeywords[], suggestedRoles[], strengths: {title, description}[], improvements: {priority, section, issue, suggestion, atsImpact}[], quickWins: {action, impact}[]}}.
GET	/health	—	{service, status, consumers: {mail, notification}}.
Kafka consumers
Mail consumer (consumer.ts) — group mail-service-group on send-mail, DLQ send-mail-dlq. Requires {to, subject, html}. Check-then-mark idempotency (SMTP can't be transactional with dedup row). Sends via Nodemailer SMTP (Gmail default 465, secure). MAIL_SEND_RETRIES (3) retries. If MAIL_PREVIEW=true or non-production + MAIL_SEND_ENABLED!=true, it just logs (preview mode). Marks processed after send.
Notification consumer (notification-consumer.ts) — group notification-group on job-events, DLQ job-events-dlq. Only processes type === "job.applied". Looks up job + company name → recruiter email → sends "New Application" email to recruiter (newApplicationTemplate). Handles missing job/recruiter gracefully (marks processed + warn).
Email templates (all in utils/jobservice/auth)
1. Verify email + 2. Reset password (services/auth/src/template.ts) — indigo→violet gradient branding, 🔐/📧 icons.
2. Application status update (services/jobservice/src/utils/template.ts) — blue→violet gradient, 🔔 icon, informs applicant of status change.
3. New application to recruiter (services/utils/src/notification-consumer.ts) — green gradient, 📋 icon.
UI note: the resume analysis and career guidance features are the richest UI surfaces: ATS score with category breakdown (6 bars), candidate profile card, detected skills grouped, improvements, quick wins, suggested roles, and a career path with learning recommendations.
5. SHARED LIBRARY @jtrack/shared (packages/shared)
Cross-service code. Key exports & what they do:
- db.ts → singleton PrismaClient (loads root .env).
- token.ts → signAccessToken (15m), signRefreshToken (7d), signResetToken (15m, JWT_RESET_SECRET).
- cookies.ts → httpOnly, secure in prod, sameSite:"strict", maxAge 15m/7d.
- isauthenticated.ts → the auth gate used by all 3 services. Flow: verify accessToken cookie → if valid, attach req.user = {user_id, role}. If expired/missing → check refreshToken cookie → verify + look up user + compare stored refresh_token → if OK, auto-mint a new accessToken cookie and proceed; else 401. (This is why JWT works cross-service with one shared secret.)
- errorHandler.ts → ErrorHandler(statusCode, message) class + errorMiddleware → res.status(code).json({success:false, message}).
- tryCatch.ts → wraps async controllers, maps thrown errors to JSON {success:false, message}.
- buffer.ts → getBuffer(file) → data-URI string for Cloudinary uploads.
- logger.ts → morgan request logging.
- migrate.ts → runs prisma migrate deploy at auth-service startup.
- env.ts → finds & loads root .env.
- types.ts → AuthRequest, UserPayload.
- redis/helpers.ts → withCache (get-or-fetch JSON w/ TTL) + createRedisHelpers (set/get/del/incr + Redis Lua-script rate limiting for forgot-password: 3 req/15min/email, and reset attempts: 5/15min).
- Kafka modules: producer (singleton, auto-envelopes, idempotent producer, backoff connect, healthCheck), envelope (event envelope {eventId, eventType, eventVersion, occurredAt, source, correlationId, payload} + legacy-tolerant parse w/ deterministic synthetic IDs), consumer-factory (shared pipeline: normalize → correlation ctx → handler → retry w/ backoff → DLQ → metrics), outbox (transactional outbox: enqueue/claim/process/sweep/worker), idempotency (markProcessed, markProcessedInTx, isAlreadyProcessed, prune), dlq (retry classification + publishToDLQ), correlation (AsyncLocalStorage x-correlation-id propagation), partitioning (job-<id>, applicant-<id> keys for per-aggregate ordering), metrics (in-process counters), topic (ensure/list/create topics), config (broker/SASL/SSL/retry config), consumer (health check), replay (DLQ replay CLI logic), events (typed JobEvent types), types (MailMessage, KafkaHealth, ProducerInstance, ConsumerInstance).
6. INFRASTRUCTURE
Nginx (:80) — 4 config sets (local / dev / compose / prod)
- Proxies /api/auth|users|jobs|utils to the 4 services. Exact-match health endpoints per service.
- SSE handling: /api/jobs/analyze-match/ (and in compose config the match controller) → proxy_buffering off, proxy_cache off, chunked_transfer_encoding on.
- Prod only: HTTPS+HTTP2, HSTS, TLS 1.2/1.3, rate-limit zones (r_login 5r/m, r_register 3r/m, r_forgot 3r/m, r_apply 10r/m, r_general 100r/m), and an error_page 502 503 504 /5xx.html → plain-text "Service temporarily unavailable." (the only "error page" in the entire repo).
- client_max_body_size 50m for utils (uploads).
Docker
- docker-compose.dev.yml: redis:7 + 4 services + nginx (:80). Kafka via Confluent Cloud (env).
- docker-compose.prod.yml: pre-built GHCR images, nginx with SSL certs mounted (nginx/ssl/), redis exposed internally.
- .env at root drives everything (DB_URL, REDIS_URL, KAFKA_BROKER, JWT secrets, CLOUDINARY, API_KEY_GROQ/GEMINI, SMTP, FRONTEND_URL, outbox/consumer tunables).
Kafka topology
Topic	Producer	Consumer(s)
send-mail	auth (verify/reset emails), jobservice (outbox: status emails)	utils mail-service-group
send-mail-dlq	utils mail consumer	replay CLI
job-events	jobservice (job.viewed direct + outbox: job.applied, application.status_changed)	jobservice job-analytics-group (daily analytics), utils notification-group (recruiter emails)
job-events-dlq	both consumers	replay CLI (pnpm kafka:replay)
Database (Prisma schema — 10 tables)
users (role, subscription_tier free/premium, subscription expiry date, is_verified, resume, profile_pic, refresh_token, tsvector search), skills, user_skills (M2M), notifications (created but no API consumer — reserved), companies (recruiter_id, logo, tsvector), jobs (job_type, work_location, openings, salary, details JSONB, is_active), applications (status Submitted/Rejected/Hired/Applied, subscribed, resume, unique job+applicant), job_analytics (daily views/applications/status_changes), outbox_events, consumer_dedup.
Seed data (services/jobservice/seed.ts)
2 recruiters, 8 jobseekers, 3 companies, 8 jobs (7 with rich details JSON — responsibilities, skills, tech_stack, interview process, etc.), 10 skills, 15 applications. All passwords password123.
7. HOW SERVICES RELATE (the 5 cross-service flows)
1. JWT handoff (shared secret): login (auth) → cookie set → the same cookie authenticates on user & job services via isAuthenticated (shared JWT_ACCESS_SECRET/JWT_REFRESH_SECRET). Auto-refresh works cross-service.
2. File uploads (sync HTTP): user (profile-pic, resume) + auth (resume at register) + jobservice (company logo) → call utils POST /api/utils/upload (and DELETE on delete). Utils owns Cloudinary.
3. AI match (sync SSE chain): jobservice /analyze-match/:jobId → fetches resume from DB → proxies (SSE) to utils /ai/analyze-match → utils downloads PDF from Cloudinary, calls Groq, streams back → jobservice relays stream to browser.
4. Email (async Kafka): auth + jobservice → send-mail → utils mail consumer → SMTP. (Reset/verify emails; application status updates.)
5. Analytics + notifications (async Kafka, event-driven): jobservice publishes job events → two independent consumer groups: jobservice's analytics consumer (daily metrics) + utils' notification consumer (recruiter "new application" email). All backed by transactional outbox + dedup for at-least-once safety.
8. FOR FRONTEND/UI·UX AI (page inventory derived from the API)
Public (no auth):
 1. Landing / home
 2. Login
 3. Register (role toggle recruiter/jobseeker; jobseeker may attach resume)
 4. Verify email (/verify-email?token=)
 5. Resend verification
 6. Forgot password (request link)
 7. Reset password (/reset-password?token=)
 8. Browse jobs (list + filter: title, location, job_type, work_location + pagination)
 9. Job detail (with company info + total applications + AI match analyzer CTA for jobseekers)
10. Browse companies (paginated) + company detail (public)
11. Public user profile (by id)
Jobseeker (auth):
12. My applications (status tracker: Applied/Submitted/Hired/Rejected, subscribed badge)
13. Apply flow (needs resume → upload-first gating, duplicate-apply 409 handling)
14. AI match analysis page (live SSE streaming: progress → chunks → score/strengths/gaps/recommendation)
15. Resume analysis page (ATS score breakdown, candidate profile, skills, improvements, quick wins, suggested roles)
16. Career guidance page (skills input → streaming → job options, learning path, top recommendation)
17. Profile management (edit name/phone/bio, upload pic, upload PDF resume, add/remove skills)
18. Change password
Recruiter (auth):
19. Create company (+logo)
20. Company dashboard (own company + its jobs)
21. Create/edit/delete job (rich details JSON editor: responsibilities, required/preferred skills, tech stack, experience, education, certifications, languages, benefits, visa, hours, team, reporting, growth, interview process)
22. Job applications inbox (per job, candidates + resumes, subscribed-first sort, status management Submitted/Hired/Rejected, terminal-status rules)
23. Analytics dashboard (90-day daily views/applications/status-changes + totals)
Global:
24. Loading/skeleton states (SSE: extracting/analyzing/start/chunk/progress; pagination; file uploads)
25. Error states (JSON {success:false,message} per endpoint + network 502/503/504 + prod /5xx.html)
26. Not-found (unknown routes → JSON from Express; no page exists — build one in the FE)
Want me to dump this into a docs/frontend-api-contract.md (or similar) you can paste directly into your UI/UX AI prompt?

