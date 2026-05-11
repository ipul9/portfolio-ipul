# Portfolio Prototype — CLAUDE.md

## Overview
Monorepo portofolio pribadi. Berisi portfolio website (Next.js) yang menampilkan semua prototype sebagai showcase skill.

**Akun:** `ipul9` / `ipulrifai@gmail.com`
**Deploy:** Vercel (personal)
**Repo:** `github.com/ipul9/portfolio-ipul`

---

## Struktur Repo

```
portfolio-ipul/
├── apps/web/           ← Next.js portfolio website
├── prototypes/         ← tiap subfolder = satu prototype
│   └── [nama]/
│       ├── README.md
│       └── src/
├── registry.json       ← metadata semua prototype
└── CLAUDE.md
```

---

## Workflow: Menambah Prototype Baru

1. Buat folder `prototypes/[nama]/` + `README.md` + `src/`
2. Tambahkan entry ke `registry.json`:
   ```json
   {
     "id": "nama-prototype",
     "title": "Judul",
     "description": "Deskripsi singkat",
     "stack": ["Next.js", "Supabase"],
     "status": "live",
     "demo_url": "https://...",
     "github_path": "prototypes/nama-prototype",
     "created_at": "YYYY-MM-DD"
   }
   ```
3. Portfolio website otomatis menampilkan card baru (baca dari registry.json)
4. Commit + push via: `python "C:\Users\lenovo\Documents\Claude\push_project.py" "Portfolio Prototype" -m "add: [nama-prototype]" -y --log`

---

## Workflow: Update Portfolio Website

- Dev server: `cd apps/web && npm run dev`
- Build: `cd apps/web && npm run build`
- Deploy otomatis via Vercel (connect ke GitHub repo)

---

## Status Badge

| Value | Artinya |
|-------|---------|
| `live` | Sudah deploy, bisa diakses |
| `wip` | Sedang dikerjakan |
| `archived` | Tidak aktif, tetap ditampilkan |

---

## Session Log

Setelah setiap session → append ke `C:\Users\lenovo\Documents\Claude\ProjectLog\portfolio-ipul.md`
