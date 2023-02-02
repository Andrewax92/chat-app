
import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, updateDoc } from 'firebase/firestore'
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {

    const [isCancelled, setIsCancelled] = useState(false)
    const [loginError, setLoginError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {

        setLoginError(null)
        setIsPending(true)

        try {

            const res = await signInWithEmailAndPassword(auth, email, password)

            const docRef = doc(db, 'users', res.user.uid)

            await updateDoc(docRef, {
                online: true
            })

            // dispatch login action
            dispatch({ type: "LOGIN", payload: res.user })

            // update state 
            if (!isCancelled) {
                setIsPending(false)
                setLoginError(null)
            }

        } catch (err) {

            if (!isCancelled) {

                setIsPending(false)
                setLoginError(err.message)

            }

        }
    }

    useEffect(() => {

        return () => setIsCancelled(true)


    }, [])

    return { loginError, login, isPending }
}