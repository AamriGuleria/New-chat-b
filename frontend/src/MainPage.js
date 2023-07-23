import React,{ useEffect, useState,useSearchParams } from 'react'
import {Link} from "react-router-dom"
import './index.css'
const MainPage = (props) => {
    const [msg, setmsg] = useState("");
    const [chats, setchats] = useState([]);
    const [type, settype] = useState(false);
    const searchParams = new URLSearchParams(document.location.search)
    var ans="";
    const chat = async (e,msg) => {
      e.preventDefault();
      settype(true)
      let msgs=chats;
      msgs.push({role:searchParams.get('name'),content:msg})
      setchats(msgs);
     fetch("http://localhost:8000/main", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "content":`${msg}`,
        }),
      })
      .then((response) => response.json())
        .then((data) => {
          ans=ans+data.content;
          if(data.content!==""){
            msgs.push({role:"Bot",content:ans})
            setchats(msgs);
            settype(false);
          }
          else{
            msgs.push({role:"Bot",content:"sorry coudn't get it."})
            setchats(msgs);
            settype(false);
          }
          console.log(chats);
          ans=""
        })
        .catch((error) => {
          setchats([...chats,{role:"Bot",content:"Could not receive the correct data.Please try login again"}]);
          settype(true)
          console.log(error)
        });
      setmsg("");
      }
    
    return (
      <>
      <div className="App">
        <div className="Navbar">
          <div className='heading'>
            <p>Chat-bot</p>
          </div>
          <div className='contents'>
            <Link to="/" className="back"><p>Login</p></Link>
            <Link to="/about" className="about"><p>About</p></Link>
          </div>
        </div>
            <>
            <div className="form_and_type">
              <div className="your-chats">
          {
              chats.map((ele,ind)=>{
                  return(
                    <>
                    <center>
                    <div key={ind} className={ele.role === "Bot" ? "bot" : "user"}>
                    <p className="role"><img src={ele.role==="Bot"?"https://cdn.pixabay.com/photo/2020/01/13/08/17/robot-4761857_1280.png":"https://cdn.pixabay.com/photo/2022/03/27/23/57/woman-7096290_1280.png"} className="image-icon"/></p>
                    <p className="content">{ele.content}</p>
                  </div>
                  </center>
                  </>
                  )
              })
          }
          </div>
          </div>
              </>
              <div className={type?"hide":"form"}>
              <form onSubmit={e => {chat(e, msg)}}>
                <input type="text" className="inp-msg" name="msg" value={msg} placeholder="type your message..." onChange={e => setmsg(e.target.value)}/>
              </form>
            </div>
      </div>
  </>
    );
}

export default MainPage
