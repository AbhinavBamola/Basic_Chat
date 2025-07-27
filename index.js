const express=require('express');
const http=require('http');
const path=require("path");
const {Server}=require('socket.io');
require('dotenv').config();

const app=express();
const PORT=process.env.PORT;
const server=http.createServer(app);
const io=new Server(server);//this gives a script which we load in frontend

io.on('connection',(client)=>{//when ever a connection is there from fe
        console.log("A new user has connected "+client.id);
        client.on("user-message",(msg,username)=>{
            console.log(`A new user message ${msg} from ${username}`)
            io.emit('message',msg,username);//io means jitne bhi hhumare connection hai
        })
})

app.use(express.static(path.resolve("./public")));

app.get("/",(req,res)=>{
    res.sendFile('./public/index.html')
})

server.listen(PORT,()=>{
    console.log(`Server started on ${PORT}`)
})