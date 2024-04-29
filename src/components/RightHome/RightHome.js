import React, { useState, useEffect } from "react";
import { Button, styled, Grid, Typography, CircularProgress } from '@mui/material'
import { useNavigate, useSearchParams } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import GridCard from "../Cards/GridNoteCard";
import BackendLink from "../../BackendLink";
import axios from 'axios'
import { NotesContext } from "../../Context/NotesContext";
import { AuthContext } from "../../Context/AuthContext";
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
export default function RightHome() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [Notes, setNotes] = useState([])
  const [Query, setQuery] = useState(searchParams.get("query") ? searchParams.get("query") : "")
  const {AllNotes, setAllNotes } = React.useContext(NotesContext)
  const [Loader, setLoader] = useState(true)
  const current = new Date()
  const { User } = React.useContext(AuthContext)
  const AddNote = async () => {
    const NoteData = {
      Text: "Add your Text Here"
    }
    var array_Reversed = []
    let result = await axios.post(BackendLink + '/new/' + User, NoteData)
    if (result.status == 200) {

      setNotes(result.data.Notes.reverse())
      setAllNotes(result.data.Notes.reverse())

    }
  }


  const ClearSearch = () => {
    setQuery("")
    const currentQuery = new URLSearchParams(searchParams);
    currentQuery.set('query', "");
    setSearchParams(currentQuery.toString());
    const Format = searchParams.get("format")
    let filteredNotes = AllNotes;
    if (Format == "personal") {
      filteredNotes = AllNotes.filter(note => note.Format == "Personal")
    }
    if (Format == "work") {
      filteredNotes = AllNotes.filter(note => note.Format == "Work")
    }
    setNotes(filteredNotes)
  }
  useEffect(() => {

    async function getData() {
      const query = searchParams.get("query");
      const lowercaseQuery = query ? query.toLowerCase() : null;
      const result = await axios.get(BackendLink + "/getnotes/" + User)
      var array_Reversed = result.data.Notes
      array_Reversed.reverse()
      setAllNotes(array_Reversed)
      if (searchParams.get("format")) {
        if (searchParams.get("format") === "Personal") {
          array_Reversed = array_Reversed.filter(note => note.Format == "Personal")
         
        }
        else if (searchParams.get("format") === "Work") {
          array_Reversed = array_Reversed.filter(note => note.Format === "Work")
        }
        if (lowercaseQuery) {
          array_Reversed = array_Reversed.filter(note => note.NoteText.toLowerCase().includes(lowercaseQuery))
        }
        setNotes(array_Reversed)
      }
      else {
        setNotes(array_Reversed)
      }
      // console.log(AllNotes,Notes)

    }
    getData();
    setLoader(false)
  }, [])

  useEffect(()=>{
    setNotes(AllNotes)
  },[AllNotes])

  const filterNotes = () => {
    const currentQuery = new URLSearchParams(searchParams);
    currentQuery.set('query', Query);
    setSearchParams(currentQuery.toString());

    setNotes(Notes.filter(note => note.NoteText.toLowerCase().includes(Query.toLowerCase())))

  }

  function ChangeQuery(Format) {
    const query = searchParams.get("query");
    const lowercaseQuery = query ? query.toLowerCase() : null;
    
    let filteredNotes =[]
    // Print note.Format for all notes in AllNotes

    for(let i=0;i<AllNotes.length;i++){
      // console.log(AllNotes[i].Format,AllNotes.length)
      if(AllNotes[i].Format===Format){
        filteredNotes.push(AllNotes[i])
      }}

    // console.log(filteredNotes,AllNotes)  

    const currentQuery = new URLSearchParams(searchParams);
    currentQuery.set('format', Format);
    setSearchParams(currentQuery.toString());
    if(Format=="all"){
      if (lowercaseQuery){

        filteredNotes = AllNotes.filter(note => note.NoteText.toLowerCase().includes(lowercaseQuery))
      }
      else{
        setNotes(AllNotes)
        return
      }
      // console.log("hmm",filteredNotes)
      setNotes(filteredNotes)
      return
    }
    if (lowercaseQuery) {
      filteredNotes = filteredNotes.filter(note => note.NoteText.toLowerCase().includes(lowercaseQuery))
    }
    setNotes(filteredNotes);
  }

  return <>
    <head>
      <title>Notes-WebNotes</title>
    </head>
    <div
      className="RightHome"
    >
      <input
        placeholder="Search Notes"
        className="NoteSearchQueryBox"
        onChange={(e) => setQuery(e.target.value)}
        value={Query}
      >

      </input>
      {Query.length != 0 && <StyledButton variant="contained" onClick={filterNotes} ><StyledTypography>Search</StyledTypography></StyledButton>}
      {Query.length != 0 && <StyledButton variant="contained" color="error" onClick={ClearSearch}><StyledTypography>Clear</StyledTypography></StyledButton>}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        marginBottom: "10px"
      }}>
        <div>
          <StyledButton sx={{ minWidth: "0px" }} size="small" onClick={() => ChangeQuery("all")} variant={!(searchParams.get("format") == "Work" || searchParams.get("format") == "Personal") ? "contained" : "text"}  ><StyledTypography>All</StyledTypography></StyledButton>
          <StyledButton size="small" onClick={() => ChangeQuery("Personal")} variant={searchParams.get("format") == "Personal" ? "contained" : "text"} ><StyledTypography>Personal</StyledTypography></StyledButton>
          <StyledButton size="small" onClick={() => ChangeQuery("Work")} variant={searchParams.get("format") == "Work" ? "contained" : "text"}><StyledTypography>Work</StyledTypography></StyledButton>
        </div>
        <StyledButton mr={1} size="small" style={{ justifyContent: "flex-start" }} onClick={AddNote} startIcon={<AddCircleIcon />} >
          <StyledTypography>Add Notes</StyledTypography></StyledButton>

      </div>
      {!Notes && <div style={{ width: "100%", height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}> <CircularProgress color="primary" /></div>}
      {Notes && Notes.length == 0 && <h3 style={{ width: "100%", height: '100%', margin: 'auto', textAlign: 'center', color: "#1976d2" }}>Click on New Note to add Notes</h3>}
      <Grid container spacing={2} className="Home-Grid">
        {Notes && Notes.map((e) => <Grid md={3} xs={6} item><GridCard key={e._id} id={e._id} Format={e.Format} Phone={searchParams.get("Phone")} Name={searchParams.get("Name")} Text={e.NoteText} Time={e.Time} Color={e.Color} /></Grid>)}
      </Grid>
    </div>
  </>
}