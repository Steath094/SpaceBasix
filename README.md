# 🏨 Hostel Management Website

A full-stack Hostel Management System built with **Spring Boot**, **React**, and **MongoDB**, designed for smooth hostel administration and student experience.

---

## 📌 Features

### 👤 Admin (Warden)
- Signup and login
- Register hostel details during signup
- Dashboard to:
  - View room availability
  - Manage student information
  - Handle student complaints
  - Add or remove rooms
  - Register students

### 🎓 Student
- Added by Admin (no self-signup)
- Receives login credentials via email
- Can:
  - Login and change password
  - View profile and allotted room
  - View fee history
  - Submit complaints or grievances
  - Optionally make fee payments

---

## ⚙️ Tech Stack

| Layer       | Technology                |
|------------|----------------------------|
| Frontend    | React, Tailwind CSS, Recoil |
| Backend     | Spring Boot (Java)        |
| Database    | MongoDB                   |
| API Client  | Axios                     |
| Deployment  | (Optional) Netlify / Render / Heroku |

---

## 🛠️ Setup Instructions

### 🔧 Backend (Spring Boot)

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/hostel-management-backend.git
   cd hostel-management-backend
   ```

2. Open in your IDE (IntelliJ, VS Code)

3. Configure `application.properties`:
   ```properties
   spring.data.mongodb.uri=mongodb://localhost:27017/hostelDB
   ```

4. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

Backend will be live at: `http://localhost:8080`

---

### 🎨 Frontend (React)

1. Navigate to frontend folder:
   ```bash
   cd hostel-management-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

Frontend will be live at: `http://localhost:3000`

---

## 🔐 Authentication

- No Spring Security used (for simplicity)
- Login is handled via a basic username-password check
- Admin and Student roles are separated based on login context

---

## 📁 Folder Structure

```
backend/
├── controllers/
├── models/
├── repositories/
├── services/
├── exceptions/
└── HostelManagementApplication.java

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── store/         # Recoil atoms
│   └── App.js
```

---

## 📮 API Endpoints Overview

### Room
- `GET /api/room/student/{studentId}`
- `POST /api/room/add`
- `DELETE /api/room/{roomId}`

### Complaint
- `GET /api/complaints/student/{registrationNumber}`
- `POST /api/complaints/add`

### Student
- `POST /api/student/register`
- `GET /api/student/{studentId}`

### Admin
- `POST /api/admin/signup`
- `POST /api/admin/login`
- `GET /api/admin/{adminId}`

---

## 📝 To-Do / Enhancements

- Add Spring Security + JWT Authentication (optional)
- Enable fee payment integration (Razorpay / Stripe)
- Add filtering/sorting to dashboards
- Export complaint and fee data as reports (PDF/CSV)

---

## 👨‍💻 Author

Built by [Your Name]  
📧 [your.email@example.com]

---

## ⭐ License

This project is open-source and available under the [MIT License](LICENSE).