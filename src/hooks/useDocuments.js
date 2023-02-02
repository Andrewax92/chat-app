import { useEffect, useState } from "react"
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";


const useDocuments = (collectionName, projectId) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)


    useEffect(() => {
        const unsub = onSnapshot(doc(db, collectionName, projectId), (doc) => {

            if (doc.data()) {
                console.log("Current data: ", doc.data());
                setDocument({ ...doc.data(), id: doc.id })
                setError(null)
            } else {
                setError("no such document exist")
            }

        }, (err) => {
            console.log(err.message);
            setError("failed to get document")
        });

        return () => unsub()
    }, [collectionName, projectId])

    return { document, error }

}
export default useDocuments
