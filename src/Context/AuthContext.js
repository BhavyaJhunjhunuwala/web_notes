import {createContext ,useEffect,useState} from "react";
import axios from "axios";
import BackendLink from "../BackendLink";
const AuthContext=createContext()

function AuthState({children}) {
    const [User,setUser]=useState(null)
    const [Loading,setLoading]=useState(true)
    useEffect(()=>{
        if (localStorage.getItem("WebNotesUser")) {
            axios
              .get(BackendLink+"/auth/user/"+localStorage.getItem("WebNotesUser"))
              .then(res =>{
                if(res.status==200){
                    setUser(res.data.id)
                }
                setLoading(false)
              } )
              .catch(err => console.error(err));
        } else {
            setLoading(false)
        }
    },[])
    return(
        <AuthContext.Provider value={{User,setUser,Loading,setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthState,AuthContext}