Install Node modules (inside each challenge folder)
npm init -y
npm install express express-validator express-rate-limit

Test using Thunder Client / Postman
Method	URL	Body
GET	http://localhost:3000/api/courses	—
POST	same	{ "name":"Python", "duration":"2 months" }
PUT	/api/courses/ID	updated JSON
DELETE	/api/courses/ID	