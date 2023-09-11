/**
  You need to create a HTTP server in Node.js which will handle the logic of an authentication server.
  - Don't need to use any database to store the data.

  - Save the users and their signup/login data in an array in a variable
  - You can store the passwords in plain text (as is) in the variable for now

  The expected API endpoints are defined below,
  1. POST /signup - User Signup
    Description: Allows users to create an account. This should be stored in an array on the server, and a unique id should be generated for every new user that is added.
    Request Body: JSON object with username, password, firstName and lastName fields.
    Response: 201 Created if successful, or 400 Bad Request if the username already exists.
    Example: POST http://localhost:3000/signup

  2. POST /login - User Login
    Description: Gets user back their details like firstname, lastname and id
    Request Body: JSON object with username and password fields.
    Response: 200 OK with an authentication token in JSON format if successful, or 401 Unauthorized if the credentials are invalid.
    Example: POST http://localhost:3000/login

  3. GET /data - Fetch all user's names and ids from the server (Protected route)
    Description: Gets details of all users like firstname, lastname and id in an array format. Returned object should have a key called users which contains the list of all users with their email/firstname/lastname.
    The users username and password should be fetched from the headers and checked before the array is returned
    Response: 200 OK with the protected data in JSON format if the username and password in headers are valid, or 401 Unauthorized if the username and password are missing or invalid.
    Example: GET http://localhost:3000/data

  - For any other route not defined in the server return 404

  Testing the server - run `npm run test-authenticationServer` command in terminal
 */

const express = require("express");
const port= 3000;
const  app = express();

app.use(express.json());

// 1. POST /signup - User Signup
//     Description: Allows users to create an account. This should be stored in an array on the server, and a unique id should be generated for every new user that is added.
//     Request Body: JSON object with username, password, firstName and lastName fields.
//     Response: 201 Created if successful, or 400 Bad Request if the username already exists.
//     Example: POST http://localhost:3000/signup

let users = [];

function check(arr,email, username){
    const obj = {
        "emailPresent" : false,
        "userPresent": false
    }  
 
  
    for(let i = 0;  i<arr.length; i++){
        if(arr[i].email === email){
         obj.emailPresent = true;
         break;
        }  
    }
  
    for(let i = 0;  i<arr.length; i++){
        if(arr[i].username === username){
         obj.userPresent = true;
         break;
        }  
    }

     return  obj;
}


app.post('/signup',(req,res)=>{
      
    const {email, username} = req.body;
    const checkDetail = check(users,email,username);
     
    if(checkDetail.emailPresent  && checkDetail.userPresent){
        res.status(400).json("this email and user name is already present🥺");
    }
    else if(checkDetail.emailPresent){
        res.status(400).json("this email is already present🥺");
    }
    else if(checkDetail.userPresent){
        res.status(400).json("this username is already present🥺");
    }
    else{
        users.push(req.body);
        res.json("singhup donneeee")
    }


})

// 2. POST /login - User Login
// Description: Gets user back their details like firstname, lastname and id
// Request Body: JSON object with username and password fields.
// Response: 200 OK with an authentication token in JSON format if successful, or 401 Unauthorized if the credentials are invalid.
// Example: POST http://localhost:3000/login


function Logincheck(arr,username, password){
    const obj = {
        "userPresent" : false,
        "passCorrect": false,
        "id" : -1
    }  
 
     
  
    for(let i = 0;  i<arr.length; i++){
        if(arr[i].username === username){
         obj.userPresent = true;
         obj.id = i;
         break;
        }  
    }
  
    for(let i = 0;  i<arr.length; i++){
        if(arr[i].password === password){
         obj.passCorrect = true;
         break;
        }  
    }

     return  obj;
}

app.post('/login',(req,res)=>{
    const {username,password} = req.body;
    const Detail = Logincheck(users,username,password);

    if(Detail.userPresent === false){
        res.status(401).json(" this username is not persent")
    }
    else  if(Detail.passCorrect === false){
        res.status(401).json("Wrong Password")
    }
    else{
        res.status(200).json({
            Username:  users[Detail.id].username,
            firstName: users[Detail.id].firstName,
            lastName: users[Detail.id].lastName,
            email: users[Detail.id].email
        });
    }
})



// 3. GET /data - Fetch all user's names and ids from the server (Protected route)
// Description: Gets details of all users like firstname, lastname and id in an array format. Returned object should have a key called users which contains the list of all users with their email/firstname/lastname.
// The users username and password should be fetched from the headers and checked before the array is returned
// Response: 200 OK with the protected data in JSON format if the username and password in headers are valid, or 401 Unauthorized if the username and password are missing or invalid.
// Example: GET http://localhost:3000/data

// - For any other route not defined in the server return 404

app.get('/data',(req,res)=>{
    const username = req.headers.username;
    const password = req.headers.password;

    const obj  = Logincheck(users,username,password);
    if(obj.userPresent === false){
        res.status(401).json(" this username is not persent")
    }
    else  if(obj.passCorrect === false){
        res.status(401).json("Wrong Password")
    }
    else{
        let details = [];
        for(let i = 0; i<users.length; i++){
            const value = {
                email: users[i].email,
                firstName: users[i].firstName,
                lastName: users[i].lastName
            }
            details.push(value);
        }
        res.json(details);
    }
})



app.listen(port,()=>{
    console.log("shuru ho  gya");
})