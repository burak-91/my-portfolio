# Yayına Alma Rehberi

7 repo, 3 backend, 3 frontend, 1 mobil uygulama. Sıra önemli: önce GitHub, sonra DB'ler, sonra backend'ler, sonra frontend'ler, en son kart linkleri.

## 0. Ön koşul: GitHub kimliği (SENİN ADIMIN)

Kayıtlı git kimliği geçersiz çıktı (`Invalid username or token`). En kolay yol GitHub CLI:

```powershell
winget install GitHub.cli   # sonra terminali yeniden aç
gh auth login               # GitHub.com → HTTPS → browser ile giriş
```

`gh auth login` bittikten sonra bana "gh hazır" demen yeterli — repo oluşturma ve push'ların tamamını ben yaparım. (Alternatif: web'den 6 repo aç + PAT ile push; gerekirse anlatırım.)

## 1. GitHub repo'ları (gh hazır olunca ben yapacağım)

| Repo | Konum | Durum |
|---|---|---|
| my-portfolio | workshop/my-portfolio | remote var, commit hazır, push bekliyor |
| restaurant-site | workshop/demos/restaurant-site | commit hazır |
| saas-landing | workshop/demos/saas-landing | commit hazır |
| admin-dashboard | workshop/demos/admin-dashboard | commit hazır |
| ecommerce-shop | workshop/demos/ecommerce-shop | commit hazır |
| randevupro | workshop/projects/randevupro | commit hazır |
| cuzdan | workshop/projects/cuzdan | commit hazır |

Komutlar (referans):
```bash
gh repo create burak-91/<isim> --public --source . --push   # her repo kökünde
```

## 2. Veritabanları — Neon (ücretsiz)

neon.tech → 3 proje/branch: `portfolio`, `randevupro`, `cuzdan`.
Her biri için **JDBC connection string** al: `jdbc:postgresql://<host>/<db>?sslmode=require`

Lokal veriyi taşımak istersen (opsiyonel, projeler seed'li olduğu için şart değil; portfolio kartları İÇİN GEREKLİ):
```bash
"/c/Program Files/PostgreSQL/16/bin/pg_dump" -U postgres -d portfolio --no-owner | psql "<neon-url>"
```

## 3. Backend'ler — Railway (veya Render)

Her üç backend'de de `backend/Dockerfile` hazır. Railway'de: New Project → Deploy from GitHub repo → **Root Directory: `backend`** (my-portfolio ve randevupro ve cuzdan monorepo).

Ortam değişkenleri:

**portfolio-api** (my-portfolio/backend):
```
DB_URL=jdbc:postgresql://...neon.../portfolio?sslmode=require
DB_USERNAME=<neon user>
DB_PASSWORD=<neon şifre>
MAIL_USERNAME=burakeroksuz@gmail.com
MAIL_PASSWORD=<YENİ gmail app password — eskisi düz metin gezdi, MUTLAKA YENİLE>
CONTACT_RECIPIENT=burakeroksuz@gmail.com
ADMIN_API_KEY=<uzun rastgele değer — openssl rand -hex 24>
CORS_ORIGINS=https://<portfolio-vercel-domain>
```

**randevupro-api** (randevupro/backend):
```
DB_URL / DB_USERNAME / DB_PASSWORD  (neon randevupro)
JWT_SECRET=<openssl rand -base64 64>
CORS_ORIGINS=https://<randevupro-vercel-domain>
MAIL_ENABLED=false   (e-posta istersen true + MAIL_USERNAME/MAIL_PASSWORD)
```

**cuzdan-api** (cuzdan/backend):
```
DB_URL / DB_USERNAME / DB_PASSWORD  (neon cuzdan)
JWT_SECRET=<yeni rastgele>
CORS_ORIGINS=*
MAIL_ENABLED=false
```

Railway her servise `https://<servis>.up.railway.app` domain'i verir (Settings → Networking → Generate Domain).

## 4. Frontend'ler — Vercel

vercel.com → Add New Project → GitHub repo seç:

| Proje | Repo | Root Directory | Env |
|---|---|---|---|
| burak-portfolio | my-portfolio | `frontend` | `NEXT_PUBLIC_API_URL=https://<portfolio-api>/api` |
| randevupro | randevupro | `frontend` | `NEXT_PUBLIC_API_URL=https://<randevupro-api>/api` |
| ember-oak | restaurant-site | (kök) | — |
| pulse-landing | saas-landing | (kök) | — |
| atlas-dashboard | admin-dashboard | (kök) | — |
| forma-shop | ecommerce-shop | (kök) | — |

Deploy sonrası backend'lerdeki `CORS_ORIGINS`'e gerçek Vercel domain'lerini yaz (redeploy gerekmez, Railway restart yeter).

## 5. Mobil — EAS build (APK)

```bash
cd workshop/projects/cuzdan/mobile
# önce canlı API'yi göster:
echo EXPO_PUBLIC_API_URL=https://<cuzdan-api>/api > .env
npm install -g eas-cli
eas login && eas build:configure
eas build -p android --profile preview    # APK üretir, link verir
```
APK linkini portfolyo kartına koyabiliriz ("Download APK").

## 6. Kart linklerini güncelle

Portfolio canlıya çıkınca `https://<portfolio>/admin` → admin anahtarı (YENİ ADMIN_API_KEY) → her kartın linkini canlı URL'ye çevir:
- Ember & Oak → Vercel URL, Pulse → Vercel URL, Atlas → Vercel URL, Forma → Vercel URL
- RandevuPro → Vercel URL, Cüzdan → GitHub repo + APK linki
- Portfolio kartı → GitHub repo linki

## Güvenlik kontrol listesi (deploy sonrası)

- [ ] Gmail app password YENİLENDİ (eskisi: repoya girmedi ama diskte düz metin gezdi)
- [ ] ADMIN_API_KEY lokaldekinden FARKLI ve uzun
- [ ] JWT_SECRET'lar prod'da yeni üretildi (lokaldekiler kullanılmadı)
- [ ] CORS_ORIGINS sadece gerçek domain'ler (cuzdan hariç — mobil için `*`)
