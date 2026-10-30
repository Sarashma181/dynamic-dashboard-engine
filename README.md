# Dynamic Dashboard Engine

A schema-driven dashboard application with a React + TypeScript client and a FastAPI backend. The client includes reusable widgets for charts, data tables, dynamic forms, metric cards, loading states, and error handling.

## Project structure

- `client/` — Vite, React and TypeScript frontend
- `server/` — FastAPI application (`app.py`)

## Frontend setup

```bash
cd client
npm install
npm run dev
```

Create a production build with `npm run build`.

## Backend setup

Use Python 3.10+ and create a virtual environment outside version control. Install the backend dependencies required by `server/app.py`, then run the FastAPI application with Uvicorn.

```bash
cd server
python -m venv .venv
# Activate the environment, then install dependencies
python -m pip install fastapi uvicorn pydantic
uvicorn app:app --reload
```

The repository intentionally excludes `node_modules`, Python virtual environments, caches, and local environment files.
