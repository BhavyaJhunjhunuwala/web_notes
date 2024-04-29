import {createContext ,useState} from "react";
const NotesContext=createContext()

function NotesState({children}) {
    const [Notes,setNotes]=useState(null)
    const [AllNotes,setAllNotes]=useState(Notes)

    

    return(
        <NotesContext.Provider value={{Notes,setNotes,AllNotes,setAllNotes}}>
            {children}
        </NotesContext.Provider>
    )
}

export {NotesContext,NotesState}