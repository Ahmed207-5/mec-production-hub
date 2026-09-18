# MEC Hub Admin – Setup

The project keeps the current hard-coded content as a fallback, so the public site does not break if Supabase is not configured.

## 1) Create Supabase project

Create a new Supabase project dedicated to MEC Hub.

## 2) Create database + preserve current links

Open **SQL Editor** in Supabase and run the entire file:

`supabase/schema.sql`

The SQL creates the flexible hierarchy and seeds the current Production links and the supplied 2025 Power links. It does not delete the existing TypeScript data.

## 3) Create your admin user

In Supabase: **Authentication → Users → Add user**.
Create the email/password account you will use for `/admin`.

## 4) Vercel Environment Variables

Add these variables to the MEC Hub Vercel project for Production (and Preview if you want to test there):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `MEC_ADMIN_EMAILS`

`MEC_ADMIN_EMAILS` can contain multiple comma-separated emails.

Do **not** expose `SUPABASE_SERVICE_ROLE_KEY` in client code or send it to the browser.

## 5) Admin

Open:

`https://mecarchive.vercel.app/admin`

The dashboard supports:

- Add/edit/delete department, archive, folder, batch, year, term, link, and button nodes.
- Add a third term or any additional term number.
- Create an old-regulation/archive folder containing four years and any terms beneath each year.
- Change Drive links without touching the source code.
- Reorder items.
- Hide an item without deleting it.
- See Drive click counters.

Existing public routes such as `/production/2026` and `/power/2025` remain supported.

## Important

Until the Supabase environment variables and SQL are configured, the site automatically uses the current TypeScript data. This is intentional: it protects the existing links and keeps the site usable during setup.
