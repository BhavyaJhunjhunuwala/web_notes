import React, { useState } from 'react'
import './NewCard.css'
import axios from 'axios'
import {Typography,Button,ButtonGroup} from '@mui/material'
import { useNavigate } from 'react-router-dom'

function NewNote(){
    const navigate=useNavigate()
    const [text,setText]=useState("")
    const current=new Date()
    const NoteData={
        Phone:sessionStorage.getItem("CurrentUser"),
        Time:`${current.getHours()%12}:${current.getMinutes()}||${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`,
        Text:text,
        Visibilty:"Public"
    }
    const AddNote=async ()=>{
        let result =axios.post('http://localhost:3001/new',NoteData)
        GoBack()
    }
    const GoBack=async ()=>{
        navigate(-1)
    }

    return <div className='NewCard-Container'>
        <Typography className='NewCard-Heading' variant='h3' color='white'>New Note</Typography>
        <textarea className='new-area' rows={15} cols={33} value={text} onChange={(e)=>setText(e.target.value)} border='transparent'></textarea>
        <ButtonGroup className='NewCard-Cp'> <Button sx={{m:2}} onClick={AddNote} variant="contained" color='secondary'>Create</Button>
        <Button onClick={GoBack} variant="contained" sx={{m:2}} color='secondary'>Cancle</Button></ButtonGroup>
    </div>
}

export default NewNote;