# API design

## Core endpoints
- `GET /api/v1/species`
- `GET /api/v1/diseases?species_id=&q=`
- `GET /api/v1/parasites?species=&type=&severity=`
- `GET /api/v1/vet-shops?suburb=&open_now=&product=`
- `GET /api/v1/vet-doctors?species=&area=&emergency=`
- `GET /api/v1/vet-offices?province=&district=`
- `GET /api/v1/search?q=`

## Admin endpoints
- `POST /api/v1/imports/diseases`
- `POST /api/v1/imports/directories`
- Standard CRUD for each module.

## Sync endpoints
- `GET /api/v1/sync/pull?since=<cursor>`
- `POST /api/v1/sync/push`
