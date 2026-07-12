# Mimari

## Genel Bakış

```
┌──────────────────────┐        HTTP (axios)        ┌──────────────────────┐
│  frontend/            │  ─────────────────────▶   │  backend/             │
│  Next.js 14 (3000)    │   NEXT_PUBLIC_API_URL      │  Spring Boot (8080)   │
│  App Router, tek sayfa│   = localhost:8080/api     │  REST API             │
└──────────────────────┘                            └──────────┬───────────┘
                                                        │              │
                                                 PostgreSQL       Gmail SMTP
                                                 (portfolio db)   (iletişim formu)
```

Tek sayfalık portfolyo. Frontend büyük ölçüde statik; backend iki iş yapar:
projeleri veritabanından servis etmek ve iletişim formundan e-posta göndermek.

## Frontend

### Sayfa kompozisyonu

`src/app/page.tsx` bölümleri sırayla dizer:
`Header → Hero → Projects → Tape → Testimonials → About → Contact → Footer`

- **Header** — sabit (fixed) yüzen nav; `scrollIntoView` ile bölüm id'lerine (`hero`, `projects`, `about`, `contact`) kayar.
- **Hero** — orbit animasyonlu tanıtım (`HeroOrbit` bileşeni, tailwind.config.ts'teki özel keyframe'ler). "Let's Connect" butonu `ContactModal`'ı açar.
- **Projects** — tek dinamik bölüm. Mount'ta `GET /projects` çeker; **tamamen DB'den beslenir, statik fallback yok** (backend erişilemezse veya liste boşsa bölüm hiç render edilmez). Proje görselleri `frontend/public/images/projects/` altında durur, DB'de yol string'i tutulur (ör. `/images/projects/portfolio-site.png`). Kartlar `sticky` + `top: calc(64px + index*40px)` ile üst üste yığılır.
- **`/admin` sayfası** (`src/app/admin/`) — proje CRUD paneli; navigasyonda link yok, `robots: noindex`. Admin anahtarını sessionStorage'da tutar, yazma isteklerine `X-Admin-Key` header'ı ekler.
- **Tape** — kayan yazı bandı (`move-left/move-right` animasyonları).
- **Testimonials / About** — statik içerik. About; toolbox (JS, React, CSS3, HTML5, Java, Git, Github), kitap, harita ve framer-motion ile sürüklenebilir hobi etiketleri içerir.
- **Contact** — CTA bandı; `ContactModal`'ı açar.
- **ContactModal** — name/email/message formu; `POST /contact` atar. Durum makinesi: `idle → sending → success|error`; başarıda 2 sn sonra kapanır.
- **Footer** — sosyal linkler: LinkedIn (`burak-eroksuz-91brk06`), GitHub (`burak-91`), Instagram (`burakerksz`).

### Önemli altyapı

- **`src/utils/axios.ts`** — tek axios instance; tüm API çağrıları bunun üzerinden. baseURL zaten `/api` içerir, çağrılar `api.get('/projects')` şeklindedir.
- **SVGR** (`next.config.mjs`) — `.svg` importları React bileşenine dönüşür; `?url` sonekiyle dosya URL'si alınabilir.
- **Fontlar** — `next/font/google` ile Inter (`--font-sans`) ve Calistoga (`--font-serif`), `layout.tsx` içinde.
- **`tailwind-merge`** — class birleştirmede `twMerge` kullanılır (ör. `Card`, `layout.tsx`).

## Backend

Katmanlı klasik Spring yapısı: Controller → Service → Repository → PostgreSQL.

### API Sözleşmesi

| Metot | Uç | Açıklama | Gövde / Dönüş |
|---|---|---|---|
| GET | `/api/projects` | Tüm projeler (herkese açık) | `Project[]` — hata olursa 500 + Türkçe mesaj |
| POST | `/api/projects` | Proje ekle 🔑 | `Project` → kaydedilen `Project` |
| PUT | `/api/projects/{id}` | Proje güncelle 🔑 | `Project` → güncellenen `Project` |
| DELETE | `/api/projects/{id}` | Proje sil 🔑 | 200, gövdesiz |
| POST | `/api/contact` | İletişim e-postası gönder | `{name, email, message}` → 200, gövdesiz |

🔑 = `X-Admin-Key` header'ı zorunlu (`AdminKeyFilter`, anahtar: `admin.api-key` property / `ADMIN_API_KEY` env var). Anahtar yoksa/yanlışsa 401.

### Modeller

- **`Project`** (`projects` tablosu): `id, company, year, title, link, image` + `@ElementCollection` ile `project_results` tablosunda tutulan `ProjectResult { title }` listesi. Frontend'deki `Project` interface'i ile birebir uyumlu; `image` backend'de String (URL), frontend statik fallback'te `StaticImageData`.
- **`EmailRequest`**: `name, email, message` — entity değil, sadece DTO.
- **`Result`**: `results` tablosuna map'li entity ama **hiçbir yerde kullanılmıyor** (ProjectResult embeddable'ı işini görüyor). Silinmeye aday, bkz. ROADMAP.

### E-posta akışı

`EmailService` → `JavaMailSender` (Gmail SMTP, `smtp.gmail.com:587`, STARTTLS).
Alıcı sabit: `burakeroksuz@gmail.com`. `From` alanına ziyaretçinin e-postası yazılıyor
(Gmail bunu genelde geçersiz kılar — düzeltme için ROADMAP #4).

### CORS

İki yerde tanımlı (tekilleştirilmeli):
- `CorsConfig` — global, `/api/**` için `http://localhost:3000`.
- `ContactController` üzerindeki `@CrossOrigin` — aynı origin, gereksiz tekrar.

Üretim domain'i eklenirken her ikisinin de (ya da tekilleştirilmiş halinin) güncellenmesi gerekir.

## Yapılandırma

| Dosya | İçerik |
|---|---|
| `frontend/.env` | `NEXT_PUBLIC_API_URL` (public değer, sır değil) |
| `backend/src/main/resources/application.properties` | Port, PostgreSQL bağlantısı, Gmail SMTP kimlik bilgileri, log seviyeleri. **Şu an gerçek sırlar içeriyor — commit edilmemeli** (ROADMAP #1) |

## Bilinen Ölü Kod / Artıklar

- `backend .../model/Result.java` — kullanılmayan entity.
- `frontend/src/components/ContactForm.tsx` — boş dosya (işlevi ContactModal üstlendi).
- `frontend/components/` ve `frontend/pages/` — boş kök dizinler (yapı `src/` altında).
- `frontend/public/next.svg`, `vercel.svg` — kullanılmayan şablon dosyaları.
- `@types/axios` bağımlılığı — deprecated; axios kendi tiplerini getiriyor.
