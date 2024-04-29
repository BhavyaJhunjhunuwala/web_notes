import React, { useState, useEffect } from "react";

import { Button, Tooltip, TextField, styled, Dialog, Typography, Grid, CircularProgress } from '@mui/material'
import { useNavigate, useSearchParams } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';

import axios from 'axios'

import { TaskContext } from "../../Context/TaskContext";
import GridTodoCards from "../Cards/GridTodoCards";
import { AuthContext } from "../../Context/AuthContext";
import BackendLink from "../../BackendLink";

const currentDateTime = new Date().toISOString().slice(0, 16);

const StyledButton = styled(Button)(({ theme }) => ({

  minWidth: "0px",
  [theme.breakpoints.down('sm')]: {
    width: "8vw",
    MaxWidth: "100%",
    whiteSpace: "nowrap"
  },
}));
const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: "small",
  [theme.breakpoints.down('sm')]: {
    fontSize: "1.4vw"
  },
}))



export default function Todo() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate()
  const { User } = React.useContext(AuthContext)
  const [DateTime, setDateTime] = useState(null)
  const [Heading, setHeading] = useState("")
  const [Query, setQuery] = useState(searchParams.get("query") ? searchParams.get("query") : "")
  const [text, setText] = useState('')
  const [arr, setArray] = useState([])
  const [Open, setOpen] = useState(false)
  const { Task, setTask, setAllTask, AllTask } = React.useContext(TaskContext)
  const current = new Date()
  const AddNote = async () => {
    const data = {
      Head: Heading,
      Text: text,
      Format: "Personal",
      DateTime: DateTime,

    }
    let result = await axios.post(BackendLink + '/NewTask/' + User, data)
    var array_Reversed = result.data.Todo
    array_Reversed.reverse()
    setTask(array_Reversed)
    setOpen(false)
    setArray(array_Reversed)
  }
  useEffect(() => {
    async function getData() {
      const result = await axios.get(BackendLink + "/Task/" + User)
      var array_Reversed = result.data.err.reverse()
      setAllTask(array_Reversed)
      if (searchParams.get("query")) {
        setTask(array_Reversed.filter((ele) => ele.TodoText.toLowerCase().includes(Query.toLowerCase()) || ele.TodoHeading.toLowerCase().includes(Query.toLowerCase())))
      } else {
        setTask(array_Reversed)
      }
    }
    getData();
  }, [])
  const FilterTask = () => {
    setSearchParams({ "query": Query })
    setTask(AllTask.filter((ele) => ele.TodoText.toLowerCase().includes(Query.toLowerCase()) || ele.TodoHeading.toLowerCase().includes(Query.toLowerCase())))
  }
  const ClearSearch = () => {
    setSearchParams({ "query": "" })
    setQuery("")
    setTask(AllTask)
  }
  return (<>
    <head>
      <title>Task-WebNotes-Notes and Task Manager</title>
    </head>
    <div className="RightHome">
      <input
        placeholder="Search Notes"
        className="NoteSearchQueryBox"
        onChange={(e) => setQuery(e.target.value)}
        value={Query}
      >

      </input>
      {Query.length != 0 && <StyledButton onClick={FilterTask} variant="contained"  ><StyledTypography>Search</StyledTypography></StyledButton>}
      {Query.length != 0 && <StyledButton onClick={ClearSearch} variant="contained" color="error" ><StyledTypography>Clear</StyledTypography></StyledButton>}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        marginBottom: "10px"
      }}>
        <div>
          <StyledButton sx={{ minWidth: "0px" }} size="small" variant={!(searchParams.get("format") == "work" || searchParams.get("format") == "personal") ? "contained" : "text"}  ><StyledTypography>All</StyledTypography></StyledButton>
          {/* <StyledButton size="small" onClick={() => ChangeQuery("personal")} variant={searchParams.get("format") == "personal" ? "contained" : "text"} ><StyledTypography>Personal</StyledTypography></StyledButton>
        <StyledButton size="small" onClick={() => ChangeQuery("work")} variant={searchParams.get("format") == "work" ? "contained" : "text"}><StyledTypography>Work</StyledTypography></StyledButton> */}
        </div>
        <StyledButton size="small" style={{ justifyContent: "flex-start" }} onClick={() => setOpen(true)} startIcon={<AddCircleIcon />} >
          <StyledTypography>Add Notes</StyledTypography></StyledButton>

      </div>
      {!Task && <div style={{ width: "100%", height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}> <CircularProgress color="primary" /></div>}
      {Task && Task.length == 0 && <h3 style={{ width: "100%", height: '100%', margin: 'auto', textAlign: 'center', color: "#1976d2" }}>Click on Add task to schedule a task</h3>}
      <Grid container spacing={2} className="Home-Grid">
        {Task && Task.map((e) => <Grid md={3} xs={6} item><GridTodoCards key={e._id} id={e._id} Format={e.Format} Phone={searchParams.get("Phone")} Name={searchParams.get("Name")} Text={e.TodoText} status={e.Status} Time={e.Time} Color={e.Color} Head={e.TodoHeading} /></Grid>)}
      </Grid>


      <Dialog
        open={Open}
        onClose={() => setOpen(false)}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "fit-content",
              maxWidth: "75vw",  // Set your width here
              height: "fit-content",
              maxHeight: "60h"
            },
          },
        }}
      >
        <div className="Cards-Container2" style={{ margin: "0px" }}>
          <div className="Cards-Heading">
            <h2 style={{ width: "100%", textAlign: "center" }} ><b>Create New Task</b></h2>

          </div>
          <p>
            <TextField
              fullWidth
              label="Enter Heading"
              onChange={(e) => setHeading(e.target.value)}
            />
          </p>
          <TextField
            id="filled-multiline-static"
            label="Enter description"
            fullWidth
            multiline
            rows={4}
            onChange={(e) => setText(e.target.value)}
            variant="filled"
          />
          <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
            <TextField placeholder="Enter Heading" type="datetime-local"
              inputProps={{
                min: currentDateTime
              }}
              onChange={(e) => setDateTime(e.target.value)}
            />
            <Tooltip title="Create"><Button className="Cards-Buttons" onClick={AddNote} color="success" startIcon={<DeleteIcon />} > Create</Button></Tooltip>

            <Button startIcon={<CancelIcon />} className="Cards-Button" onClick={() =>
              setOpen(false)}  >Cancel</Button>
          </div>


        </div>
      </Dialog>
    </div>
  </>)
}