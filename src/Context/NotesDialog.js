import { createContext } from "react";
const NotesContext=createContext()

export default function NotesState({children}) {
    const [Dialog,setNotes]=useState(null)
    return(
        <NotesContext.Provider value={{Notes}}>
            {children}
        </NotesContext.Provider>
    )
}