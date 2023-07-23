import React, { useState, useEffect } from 'react'
// import { Route, Routes, useNavigate } from 'react-router-dom';
import MainPage from "./MainPage"
import "./index.css"
const LoginPage = () => {
  const [key, setkey] = useState("")
  const [name, setname] = useState("")
  const [resp, setresp] = useState("")
useEffect(()=>{
  if(resp==="success"){
    setresp("Loading...")
    setInterval(()=>{
      window.location.href=`http://localhost:3000/main?name=${name}`;
    },3000)
  }
  else if(resp==="fail"){
    setresp("enter correct details")
  }
},[resp])
  const Verify =async (e,key,name) => {
    e.preventDefault();
    fetch("http://localhost:8000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "key":`${key}`,
          "name":`${name}`,
        }),
      })
      .then((response) => response.json())
        .then((data) => {
          setresp(data.response)
        })
        .catch((error) => {
          setresp(error)
        });
    }
  
  return (
    <div className="login_page">
      <center>
      <form className="login_form" onSubmit={e => {Verify(e,key, name)}}>
        <h4>Login</h4>
        <input type="text" name="api_key" className="api_key" placeholder="API KEY..." onChange={(e) => setkey(e.target.value)} value={key} required></input>
        <input type="text" name="name" className="name" placeholder="Your Name..." onChange={(e) => setname(e.target.value)} value={name} required></input>
        <button type="submit" className="button">Submit</button>
      </form>
      <p className="loading">{resp}</p>
      </center>
    </div>
  )
}

export default LoginPage
