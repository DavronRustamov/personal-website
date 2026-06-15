# CLAUDE.md

Bu fayl Claude Code uchun loyiha haqida kontekst beradi.

## Loyiha haqida

**Davron Rustamov — shaxsiy portfolio sayti.** Bir sahifali (single-page),
to'liq statik web-sayt. Build qadami, paket menejeri va framework yo'q —
faqat sof HTML, CSS va JavaScript.

- **Til:** interfeys o'zbek tilida (`<html lang="uz">`).
- **Hosting:** GitHub Pages.
- **Repo:** https://github.com/DavronRustamov/personal-website (public).
- **Jonli sayt:** https://davronrustamov.github.io/personal-website/

## Fayl strukturasi

| Fayl         | Vazifasi                                                        |
|--------------|-----------------------------------------------------------------|
| `index.html` | Sahifaning barcha bo'limlari (nav, hero, about, skills, projects, contact, footer). |
| `style.css`  | Barcha stillar. Yuqorida `:root` da CSS o'zgaruvchilar (dizayn tizimi). |
| `script.js`  | Barcha animatsiyalar (vanilla JS, kutubxonasiz). `defer` bilan yuklanadi. |
| `Davron.jpg` | Hero bo'limidagi profil rasmi.                                  |

## Sahifa bo'limlari (`index.html`)

`nav` → `#hero` → `#about` → `#skills` → `#projects` → `#contact` → `footer`.
Nav o'ngida (`.nav-right`) menyu linklari va Telegram SVG ikonkasi (`.nav-tg`)
joylashgan.

## Dizayn tizimi (`style.css` `:root`)

- To'q (dark) mavzu: fon `--bg: #050508`, asosiy aksent `--accent: #6c63ff` (binafsha).
- Qo'shimcha ranglar: `--green`, `--red`, `--orange`.
- Burchaklar: `--radius: 24px`, `--radius-sm: 16px`. Nav balandligi `--nav-h: 64px`.
- Yangi rang/o'lcham qo'shganda avval shu yerga o'zgaruvchi qo'shish ma'qul.

## Animatsiyalar (`script.js`) — 8 ta blok

1. **Scroll reveal** — `.fade-up` elementlar ko'rinishda paydo bo'ladi (IntersectionObserver).
2. **Raqamlar sanog'i** — `.stat-num` statistika 0 dan maqsadgacha sanaydi.
3. **Skill-barlar** — `.skill-fill` ko'rinishda to'lib chiqadi.
4. **Nav scroll** — scroll paytida nav `.scrolled` klassi bilan zichlashadi.
5. **Faol nav havola** — qaysi bo'limda ekanligini `.active` bilan belgilaydi.
6. **Kursor yorug'ligi** — sichqonchaga ergashuvchi `.cursor-glow`.
7. **Kartochka 3D tilt** — `.card`, `.project-card` sichqoncha ostida egiladi.
8. **Zarrachali fon** — `#bg-canvas` da konstellatsiya animatsiyasi.

## Ishlash / test

Build yo'q. Brauzerda `index.html` ni ochish kifoya (yoki oddiy static server).
O'zgarish kiritilgach, GitHub Pages avtomatik yangilanadi (1–2 daqiqa).

## Git / deploy oqimi

- Asosiy branch: `main`. GitHub Pages `main` branch root (`/`) dan deploy qiladi.
- O'zgartirish → commit → `git push origin main` → sayt avtomatik yangilanadi.
- Foydalanuvchi git config: `Davron <dxrustamov@gmail.com>`.

## Konvensiyalar

- Kod izohlari va matn **o'zbek tilida** yoziladi — shu uslubni saqlang.
- Mavjud kod uslubiga mos yozing (vanilla JS, CSS o'zgaruvchilar, framework qo'shmang).
- Mobil ko'rinishda `.nav-links` yashiriladi, lekin Telegram ikonkasi ko'rinib qoladi.
