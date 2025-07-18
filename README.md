# DSA Mentorship Project

Welcome to the **DSA Mentorship Project** — an interactive and inclusive space designed to bridge the gap between aspiring learners and experienced mentors in the field of **Lifestyle, Studies & Tech**.

Whether you're preparing for technical interviews or trying to master competitive programming, this platform is built to match you with the right guide or learner on your journey.

---

## Features

-  **Secure Authentication**
  - User registration and login with role selection: `Mentor` or `Mentee`
  - Protected routes using JWT & HTTP-only cookies

-  **Complete Profile Flow**
  - After signing up, users are redirected to complete their profile before accessing the dashboard
  - Customize skills, experience level, goals, and availability

-  **Mentorship Matching (coming soon!)**
  - Smart algorithm to pair mentees with mentors based on interests, goals, and skill level

-  **Dashboard**
  - Personalized view based on user role
  - Mentor tools for managing mentees
  - Mentee tools for tracking sessions and feedback

-  **Deployed Frontend & Backend**
  - Frontend: React + TailwindCSS (hosted on Netlify)
  - Backend: Express + MongoDB (hosted on Render)

---

## Tech Stack

| Layer     | Tech                                 |
|-----------|--------------------------------------|
| Frontend  | React + Vite, TypeScript, Axios      |
| Backend   | Node.js, Express.js, dotenv          |
| Routing   | React Router                         |
| Styling   | Tailwind CSS                         |
| Database  | MongoDB with Mongoose                |
| Auth      | JWT + HTTP-only cookies              |
| Hosting   | Netlify (Frontend), Render (Backend) |

---

## Installation (Local Dev)

### Backend
```bash
git clone https://github.com/Mimmi-adey/DSA_Mentorship_Project-Backend.git
npm install
npm run dev

API Documentation (Auth Endpoints)
All endpoints are prefixed with:  
`https://dsa-mentorship-project-backend.onrender.com/api/auth`

Frontend
git clone https://github.com/Mimmi-adey/DSA_Mentorship_Project-Frontend.git
cd dsa-mentorship-frontend
npm install
npm run dev

```env
PORT=8000
MONGO_URI="mongodb+srv://adeyemomariamtobiloba:AXl70Byrge2HdpQZ@cluster0.z2al8y0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000

Live Demo
Frontend: https://mariamadeyemo-mentormatch-dsaproject.netlify.app/
Backend: https://dsa-mentorship-project-backend.onrender.com

How It Works
Register with your email and choose your role (Mentor or Mentee)
Complete your profile before gaining access to the dashboard
Get matched with a mentor/mentee based on your goals (coming soon!)
Collaborate  and grow with DSA challenges, sessions, and progress tracking

Folder Structure (Frontend)
src/
├── assets/             # Images, fonts, etc.      
├── components/         # Reusable UI components
├── layouts/            # Page-level layout wrappers
├── pages/              # Route components
├── routes/             # React Router configuration
├── utils/              # Axios helpers & config
└── App.tsx       


CORS & Auth Notes
CORS is configured on the backend to allow credentials and access from the frontend domain
JWT Tokens are stored as HTTP-only cookies for enhanced security
Protected routes ensure that only authenticated users access their dashboards

License
This project is licensed under the MIT License.