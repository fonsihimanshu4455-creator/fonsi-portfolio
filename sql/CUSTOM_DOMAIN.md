# Custom Domain + Analytics — Setup Guide

This guide connects your own domain (e.g. `fonsi.co`, `fonsi.in`, `himanshubhardwaj.com`) to the Vercel project and walks through Google Search Console + Analytics.

Estimated total time: **15 min of active work + DNS propagation wait (up to a few hours, usually < 30 min).**

---

## 1. Buy a domain (skip if you already have one)

Recommended registrars:
- **Namecheap** — cheap, simple, India-friendly, WHOIS privacy free
- **Cloudflare Registrar** — at-cost pricing, great if you also want Cloudflare CDN
- **GoDaddy** — works but overpriced, avoid unless you must

Good TLD options for your brand:
- `fonsi.co` — modern, international (~$25/yr)
- `fonsi.in` — India-anchored (~$5/yr)
- `fonsi.agency` / `fonsi.studio` — descriptive (~$20/yr)
- `himanshubhardwaj.com` — personal brand (~$10/yr)

Buy it. Come back here when the domain is sitting in your registrar account.

---

## 2. Add the domain in Vercel

1. Go to **vercel.com/dashboard → fonsi-portfolio project → Settings → Domains**
2. Type your domain (e.g. `fonsi.co`) in the input → **Add**
3. Vercel will also suggest adding `www.fonsi.co` as a redirect — accept it
4. Vercel will now show DNS instructions. **Keep this tab open.**

---

## 3. Point DNS to Vercel

Two options depending on where DNS lives:

### Option A — Use Vercel's nameservers (simplest, recommended)

At your registrar (Namecheap/Cloudflare/GoDaddy):
1. Find "Nameservers" or "DNS settings"
2. Switch to **custom nameservers** and paste what Vercel shows — usually:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
3. Save.
4. Propagation: **5 min – 2 hours** typically.

### Option B — Keep your existing DNS provider, add records manually

If you want to keep DNS at Cloudflare / Namecheap / etc.:

1. **`A` record** for root (`@`):
   - Type: `A`
   - Host: `@`
   - Value: `76.76.21.21`
   - TTL: automatic
2. **`CNAME` record** for `www`:
   - Type: `CNAME`
   - Host: `www`
   - Value: `cname.vercel-dns.com`
   - TTL: automatic

Save both records.

> **Cloudflare users**: set the orange proxy cloud to **DNS only** (grey) for these records, or HTTPS will break. Vercel handles its own SSL.

---

## 4. Wait for verification

Back in Vercel → Settings → Domains, you'll see:
- `Verifying…` → turns into `Valid Configuration` ✅
- SSL cert auto-issues (free, via Let's Encrypt) — usually within 60 sec of DNS propagation
- Your production site is now live on `https://fonsi.co`

---

## 5. Update `NEXT_PUBLIC_SITE_URL`

So the sitemap, OG images and canonical tags use the real domain:

1. Vercel → Settings → Environment Variables → **Add new**
2. Key: `NEXT_PUBLIC_SITE_URL`
3. Value: `https://fonsi.co` (no trailing slash)
4. Environments: Production + Preview + Development
5. Save → **Redeploy** the latest deployment

---

## 6. Google Search Console (get indexed)

1. Go to **search.google.com/search-console**
2. Add property → **URL prefix** → enter `https://fonsi.co`
3. Verify via DNS TXT record (Google will give you a string)
   - Back at your DNS provider, add a `TXT` record for `@` with that value → save
   - Wait 5 min → click Verify
4. Once verified, go to **Sitemaps** (left sidebar) → submit `https://fonsi.co/sitemap.xml` → Success
5. Google will start crawling within 24-72 hours. Pages usually indexed within a week.

---

## 7. Vercel Analytics (already installed — just view it)

Already wired in `app/layout.js` via `@vercel/analytics` and `@vercel/speed-insights`.

- Vercel Dashboard → project → **Analytics** tab → traffic, top pages, countries, devices
- **Speed Insights** tab → real user Core Web Vitals (LCP, FID, CLS)
- Both are **free on Hobby** with reasonable monthly quotas

No extra config needed. Data starts flowing automatically once the domain is live and real users visit.

---

## 8. (Optional) Add Google Analytics 4 as well

Vercel Analytics is great for quick stats. GA4 gives deeper funnels, events, audiences — useful when campaigns are running.

1. **analytics.google.com** → Admin → Create account → Create property `FONSI`
2. Create a Web data stream for `https://fonsi.co`
3. Copy the **Measurement ID** (`G-XXXXXXXXXX`)
4. Vercel env vars → `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`
5. Ping me for the ~10 line snippet to mount GA4 in `app/layout.js` (I can add it quickly)

---

## 9. Email on your domain (bonus, optional)

Once the domain is live, `hello@fonsi.co` style addresses are nice for lead responses:

- **Zoho Mail Free** — 5 users, 5 GB each, works with your domain — free forever
- **Google Workspace** — $6/user/month, best deliverability
- **Fastmail** — $3/month, great UX

Update `hello@fonsi.co` in `/admin/settings` once email routing works.

---

## Troubleshooting

**"DNS configured incorrectly" / verification stuck for > 30 min**
- Check `https://dnschecker.org/#A/fonsi.co` — does it show `76.76.21.21` globally?
- If not, wait longer; some registrars take 2-4 hours
- Flush local DNS: `ipconfig /flushdns` (Win) or `sudo dscacheutil -flushcache` (Mac)

**SSL error "Your connection is not private"**
- Wait 2 min — cert is still being issued
- Refresh; once Vercel shows ✓ Valid Configuration, HTTPS works

**Old DNS records interfering**
- Delete any `AAAA`, old `A`, or `CNAME` records pointing to the old host before adding Vercel's

**Cloudflare proxy breaking things**
- Set the cloud icon to grey (DNS only) for `@` and `www` — Vercel manages SSL, Cloudflare's proxy conflicts

---

When you have the domain live, ping me and I'll:
- Update canonical URLs everywhere
- Regenerate OpenGraph + sitemap
- Add GA4 if you want
- Set up email forwarding / Zoho if you want
