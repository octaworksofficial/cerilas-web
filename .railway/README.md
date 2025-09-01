# Railway Environment Variables

Railway deployment için gerekli environment variable'lar:

## Database
- `DATABASE_URL`: PostgreSQL/SQLite connection string
  - Railway PostgreSQL kullanıyorsanız: Railway tarafından otomatik sağlanır
  - SQLite kullanıyorsanız: `file:./dev.db`

## Optional
- `NEXT_TELEMETRY_DISABLED`: `1` (Next.js telemetry'yi kapatmak için)

## Prisma Migration Notes

Bu proje baseline migration stratejisi kullanır:
1. İlk deployment: `20250831140455_init` migration'ı baseline olarak işaretlenir
2. Sonraki deployment'lar: Normal migration deploy çalışır
3. Fallback: Migration başarısız olursa `prisma db push` kullanılır

## Manual Commands (Railway Console'da)

Eğer otomatik setup çalışmazsa:

```bash
# Prisma client generate
npx prisma generate

# Baseline migration (sadece ilk deployment için)
npx prisma migrate resolve --applied 20250831140455_init

# Deploy migrations
npma prisma migrate deploy

# Fallback (son çare)
npx prisma db push --accept-data-loss
```
