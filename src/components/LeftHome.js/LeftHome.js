import React, { useState } from "react";
import { useNavigate, useSearchParams,useLocation } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button,Styled, Grid, Typography, styled } from '@mui/material'
import OutputIcon from '@mui/icons-material/Output';
import ArticleIcon from '@mui/icons-material/Article';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import BallotIcon from '@mui/icons-material/Ballot';

const LogoTypography=styled(Typography)(({theme})=>({

  fontSize:"3vw",
  [theme.breakpoints.down('sm')]: {
    fontSize:"5vw"
  },

}))
const handleLogout=()=>{
  localStorage.removeItem("WebNotesUser")
  window.location.reload()
}
const StyledButton=styled(Button)(({theme})=>({
    width:"5vw"
}))
const StyledTypography=styled(Typography)(({theme})=>({
    fontSize:"small",
    [theme.breakpoints.down('sm')]: {
    fontSize:"0.5em"
  },
}))
export default function LeftHome() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation()
  const navigate = useNavigate()
  const [New, setNew] = useState("New Note")
  const [selected, setSelected] = useState(1)
  const pathSegments = location.pathname.split('/');
  const [, path] = pathSegments;
  return <Grid container columnGap={0}  alignItems="flex-start" sx={{background:"#1976d2",gap:0,width:"auto",height:"100%"}} >
    <Grid item>
    <Grid item container md={12} mb={3}>
      <LogoTypography align="center" className="heading" mt={0} >WebNotes</LogoTypography>
    </Grid>
  
      <Grid item md={12}>
        <Button onClick={()=>navigate("/notes")} size="small" style={{ color: "white", margin: "3px", justifyContent: "flex-start" }} startIcon={<AddCircleIcon />} endIcon={path=="notes" ? <ArrowRightIcon /> : ""} >
          <StyledTypography>Notes</StyledTypography>
          </Button>
      </Grid>
      <Grid item md={12}>
        <Button onClick={()=>navigate("/task")} size="small" style={{ color: "white", margin: "3px", justifyContent: "flex-start" }} startIcon={<AddCircleIcon />} endIcon={path=="task" ? <ArrowRightIcon /> : ""} >
          <StyledTypography>Task</StyledTypography>
          </Button>
      </Grid>
   
      <Grid item md={12}>
        <Button onClick={handleLogout} size="small" style={{ color: "white", margin: "3px", justifyContent: "flex-start" }} color="error" startIcon={<OutputIcon  />}><StyledTypography>Log Out</StyledTypography></Button>
    </Grid>
    </Grid>
  </Grid>
}