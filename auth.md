a@a:~/DD.xyz$ curl -X POST http://localhost:5000/api/auth/register \
-H "Content-Type: application/json" \
-d '{
  "email": "test@example.com",
  "password": "password123",
  "firstName": "Test",
  "lastName": "User"
}'
{"success":true,"message":"User registered successfully","data":{"user":{"email":"test@example.com","firstName":"Test","lastName":"User","_id":"67ffb89ea10897f72446ba5e","createdAt":"2025-04-16T14:03:10.756Z","updatedAt":"2025-04-16T14:03:10.756Z","__v":0},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2ZmYjg5ZWExMDg5N2Y3MjQ0NmJhNWUiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJ0eXBlIjoidXNlciIsImlhdCI6MTc0NDgxMjE5MSwiZXhwIjoxNzQ0ODEyMjE1fQ.GbLzEJ313VVy1eLnb5_LlxSuVayzZiHZG36PQwHXKL4"}}a@a:~/DD.xyz$ 




a@a:~/DD.xyz$ curl -X POST http://localhost:5000/api/auth/login   -H "Content-Type: application/json"   
-d '{
    "email": "test@example.com",
    "password": "password123"
  }'
{"success":true,"message":"Login successful","data":{"user":{"_id":"67ffb89ea10897f72446ba5e","email":"test@example.com","firstName":"Test","lastName":"User","createdAt":"2025-04-16T14:03:10.756Z","updatedAt":"2025-04-16T14:03:10.756Z","__v":0},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2ZmYjg5ZWExMDg5N2Y3MjQ0NmJhNWUiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJ0eXBlIjoidXNlciIsImlhdCI6MTc0NDgxMjgzOSwiZXhwIjoxNzQ1NDE3NjM5fQ.OiN0h4gb3sV48B5JDly_r3WgDo_208gCA6R6CQb8cck"}}a@a:~/DD.xyz$ 










a@a:~/DD.xyz$ curl -X GET http://localhost:5000/api/auth/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2ZmYjg5ZWExMDg5N2Y3MjQ0NmJhNWUiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJ0eXBlIjoidXNlciIsImlhdCI6MTc0NDgxMjgzOSwiZXhwIjoxNzQ1NDE3NjM5fQ.OiN0h4gb3sV48B5JDly_r3WgDo_208gCA6R6CQb8cck"
{"success":true,"data":{"user":{"userId":"67ffb89ea10897f72446ba5e","email":"test@example.com","type":"user","_id":"67ffb89ea10897f72446ba5e"}}}a@a:~/DD.xyz$ 

















