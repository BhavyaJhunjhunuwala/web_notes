import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "./Context/AuthContext"
import { Backdrop, CircularProgress } from "@mui/material"
export default function ProtectedRoutes({ Component }) {
    const navigate = useNavigate()
    const { User, Loading, setLoading } = React.useContext(AuthContext)
    if (Loading) {
        return (
            <Backdrop
            sx={{ color: '#0000', zIndex: (theme) => theme.zIndex.drawer + 1, background: "white" }}
            open={Loading}
            >
            <CircularProgress sx={{color:"#047BD5"}} />
        </Backdrop>
    )
    }
    else if(!User){
        navigate("/login")
        return
    }
    return (
        <>{Component}</>
    )
}