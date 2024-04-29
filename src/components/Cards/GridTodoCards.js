import React, { useEffect, useState } from "react";
import './Cards.css'
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { Button, Paper, IconButton, Tooltip, Grid, styled, Typography } from '@mui/material'
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { format } from 'timeago.js'
import TodoDialog from "./TodoDialog";
import { AuthContext } from "../../Context/AuthContext";
import { TaskContext } from "../../Context/TaskContext";
import BackendLink from "../../BackendLink";
const HoverPaper = styled(Paper)(({ theme }) => ({
    transition: theme.transitions.create('box-shadow'),
    '&:hover': {
      boxShadow: theme.shadows[8], // Adjust the elevation value as desired
    },
  }));
  
const TitleTypography = styled(Typography)(({ theme }) => ({

    fontSize: "small",
    textOverflow: "ellipsis",
    wordWrap: "nowrap",
    [theme.breakpoints.down('sm')]: {
        fontSize: "0.60em",
        textOverflow: "ellipsis",
        wordWrap: "normal",
        overflow: "hidden",
        whiteSpace: "nowrap"
    },
}));
const TextTypography = styled(Typography)(({ theme }) => ({

    fontSize: "small",
    textOverflow: "ellipsis",
    wordWrap: "normal",
    overflow: "hidden",

    [theme.breakpoints.down('sm')]: {
        fontSize: "0.45em",
        MaxWidth: "100%",
        textOverflow: "ellipsis",
        wordWrap: "normal",
        overflow: "hidden",
        whiteSpace: "nowrap"
    },
}));
const StyledButton = styled(IconButton)(({ theme }) => ({
    width: "2.5vw",
    [theme.breakpoints.down('sm')]: {
        width: "7vw"
    },
}));
export default function GridTodoCars(props) {
    const [Status, setStatus] = useState("Due")
    const [DialogController, setDialogController] = useState(false)
    const {User}=React.useContext(AuthContext)
    const {setTask}=React.useContext(TaskContext)
    useEffect(() => {
        const date = new Date()
        var a = Date.parse(props.Time)
        var b = Date.parse(date)
        if (props.status == true) {
            setStatus("Completed")
        }
        else if (a - b < 0) {
            setStatus("Missed")
        }
    }, [])
    async function TaskComplete() {
        try {
            let result = await axios.put(BackendLink+"/TaskComplete/"+User, { id: props.id})
            if(result.status==200){
                setStatus("Completed")
            }
        } catch (err) {
            console.log(err)
        }
    }
    async function FunDelete(key) {
        const data = {
            id: props.id,
        }
        let result=await axios.put(BackendLink+"/delTask/"+User, data)
        if(result.status==200){
            setTask(result.data.array.reverse())
        }

    }
    return (
        <HoverPaper
            elevation={3}
            sx={{width:"100%",cursor:"default"}}

        >
            <Grid container md={12} sx={{ background: "white" }} xs={12} p={0.5} m={0.5}>
                <Grid container md={12} xs={12} mb={1} item>
                    <Grid md={6} item xs={6} textAlign="left">
                        <TitleTypography sx={{ color: "rgb(146, 29, 29)", fontWeight: "bold", fontSize: "1vw" }}>{Status}</TitleTypography>
                    </Grid>
                    <Grid item md={6} xs={6} textAlign="right">
                        <TitleTypography sx={{ color: "green", fontWeight: "bold", fontSize: "1vw" }}>{format(props.Time)}</TitleTypography>
                    </Grid>
                </Grid>
                <Grid item xs={12} mb={1}>
                    <TitleTypography sx={{ fontSize: "1.2vw", color: "#1976d2" }}>{props.Head}</TitleTypography>
                </Grid>
                <Grid item xs={12} sx={{ maxHeight: "40%" }}>
                    <TextTypography className="truncate">{props.Text}</TextTypography>
                </Grid>
                <Grid container item xs={12} mt={0.5} md={12}>
                    <Grid item >
                        <Tooltip title="Expand"><StyledButton onClick={() => setDialogController(true)} color="primary" className="Cards-Update"  ><OpenInFullIcon sx={{ height: "100%", width: "100%" }} /></StyledButton></Tooltip>
                    </Grid>
                    {Status != "Completed" && <Grid item>
                        <Tooltip title="Mark Complete"><StyledButton color="success" className="Cards-Update" onClick={TaskComplete} ><CheckIcon sx={{ height: "100%", width: "100%" }} /></StyledButton></Tooltip>
                    </Grid>}
                    <Grid item>
                        <Tooltip title="Delete">
                            <StyledButton color="error" className="Cards-Update" onClick={FunDelete} ><DeleteIcon sx={{ height: "100%", width: "100%" }} /></StyledButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Grid>
            <TodoDialog props={props} Status={Status} User={User} setStatus={setStatus} setTask={setTask} setDialogController={setDialogController} DialogController={DialogController} />
        </HoverPaper>
    )
}

