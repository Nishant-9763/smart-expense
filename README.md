# Smart Expense Sharing App

## Tech Stack
- Backend: Node.js, Express.js, MongoDB
- Frontend: React.js (Vite)

## Setup
1. Clone repo
2. Backend setup:
   `cd backend`
   `npm install`
   create `.env` from `.sample.env`
   `npm run dev`
3. Frontend setup:
   `cd frontend`
   `npm install`
   create `.env` with `VITE_API_URL=http://localhost:7000/api`
   `npm run dev`

## API Endpoints
- POST   /api/users
- GET    /api/users
- POST   /api/expenses
- GET    /api/expenses
- DELETE /api/expenses/:id
- GET    /api/expenses/balances
- GET    /api/expenses/settlements