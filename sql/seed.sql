-- ============================================================================
-- FONSI portfolio - Seed (matches the current hardcoded site content)
-- Run AFTER migration.sql
-- ============================================================================

-- Hero
insert into hero_content (id, heading_prefix, heading_highlight, heading_suffix,
                          subheading, global_line,
                          cta_primary_text, cta_primary_link,
                          cta_secondary_text, cta_secondary_link)
values (1, 'Turning ', 'Ads', ' Into Actual Revenue',
        'I''m Himanshu Bhardwaj — FONSI. I run performance ads, grow brands, and design graphics & edit video that stop the scroll and move the numbers.',
        'Serving clients across India, US, UK, UAE & globally — async-first across time zones.',
        'Start a Project', '#contact',
        'See My Work', '#work')
on conflict (id) do update set
  heading_prefix = excluded.heading_prefix,
  heading_highlight = excluded.heading_highlight,
  heading_suffix = excluded.heading_suffix,
  subheading = excluded.subheading,
  global_line = excluded.global_line,
  cta_primary_text = excluded.cta_primary_text,
  cta_primary_link = excluded.cta_primary_link,
  cta_secondary_text = excluded.cta_secondary_text,
  cta_secondary_link = excluded.cta_secondary_link;

-- Stats
delete from stats;
insert into stats (value, label, "order") values
  ('100+', 'Campaigns Run', 1),
  ('4.8x', 'Average ROAS', 2),
  ('3+',   'Years Experience', 3),
  ('10+',  'Countries · Global Clients', 4);

-- Services
delete from services;
insert into services (title, description, icon_name, "order") values
  ('Paid Ads',         'Meta & Google campaigns built around real buyer intent. Creatives that convert, funnels that scale.', 'megaphone', 1),
  ('Growth Strategy',  'End-to-end marketing plans — offer, audience, channels, metrics. From first $1 to first $100K.',     'trending',  2),
  ('Graphic Design',   'Ad creatives, brand kits, social posts. Clean, conversion-led, scroll-stopping visual work.',         'palette',   3),
  ('Video Editing',    'UGC edits, reels, product videos. Punchy cuts with hooks that hold attention to the CTA.',            'film',      4);

-- Projects (Recent Work)
delete from projects;
insert into projects (title, category, description, gradient, link, "order") values
  ('D2C Skincare Brand',  'Meta Ads · Creative',     'Scaled from 1.2x to 4.6x ROAS in 60 days with UGC-led creatives.',                'from-[#ff6a88] via-[#ff99ac] to-[#fecfef]', '#contact', 1),
  ('SaaS Growth Launch',  'Full Funnel · Google Ads','$0 to $48K MRR in one quarter with a targeted search + retargeting funnel.',     'from-[#8a5cf6] via-[#a78bfa] to-[#c4b5fd]', '#contact', 2),
  ('Lifestyle Brand Reel','Video Editing',           '3 reels averaging 1.2M organic views — hooks cut to the first 1.8s.',           'from-[#fbbf24] via-[#fb923c] to-[#f87171]', '#contact', 3),
  ('Local Fitness Studio','Design · Ads',            'Rebranded creatives + lead-gen campaign — 3x qualified bookings.',              'from-[#34d399] via-[#22d3ee] to-[#60a5fa]', '#contact', 4);

-- Future Projects (More Work)
delete from future_projects;
insert into future_projects (title, category, gradient, link, "order") values
  ('Supplement Brand',    'Ads',    'from-[#6366f1] to-[#312e81]', '#contact', 1),
  ('Fashion Reel Cut',    'Video',  'from-[#f59e0b] to-[#b45309]', '#contact', 2),
  ('Café Launch Kit',     'Design', 'from-[#a78bfa] to-[#6d28d9]', '#contact', 3),
  ('EdTech Funnel',       'Ads',    'from-[#ec4899] to-[#831843]', '#contact', 4),
  ('Product Explainer',   'Video',  'from-[#10b981] to-[#065f46]', '#contact', 5),
  ('Brand Starter Pack',  'Design', 'from-[#38bdf8] to-[#0c4a6e]', '#contact', 6);

-- Journey Steps
delete from journey_steps;
insert into journey_steps (step_number, title, description, "order") values
  ('1','Discover','Audit your brand, offer, audience and numbers. Find the real bottleneck.',1),
  ('2','Strategy','Map the funnel, channels, creatives and KPIs. Zero fluff, clear plan.',2),
  ('3','Execute','Ads live, creatives shipped, video cut. Daily eyes on the dashboard.',3),
  ('4','Scale','Double down on what works, kill what doesn''t. ROAS up, CAC down.',4);

-- Achievements (first row is the headline number)
delete from achievements;
insert into achievements (number, label, description, is_headline, "order") values
  ('20', 'Brands Grown', 'Brands grown across e-com, SaaS, and local services since I started FONSI.', true, 0),
  (null, 'Scaling Brands Beyond 7 Figures', 'Multiple e-com clients crossed monthly revenue records with my campaigns.', false, 1),
  (null, 'Creative-First Performance', 'In-house creatives consistently outperforming agency-made ads by 2–3x.', false, 2),
  (null, 'Retention Over Spray & Pray', 'Built retention funnels that lift LTV so every rupee of ad spend earns more.', false, 3);

-- Skills
delete from skills;
insert into skills (label, display, "order") values
  ('Meta Ads',      'Meta Ads',      1),
  ('Google Ads',    'Google Ads',    2),
  ('Graphic Design','Graphic Design',3),
  ('Video Editing', 'Video Editing', 4);

-- Testimonials
delete from testimonials;
insert into testimonials (name, role, rating, review_text, days_ago, "order") values
  ('Aarav Mehta',  'Founder, D2C',  5.0, 'FONSI rebuilt our ad creatives and funnel from scratch. We went from 1.2x to 4x ROAS in under two months. Communication was sharp, no fluff.', '2 days ago', 1),
  ('Priya Sharma', 'Marketing Lead',5.0, 'Himanshu gets performance marketing AND design. Rare combo. Our reels started hitting six-figure views consistently.',                    '1 week ago', 2),
  ('Rohan Kapoor', 'Co-founder',    5.0, 'Launched our D2C brand with FONSI. Clear numbers, clear reporting, and creatives that actually moved the needle.',                       '3 weeks ago',3),
  ('Sneha Iyer',   'Owner',         5.0, 'He treats your money like his own. Scaled our local studio with a lean budget — 3x qualified leads in one quarter.',                     '1 month ago',4),
  ('Kabir Joshi',  'Growth Lead',   5.0, 'Best creative + paid combo I''ve worked with. Hooks are tight, edits are clean, and reporting is brutally honest.',                     '2 months ago',5);

-- Site Settings
insert into site_settings (id, contact_email, contact_phone, address, timezone_line,
                           footer_description, social_links,
                           cta_heading_prefix, cta_heading_highlight, cta_heading_suffix,
                           cta_subcopy)
values (1, 'hello@fonsi.co', '+91 00000 00000', 'India · Worldwide',
        'Available across time zones · India · US · UK · UAE · Global',
        'Himanshu Bhardwaj — digital marketer, designer, and editor helping brands grow with performance ads and creative that actually converts.',
        '{"twitter":"#","instagram":"#","youtube":"#","email":"mailto:hello@fonsi.co"}'::jsonb,
        'Let''s Build Something ', 'Amazing', '',
        'Tell me about your brand and your market — wherever you''re based. I work across time zones and deliver async, with clear updates every step.')
on conflict (id) do update set
  contact_email = excluded.contact_email,
  contact_phone = excluded.contact_phone,
  address = excluded.address,
  timezone_line = excluded.timezone_line,
  footer_description = excluded.footer_description,
  social_links = excluded.social_links,
  cta_heading_prefix = excluded.cta_heading_prefix,
  cta_heading_highlight = excluded.cta_heading_highlight,
  cta_heading_suffix = excluded.cta_heading_suffix,
  cta_subcopy = excluded.cta_subcopy;
