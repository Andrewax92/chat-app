import './Messages.css'
import Message from './Message'





const Messages = ({data}) => {

 
  return (
    <div className="messages">
      { data && data.messages.map((m) => (
        <Message message={m}  key={m.id}/>
      ))}
    </div>
  )
}

export default Messages
