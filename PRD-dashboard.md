# Noxio Dashboard — Real Data PRD

## Goal
Replace the mockup dashboard with a live, real-data activity feed. Move the Polsia comparison off the homepage.

## Working directory
/tmp/noxio-work/noxio-app

## Tasks

- [ ] **Move comparison table off homepage**: In `src/app/page.tsx`, remove the entire "Noxio vs. the competition" section (the `<section>` block containing the grid with `Polsia` column). Replace it with a short 3-column "Why Noxio" trust block (3 bold stats/claims, e.g. "100% autonomous", "Ships code not tickets", "24/7 uptime"). Create a new page `src/app/compare/page.tsx` that contains the comparison table (same design) so it lives at `/compare` for SEO.

- [ ] **Supabase task logging API route**: Create `src/app/api/tasks/route.ts`. This is a GET endpoint that reads tasks from a Supabase table called `tasks`. Schema: `id (uuid), type (text: code|tweet|email|summary|report), title (text), status (text: done|running|pending), time_label (text), output (text nullable), created_at (timestamptz)`. Use `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_KEY` env vars. Order by `created_at DESC`, limit 20. Return JSON array.

- [ ] **POST /api/tasks route**: Add a POST handler to `src/app/api/tasks/route.ts` to insert a new task row. Body: `{ type, title, status, time_label, output? }`. Used by Noxio's own agent to log tasks as it runs them.

- [ ] **Wire dashboard to live API**: Update `src/app/dashboard/page.tsx` to fetch from `/api/tasks` on load using `useEffect` + `useState`. Show a loading spinner while fetching. Fall back to empty state ("No tasks yet — Noxio is warming up.") if no data. Keep the same TaskRow component. Add a "Refresh" button that re-fetches. Remove the `mockTasks` array.

- [ ] **Auto-refresh**: Dashboard should auto-refresh every 30 seconds using `setInterval` in `useEffect`.

- [ ] **Build and verify**: Run `npm run build` in the noxio-app directory. Fix any TypeScript or build errors. Build must pass with zero errors.

- [ ] **Commit**: `git add -A && git commit -m "feat: live dashboard with Supabase + move comparison to /compare"`

## Notes
- Supabase env vars should be read from process.env — don't hardcode values
- Keep all existing styling (dark theme, shadcn components)
- The /compare page should have a back link to the homepage
- Don't change the hero, features, or pricing sections on the homepage
- Don't install new dependencies beyond @supabase/supabase-js (add it if not present)
