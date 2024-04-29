import React from "react";
import LeftHome from "../LeftHome.js/LeftHome";
import Todo from "../To-Do/Todo";
import { Grid } from "@mui/material";

const TodoPages=()=>{
    return(
        <Grid container height="100vh" sx={{background:"white"}} spacing={1}>
            <Grid item md={2} sm={3} xs={3}>
                <LeftHome/>
            </Grid>
            <Grid item md={10} sm={9} xs={9}>
                <Todo/>
            </Grid>
        </Grid>
    )
}
export default TodoPages