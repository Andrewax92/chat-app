import { createContext, useReducer } from "react";

import { useAuthContext } from "../hooks/useAuthContext";

export const ChatConext = createContext()



export const ChatContextProvider = ({ children }) => {
    const { user } = useAuthContext()

    const chatReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    chatUser: action.payload,
                    chatId: user.uid > action.payload.id ?
                        user.uid + action.payload.id :
                        action.payload.id + user.uid,
                    displayChat: true,

                }
            case "CLOSE_CHAT_CONVERSATION":
                return {
                    chatUser: null,
                    displayChat: false
                }
            default:
                return state;
        }

    }


    const [state, dispatch] = useReducer(chatReducer, {
        chatUser: null,
        displayChat: false,

    })



    return (
        <ChatConext.Provider value={{ ...state, dispatch }}>
            {children}
        </ChatConext.Provider>
    )

}