# Yol Haritası ve Bilinen Sorunlar

Öncelik sırasına göre. Bir maddeyi tamamlayınca buradan sil ya da tarihle işaretle.

## 🔴 Acil — commit/üretim öncesi şart

### 1. Sırları koddan çıkar
`backend/src/main/resources/application.properties` içinde **gerçek DB şifresi ve Gmail app password** düz metin duruyor ve backend'in `.gitignore`'u yok. Dosya henüz commit edilmedi — sızmadan düzeltme şansı var.

Yapılacaklar:
- Sırları ortam değişkenine taşı: `spring.datasource.password=${DB_PASSWORD}`, `spring.mail.password=${MAIL_PASSWORD}` vb.
- `backend/.gitignore` oluştur (`target/`, `*.log`, lokal override dosyaları).
- Lokal geliştirme için `application-local.properties` (gitignore'da) veya IDE ortam değişkenleri kullan.
- Mevcut Gmail app password'ü bu iş bittikten sonra **iptal edip yenile** (dosya diskte açık gezdi).

### 2. Git deposunu yeni yapıya geçir
Eski kök yapı silinmiş ama commit edilmemiş; `frontend/` ve `backend/` untracked. Tek bir "restructure" commit'i ile:
- Silinen eski dosyaları stage'le, yeni `frontend/` + `backend/` klasörlerini ekle.
- **Önce #1'i bitir** — yoksa sırlar geçmişe girer.
- Kök `.gitignore` da silinmiş; kök için yenisini ekle (ör. `node_modules/`, `target/`, `.env` kalıpları).

### 3. ✅ Proje uçları korundu (2026-07-11)
`AdminKeyFilter` eklendi: `/api/projects` üzerindeki POST/PUT/DELETE artık `X-Admin-Key` header'ı ister (`admin.api-key` property'si, `ADMIN_API_KEY` env var ile override edilir). GET herkese açık. `/admin` sayfası (noindex) bu anahtarla CRUD yapar; anahtar sessionStorage'da tutulur.
Kalan: deploy öncesi lokal anahtarı değiştir ve env var'a taşı (#1 ile birlikte). İleride istenirse Spring Security + gerçek login'e yükseltilebilir.

## 🟠 Yüksek — işlevsel hatalar

### 4. E-posta `From` alanı yanlış
`EmailService` `setFrom(ziyaretçi e-postası)` yapıyor; Gmail SMTP yabancı From adreslerini reddeder ya da kendi hesabınla değiştirir. Doğrusu:
`setFrom(kendi adresin)` + `setReplyTo(ziyaretçinin adresi)` — böylece cevapla deyince ziyaretçiye gider.

### 5. ✅ Projects fallback bug'ı düzeltildi (2026-07-11)
Hata durumunda erken return kaldırıldı; statik fallback sessizce devreye giriyor, loading durumunda `null` render ediliyor.

### 6. İletişim formunda doğrulama ve koruma yok
- Backend `EmailRequest`'i hiç doğrulamıyor (boş alan, geçersiz e-posta, devasa mesaj). `spring-boot-starter-validation` + `@Valid`, `@Email`, `@NotBlank`, `@Size` ekle.
- Rate limit yok — form spam'e açık. Basit IP tabanlı sınırlama ya da honeypot alanı düşün.
- `ContactController` hata yakalamıyor; mail sunucusu hata verirse ham 500 döner. Try-catch + anlamlı yanıt ekle.

## 🟡 Orta — temizlik ve kalite

### 7. Ölü kodu temizle
- ✅ `Testimonials.tsx` (sahte yorumlar) ve boş `ContactForm.tsx` silindi (2026-07-11).
- `backend .../model/Result.java` — kullanılmıyor (Project.ProjectResult işini görüyor). Sil; `results` tablosu DB'de kaldıysa onu da düşür.
- Kullanılmayan görseller: `dark/light-saas-landing-page.png`, `ai-startup-landing-page.png`, memoji-avatar-1..5 — artık import edilmiyor, silinebilir.
- `frontend/components/` ve `frontend/pages/` boş kök dizinleri, `public/next.svg`, `public/vercel.svg` — sil.
- `@types/axios` paketini kaldır (deprecated; axios kendi tiplerini içeriyor).
- CORS'u tekilleştir: `ContactController`'daki `@CrossOrigin`'i kaldır, sadece `CorsConfig` kalsın; izinli origin'leri property'den okut (üretim domain'i için gerekecek).

### 8. İçerik — YAPILDI (2026-07-11), kalanlar:
✅ Sahte projeler/testimonial'lar kaldırıldı; hero, metadata, footer gerçek kimlikle güncellendi; Experience + How I Work (Approach) bölümleri eklendi; portfolyo sitesi ilk gerçek proje kartı oldu.
Kalanlar:
- `Experience.tsx` içindeki anonim deneyim metnini Burak doğrulamalı (sektör/süre/sorumluluklar — dosyada TODO notu var).
- Projects kartındaki link `github.com/burak-91` profiline gidiyor; site repo'ya push'lanınca doğrudan repo linkine çevir.
- Open Graph / twitter card metadata eklenebilir.
- `frontend/package.json` adı `portfolio-site-2` → anlamlı bir isim.

### 8b. Demo projeler (devam ediyor)
Gerçekten geliştirilen, "Concept Project" etiketiyle dürüstçe sunulan demolar. Konum: `Desktop/workshop/demos/`.
1. ✅ **Restoran sitesi — "Ember & Oak"** (2026-07-12): `demos/restaurant-site`, Next.js 14 + Tailwind, Playfair Display/Inter fontları, amber/stone paleti. Bölümler: hero, story, haftalık menü (6 ürün), galeri, çalışma saatleri, rezervasyon formu (client-side, demo bildirimli). Fotoğraflar Unsplash (ücretsiz lisans). Portfolyo DB'sine kart olarak eklendi (id:2). Dev: `npx next dev -p 3001`. KALAN: GitHub'a push + Vercel deploy + kart linkini güncelle.
2. ✅ **SaaS landing page — "Pulse"** (2026-07-12): `demos/saas-landing`, Next.js 14 + Tailwind, Space Grotesk/Inter, zinc/violet paleti. Görselsiz — dashboard mockup'ı, funnel ve alert panelleri saf HTML/CSS. Özel animasyonlar (fade-up, marquee, grow). Bölümler: hero+mockup, logo bandı, 6 feature, funnel/alert tanıtımları, 3 kademeli pricing, CTA. Portfolyo DB'sine eklendi (id:3). Dev: `npx next dev -p 3002`. KALAN: GitHub push + Vercel deploy + kart linki.
3. ✅ **Admin dashboard — "Atlas"** (2026-07-12): `demos/admin-dashboard`, Next.js 14 + Tailwind, AÇIK tema (diğerlerinden bilinçli farklı). El yapımı SVG grafikler (kütüphanesiz): sparkline'lı stat tile'lar, hover tooltip'li gelir sütun grafiği, kategorik yatay çubuklar (dataviz skill palet validator'ından geçirilmiş renkler). Canlı tarih aralığı filtresi (7/30/90 gün) + arama/ekle/durum değiştir/sil destekli sipariş tablosu (client-side CRUD). Portfolyo DB'sine eklendi (id:4). Dev: `npx next dev -p 3003`. KALAN: GitHub push + Vercel deploy + kart linki. NOT: Spring Boot entegrasyonu bilinçli atlandı — demo Vercel'de tek başına yaşayabilsin diye; istenirse sonra bağlanır.
4. ✅ **E-ticaret — "Forma"** (2026-07-12): `demos/ecommerce-shop`, Next.js 14 + Tailwind, Fraunces/Inter, açık/sıcak nötr palet. 7 ürünlük katalog (Unsplash fotoğrafları), kategori filtresi + fiyat sıralama, React Context + localStorage ile kalıcı sepet (slide-over çekmece, adet kontrolü), `/checkout` sayfası (form validasyonu, sipariş özeti, demo bildirimli başarı ekranı). Portfolyo DB'sine eklendi (id:5). Dev: `npx next dev -p 3004`. KALAN: GitHub push + Vercel deploy + kart linki.

### 8c. Kapsamlı projeler (KARARLAŞTIRILDI 2026-07-12 — deploy'dan önce)
Basit demoların ötesinde, Spring Boot backend'li 2 tam kapsamlı proje. Konum: `Desktop/workshop/projects/`.
1. 🔨 **RandevuPro** — hizmet randevu platformu (web). Spring Boot 3 + PostgreSQL (`randevupro` db, **port 8083** — 8081 lokalde MySQL'in) + Next.js (port 3005). Sırlar İLK GÜNDEN env var'da (`application-local.properties` gitignore'lu; JWT secret orada).
   - ✅ Backend TAMAM (2026-07-12): 6 entity, JWT + rol bazlı yetki (@PreAuthorize), slot hesaplama (15dk ızgara, çakışma+geçmiş eleme), randevu yaşam döngüsü (PENDING→CONFIRMED→COMPLETED/CANCELLED, @Scheduled otomatik tamamlama), review (sadece tamamlanmış randevuya, tekil), owner dashboard, async mail (MAIL_ENABLED=false lokalde), global exception handler, Swagger UI (/swagger-ui), seed data (owner@demo.com & customer@demo.com / demo123). 12 adımlı curl E2E testi: TÜMÜ GEÇTİ. Çalıştırma: `cd projects/randevupro/backend && ./mvnw.cmd spring-boot:run`.
   - ✅ Frontend TAMAM (2026-07-12, Next.js port 3005, teal/slate açık tema): AuthContext (JWT localStorage + /auth/me doğrulama), müşteri akışı (arama+kategori filtresi → işletme detayı → hizmet seç → 14 günlük tarih şeridi → slot ızgarası → rezervasyon), Randevularım (iptal + tamamlanan randevuya yıldızlı review modali), İşletme Paneli (işletme seçici + oluşturma, 4 sekme: özet istatistikler / randevu onay-iptal + durum filtresi / hizmet CRUD / çalışma saatleri editörü). Rol bazlı yönlendirme. Dev: `cd projects/randevupro/frontend && npx next dev -p 3005`.
   - Kalan: uçtan uca manuel tur (Burak) → ekran görüntüsü → portfolyoya kart → GitHub push → deploy (en son).
2. 🔨 **Cüzdan** — harcama/bütçe takibi (React Native/Expo mobil). Spring Boot backend (`cuzdan` db, port 8082) + Expo app.
   - ✅ Backend TAMAM (2026-07-12): 6 entity (User/Account/Category/Transaction/Budget/RecurringRule), JWT auth (kayıtla birlikte 9 varsayılan kategori tohumlanır), sahiplik kontrolü (her kayıt kullanıcıya izole — E2E testli), ay+hesap+kategori filtreli sayfalı işlem listesi, aylık özet raporu (gelir/gider/kategori dökümü + bütçe limitleri), 6 aylık trend, bütçe CRUD (gider kategorisi kısıtı) + spentThisMonth, limit aşımında @Async e-posta uyarısı (E2E'de log ile doğrulandı), @Scheduled günlük tekrarlayan işlem uygulayıcı, Swagger, seed (demo@cuzdan.app / demo123 — 6 aylık gerçekçi veri). 14 adımlı curl E2E: TÜMÜ GEÇTİ. Not: open-in-view=false + lazy ilişkilerde liste metodlarına @Transactional(readOnly=true) gerekti (LazyInitializationException dersi).
   - ✅ Mobil app TAMAM (2026-07-12, Expo SDK 57 + expo-router, `projects/cuzdan/mobile`): koyu fintech teması, AsyncStorage'lı JWT auth (login/register + /auth/me doğrulama), 4 tab — Özet (net/gelir/gider + renk kodlu bütçe barları + son işlemler), İşlemler (ay gezinme, silme), Ekle (gider/gelir segmenti, emoji kategori çipleri, hesap+tarih seçimi), Raporlar (kategori dökümü + 6 aylık View-tabanlı çubuk grafik). Ekran görüntüleri Expo web modunda (`EXPO_PUBLIC_DEMO_AUTOLOGIN=1 npx expo start --web --port 8090`) canlı backend verisiyle doğrulandı; kart kolajı portfolyoya eklendi (id:7). Telefonda test: `npx expo start` + Expo Go, EXPO_PUBLIC_API_URL'i LAN IP yap. NOT: masaüstü Edge min pencere genişliği ~500px — 420px headless ekran görüntüsündeki "taşma" browser kısıtıymış, uygulama hatası değil.
   
**KAPSAMLI PROJELER TAMAM (2/2).** Portfolyoda 7 kart var. Kalan tek büyük zincir: yayına alma (aşağıda).
Her ikisi de bitince kart olarak DB'ye eklenecek (mobil için ekran görüntüleri kolaj).

### YAYINA ALMA DURUMU (2026-07-12)
✅ Sır temizliği bitti: portfolio backend env-var'lı, `application-local.properties` gitignore'lu; CORS env'den; EmailService From/Reply-To düzeltildi; ölü kod (Result.java, kullanılmayan görseller) silindi.
✅ 7 repo lokal olarak commit'e hazır (portfolio 3 commit ileride; diğer 6'sı ilk commit'li, main branch).
✅ 3 backend'e Dockerfile eklendi; adım adım rehber: [DEPLOYMENT.md](DEPLOYMENT.md).
⏳ BLOKER: GitHub kimliği — `gh auth login` gerekiyor (kayıtlı token geçersiz). Sonrası: repo create+push (ben) → Neon DB'ler → Railway backend'ler → Vercel frontend'ler → EAS APK → kart linkleri.
⚠️ Deploy sırasında: Gmail app password YENİLE, prod için yeni ADMIN_API_KEY + JWT_SECRET üret.

**TÜM DEMOLAR TAMAM (4/4).** Yayına alma zinciri (detay DEPLOYMENT.md'de):
1) `demos/*` altındaki 4 repo'yu GitHub'a push'la (Burak),
2) Her birini Vercel'e bağla (ücretsiz tier yeter),
3) Kartlardaki linkleri admin panelden canlı URL'lere çevir,
4) Portfolyonun kendisi için #10'daki deploy planını uygula (önce #1 sır temizliği!).

### 9. Küçük frontend iyileştirmeleri
- `Projects.tsx`'te `key={project.title}` → `key={project.id}` (başlıklar çakışabilir).
- "Visit Live Site" linkine `target="_blank" rel="noopener noreferrer"` ekle.
- Header nav'da `testimonials` bölümü linki yok; `About` id'sinin sayfada tanımlı olduğunu doğrula.
- ContactModal: ESC ile kapanma, dışarı tıklayınca kapanma, açıkken body scroll kilidi.

## 🟢 Gelecek — yeni özellikler

### 10. Yayına alma (deployment)
Henüz hiçbir deployment yapılandırması yok. Öneri: frontend → Vercel, backend → Railway/Render/Fly.io + yönetilen PostgreSQL (ör. Neon/Supabase). Gerekenler: CORS'a üretim origin'i, `NEXT_PUBLIC_API_URL` üretim değeri, ortam değişkenleri (bkz. #1).

### 11. Test ve CI
- Backend'de sadece context-load testi var. `ProjectService`/`EmailService` için birim, controller'lar için `@WebMvcTest` testleri ekle.
- Frontend'de test altyapısı yok (Vitest/Jest + React Testing Library ile başlanabilir).
- GitHub Actions ile lint + build + test pipeline'ı.

### 12. Fikirler
- Admin paneli (proje CRUD arayüzü — #3'teki güvenlikle birlikte).
- Proje görsellerini backend'den URL olarak servis etme / bir CDN'e taşıma (şu an fallback görselleri bundle içinde).
- Blog bölümü, koyu/açık tema, i18n (TR/EN), analytics.
- DB migration aracı (Flyway) — `ddl-auto=update` üretim için riskli.
