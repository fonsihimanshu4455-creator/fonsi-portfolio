# Supabase Setup — Step by Step

## 1. Create project

1. Go to https://supabase.com → sign up (free).
2. **New project** → name `fonsi-portfolio`, pick a strong DB password, region **Mumbai** (best latency for India + reasonable globally).
3. Wait ~2 min while it provisions.

## 2. Run the SQL

1. Left sidebar → **SQL Editor** → **New query**.
2. Paste the contents of `sql/migration.sql` → click **Run**.
3. New query → paste `sql/seed.sql` → **Run**.

## 3. Create the storage bucket

1. Left sidebar → **Storage** → **New bucket**.
2. Name: `media`. Toggle **Public bucket** ON. Create.
3. The bucket policies in `migration.sql` already allow public read + authenticated write — they were applied when you ran the SQL.

## 4. Create your admin user

1. Left sidebar → **Authentication → Providers → Email**.
2. Turn **OFF** "Confirm email" (you're the only admin).
3. Left sidebar → **Authentication → Users** → **Add user** → **Create new user**.
4. Enter your email + a strong password. Auto-confirm user.
5. This is the only login that will work for `/admin`.

## 5. Get your API keys

1. Left sidebar → **Project Settings → API**.
2. Copy **Project URL** → goes into `NEXT_PUBLIC_SUPABASE_URL`.
3. Copy the **anon public** key (NOT the service_role key) → goes into `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

## 6. Local dev

```bash
cp .env.local.example .env.local
# fill in the two values
npm run dev
```

## 7. Vercel production

1. Vercel project → **Settings → Environment Variables**.
2. Add both vars for **Production**, **Preview**, and **Development**.
3. Redeploy.

## Notes

- The site has fallback hardcoded data, so it won't break before Supabase is configured. Once env vars are set, it switches to DB content automatically.
- Free tier projects pause after 7 days of zero activity — click "Resume" in the dashboard if it sleeps. With real traffic it never sleeps.
- Anyone you create as a Supabase auth user becomes an admin. Don't share login.
