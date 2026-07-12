# My Portfolio — Geliştirici Rehberi

Burak Eröksüz'ün kişisel portfolyo sitesi. Monorepo: `frontend/` (Next.js) + `backend/` (Spring Boot).
Tasarım "Frontend Tribe" portfolyo şablonu üzerine kurulu; backend sonradan eklendi.

Detaylı dokümanlar:
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — mimari, veri akışı, API sözleşmesi
- [docs/ROADMAP.md](docs/ROADMAP.md) — bilinen sorunlar ve geliştirme backlog'u (yeni işe başlamadan önce oku)

## Teknoloji Yığını

| Katman | Teknoloji |
|---|---|
| Frontend | Next.js 14.2.5 (App Router), React 18, TypeScript 5, Tailwind CSS 3.4, framer-motion, axios, SVGR |
| Backend | Spring Boot 3.2.2, Java 17, Maven, Spring Data JPA, Lombok |
| Veritabanı | PostgreSQL (localhost:5432, db adı: `portfolio`) |
| E-posta | Spring Mail + Gmail SMTP |

## Çalıştırma Komutları

```bash
# Frontend (http://localhost:3000)
cd frontend
npm run dev        # geliştirme sunucusu
npm run build      # production build
npm run lint       # ESLint

# Backend (http://localhost:8080) — önce PostgreSQL çalışıyor olmalı
cd backend
./mvnw.cmd spring-boot:run     # Windows
./mvnw.cmd test                # testler
```

- Backend, `spring.jpa.hibernate.ddl-auto=update` ile şemayı otomatik oluşturur; manuel migration yok.
- Frontend API adresi `frontend/.env` → `NEXT_PUBLIC_API_URL=http://localhost:8080/api`.
- Backend çalışmasa bile frontend ayakta kalır: Projects bölümü statik verilere düşer (fallback).

## Dizin Yapısı (özet)

```
frontend/src/
  app/          # App Router: layout.tsx, page.tsx (tek sayfa), globals.css
  sections/     # Sayfa bölümleri: Header, Hero, Projects, Tape, Experience, Approach, About, Contact, Footer
  components/   # Paylaşılan bileşenler: Card, CardHeader, SectionHeader, HeroOrbit, TechIcon, ToolboxItems, ContactModal
  utils/axios.ts  # Tek axios instance (baseURL = NEXT_PUBLIC_API_URL)
  assets/       # SVG ikonlar (SVGR ile React bileşeni olarak import edilir) ve görseller

backend/src/main/java/Portfolio/backend/
  controller/   # ProjectController (/api/projects), ContactController (/api/contact)
  service/      # ProjectService, EmailService
  repository/   # ProjectRepository (JpaRepository)
  model/        # Project (+iç sınıf ProjectResult), EmailRequest, Result (KULLANILMIYOR)
  config/       # CorsConfig (sadece localhost:3000'e izin verir)
```

## Kod Konvansiyonları

- Sayfa tek parça (single-page); bölümler `sections/` altında named export (`export const XSection = () => ...`).
- Etkileşimli bileşenler `'use client'` ile başlar; sayfa ve layout server component.
- SVG'ler `@/assets/icons/x.svg` şeklinde import edilip doğrudan React bileşeni olarak kullanılır (SVGR, `next.config.mjs`).
- Stil tamamen Tailwind utility class'ları ile; tema renkleri `emerald-300 → sky-400` gradyanı, arka plan `gray-900`, serif başlık fontu Calistoga, gövde Inter (`font-serif` / `font-sans`).
- Tailwind breakpoint'leri özelleştirilmiş: `sm:375px, md:768px, lg:1200px`.
- Backend'de Lombok kullanılır: `@Data`, `@RequiredArgsConstructor`, `@Slf4j`. Constructor injection tercih edilir.
- Kod içi yorumlar ve kullanıcıya dönük hata mesajları yer yer Türkçe; kullanıcı ile iletişim Türkçe.

## Kritik Uyarılar

1. **SIR SIZDIRMA RİSKİ:** `backend/src/main/resources/application.properties` içinde gerçek DB şifresi ve Gmail app password düz metin duruyor. Backend'in `.gitignore`'u YOK ve bu dosya henüz commit edilmedi. **Bu dosyayı asla commit etme** — önce sırları ortam değişkenine taşı (bkz. ROADMAP #1).
2. **Git deposu geçiş halinde:** Eski kök dizin yapısı silindi ama silmeler commit edilmedi; `frontend/` ve `backend/` untracked. Commit atmadan önce ROADMAP #2'deki yeniden yapılandırma adımlarını uygula.
3. `/api/projects` yazma uçları (POST/PUT/DELETE) `X-Admin-Key` header'ı ile korunur (`AdminKeyFilter`). Lokal anahtar `application.properties` içinde; deploy öncesi değiştirilip `ADMIN_API_KEY` env var'ına taşınmalı. İçerik yönetimi `/admin` sayfasından yapılır (navigasyonda gizli, noindex).
4. Projects bölümü tamamen DB'den beslenir — statik fallback bilinçli olarak kaldırıldı. Backend kapalıysa bölüm görünmez; canlıda backend'in ayakta olması kritik.
