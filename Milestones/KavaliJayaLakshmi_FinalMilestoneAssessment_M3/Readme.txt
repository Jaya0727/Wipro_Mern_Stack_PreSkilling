Fitness Program Enrollment System

Setup Instructions:
backend:npm init --y
frontend:npx create-react-app frontend

Run Backend
1. Open terminal and go to backend folder:cd backend
2.Install dependencies:npm install(npm install mocha chai supertest,npm install exress-validator)
3.Start MongoDB:mongodb - connect mongodb
4.Start server:node server.js
5.Backend runs on:http://localhost:5000

Run Frontend:
1.Open terminal and go to frontend folder:cd frontend
2.Install dependencies:npm install
3.Start frontend:npm start
4.Frontend runs on:http://localhost:3000


Run Tests
1.Go to backend folder:cd backend
2. Run:
   npx mocha test/enroll.test.js


API List:

Register User
POST:/api/users/register

Create Program:
POST/api/programs

Get Programs:
GET/api/programs

Enroll Program:
POST/api/enroll

Url:
Backend:
http://localhost:5000

Frontend:
http://localhost:3000

API Base:
http://localhost:5000/api