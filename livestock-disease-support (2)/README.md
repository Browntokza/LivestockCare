# Livestock Care Zimbabwe (Runnable First Version)

## Current project structure inspection
- Existing app found: React + TypeScript + Vite web app in this folder.
- Added: architecture docs, database schema, import templates, seed datasets, and Expo mobile scaffold.

## Missing files/dependencies identified
- Missing before this update: explicit DB schema, sync design, role matrix, CSV templates, mobile scaffold.
- For mobile app runtime, install Expo dependencies inside `apps/mobile`.

## What is already working
- Runnable web prototype (`npm run dev`) with:
  - Dashboard
  - Disease library
  - Worms module
  - Vet shops
  - **New:** vet doctors directory
  - **New:** vet offices directory
  - Admin area scaffold
- Seed data files are ready for import and extension.
- SQL schema supports expandable pamphlet content via `metadata` JSON and stable tables.

## What is still left
- Connect UI to live Supabase database.
- Implement full auth + role enforcement.
- Build full CRUD admin forms for all new modules.
- Implement production sync workers and conflict UI.
- Add map SDK integration and push notifications.
- Add multilingual text resources (EN/Ndebele/Shona).

## Run instructions (web prototype)
```bash
cd "livestock-disease-support (2)"
npm install
npm run dev
```

## Optional run instructions (mobile scaffold)
```bash
cd "livestock-disease-support (2)/apps/mobile"
npm install
npm start
```

## Data import templates
- `templates/diseases_template.csv`
- `templates/parasites_template.csv`
- `templates/vet_shops_template.csv`
- `templates/vet_doctors_template.csv`
- `templates/vet_offices_template.csv`

## Add your own pamphlet content
1. Fill in the disease and parasite CSV templates.
2. Keep unknown values as `verify before production`.
3. Import to backend with admin import endpoints.
4. Review draft records and publish after validation.
5. Attach PDFs/images to storage and reference them in disease records.

## Key docs
- Architecture: `docs/architecture.md`
- API: `docs/api-design.md`
- Sync: `docs/sync-design.md`
- Role permissions: `docs/role-permissions.md`
- DB schema: `backend/supabase/schema.sql`
