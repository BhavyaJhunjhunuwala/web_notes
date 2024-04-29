import React from "react";
import { Grid } from "@mui/material";
import LeftHome from "../LeftHome.js/LeftHome";
import RightHome from "../RightHome/RightHome";

const NotesPage=()=>{
    return (
        <Grid container sx={{height:"100vh",background:"white"}} spacing={1}>
            <Grid  item md={2} sm={3} xs={3}>
                <LeftHome/>
            </Grid>
            <Grid item md={10}  sm={9} xs={9}>
                <RightHome/>
            </Grid>
        </Grid>
    )
}
export default NotesPage