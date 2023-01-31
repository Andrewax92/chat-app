import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore"
import { useEffect, useState, useRef } from "react"
import { db } from '../firebase/config'


export const useCollection = (collectionName, _queryColection, _orderByElements) => {

    const [documents, setDocument] = useState(null)
    const [error, setError] = useState(null)
    console.log(documents);
    // If we don't use a ref --> infinite loop in useEffect
    // _queryCollection is an array and is "different " on every function call

    const queryColection = useRef(_queryColection).current
    const orderByElements = useRef(_orderByElements).current


    useEffect(() => {

        let ref = collection(db, collectionName)

        if (queryColection) {
            ref = query(collection(db, collectionName), where(...queryColection))
        }
        if (orderByElements) {
            ref = query(collection(db, collectionName), where(...queryColection), orderBy(...orderByElements))
        }



        // const q = query(collection(db, "cities"), where("state", "==", "CA"));

        const unsubscribe = onSnapshot(ref, (snapshot) => {

            let results = []
            snapshot.docs.forEach((doc) => {

                results.push({ ...doc.data(), id: doc.id })
            })
            //    update state 
            setDocument(results)
            setError(null)
        }, (error) => {
            console.log(error);
            setError("Could not fetchData")
        })

        // unsubscribe on mount

        return () => unsubscribe()

    }, [collectionName, queryColection])

    return { documents, error }
}