# 📝 Expense Tracker


This is a full-stack expense tracking application built for Pocketrocket Labs' take-home assignment. The app helps remote teams track and review expenses with role-based access control and visual insights.

## 🌐 Live Demo (Optional)
🔗 [Deployed Link Employee](https://pocket-labs.vercel.app/login) 
🔗 [Deployed Link Admin](https://pocket-labs-etry.vercel.app/admin) 

## 🛠️ Tech Stack

### Frontend
- **React** (Functional Components & Hooks)
- **Chart.js** for data visualization
- **Redux** for state management
- **React Hook Form** for form handling
- **Zod** for schema validation
- **Tailwind CSS** for styling

### Backend
- **Node.js** + **Express**
- **MongoDB** 
- **JWT** for authentication

### Database
- **MongoDB**

### Devops
- Vercel (Frontend deployment)
- Render (Backend deployment)

## ✨ Features

### Core Features
🔐 **Authentication & RBAC**
- User sign up & login with password hashing
- Two roles: Employee (manage own expenses) and Admin (view/manage all expenses)

📝 **Expense Tracking**
- Employees can add/view their expenses (amount, category, date, notes)
- Admins can view all expenses, filter them, and change status (pending/approved/rejected)

💬 **Visual Insights (Admin-only)**
- Bar chart showing total expenses per category
- Line chart displaying monthly expense trends

🕵️‍♂️ **Audit Logging**
- Logs key actions like expense creation and status changes
- Admin-only page to view audit logs

## 🚀 Installation

### Backend Setup
```bash
cd server
npm install
cp  .env
# Configure your MongoDB credentials
npm run dev
```

### Employee Setup

```bash
cd client
npm install
cp .env
npm run dev
```
### Admin Setup

```bash
cd admin
npm install
cp .env
npm run dev
```
### Admin Creds
- root123@gmail.com
- password

## 📂 Project Structure

```
server/
└── src/
    ├── controllers/         # Route controllers (business logic)
    ├── middleware/          # Custom middleware
    ├── config/          #  Config database (connection)
    |── public/          # Public (e.g., multer file storage)
    ├── models/              # Database models (e.g. Mongoose)
    ├── routes/              # Express route definitions
    ├── services/            # Reusable business logic (expense,auth etc.)
    ├── utils/               # Utility/helper functions
    ├── validations/         # Request data validation schema. (Zod, etc.)
    └── server.js            # Entry point for server (Express setup)


frontend/
├── public/                  # Static assets
├── src/
│   ├── assets/              # Images/styles
│   ├── components/ui/       #    Create Expense
│   ├── components/CreateExpense/ expense  
│   ├── redux/
│   │   ├── actions/         # Contains all thunk actions
│   │   └── actionTypes/     # Contains all actionTypes
│   │   └── reducers/        # Contains all reducers 
│   ├── hooks/              # Custom hooks
│   ├── pages/              # Contains all routes or pages
│   ├── utils/              # Contains error handler file
│   ├── types/              # Contains all  types
│   ├── validations/        # Contains all  validations using zod
│   ├── App.jsx             # Main router
│   └── main.jsx            # Entry point
└── tailwind.config.js      # UI config

```

## 🏛️ Architecture Notes
Backend Structure
- MVC architecture

- Routes separated by functionality (auth, expenses, admin)

-  Middleware for authentication and authorization


-  Centralized error handling

Frontend Structure
-  Component-based architecture

- Redux for state management

- Protected routes based on user roles


## ⚖️ Trade-offs

- **Authentication**: Chose JWT over traditional sessions for its stateless scalability, reducing server-side overhead. While sessions offer easier invalidation (e.g., immediate logout), we balanced this with short token lifespans and secure HTTP-only cookies for refresh tokens.

- **Database**:  Picked MongoDB for its schema flexibility with expense data (e.g., dynamic categories, optional fields), though PostgreSQL’s transactions would better enforce relational integrity for audits. Denormalized expense records for faster reads, trading off some update complexity.

- **State Management**: Used Redux (with Redux Toolkit) despite its boilerplate, as it centralizes global state like expense filters and admin logs more predictably than Context API. For a smaller app, this might be overkill—but it ensures scalability for future features.


## Future Improvements
- Implement proper pagination for expense lists

- Add more comprehensive error handling and user feedback

- Enhance the audit log system with more detailed information

- Add more chart types and filtering options for insights

- Implement proper file upload for receipts instead of mock version

- Add Bonus Feature

## 📜 License

This project is for evaluation purposes only. All rights reserved by Pocketrocket Labs.




