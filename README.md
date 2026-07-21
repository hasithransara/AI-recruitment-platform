# AI Recruitment Platform

## Project Overview

The AI Recruitment Platform is a full-stack web application developed to streamline the recruitment process for organizations and job seekers. The system provides role-based access for Candidates, Recruiters, Hiring Managers, and Administrators while integrating AI-powered features such as resume matching and career assistance.

---

## Technologies Used

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router
- Axios
- React Toastify

### Backend
- ASP.NET Core 8 Web API
- Entity Framework Core
- JWT Authentication
- BCrypt Password Hashing

### Database
- Microsoft SQL Server
- Entity Framework Core Code First

---

## Project Structure

```
AI-Recruitment-Platform/
│
├── Frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── Backend/
│   ├── Controllers/
│   ├── Models/
│   ├── DTOs/
│   ├── Repositories/
│   ├── Services/
│   ├── Data/
│   ├── Program.cs
│   ├── appsettings.json
│   └── AIRecruitment.sln
│
├── Database/
│   ├── AIRecruitmentDB.sql
│   └── Migrations/
│
└── README.md
```

---

## Features

### Candidate
- Register and Login
- Manage Profile
- Upload Resume
- Search Jobs
- Apply for Jobs
- Track Applications
- AI Career Assistant

### Recruiter
- Create Jobs
- Update Jobs
- Delete Jobs
- View Applicants
- Shortlist Candidates

### Hiring Manager
- Review Candidates
- Record Interview Feedback
- Approve or Reject Candidates

### Administrator
- Manage Users
- Manage Jobs
- View Reports
- Monitor System

---

## AI Features

- AI Resume Matching
- Resume Parsing
- AI Career Assistant

---

## Prerequisites

Before running the project, install:

- Visual Studio 2022
- .NET 8 SDK
- Node.js (v20 or later)
- SQL Server
- SQL Server Management Studio (SSMS)

---

## Database Setup

### Option 1 (Recommended)

1. Open SQL Server Management Studio.
2. Create a new database named **AIRecruitmentDB**.
3. Execute the `AIRecruitmentDB.sql` script located in the `Database` folder.

### Option 2 (Entity Framework)

Run the following command inside the Backend project:

```bash
dotnet ef database update
```

---

## Backend Setup

1. Open the Backend solution in Visual Studio 2022.
2. Update the SQL Server connection string in `appsettings.json` if required.
3. Build the solution.
4. Run the ASP.NET Core Web API.

The API will launch with Swagger UI.

---

## Frontend Setup

Open a terminal inside the Frontend folder.

Install dependencies:

```bash
npm install
```

Run the application:

```bash
npm run dev
```

Open the URL displayed in the terminal (usually `http://localhost:5173`).

---

## Default User Roles

- Candidate
- Recruiter
- Hiring Manager
- Administrator

---

## API Testing

Swagger UI is available after running the backend project.

Example:

```
https://localhost:5001/swagger
```

---

## Security

- JWT Authentication
- Role-Based Authorization
- BCrypt Password Hashing
- HTTPS Communication
- Input Validation

---

## Project Contributors

This project was developed as part of the Software Architecture module at NSBM Green University.

---

## License

This project was developed for academic purposes only.
