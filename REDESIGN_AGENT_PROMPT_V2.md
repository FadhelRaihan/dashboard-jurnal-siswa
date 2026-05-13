# REDESIGN AGENT PROMPT v2 — PLAYFUL & COLORFUL EDITION
# Stack : Vite + React + Tailwind v4 + DaisyUI
# Mode  : Claude Code CLI (akses filesystem langsung)
# Target: Website Sekolah Dasar — Guru, Siswa, Orang Tua

---

## 🎯 MISI UTAMA

Kamu adalah **Creative UI Engineer** yang ditugaskan melakukan redesign visual total
pada website sekolah dasar ini. Website yang ada sekarang tampil **kaku, membosankan,
tidak berwarna, dan terlalu padat** — sama sekali tidak cocok untuk pengguna anak-anak
dan guru SD.

Tugasmu: **Ubah tampilannya secara drastis** menjadi modern, playful, dan berwarna cerah.
Bayangkan kamu sedang mendesain ulang aplikasi seperti **Duolingo atau Khan Academy Kids**
— antarmuka yang membuat anak semangat membuka website, dan guru merasa nyaman
menggunakannya setiap hari.

> ⚠️ PENTING: "Visual redesign" bukan berarti "sedikit perubahan".
> Jika hasilnya mirip dengan yang lama, kamu GAGAL menjalankan tugas ini.
> Perubahan yang diharapkan harus terlihat berbeda secara signifikan.

---

## 🔒 SATU-SATUNYA BATASAN KERAS

Yang **TIDAK BOLEH** kamu ubah (karena menyangkut data dan fungsionalitas):

| Yang Dilarang | Contoh Konkret |
|---|---|
| Nama route / URL path | `/login`, `/dashboard`, `/nilai` |
| Event handler & callback | `onClick`, `onSubmit`, `onChange`, `onSelect` |
| Nama variabel & state | `useState`, nama variabel di hook |
| Struktur data dari API | nama key di response, nama props yang membawa data |
| Logika kondisional | `if (isLoggedIn)`, `{data.map(...)}`, `{isLoading && ...}` |
| Import library yang sudah ada | jangan hapus import yang dipakai logika |
| Nama dan lokasi file | jangan rename atau pindahkan file yang ada |

**Semua hal lain BEBAS kamu ubah sepenuhnya.**

Yang **WAJIB** kamu ubah secara drastis:
- Seluruh className Tailwind & DaisyUI
- Struktur JSX wrapper (div, section, article, main) — selama tidak memindahkan data
- Seluruh design token di CSS (warna, font, spacing, shadow, radius)
- DaisyUI theme — buat custom theme baru yang playful
- Ikon — ganti semua ikon lama dengan yang lebih ekspresif dan kontekstual
- Tata letak (layout) halaman — dari kaku ke modern
- Tipografi — dari generik ke yang berkarakter

---

## 🎨 DESIGN DIRECTION — IKUTI INI KETAT

### Kepribadian Visual: "Ceria Sekolah"

Analoginya seperti menggabungkan:
- **Duolingo** → warna cerah, elemen rounded, karakter yang menyenangkan
- **Notion for Kids** → whitespace lega, tipografi kuat, hierarki jelas
- **Google Classroom versi lebih berwarna** → familar tapi lebih hidup

Bukan seperti:
- ❌ Dashboard enterprise (abu-abu, tabel flat, tombol kotak)
- ❌ Website pemerintah (berat, formal, banyak border)
- ❌ Bootstrap default (biru #007bff, card bersudut tajam)

---

### Palet Warna — BUAT CUSTOM THEME DAISYUI BARU

**Langkah wajib sebelum menentukan warna:**
Baca file CSS global dan semua file komponen untuk mengidentifikasi
warna brand yang sudah ada (logo, aksen dominan). Ekstrak **1-2 warna brand utama**,
lalu jadikan sebagai anchor untuk membangun palet baru yang lebih cerah dan hidup.

**Struktur palet yang harus kamu bangun:**

```css
/* Di src/index.css — buat DaisyUI custom theme */
@plugin "daisyui" {
  themes: [
    {
      "sekolah": {
        /* Primary: warna brand yang sudah ada (ekstrak dari kode lama)
           Jika tidak ada warna brand → gunakan biru cerah yang ramah */
        "primary": "[EKSTRAK DARI KODE LAMA atau gunakan #4F8EF7]",
        "primary-content": "#ffffff",

        /* Secondary: warna kontras yang hangat dan ceria */
        "secondary": "#FF6B6B",       /* merah salmon — semangat */
        "secondary-content": "#ffffff",

        /* Accent: warna highlight yang pop */
        "accent": "#FFD93D",          /* kuning cerah — kegembiraan */
        "accent-content": "#1a1a1a",

        /* Neutral: hangat, bukan dingin */
        "neutral": "#3D405B",
        "neutral-content": "#ffffff",

        /* Base: background putih hangat */
        "base-100": "#FAFAFA",
        "base-200": "#F0F4FF",        /* hint biru sangat terang */
        "base-300": "#E2E8F0",
        "base-content": "#1E293B",

        /* Semantic colors */
        "info":    "#38BDF8",
        "success": "#4ADE80",
        "warning": "#FB923C",
        "error":   "#F87171",

        /* Radius & shadow — override untuk tampilan lebih lembut */
        "--rounded-box": "1rem",
        "--rounded-btn": "0.75rem",
        "--rounded-badge": "9999px",
        "--animation-btn": "0.25s",
        "--tab-border": "2px",
      }
    }
  ]
}
```

> ⚠️ Jika warna brand lama sudah bagus dan vibrant → gunakan sebagai `primary`.
> Jika warna brand lama gelap/tua → tetap pakai sebagai accent, tapi ganti primary
> dengan warna yang lebih cerah dari palet yang sama (lightened version).

**Warna yang HARUS DIHINDARI:**
- Abu-abu sebagai warna dominan UI
- Putih + hitam flat tanpa accent
- Biru #007bff atau #0d6efd (Bootstrap default)
- Background gelap (`#1a1a1a`) — website ini untuk anak, bukan developer

---

### Tipografi — GANTI FONT MENJADI YANG BERKARAKTER

```html
<!-- Tambahkan di index.html, ganti/tambah di <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Nunito+Sans:wght@400;600&display=swap" rel="stylesheet">
```

```css
/* Di @theme atau :root */
--font-sans: 'Nunito', sans-serif;
--font-body: 'Nunito Sans', sans-serif;
```

**Kenapa Nunito:** Rounded terminals di setiap huruf membuatnya terasa ramah dan
tidak intimidatif untuk anak-anak, tapi tetap terbaca oleh orang dewasa.

**Ukuran wajib:**
- `text-base` (16px) minimum untuk semua body text
- `text-lg` (18px) untuk konten utama yang dibaca siswa
- `text-xl`–`text-3xl` untuk heading
- `font-bold` atau `font-extrabold` untuk heading — jangan tipis
- `leading-relaxed` untuk paragraf

---

### Spacing & Layout — BERNAPAS LEBIH LEGA

Masalah lama: terlalu padat. Solusi: tambahkan whitespace secara agresif.

```
Padding card      : p-6 atau p-8 (bukan p-3 atau p-4)
Gap antar card    : gap-6 atau gap-8
Padding page      : px-4 md:px-8 lg:px-12
Section padding   : py-8 md:py-12
Max content width : max-w-7xl mx-auto
```

---

### Visual Karakter — WAJIB DITERAPKAN

Ini yang membedakan redesign "asal jadi" dengan yang benar-benar playful:

#### 1. Gradient yang Hidup (bukan flat warna tunggal)
```css
/* Gunakan di header halaman, hero section, card penting */
.bg-hero { background: linear-gradient(135deg, #4F8EF7 0%, #7C3AED 100%); }
.bg-warm { background: linear-gradient(135deg, #FF6B6B 0%, #FFD93D 100%); }
.bg-fresh { background: linear-gradient(135deg, #4ADE80 0%, #38BDF8 100%); }
```

Atau gunakan utility Tailwind:
```
bg-gradient-to-br from-primary to-secondary
bg-gradient-to-r from-accent to-warning
```

#### 2. Card dengan Karakter — Bukan Kotak Datar
```jsx
{/* Card yang menarik — gunakan border-top berwarna, shadow, dan icon besar */}
<div className="card bg-base-100 shadow-lg rounded-2xl overflow-hidden
                hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
  {/* Color accent bar di atas card */}
  <div className="h-2 bg-gradient-to-r from-primary to-secondary" />
  <div className="card-body p-6">
    {/* Icon besar sebagai visual focal point */}
    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center
                    justify-center text-2xl mb-4">
      📚
    </div>
    <h3 className="card-title text-lg font-bold">{judul}</h3>
    {/* data props — jangan diubah */}
  </div>
</div>
```

#### 3. Stat/Angka Penting — Buat Menonjol
```jsx
{/* Untuk card statistik: nilai raport, jumlah siswa, dll */}
<div className="stat bg-gradient-to-br from-primary/10 to-primary/5
                rounded-2xl p-6">
  <div className="stat-figure text-primary text-4xl">🎯</div>
  <div className="stat-title text-sm font-semibold text-base-content/60
                  uppercase tracking-wide">Label</div>
  <div className="stat-value text-3xl font-black text-primary">{nilai}</div>
  <div className="stat-desc text-sm text-base-content/50">{deskripsi}</div>
</div>
```

#### 4. Badge & Status — Penuh Warna
```jsx
{/* Jangan: <span className="badge">Active</span> */}
{/* Ya: */}
<span className="badge badge-success badge-lg gap-1 font-semibold px-3">
  <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
  Aktif
</span>
```

#### 5. Tombol — Bernyawa
```jsx
{/* Primary CTA */}
<button className="btn btn-primary btn-lg rounded-xl gap-2
                   shadow-lg shadow-primary/30 hover:shadow-primary/50
                   hover:-translate-y-0.5 transition-all font-bold">
  {/* JANGAN UBAH: handler */}
  🚀 Mulai Belajar
</button>

{/* Secondary */}
<button className="btn btn-outline btn-primary rounded-xl
                   hover:shadow-md transition-all font-semibold">
  Lihat Detail
</button>
```

#### 6. Navbar — Bersih dan Jelas
```jsx
{/* Navbar dengan shadow lembut dan brand yang kuat */}
<div className="navbar bg-base-100 shadow-sm sticky top-0 z-50 px-4 lg:px-8">
  <div className="navbar-start">
    {/* Logo + nama sekolah — buat menonjol */}
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-primary flex items-center
                      justify-center text-white font-black text-lg">S</div>
      <span className="font-black text-lg text-base-content hidden sm:block">
        {namaSekolah}
      </span>
    </div>
  </div>
  {/* Nav items dengan label eksplisit — JANGAN hanya ikon */}
  <div className="navbar-center hidden lg:flex gap-1">
    <a className="btn btn-ghost btn-sm rounded-lg font-semibold gap-2">
      🏠 Beranda
    </a>
    {/* dst — JANGAN UBAH href/routing */}
  </div>
</div>
```

#### 7. Tabel — Dari Membosankan ke Modern
Tabel adalah komponen yang paling sering terlihat kaku. Ubah pendekatan:

```jsx
{/* Bungkus tabel dengan container yang proper */}
<div className="bg-base-100 rounded-2xl shadow-sm overflow-hidden">
  {/* Header tabel dengan background berwarna */}
  <div className="px-6 py-4 bg-primary/5 border-b border-base-200
                  flex items-center justify-between">
    <h3 className="font-bold text-lg">Judul Tabel</h3>
    {/* action button jika ada */}
  </div>
  <div className="overflow-x-auto">
    <table className="table table-zebra">
      <thead>
        <tr className="bg-base-200/50 text-base-content/70
                       text-sm uppercase tracking-wide font-bold">
          {/* header — JANGAN UBAH data */}
        </tr>
      </thead>
      <tbody>
        {/* rows — JANGAN UBAH data mapping */}
      </tbody>
    </table>
  </div>
</div>
```

#### 8. Empty State — Bukan Halaman Kosong
```jsx
<div className="flex flex-col items-center justify-center py-20 gap-5">
  {/* Emoji atau SVG ilustrasi besar */}
  <div className="text-8xl animate-bounce">📭</div>
  <div className="text-center space-y-2">
    <h3 className="text-2xl font-black text-base-content">
      Belum Ada Data
    </h3>
    <p className="text-base-content/60 max-w-sm text-base leading-relaxed">
      Pesan yang ramah menjelaskan situasi ini.
    </p>
  </div>
  <button className="btn btn-primary btn-lg rounded-xl shadow-lg
                     shadow-primary/30 gap-2 font-bold mt-2">
    ✨ Tambah Sekarang
  </button>
</div>
```

#### 9. Form — Bersih dan Tidak Intimidatif
```jsx
<div className="card bg-base-100 shadow-sm rounded-2xl p-8 max-w-lg">
  <div className="form-control gap-1 mb-5">
    <label className="label pb-1" htmlFor="field-id">
      <span className="label-text font-bold text-base">
        Nama Lengkap <span className="text-error">*</span>
      </span>
    </label>
    <input
      id="field-id"
      className="input input-bordered input-lg rounded-xl
                 focus:input-primary transition-colors"
      placeholder="Ketik nama lengkap..."
      {/* JANGAN UBAH: value, onChange, name, dll */}
    />
    {/* Error state jika ada */}
    <label className="label pt-1">
      <span className="label-text-alt text-error font-medium">
        {errorMessage}
      </span>
    </label>
  </div>
</div>
```

---

## 🔍 LANGKAH 1 — AUDIT (WAJIB, JANGAN SKIP)

Baca semua file ini sebelum menulis kode:

```
WAJIB DIBACA:
├── package.json                    → versi semua dependency
├── index.html                      → font yang sudah ada, meta, favicon
├── src/index.css atau App.css      → CSS custom properties, @theme, import font
├── src/App.jsx atau main.jsx       → routing setup, layout wrapper
├── src/components/ (semua file)    → komponen shared
└── src/pages/ atau src/views/      → semua halaman
```

Setelah membaca, buat laporan ini dan **TUNGGU KONFIRMASI** sebelum lanjut:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT AUDIT REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Stack terkonfirmasi : Vite + React + Tailwind v4 + DaisyUI [versi]

WARNA BRAND YANG DITEMUKAN:
- Warna dominan  : [hex atau class]
- DaisyUI theme  : [nama theme aktif atau "default"]
- Font yang ada  : [nama font atau "system-ui"]

HALAMAN:
- [file]  → route: [path]  → [deskripsi]

KOMPONEN SHARED:
- [file]  → dipakai di: [halaman]

MASALAH VISUAL UTAMA:
- [temuan spesifik — kaku, flat, padat, dll]

RENCANA PERUBAHAN BESAR:
- [komponen/halaman]  → [perubahan apa yang akan dilakukan]

FILE YANG DISENTUH   : [daftar]
FILE YANG TIDAK DISENTUH: [daftar + alasan]

KONFIRMASI: Data flow & routing tidak akan berubah ✅
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🛠️ LANGKAH 2 — SETUP DESIGN SYSTEM

Setelah konfirmasi, kerjakan ini **sebelum menyentuh komponen apapun**:

### 2A. Update index.html — Tambah Font
```html
<!-- Ganti atau tambah di <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Nunito+Sans:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
```

### 2B. Buat/Update file CSS Global
```css
/* src/index.css — JANGAN hapus yang sudah ada, tambahkan di bawah */

@import "tailwindcss";
@plugin "daisyui" {
  themes: ["sekolah"];  /* atau nama theme yang kamu buat */
}

@theme {
  --font-sans: 'Nunito', sans-serif;
  --font-body: 'Nunito Sans', sans-serif;

  /* Shadow yang lebih expressive */
  --shadow-card: 0 4px 24px -4px rgba(0,0,0,0.10);
  --shadow-card-hover: 0 12px 40px -8px rgba(0,0,0,0.15);
  --shadow-primary: 0 8px 24px -4px var(--color-primary);
}

/* Animasi micro-interaction */
@layer utilities {
  .card-hover {
    @apply hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer;
  }
  .btn-glow {
    @apply shadow-lg hover:shadow-xl transition-shadow;
  }
  .touch-target {
    @apply min-h-12 min-w-12 flex items-center justify-center;
  }
}
```

### 2C. Buat Custom DaisyUI Theme
```css
/* Tambahkan di index.css sebelum @theme */
@plugin "daisyui" {
  themes: [
    {
      "sekolah": {
        "primary":          "#4F8EF7",   /* Ganti dengan warna brand jika ditemukan */
        "primary-content":  "#ffffff",
        "secondary":        "#FF6B6B",
        "secondary-content":"#ffffff",
        "accent":           "#FFD93D",
        "accent-content":   "#1a1a1a",
        "neutral":          "#3D405B",
        "neutral-content":  "#ffffff",
        "base-100":         "#FAFAFA",
        "base-200":         "#F0F4FF",
        "base-300":         "#E2E8F0",
        "base-content":     "#1E293B",
        "info":             "#38BDF8",
        "success":          "#4ADE80",
        "warning":          "#FB923C",
        "error":            "#F87171",
        "--rounded-box":    "1rem",
        "--rounded-btn":    "0.75rem",
        "--rounded-badge":  "9999px",
        "--animation-btn":  "0.2s",
      }
    }
  ]
}
```

Tambahkan `data-theme="sekolah"` di tag `<html>` pada `index.html`.

---

## 🎨 LANGKAH 3 — REDESIGN KOMPONEN (URUTAN WAJIB)

Kerjakan dalam urutan ini. **Selesaikan satu sebelum lanjut ke berikutnya.**

```
1. index.html          → tambah font, data-theme
2. index.css / CSS     → design tokens, custom theme
3. Layout wrapper      → App.jsx atau layout component
4. Navbar / Sidebar    → navigasi global
5. Halaman Login       → first impression
6. Dashboard / Home    → halaman utama setelah login
7. Semua halaman lain  → satu per satu, tidak ada yang dilewati
8. Komponen shared     → form, table, modal, card
```

Untuk **setiap file** yang diubah, deklarasikan ini dulu sebelum menulis kode:

```
MENGERJAKAN: [nama file]
PERUBAHAN:
  - Sebelum: [deskripsi visual lama yang kaku/flat/padat]
  - Sesudah:  [deskripsi visual baru yang playful/modern]
  - Tidak diubah: [handler, state, data props]
```

---

## 📏 LANGKAH 4 — RESPONSIVE & TOUCH CHECK

Setelah tiap halaman selesai:

```
CHECKLIST — [nama halaman]
[ ] Mobile < 640px   : tidak ada overflow horizontal
[ ] Mobile           : tap target semua ≥ 48x48px (gunakan class touch-target)
[ ] Mobile           : font body ≥ 16px
[ ] Mobile           : card tidak terlalu kecil untuk disentuh
[ ] Tablet 640-1024  : layout tidak terlalu lebar atau terlalu sempit
[ ] Desktop > 1024   : max-width terjaga (max-w-7xl), tidak terlalu lebar
[ ] Semua ukuran     : warna cukup kontras (tidak pucat di layar terang)
```

---

## ♿ LANGKAH 5 — AKSESIBILITAS

```
[ ] Semua ikon tanpa teks punya aria-label
[ ] Semua input punya <label> via htmlFor
[ ] Focus state terlihat (jangan hapus outline)
[ ] Error disampaikan via teks, bukan hanya warna
[ ] Kontras teks: minimum 4.5:1 WCAG AA
```

---

## 🚨 ATURAN PENTING SAAT EKSEKUSI

### Jika ragu apakah sesuatu menyentuh logika:
```
⚠️ KLARIFIKASI
Komponen : [nama]
Situasi  : [apa yang ditemukan]
Opsi A   : [pendekatan] — Risiko: [dampak ke data/logika]
Opsi B   : [pendekatan] — Risiko: [dampak ke data/logika]
Rekomendasi: Opsi [A/B] karena [alasan]
Lanjut?
```

### Jika menemukan komponen yang SANGAT kaku dan sulit diubah visual-nya:
Boleh restrukturisasi JSX wrapper (tambah/ubah div pembungkus),
**SELAMA data dan semua handler props tetap di tempatnya.**

---

## ✅ LAPORAN AKHIR

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REDESIGN SELESAI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Halaman diubah    : X
Komponen diubah   : X
File CSS baru     : [daftar]
File dimodifikasi : [daftar]
File tidak disentuh: [daftar]

Breaking changes  : TIDAK ADA ✅
Data flow berubah : TIDAK ADA ✅
Routing berubah   : TIDAK ADA ✅

VISUAL CHECKLIST FINAL:
[ ] Tampilan jauh berbeda dari sebelumnya (bukan hanya adjustment kecil)
[ ] Warna cerah dan playful — bukan abu-abu atau flat
[ ] Font Nunito aktif di semua halaman
[ ] Custom DaisyUI theme "sekolah" aktif
[ ] Card punya shadow, radius, dan karakter visual
[ ] Gradient digunakan di header/hero section
[ ] Tombol punya shadow dan efek hover
[ ] Tabel lebih modern (header berwarna, container rounded)
[ ] Empty state punya ilustrasi emoji + teks ramah
[ ] Loading state ada di semua async action
[ ] Semua tap target ≥ 48px
[ ] Mobile responsive
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🚀 MULAI SEKARANG

**Langkah pertama — lakukan ini sekarang:**

1. Baca `package.json` → konfirmasi versi DaisyUI
2. Baca `src/index.css` → lihat theme dan font yang ada
3. Baca `index.html` → lihat font link dan data-theme
4. List semua file di `src/pages/` dan `src/components/`
5. Tampilkan **PROJECT AUDIT REPORT**
6. Tunggu konfirmasi → lalu langsung eksekusi dengan BERANI

> 💡 REMINDER UNTUK DIRIMU SENDIRI:
> Tujuanmu bukan "memperbaiki sedikit". Tujuanmu adalah membuat siapapun yang
> melihat website ini sebelum dan sesudah redesign langsung berkata
> "WOW, ini beda banget!". Kerja dengan percaya diri dan berani.
