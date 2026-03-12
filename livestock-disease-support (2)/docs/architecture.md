# Livestock Care Zimbabwe - Architecture (First Runnable Version)

## Executive summary
- Android-first, offline-first livestock health app with synchronized disease library, parasites module, and veterinary directories.
- Current runnable build: React + TypeScript Vite app (serves as admin + field UI prototype).
- Added foundation for vet doctors and vet offices modules, plus structured data/DB/API/sync design.

## Recommended stack
- **Mobile app:** React Native + Expo + TypeScript + Expo SQLite + TanStack Query.
- **Backend:** Supabase (Postgres + Auth + Storage + Realtime).
- **Admin web:** Next.js or existing React Vite dashboard.
- **Search:** SQLite FTS offline, Postgres full text online.
- **Maps:** OpenStreetMap/Google Maps based on budget.

## System architecture
- Client apps:
  - `apps/mobile` (Expo scaffold, offline local DB).
  - `src` (current runnable web/admin prototype).
- Backend services:
  - Supabase Postgres with role policies.
  - Storage buckets for pamphlets/images.
  - Sync API endpoint using `updated_at` checkpoints.
- Data flow:
  1. App boots from local SQLite cache.
  2. Pull sync by table and timestamp.
  3. Push queued local edits from admin/editor roles.
  4. Conflict strategy: last-write-wins + revision audit record.

## API surface (high-level)
- `GET /sync/pull?since=<cursor>`
- `POST /sync/push`
- CRUD endpoints for species, diseases, parasites, vet_shops, vet_doctors, vet_offices.
- `POST /imports/{module}` for CSV/Excel imports.
- `GET /search?q=` unified search.

## Notes
- All uncertain directory records must be marked `verified=false` and `notes='verify before production'`.
- Schema is extensible via JSON metadata fields to support future pamphlet expansion without redesign.
