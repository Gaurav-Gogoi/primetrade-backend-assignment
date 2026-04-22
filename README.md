# Primetrade.ai Backend Developer Assignment

This repository contains the solution for the Backend Developer Intern assignment. It features a scalable REST API built with Django REST Framework, protected by JWT authentication, and integrated with a React.js (Vite + Tailwind CSS) frontend.

## 🚀 Core Features
- **Authentication:** Secure user registration and login utilizing JWT (JSON Web Tokens) with hashed passwords.
- **Role-Based Access Control (RBAC):** - Standard users can only perform CRUD operations on their own entities (Tasks).
  - Admin (staff) users have elevated privileges to view and manage all entities.
- **RESTful API:** Clean, modular CRUD endpoints for a secondary entity (Tasks).
- **Responsive UI:** A modern, functional React frontend styled with Tailwind CSS to demonstrate API integration.

## 🛠️ Tech Stack
- **Backend:** Python, Django, Django REST Framework, SimpleJWT
- **Database:** SQLite (Configured via ORM for seamless transition to PostgreSQL)
- **Frontend:** React.js (Vite), Tailwind CSS, Axios, React Router

---

## 💻 Local Setup Instructions

### 1. Backend Setup
Navigate to the backend directory and set up the Python environment:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt

Apply database migrations:

Bash
python manage.py makemigrations
python manage.py migrate
Start the development server:

Bash
python manage.py runserver
The API will be available at http://localhost:8000/api/

2. Frontend Setup
Open a new terminal window, navigate to the frontend directory, and start the Vite dev server:

Bash
cd frontend
npm install
npm run dev
The UI will be accessible at http://localhost:5173

📈 Scalability & Future-Proofing Note
While this MVP is optimized for rapid deployment and testing, the architecture is designed with scalability in mind to handle high-throughput, Web3 trading environments:

Database Scaling: Currently utilizing SQLite for rapid local prototyping, but the Django ORM allows for an immediate swap to PostgreSQL or MySQL. For high-read scenarios, implementing database read-replicas would be the next step.

Caching Strategy: To reduce database load, I would integrate Redis to cache frequently accessed, read-heavy endpoints (like fetching task lists or global configurations).

Microservices Readiness: The current monolithic structure is highly decoupled. As domain complexity grows, the Authentication app can easily be separated from the Core Services app into distinct microservices.

Deployment & Containerization: The project structure is ready to be containerized using Docker, allowing for seamless horizontal scaling behind a reverse proxy/load balancer like NGINX on AWS ECS or Kubernetes.

Security Enhancements: Future iterations would include rate limiting (via Django ratelimit) to prevent brute-force attacks and strict CORS configurations for production domains.

📚 API Documentation (Endpoints)
Authentication

POST /api/register/ - Register a new user

POST /api/login/ - Obtain JWT access and refresh tokens

POST /api/login/refresh/ - Refresh JWT access token

Entities (Tasks)

GET /api/tasks/ - List tasks (Filtered by user role)

POST /api/tasks/ - Create a new task

GET /api/tasks/<id>/ - Retrieve a specific task

PUT /api/tasks/<id>/ - Update a task

DELETE /api/tasks/<id>/ - Delete a task