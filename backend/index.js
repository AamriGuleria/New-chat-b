import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import 'dotenv/config'
const p=process.env.PORT;
import cors from "cors";
var api_key="";
var error="";
const app=express(); 
app.use(bodyParser.json());
app.use(cors());
app.post('/',(req,res)=>{
    const a_key=req.body.key;
    api_key=a_key;
    try{
        if(api_key==="" || api_key===undefined){
            res.send({reponse:"fail"})
        }
        else{
        res.send({response:"success"})
        }
    }
    catch(error){
        res.send("fail")
    }
})
app.post("/main",async(req,res)=>{ 
    const configuration=new Configuration(
        {
            apiKey:api_key
        }
    )
    //create a new instance of openai api
    const cont=req.body.content;
    const openai=new OpenAIApi(configuration);
    const resp=await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `${cont}`,
          }
        ]
      })
      .catch(error=>
        {
            return error.response.status
            }
        
        )
        
        if(resp===401){
            res.send({content:"Unauthorized Api Key"})
        }
        else if(resp===429){
            res.send({content:"Too many requests error"})
        }
        else if(resp===403){
            res.send({content:"User credentials lack sufficient information"})
        }
        else if(resp===400){
            res.send({content:"API is malformed, missing required parameters, or uses unsupported options"})
        }
        else if(resp===404){
            res.send({content:"requested resource or endpoint is not found"})
        }
        else{
        res.send({content:resp.data.choices[0].message.content})
      }  
})

app.listen(p,()=>{
    console.log(`listening on port`)
})