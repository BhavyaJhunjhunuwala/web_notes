import { Dialog, Grid, TextField, Typography, IconButton,Tooltip,styled } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import { format} from 'timeago.js';
import GroupsIcon from '@mui/icons-material/Groups';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import {TwitterPicker } from "react-color";
import React,{ useState,useContext } from "react";
import axios from "axios"
import { NotesContext } from "../../Context/NotesContext";
import { AuthContext } from "../../Context/AuthContext";
import BackendLink from "../../BackendLink";

const StyledButton=styled(IconButton)(({theme})=>({
    width:"2.75vw",
    [theme.breakpoints.down('sm')]: {
        width:"7vw"
      },
     }));
const StyledTextfield=styled(TextField)(({theme})=>({
    '& .MuiInputBase-input': {
        fontSize: 'small', // Font size for medium and larger screens
    
        [theme.breakpoints.down('sm')]: {
          fontSize: '0.5em', // Font size for smaller screens
        },
      },
     }));
const StyledTypography=styled(Typography)(({theme})=>({
    fontSize:"1em",
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.55em', // Font size for smaller screens
        lineHeight:"10px"
      },
     }));
export default function NotesDialog({ props, 
DialogController, setDialogController }) {
    const {User} = React.useContext(AuthContext)
    const [NotesFormat, setNotesFormat] = useState(props.Format)
    const [NotesText, setNotesText] = useState(props.Text)
    const [Picker, setPicker] = useState(false)
    const [VisiblityIcon, setVisiblityIcon] = useState(NotesFormat == "Public" ? <GroupsIcon sx={{height:"100%",width:"100%"}} /> : <PersonIcon sx={{height:"100%",width:"100%"}} />)
    const [blockPickerColor, setBlockPickerColor] = useState("#FFFFFF")
    const {Notes,setNotes,AllNotes,setAllNotes}=useContext(NotesContext)
    async function UpdateNote(){
        setPicker(false)
        try{
        let result = await axios.put(BackendLink+"/note/update/"+User,{id:props.id,Color:blockPickerColor,Text:NotesText,  Format:NotesFormat})
        if (result.status===200){
            setNotes(result.data.reverse())
            setAllNotes(result.data.reverse())
        }
        }catch(err){
            console.log(err)
        }

    }
    async function DeleteNote(){
        try{
        const data={
            id:props.id,
        }
        setPicker(false)
        let result=await axios.post(BackendLink+"/notes/delete/"+User,data)
        const UpdatedNotes=result.data
        setNotes(UpdatedNotes.reverse())
        setAllNotes(UpdatedNotes.reverse())
        }catch(err){
            console.log(err)
        }
    }
    function ChangeVisiblity(){
        if(NotesFormat==="Work"){
            setNotesFormat("Personal")
            setVisiblityIcon(<PersonIcon sx={{height:"100%",width:"100%"}}/>)
        }
        else{
            setNotesFormat("Work")
            setVisiblityIcon(<GroupsIcon sx={{height:"100%",width:"100%"}}/>)
        }
    }
    return (
        <Dialog
            open={DialogController}
            onClose={() =>setDialogController(false)}
            sx={{
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        width: "fit-content",
                        height: "fit-content",
                        maxHeight: "70vh",
                        maxWidth:"70vh"
                    },
                },
            }}
        >
            <Grid className="Cards-Container" justifyContent="space-between" alignItems="space-between" container spacing={2} md={12} >
                <Grid item md={12} container >
                    <Grid item md={6} xs={6}>
                        <StyledTypography sx={{ color: "red" }}>{NotesFormat}
                        </StyledTypography>
                    </Grid>
                    <Grid textAlign="right" item xs={6} md={6}>
                        <StyledTypography value={NotesText} sx={{ color: "green" }}>{format(props.Time)}
                        </StyledTypography>
                    </Grid>
                </Grid>
                <Grid item md={12} xs={12}>
                    <StyledTextfield sx={{
              maxHeight: 'calc(70vh - 15vw)',
              minHeight: '10vw',
              width: '100%',
              overflowY: 'hidden',
            }} variant="standard" 
                    fullWidth 
                    multiline
                    InputProps={{ disableUnderline: true }}
                    spellCheck={false}
                    value={NotesText}
                    onChange={(e)=>setNotesText(e.target.value)}
                    className="DialogTruncate" />
                </Grid>
                <Grid item container justifyContent="space-around" md={12}>
                    <Tooltip title="Update">
                        <StyledButton onClick={UpdateNote} color="primary">
                            <BorderColorIcon sx={{height:"100%",width:"100%"}} />
                        </StyledButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <StyledButton onClick={DeleteNote} color="primary">
                            <DeleteIcon sx={{height:"100%",width:"100%"}} />
                        </StyledButton>
                    </Tooltip>
                    <Tooltip title={NotesFormat}>
                        <StyledButton onClick={ChangeVisiblity} color="primary">
                            {VisiblityIcon}
                        </StyledButton>
                    </Tooltip>
                    {/* <Tooltip title="Color">
                        <StyledButton onClick={()=>setPicker(!Picker)} color="primary">
                            <FormatColorTextIcon sx={{height:"100%",width:"100%"}}/>
                        </StyledButton>
                    </Tooltip> */}
                    <Tooltip title="Cancle">
                        <StyledButton onClick={()=>setDialogController(false)} color="primary">
                            <CancelIcon sx={{height:"100%",width:"100%"}}/>
                        </StyledButton>
                    </Tooltip>

                </Grid>
                <Grid item md={12} textAlign="center">
                    {Picker && <TwitterPicker color={blockPickerColor}
                        onChange={(color) => {
                            setBlockPickerColor(color.hex);
                        }}
                    />}
                </Grid>
            </Grid>
        </Dialog>
    )
}