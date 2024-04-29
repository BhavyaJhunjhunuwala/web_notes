import React,{useState} from "react"
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid,Box ,Typography,Container,styled} from '@mui/material/';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { AuthContext } from "../../Context/AuthContext"
import './register.css'
import BackendLink from "../../BackendLink"
const LogoTypography=styled(Typography)(({theme})=>({

    fontSize:"3vw",
    [theme.breakpoints.down('sm')]: {
      fontSize:"5vw"
    },
  
  }))
function Register(){
    const navigate=useNavigate()
    const [Name,setName]=useState('')
    const [phone,setPhone]=useState('')
    const [password,setPassword]=useState('')
    const [cpassword,setCpassword]=useState('')
    const [error,setError]=useState("")
    const {setUser}=React.useContext(AuthContext)
    const userData={
        name:Name,
        Phone:phone,
        Password:password,
        cpassword:cpassword
    }
    const HandleChange = async () => {

    }
    const handleSubmit=async (event)=>{
        event.preventDefault();
        setError("Please wait...")
        if(password!==cpassword){
            setError("Password does not match")
            setTimeout(()=>{
                setError("")
            },3000)
            return
        }

        let result= await axios.post(BackendLink+'/register',userData)    
        setName("")
        setPhone("")
        setPassword("")
        setCpassword("")
        console.log(result)
        if(result.status!==200){
          setTimeout(() => setError(result.data), 3000);
        }
        else{
          // console.log(result.data._id)
            // setUser(result.data?.id)
            // localStorage.setItem("WebNotesUser",result.data?.token)
            navigate(`/notes`)
        }
    }
   
    

    return (<>
    <head>
      <title>SignUp-WebNotes-Notes and Task Manager</title>
    </head>
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <LogoTypography align="center" className="headingPrompt" mt={0} >WebNotes</LogoTypography>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          label="Phone Number"
          name=""
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          onChange={(e) => setName(e.target.value)}
          value={Name}
          label="UserName"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Pass"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="text"
          autoComplete="current-password"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Confirm Password"
          onChange={(e) => setCpassword(e.target.value)}
          value={cpassword}
          type="password"
          id="password"
          autoComplete="current-password"
        />
        {/* <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        /> */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={HandleChange}
        >
          Sign In
        </Button>
        <Typography  color="error" variant="text">
          {error}
        </Typography>
        <Grid container>
          <Grid item>
            <Link href="/login" variant="body2">
              {"Already a User? Sign In"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  </Container>
  </>)
}
export default Register;