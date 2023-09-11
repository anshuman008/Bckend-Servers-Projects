// console.log("rom rom sare bhiayoon sab n");
// creating a server for todo list

const express = require("express");
const { todo } = require("node:test");
const app = express();
const port = 5000;
app.use(express.json());

let tasks = [];

// needed functions 

// serch index function
app.use('/todo/:id',middleware);

// creating  a middleware

function middleware(req,res,next){
    next();
}



function searchIndex(arr,num){

    for(let i = 0; i<arr.length; i++){
        if(arr[i].id === num) return i;
    }

    return -1;
}

//  delete a task


// get all tast
app.get('/todo',(req,res)=>{
     res.json(tasks);
})

// create a task
app.post('/todo',(req,res)=>{
    const {title,description} = req.body;
   
    if(!title || !description){
        res.status(4001);
        throw new Error("shi se dalo bhai");
    }

    const obj = {
        id: Math.floor(Math.random()*100000),
        title: title,
        description: description
    }

    tasks.push(obj);
    console.log(tasks);
    res.json({message: "added task sucesfylly"});
})

// search a task using id

app.get('/todo/:id',(req,res)=>{

   const value = searchIndex(tasks,Number(req.params.id));

    if(value == -1) res.json("nhi hai idhar");
    else res.json(tasks[value]);
})

// update a task
app.put('/todo/:id',(req,res)=>{

    const {title,description} = req.body;
    
    if(!title || !description){
        res.status(4001);
        throw new Error("shi se dalo bhai");
    }

    const value = searchIndex(tasks,Number(req.params.id));
    if(value == -1) res.json("nhi hai idhar");

        tasks[value].title = title;
        tasks[value].description = description;
        res.json({message:"task updated"});
})


// delete a task
app.delete('/todo/:id',(req,res)=>{
    const value = searchIndex(tasks,Number(req.params.id));
    if(value == -1) res.json("nhi hai idhar");
    else{
        tasks.splice(value, 1);
        res.json({message: `delete succesfully`})
    }
})



app.listen(port,()=>{
    console.log("ha shuru ho  hya server");
})