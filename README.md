# Trường Công đoàn Giáo dục Việt Nam — Frontend

Frontend React/Vite đã kết nối API thật. Backend nằm tại `../congdoanldp-backend`.

```bash
corepack pnpm install
corepack pnpm dev
```

Local development dùng proxy `/api` đến `http://127.0.0.1:3001`. Khi build production, cấu hình `VITE_API_URL` theo `.env.example`.

```bash
corepack pnpm lint
corepack pnpm build
```
