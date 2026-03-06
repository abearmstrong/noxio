# Noxio — PRD v0.1
**"Your company never sleeps."**

An autonomous AI operator that runs your SaaS business 24/7 — coding, marketing, support, and growth — without you.

---

## The Problem
Solopreneurs and indie hackers have brilliant ideas but run out of time, energy, and execution bandwidth. Building a product is only 20% of the work. The other 80% — marketing, cold outreach, fixing bugs, writing copy, monitoring metrics, handling support — never ends.

Existing solutions: hire freelancers (expensive), use Zapier automations (rigid), try Polsia (locked to their subdomain, can't use existing products, no vertical specialization).

---

## The Solution: Noxio
You describe your product. Noxio takes over from there.

- **Codes**: Ships features, fixes bugs, monitors for regressions
- **Markets**: Posts on X, drafts newsletters, runs cold email campaigns
- **Supports**: Handles customer queries, escalates only when needed
- **Grows**: Proposes experiments, A/B tests, tracks metrics, reports wins
- **Operates**: Runs your CI/CD, monitors uptime, renews domains

24/7. Autonomous. Works on YOUR existing codebase and domain.

---

## Key Differentiators vs. Polsia

| Feature | Polsia | Noxio |
|---------|--------|-------|
| Custom domain | ❌ (polsia.app only) | ✅ Bring your own domain |
| Existing product | ❌ New builds only | ✅ Works with existing codebases |
| GitHub integration | Unknown | ✅ Connects to your existing repo |
| Niche expertise | Generic | ✅ Specialized workflows per vertical |
| Pricing | $49/mo | $49/mo (competitive) |
| Live transparency | Public live feed | ✅ Private dashboard per user |

---

## MVP Scope (1 Week)

### Must Have
1. **Landing page** (noxio.ai) — hero, features, pricing, waitlist/signup
2. **Onboarding flow** — describe your company, connect GitHub, connect domain
3. **Agent execution loop** — tasks run autonomously via AI, logged per user
4. **Task types (MVP)**:
   - Code task (fix bug / ship feature via Codex)
   - X post (using xurl/xpost CLI)
   - Cold email (via SMTP)
   - Daily summary report
5. **User dashboard** — live view of what Noxio is doing for your company
6. **Billing** — Stripe, $49/mo subscription
7. **Auth** — Email/password or magic link

### Nice to Have (Week 2+)
- Ads engine (Google/Meta ads management)
- SEO monitoring + fixes
- Customer support inbox
- Multiple company support per account
- Public live feed (Polsia-style social proof)

---

## Tech Stack

### Frontend
- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** — clean, minimal dark aesthetic
- **Shadcn/ui** components

### Backend
- **Next.js API routes** + **Node.js**
- **Supabase** — auth, database, real-time
- **Stripe** — subscriptions

### Agent System
- **Claude API** (claude-sonnet-4-6) — task planning + execution
- **Codex CLI** — code tasks  
- **xpost CLI** — X/Twitter posting
- **Nodemailer/SMTP** — email outreach
- **GitHub API** — repo access + PR creation
- Task queue: simple Supabase table with cron-triggered execution

### Infrastructure
- **Vercel** — frontend + API routes
- **Hetzner VPS** — long-running agent processes (bg workers)
- **noxio.ai** domain (to register)

---

## Database Schema (MVP)

```sql
-- Users
users (id, email, name, created_at, stripe_customer_id)

-- Companies (each user has one in MVP)
companies (id, user_id, name, domain, github_repo, description, context_json, created_at)

-- Tasks
tasks (id, company_id, type, title, description, status, output, created_at, completed_at)
-- status: pending | running | done | failed
-- type: code | tweet | email | research | summary

-- Daily Logs  
logs (id, company_id, content, created_at)
```

---

## Pricing

**Single tier MVP:**
- $49/month — unlimited tasks, 1 company
- 14-day free trial (no credit card)

---

## Go-To-Market (Week 1)

1. Launch on X with live demo video
2. Post in r/SaaS, r/indiehackers, r/entrepreneur (non-spam, show real value)
3. Direct outreach to 50 solopreneurs with existing products
4. Product Hunt launch (Week 2)
5. Ben Cera is our free marketing — any X post comparing to Polsia will get traction

---

## Milestones

| Day | Goal |
|-----|------|
| Day 1 | PRD finalized, repo created, domain registered |
| Day 2-3 | Landing page live + waitlist, auth + dashboard scaffold |
| Day 4-5 | Agent loop working (code task + tweet task functional) |
| Day 6 | Stripe billing integrated, full onboarding flow |
| Day 7 | Beta launch — first paying customer |

---

## Non-Goals (MVP)
- Mobile app
- Public live feed of all companies (add Week 2)
- Multi-company per account
- Ads management
- Slack/Discord integrations

---

*Built by Avatar8. Abe Armstrong, AI CEO.*
