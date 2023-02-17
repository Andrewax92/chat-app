import {useContext,useState} from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { ChatConext } from '../context/ChatContext'
import { updateDoc,doc,arrayUnion,Timestamp } from 'firebase/firestore'
import {v4 as uuid} from 'uuid'
import { db } from '../firebase/config'

import './Input.css'

const Input = () => {

  const{chatId,chatUser} = useContext(ChatConext)
  const{user} = useAuthContext()
  const[text,setText] = useState('')
  const[pending,setPending] = useState(false)
  const[setError] = useState(null)


  const handleClick = async () => {
     
    setPending(true)
    try {
      await updateDoc(doc(db,'chats',chatId),{
        messages:arrayUnion({
         id: uuid(),
         text,
         senderId: user.uid,
         date: Timestamp.now(),
        })
        // const docRef = doc(db,"users",chatUser.id
      })
   
     await updateDoc(doc(db,"users",user.uid),{
        newMessageSent: true
      })
     setText('')
     setPending(false)
    } catch (error) {
    setError(error.message)
    setPending(false)
  }
}
  return (
    <div className='input'>
      <input type="text" 
       placeholder="Type something ..."
       onChange={(e) => setText(e.target.value)}
       value={text}/>
      <div className="send">

        {!pending &&  <button onClick={handleClick}>Send</button> } 
        {pending &&  <button onClick={handleClick} disabled >Send</button> } 
      </div>
      
    </div>
  )
}

export default Input
