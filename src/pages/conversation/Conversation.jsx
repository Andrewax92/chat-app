
import {AiOutlineCloseCircle} from 'react-icons/ai'
import Input from '../../components/Input'
import Messages from '../../components/Messages'
import './Conversation.css'
import useDocuments from '../../hooks/useDocuments'
import { useContext } from 'react'
import { ChatConext } from '../../context/ChatContext'


const Conversation = () => {

  const{chatId,dispatch,chatUser} = useContext(ChatConext)

  const {document:data} = useDocuments('chats',chatId)

  console.log(chatUser);
  

  const handleClick = () => {

    dispatch({type:"CLOSE_CHAT_CONVERSATION"})
    
  }

  return (
    
 
    <div className="chat" >
      <div className="chatInfo">
        <span>{chatUser.displayName}</span>
        < div className="chatIcon" onClick={() => handleClick()}>
           <AiOutlineCloseCircle  />
     </div>
      </div>
      <Messages data={data}  />
      <Input />
    </div>

  )
}

export default Conversation
