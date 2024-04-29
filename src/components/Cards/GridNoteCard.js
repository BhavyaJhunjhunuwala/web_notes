import { Grid, IconButton, Tooltip, Typography,styled,Paper } from "@mui/material"
import { format} from 'timeago.js'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { useState } from "react";
import NotesDialog from "./NotesDialog";
const HoverPaper = styled(Paper)(({ theme }) => ({
    transition: theme.transitions.create('box-shadow'),
    '&:hover': {
      boxShadow: theme.shadows[8], 
    },
  }));
const TitleTypography = styled(Typography)(({ theme }) => ({
  
    fontSize:"small",
    textOverflow:"ellipsis",
    wordWrap:"nowrap",
    [theme.breakpoints.down('sm')]: {
      fontSize:"0.55em", 
      textOverflow:"ellipsis",
    wordWrap:"normal",
    overflow:"hidden",
    whiteSpace:"nowrap"
    },
  }));
const TextTypography=styled(Typography)(({ theme }) => ({
  
    fontSize:"small",
    [theme.breakpoints.down('sm')]: {
      fontSize:"0.40em", 
      MaxWidth:"100%"
    },
  }));
const StyledButton=styled(IconButton)(({theme})=>({
    width:"2.5vw",
    [theme.breakpoints.down('sm')]: {
        width:"7vw"
      },
     }));
export default function GridCard(props) {
    const [DialogController,setDialogController]
    =useState(false)

   


    return (
        <HoverPaper
        elevation={3}
        >
        <Grid className="Cards-Container" container  md={12} sx={{ background: "white" }}>
            <Grid item md={12} container >
                <Grid item md={6} xs={6}>
                    <TitleTypography sx={{ color: "red" }}>{props.Format}
                    </TitleTypography>
                </Grid>
                <Grid item md={6} xs={6}>
                    <TitleTypography  sx={{ color: "green" }}>{format(props.Time)}
                    </TitleTypography>
                </Grid>
            </Grid>
            <Grid item md={12} xs={12}>
                <TextTypography sx={{fontSize:"small",height:"10vh"}} className="truncate">
                    {props.Text}
                </TextTypography>
            </Grid>
            <Grid md={12}>
                <Tooltip title="update">
                    <StyledButton onClick={()=>setDialogController(true)} color="primary">
                        <OpenInFullIcon sx={{width:"100%",height:"100%"}} />
                    </StyledButton>
                </Tooltip>
            </Grid>
        <NotesDialog props={props} DialogController={DialogController} setDialogController={setDialogController}/>
        </Grid>
        </HoverPaper>
    )
}