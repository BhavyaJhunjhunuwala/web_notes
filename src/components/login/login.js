import React, { useState, useEffect } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid,styled } from '@mui/material/';
import Box from '@mui/material/Box';
import BackendLink from '../../BackendLink';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext';

const LogoTypography=styled(Typography)(({theme})=>({

  fontSize:"3vw",
  [theme.breakpoints.down('sm')]: {
    fontSize:"5vw"
  },

}))
export default function Login() {
  const navigate = useNavigate()

  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState("")
  const { setUser } = React.useContext(AuthContext)
  useEffect(() => (
    sessionStorage.clear()
  ))


  const userData = {
    Phone: phone,
    Password: password,
  }
  const HandleChange = async () => {

  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("Please Wait...")
    let result = await axios.post(BackendLink+'/login', userData)
    setError(result.data.err)

    if (result.status !== 200) {
      setError(result.data)
      setTimeout(() => setError(""), 3000);

    }
    else {
      localStorage.setItem("WebNotesUser", result.data.token)
      setUser(result.data?.id)
      navigate(`/notes`)
    }
    setPhone("")
    setPassword("")
  };

  return (<>
    <head>
      <title>Login-WebNotes-Notes and Task Manager</title>
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
          Sign in
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
            name="password"
            label="Pass"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
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
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    </>
  );
}