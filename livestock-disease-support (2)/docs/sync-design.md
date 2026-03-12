# Offline sync design

1. Local SQLite is source of truth for reads.
2. `sync_state` stores last successful pull cursor per table.
3. Unsynced writes are appended to `sync_queue` with retries.
4. Pull flow: fetch deltas by `updated_at > cursor`, upsert into SQLite.
5. Push flow: send queue in FIFO batches. Mark `synced_at` when acked.
6. Conflict policy: last-write-wins on server + `change_log` record for audit.
7. Binary files (PDF/images): lazy sync with download status and checksum.
8. UI indicators: online/offline badge, pending changes count, last sync time.
