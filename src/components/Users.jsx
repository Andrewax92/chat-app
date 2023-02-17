import "./Users.css"


import { useCollection } from "../hooks/useCollection"

import Avatar from "./Avatar"
import Conversation from "../pages/conversation/Conversation"
import { getDoc,setDoc,doc,updateDoc} from "firebase/firestore"
import { db } from "../firebase/config"
import { useAuthContext } from "../hooks/useAuthContext"
import { useContext} from "react"
import { ChatConext } from "../context/ChatContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const Users = () => { 

    const{chatUser,dispatch} = useContext(ChatConext)

    const{error,documents} = useCollection('users')
 
    const {user:currentUser} = useAuthContext()


   

 

  const handleSelect = async (user) => { 

      const combinedId = currentUser.uid > user.id ?
      currentUser.uid + user.id :
      user.id + currentUser.uid
    

      try {
       
        const res = await getDoc(doc(db,"chats",combinedId));

        if(!res.exists()){
          // Create a chat collection between 2 users
         await setDoc(doc(db, "chats", combinedId),{ messages:[]});
        }

        dispatch({type:"CHANGE_USER" , payload: user})

        await updateDoc(doc(db,"users",chatUser.id),{
          newMessageSent: false
        })
       
        
       } catch (error) {
        console.log(error.messages);
       }
      
    }
    console.log(chatUser);

  return (
    <>
    <div className="user-list">
        <h2>All Users</h2>
        <h5>click to chat:</h5>
    {error && <div className="error">{error}</div> }
    {documents && documents.map((user) => (
         user.id !== currentUser.uid && <div onClick={() => handleSelect(user)} key={user.id} className="user-list-item"> 
           { user.online && <span className="online-user"></span>}
           <div className="user-list-item_avatar">
             { user.newMessageSent && <span className="meesage-alert"></span>}
              <span>{user.displayName}</span>
             <Avatar src={user.photoURL}/> 
          </div>
             {user.lastVisit && <p>{`online: ${formatDistanceToNow(user.lastVisit.toDate(),{addSuffix:true})}`}</p>}
          </div>
          
    )) }
    </div>
    { chatUser &&  <Conversation  /> }
    </>
  )
}

export default Users
