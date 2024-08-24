const express=require("express");
const { request } = require("http");
const path=require("path");
const app=express();
const fs=require("fs");
// const { log } = require("console");

// console.log(__dirname);

const PORT=3000;


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'/public')));

app.set('view engine','ejs');

//middleware
app.use((req,res,next)=>{ 
    console.log("middleware run successfully");
    next();
    
})

app.get("/",(req,res)=>{
    fs.readdir('./files',(err,files)=>{
        // console.log(res);
        res.render("index",{files:files})
    })
 
})


app.post("/create",(req,res)=>{
 // console.log(req.body);        //it will get data from frontend from input and text area
 fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,(err)=>{
    res.redirect("/");
 })

  
    })

app.get('/file/:filename',function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){
     res.render('show',{filename:req.params.filename,filedata:filedata});
      
        
    })
})


// app.get("/profile/:anything",(req,res)=>{    //  ": " colon is used for dynamic route
//     res.send( `welcome ${req.params.anything}`);   //it params takes anything(username) from url
// })


//allways on last 
app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status(500).send("Somethin Wrong Happen")
    
})

app.listen(PORT,()=>{
    console.log(`server is running  at ${PORT}`)
})