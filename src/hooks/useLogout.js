import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore"
import { auth, db } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {

    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    const { dispatch, user } = useAuthContext()

    const logout = async () => {
        setError(null)
        setIsPending(true)

        try {

            // update users online status
            const { uid } = user

            const docRef = doc(db, 'users', uid)

            await updateDoc(docRef, {
                online: false
            })


            await signOut(auth)

            // dispatch logout action
            dispatch({ type: "LOGOUT" })

            // update state 
            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }




        } catch (error) {
            if (!isCancelled) {
                console.log(error);
                setError(error.message)
                setIsPending(false)
            }

        }
    }

    useEffect(() => {

        return () => setIsCancelled(true)


    }, [])
    return { error, logout, isPending }
}