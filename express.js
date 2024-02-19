import express from "express";
import axios from "axios";

const app=express();
const port=3000;
const URL="https://v2.jokeapi.dev/joke/Any";

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.post("/submit",async(req,res)=>{
    let result=await axios.get(URL);
    console.log(result);
    let pastResult={
        data:{
            setup:"Try again",
            delivery:"Try again"
        }
    };
    console.log(result.data.setup);
    console.log(result.data.delivery);
    if(!result.data.delivery && !result.data.setup){
        res.render("index.ejs",{result:pastResult});
    }
    else{
    try{
        res.render("index.ejs",{result:result});
    }
    catch(error){
        console.log(error);
    }
}
});

app.listen(port,()=>{
    console.log("Listening to port 3000...");
});