# Everything Frontend

This is a simple Vite + React + TypeScript app.
It gives you two small tools to be more productive:

- A **notifications** that shows the latest updates from `/notifications`.
- A **chat panel** where you can ask questions (sent to `/ask`) and see answers in markdown.

## Quick Start

### What you need

- Node.js 18 or newer (works with Vite 7).
- npm 9 or newer (comes with Node).

### Install packages

```bash
npm install
```

### API URL

The app talks to a backend using Axios (`src/services/http.ts`).
By default it uses `http://localhost:3005/api`.

## Run the app

- `npm run dev` → start the dev server (default http://localhost:5173).

## Testing

We use **Jest** and **React Testing Library**.

- `npm test` → run all tests once.

Setup file: `src/test/setup.ts` (adds matchMedia and `@testing-library/jest-dom`).
Component tests are in `src/components/__tests__`.

## Project layout

```
src/
  App.tsx               # Main app, shows Notifications and ChatPanel
  components/
    Notifications.tsx   # Gets and shows notification cards from API
    ChatPanel.tsx       # Chat UI, sends questions and shows markdown answers
  services/http.ts      # Axios instance with API base URL
  test/setup.ts         # Jest + Testing Library helpers
public/                 # Static files
```

## How the app works

- **Notifications** (`src/components/Notifications.tsx`):

  - Calls `GET /notifications` when loaded.
  - Shows a spinner while waiting.
  - Expects response like `{ now: string; location: string; cards: { message: string; ... }[] }`.
  - Shows each card in an Ant Design `Tag` and displays current date at the top.

- **Chat panel** (`src/components/ChatPanel.tsx`):

  - Keeps chat history and blocks empty messages.
  - Sends `{ question: string }` to `POST /ask`.
  - Displays the answer back into the chat.
  - Uses markdown (`react-markdown` + `remark-gfm`) and shows a spinner while loading.
