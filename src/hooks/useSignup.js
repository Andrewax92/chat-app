import { useState, useEffect } from "react"
import { auth, storage, db } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { doc, setDoc } from 'firebase/firestore'


export const useSignup = () => {

    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName, thumbnail) => {

        setError(null)
        setIsPending(true)

        try {

            const response = await createUserWithEmailAndPassword(auth, email, password)


            if (!response) {

                throw new Error("Could not complete signUp")
            }
            // console.log("Response is", response);
            // dispatch login action



            // upload user thumbnail
            const uploadPath = `thumbnails/${response.user.uid}/${thumbnail.name}`
            const storageRef = ref(storage, uploadPath)

            const img = await uploadBytes(storageRef, thumbnail)
            const imgUrl = await getDownloadURL(img.ref)

            // create a user document

            await setDoc(doc(db, 'users', response.user.uid), {
                assignedProjects: [],
                online: true,
                displayName,
                photoURL: imgUrl,
                lastVisit: null
            })



            // add display name and phumbnail 
            await updateProfile(auth.currentUser, { displayName, photoURL: imgUrl })

            dispatch({ type: 'LOGIN', payload: response.user })


            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }

        } catch (error) {

            if (!isCancelled) {
                console.log(error);
                setIsPending(false)
                setError(null)
            }

        }

    }
    useEffect(() => {

        return () => setIsCancelled(true)


    }, [])
    return { error, isPending, signup }
}