# St. Mary's School — Single Next.js Full-Stack App

The project is now one Next.js application. The former Express backend logic lives inside `src/server` and is exposed through Next.js Route Handlers. There is no separate backend process.

## Structure

```text
SeintMaris/
├── app/
│   ├── (site)/
│   ├── admin/
│   ├── login/
│   ├── api/[...path]/route.js
│   ├── globals.css
│   ├── layout.jsx
│   └── not-found.jsx
├── src/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   └── server/
│       ├── controller/
│       ├── middleware/
│       ├── model/
│       ├── util/
│       ├── db.js
│       └── route-adapter.js
├── public/
├── .env.local
└── package.json
```

## Run

```bash
cp .env.local.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000`.

Set your MongoDB, authentication and Supabase server credentials in `.env.local`.

## API compatibility

The frontend still calls `/api`, but these are now handled directly by Next.js:

`/api/auth/*`, `/api/circulars/*`, `/api/staff/*`, `/api/gallery/*`, `/api/syllabus/*`, `/api/upload/*`, and `/api/health`.

The existing UI and frontend service layer are preserved; only the backend execution layer has moved into the Next.js application.
