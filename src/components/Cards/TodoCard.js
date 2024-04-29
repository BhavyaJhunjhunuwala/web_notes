import React,{useEffect, useState} from "react";
import './Cards.css'
import axios from "axios";
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import GroupsIcon from '@mui/icons-material/Groups';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import {Button, ButtonGroup, IconButton, Tooltip,Dialog, TextField,Paper} from '@mui/material'
// import { useNavigate } from "react-router-dom";
import { format, render, cancel, register } from 'timeago.js'
import UndoIcon from '@mui/icons-material/Undo';
import PersonIcon from '@mui/icons-material/Person';
import { BlockPicker,CirclePicker,TwitterPicker } from "react-color";
import { width } from "@mui/system";
function TodoCards(props){
    var arr=["pink","#efa497","#abe1e1","#f2f5ac"]
    const [x,sex]=useState(2)
    const [DateTime,setDateTime]=useState(null)
    const [Heading,setHeading]=useState("")
    const [text,setText]=useState(`${props.Text}`)
    const [blockPickerColor, setBlockPickerColor] = useState(`${props.Color}`);
    const [Visiblity,setVisiblity]=useState(`${props.Format}`)
    const [VisiblityIcon,setVisiblityIcon]=useState()
    const [Refresh,setRefresh]=useState(0)
    const [edited,setEdited]=useState('none')
    const [Open,setOpen]=useState(false)
    const [disable,setDisable]=useState(false)
    const [Picker,setPicker]=useState(false)
    const [Delete,setDelete]=useState("Delete")
    const [update,setupdate]=useState("Update")
    const [Status,setStatus]=useState("Due")
    const [undo,setundo]=useState("Undo")
    function updation(e){
        setText(e)
        setEdited('flex')
    }
    function ChangeStatus(){

            setStatus("Completed")
    }
    useEffect(()=>{
        const date=new Date()
        console.log(props.status)
        var a=Date.parse(props.Time)
        var b=Date.parse(date)
        console.log(Date.parse(props.Time),Date.parse(date))
        if ( props.status==true){
            setStatus("Completed")
        }
        else if(a-b < 0){
            setStatus("Missed")
        }
    },[])

    async function FunUpdate(){
        setupdate("Updating..")
        setDisable(true)
        setPicker(false)
        let result = axios.put("http://localhost:3001/",{id:props.id,Color:blockPickerColor,Text:text,  Format:Visiblity,Phone:props.Phone})
        setEdited('none')
        props.socket.emit("Changed",{h:"huehue"})
        setDisable(false)
        setupdate("update")
    }
    async function TaskComplete(){
        setupdate("Updating..")
        setDisable(true)
        setPicker(false)
        let result = axios.put("http://localhost:3001/TaskComplete",{id:props.id,Phone:props.Phone})
        setEdited('none')
        props.socket.emit("Changed",{h:"huehue"})
        setDisable(false)
        setupdate("update")
        ChangeStatus()
    }
    async function FunDelete(key){
        const data={
            id:props.id,
            Phone:props.Phone,
        }
        setDisable(true)
        setDelete("Deleting..")
        setOpen(false)
        setPicker(false)
        axios.post("http://localhost:3001/DelTask",data)
        props.socket.emit("Changed",{h:"huehue"})
    }
    function FunColor(){
        setPicker(!Picker)
    }
    function FunVisi(){
        console.log(Visiblity)
        if(Visiblity==="Public"){
            setVisiblity("Private")
            setVisiblityIcon(<PersonIcon/>)
        }
        else{
            setVisiblity("Public")
            setVisiblityIcon(<GroupsIcon/>)
        }
    }
    return <Paper elevation={2} style={{"margin":"10px",backgroundColor:blockPickerColor,maxWidth:"50%",maxHeight:"200px",padding:"10px",width:"15vw"}}>
        <div className="Cards-Heading">
        <p className="Cards-Phone" ><b>{Status}</b></p>
        <p className="Cards-Time" style={{color:"green"}}><b>{format(props.Time)}</b></p>
        </div>
        
        <textarea disabled style={{textAlign:"center"}} className="TodoArea" spellCheck="false"  id='textArea'   defaultValue={props.Head}/>
        <textarea style={{fontSize:"15px"}}  disabled multiline rows={4} spellCheck="false" className="Cards-Text TodoArea" id='textArea'  defaultValue={props.Text}/>
        <div style={{width:'100%',display:'flex',flexWrap: 'wrap',justifyContent:'space-evenly'}}>
        {Status!="Completed" && <Tooltip title={update}><IconButton   color="primary" className="Cards-Update" disabled={disable} onClick={()=>setOpen(true)} ><BorderColorIcon/></IconButton></Tooltip>}
        {Status!="Completed" &&  <Tooltip title="Mark Complete"><IconButton   color="success" className="Cards-Update" disabled={disable} onClick={TaskComplete} ><CheckIcon/></IconButton></Tooltip>}
        {Status=="Completed" &&  <Tooltip title="Delete"><IconButton   color="error" className="Cards-Update" disabled={disable} onClick={FunDelete} ><DeleteIcon /></IconButton></Tooltip>}
        
        </div>
        {Picker && <TwitterPicker color={blockPickerColor} 
        onChange={(color) => {
            setBlockPickerColor(color.hex);
          }}
        />}



<Dialog
        open={Open}
        onClose={()=>setOpen(false)}
        sx={{
            "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                    width: "fit-content",
                    maxWidth: "40vw",  // Set your width here
                    height: "fit-content",
                    maxHeight: "60h"
                },
            },
        }}
        >
            <div className="Cards-Container" style={{backgroundColor:blockPickerColor}}>
        <div className="Cards-Heading">
        <p className="Cards-Phone" ><b>{Status}</b></p>
        <p className="Cards-Time" style={{color:"green"}}><b>{format(props.Time)}</b></p>
        </div>
        
        <textarea disabled style={{fontSize:"20px",textAlign:"center"}} spellCheck="false" className="Cards-Text" id='textArea'   defaultValue={props.Head}/>
        <textarea style={{fontSize:"15px"}} disabled multiline rows={4} spellCheck="false" className="Cards-Text" id='textArea' maxRows={4}  defaultValue={props.Text}/>
        <div style={{width:'100%',display:'flex',flexWrap: 'wrap',justifyContent:'space-evenly'}}>
        
        <Tooltip title={Delete}><IconButton  className="Cards-Buttons" disabled={disable}   onClick={event=> FunDelete(props.id)}  color="error"><DeleteIcon /></IconButton></Tooltip>
        <Tooltip><IconButton color="primary"  className="Cards-Button" onClick={()=>setOpen(false)}   ><CancelIcon/></IconButton></Tooltip></div>
        </div>
        {Picker && <TwitterPicker color={blockPickerColor} 
        onChange={(color) => {
            setBlockPickerColor(color.hex);
          }}
        />}
        
    
        </Dialog>
    
    </Paper>
}

export default TodoCards;