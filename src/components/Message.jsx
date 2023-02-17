import "./Message.css"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from "../hooks/useAuthContext";
import { useContext,useEffect,useRef } from "react";
import { ChatConext } from "../context/ChatContext";
const Message = ({message}) => {
  const {user} = useAuthContext()
  const{chatUser} = useContext(ChatConext)
  const ref = useRef()

 useEffect(() => {
     ref.current?.scrollIntoView({behavior: "smooth"})
 },[])
  // console.log(data);
  return (
    <div 
    ref = {ref}
    className={`message ${message.senderId === user.uid && "owner"}`}>
        <div className="messageInfo">
            <img src={message.senderId === user.uid ? user.photoURL : chatUser.photoURL} alt="userPhoto" />
            {message.date && <span>{`${formatDistanceToNow(message.date.toDate(),{addSuffix:true})}`}</span>}
        </div>
          <div className="messageContent">
              <p>{message.text}</p>
          </div>
      
    </div>
  )
}

export default Message
