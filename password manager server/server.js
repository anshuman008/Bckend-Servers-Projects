console.log('kaisa hai bhai');
const express = require('express');
const fs = require('fs');
const port = 3000;
const app =express();

const cors = require('cors');
app.use(cors());
app.use(express.json());

// creating a  signup link by POST

function find(arr, id, password){
    
    for(let i = 0; i<arr.length; i++){
        if(arr[i].email === id) return i;
    }

    return -1;
}

app.post('/signup',(req,res)=>{

const {email, password, username} = req.body;

    fs.readFile('database.json','utf8',(err,data)=>{
        const arr = JSON.parse(data);
       if(find(arr,email,password) === -1){
         const obj = {
            email: email,
            password: password,
            username: username
         }

         arr.push(obj);
         fs.writeFile('database.json',JSON.stringify(arr),()=>{
            res.json('account created sucessfully')
         })
       }
       else{
        res.json('emial is already present');
       }
    })
})

// creating a login function using GET

app.get('/login',(req,res)=>{
    const email = req.headers.email;
    const password = req.headers.password;

    fs.readFile('database.json','utf8',(err,data)=>{
        const list = JSON.parse(data);
        const val = find(list,email,password);
        if(val === -1){
            res.status(400).json('user not found corect your email or signup');
        }
        else if(list[val].password !== password){
           res.json('wrong password');
        }
        else{
            res.status(200).json({username: list[val].username, email:list[val].email});
        }
    })

})






app.listen(port,()=>{
    console.log('ha bhai shuru ho gya me');
})