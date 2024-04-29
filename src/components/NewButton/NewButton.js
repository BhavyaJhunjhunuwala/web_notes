import React,{useState} from "react";
import { useNavigate ,useSearchParams} from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {Button,ButtonGroup,} from '@mui/material'
import OutputIcon from '@mui/icons-material/Output';
import './NewButt.css'
import SortIcon from '@mui/icons-material/Sort';
import axios from 'axios'
function NewButt({socket}){
  const [searchParams, setSearchParams] = useSearchParams();
    const navigate=useNavigate()
    const [New,setNew]=useState("New Note")
    const current=new Date()
    const AddNote=async ()=>{
      const NoteData={
        Phone:searchParams.get("Phone"),
        Visibilty:"Private",
        Text:"Add your Text Here"
        }
      setNew("Creating...")
      axios.post('http://localhost:3001/new',NoteData)
      setNew("New Note")

        }
        const LogOut=()=>{
          sessionStorage.clear()
          navigate('/login')

        }
    return <>
    <div className="Newbutton-container">
    <Button className="shadow" onClick={AddNote} startIcon={<AddCircleIcon />} >
      {New}</Button>
    <Button className="shadow"    onClick={AddNote} startIcon={<SortIcon />} >
      Sort</Button>
      <Button className="shadow"  color="error"  startIcon={<OutputIcon />} onClick={LogOut}>Log Out</Button>
      </div>
      </>
}
export default NewButt;