import React, { useEffect, useState } from "react";
import { Dialog, Tooltip, IconButton, styled, Grid, Typography } from "@mui/material";
import { format } from 'timeago.js'
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';

import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import BackendLink from "../../BackendLink";

const StyledButton = styled(IconButton)(({ theme }) => ({
    width: "3vw",
    [theme.breakpoints.down('sm')]: {
        width: "7vw"
    },
}));
const StyledTypography = styled(Typography)(({ theme }) => ({
    fontSize: "1em",
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.55em', // Font size for smaller screens
        lineHeight: "10px",
    },
}));
const StyledTitleTypography=styled(Typography)(({theme})=>({
    fontSize:"1em",
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.55em', // Font size for smaller screens
        lineHeight:"10px"
      },
     }));
export default function TodoDialog({ props, DialogController, setDialogController, Status, setTask, User, setStatus }) {
    async function TaskComplete() {
        try {
            let result = await axios.put(BackendLink+"/TaskComplete/" + User, { id: props.id })
            if (result.status == 200) {
                setStatus("Completed")
            }
        } catch (err) {
            console.log(err)
        }
    }
    async function FunDelete() {
        const data = {
            id: props.id,
        }
        let result = await axios.put(BackendLink+"/delTask/" + User, data)
        if (result.status == 200) {
            setTask(result.data.array.reverse())
        }

    }
    return (
        <Dialog
            open={DialogController}
            onClose={() => setDialogController(false)}
            sx={{
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        width: "fit-content",
                        maxWidth: "60vw",  // Set your width here
                        height: "fit-content",
                        maxHeight: "60vh"
                    },
                },
            }}
        >
            <Grid className="Cards-Container" justifyContent="space-between" alignItems="space-between" container rowSpacing={1} md={12} xs={12} >
                <Grid md={12} xs={12} item className="Cards-Heading">
                    <Grid item md={6} xs={6}>
                        <StyledTitleTypography color="success" sx={{fontWeight:"bold",color:"green"}} >
                        {Status}
                        </StyledTitleTypography>
                        </Grid>
                    <Grid textAlign="right" item md={6} xs={6}>
                        <StyledTitleTypography    sx={{fontWeight:"bold"}} color="error">

                        {format(props.Time)}
                        </StyledTitleTypography>
                        </Grid>
                </Grid>
                <Grid item md={12} xs={12}>
                    <StyledTypography  className="Cards-Text" >{props.Head}</StyledTypography>
                </Grid>
                <Grid item md={12} xs={12}>
                    <StyledTypography className="Cards-Text"  >{props.Text}</StyledTypography>
                </Grid>
                <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>

                    {Status != "Completed" &&
                        <Tooltip title="Mark Complete"><StyledButton color="success" className="Cards-Update" onClick={TaskComplete} ><CheckIcon sx={{ height: "100%", width: "100%" }} /></StyledButton></Tooltip>}

                    <Tooltip title="Delete Task"><StyledButton className="Cards-Buttons" onClick={event => FunDelete()} color="error"><DeleteIcon sx={{ height: "100%", width: "100%" }} /></StyledButton></Tooltip>
                    <Tooltip><StyledButton  color="primary" className="Cards-Button" onClick={() => setDialogController(false)}   ><CancelIcon sx={{ height: "100%", width: "100%" }}/></StyledButton></Tooltip></div>
            </Grid>



        </Dialog>
    )
}