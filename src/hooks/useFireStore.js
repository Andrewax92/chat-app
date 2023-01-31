import { collection, addDoc, Timestamp, deleteDoc, doc } from "firebase/firestore";
import { useReducer, useEffect, useState } from "react";
import { db } from '../firebase/config'

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const reducer = (state, action) => {

    switch (action.type) {
        case 'IS_PENDING':
            return { isPending: true, document: null, success: false, error: null }

        case 'ADDED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'ERROR':
            return { isPending: false, document: null, success: false, error: action.payload }
        case 'DELETED_DOCUMENT':
            return { isPending: false, document: action.payload, success: false, error: null }
        default:
            return state
    }
}
export const useFireStore = (collectionName) => {

    const [state, dispatch] = useReducer(reducer, initialState)
    const [isCanceled, setIsCancelled] = useState(false)

    // collection ref

    const ref = collection(db, collectionName)

    // only dispatch if not cancelled

    const dispatchIfNotCancelled = (action) => {
        if (!isCanceled) {
            dispatch(action)
        }
    }

    // add a document 

    const addDocument = async (doc) => {

        dispatch({ type: 'IS_PENDING' })

        try {
            const createdAt = Timestamp.fromDate(new Date())
            const addedDocument = await addDoc(ref, { ...doc, createdAt })

            console.log("The added Document is", addedDocument);

            dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })

        } catch (error) {

            dispatchIfNotCancelled({ type: 'ERROR', payload: error })

        }
    }

    // delete a document

    const deleteDocument = async (id) => {

        dispatch({ type: 'IS_PENDING' })

        try {

            const deletedDocument = await deleteDoc(doc(db, 'transactions', id))

            dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT', payload: deletedDocument })

        } catch (error) {

            dispatchIfNotCancelled({ type: 'ERROR', payload: error.message })

        }

    }

    useEffect(() => {

        return () => setIsCancelled(true)
    }, [])

    return { addDocument, deleteDocument, state }
}