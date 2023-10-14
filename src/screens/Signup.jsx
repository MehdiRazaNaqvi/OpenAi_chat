import { useEffect, useState } from 'react';
import '../style/login.css';
import { Button, Card, InputAdornment, TextField, Snackbar, Backdrop, CircularProgress, Box, IconButton } from '@mui/material';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

import { Link, useNavigate } from 'react-router-dom';

import Logo from "../asset/logo.png"
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase"


import MuiAlert from '@mui/material/Alert';

import { useDispatch, useSelector } from "react-redux"
import { login, switchMode } from '../store/counterSlice';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"

import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import PersonIcon from '@mui/icons-material/Person';


import React from "react"




function App() {


  const navigate = useNavigate()
  const dispatch = useDispatch()


  const google_login = () => {


    setLoading(true)
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;

        navigate("/openAi_chat/conversation")
        setLoading(false)
        dispatch(login(user))


      }).catch((error) => {

        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        const credential = GoogleAuthProvider.credentialFromError(error);
        setShowAlert({ open: true, text: errorMessage, severity: "error" })
        setLoading(false)


      });
  }



  const createUser = () => {
    setLoading(true)


    createUserWithEmailAndPassword(auth, info.email, info.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("success", user)

        updateProfile(auth.currentUser, {
          displayName: info.name
        }).then(() => {
          // Profile updated!
          navigate("/openAi_chat/signin")
          setLoading(false)
          // ...
        }).catch((error) => {
          // An error occurred
          // ...
        });





      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        setShowAlert({ open: true, text: errorMessage, severity: "error" })
        setLoading(false)

      });



  }


  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showalert, setShowAlert] = useState({ open: false, text: "", severity: "" })
  const [info, setInfo] = useState({ email: "", password: "", name: "" })



  const state = useSelector(state => state?.counter)


  return (


    <Card sx={{ gap: "0.5rem", paddingTop: "2rem" }} className={state?.darkMode ? 'main_parent_div main_parent_div_dark' : 'main_parent_div'}>




      <IconButton
        sx={{ position: "absolute", top: "2rem", right: "2rem" }}
        onClick={() => dispatch(switchMode())}
        size="large"
        aria-label="account of current user"
        aria-controls="primary-search-account-menu"
        aria-haspopup="true"
        color="inherit"
      >

        {state?.darkMode ?

          <LightModeOutlinedIcon sx={{ width: "1.5rem", height: "1.5rem" }} />

          :
          <DarkModeOutlinedIcon sx={{ width: "1.5rem", height: "1.5rem" }} />

        }
      </IconButton>




      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      // onClick={handleClose}
      >
        <CircularProgress color="secondary" />
      </Backdrop>


      <Snackbar open={showalert.open} autoHideDuration={5000} onClose={() => setShowAlert(false)} >
        <Alert severity={showalert.severity} sx={{ width: '100%' }} onClose={() => setShowAlert(false)}>
          {`${showalert.text}`}
        </Alert>
      </Snackbar>


      <img src={Logo} alt="logo" className='logo_img_signin_page' />


      <h4 className="text-4xl main_heading">
        Sign Up
      </h4>



      <Box
        // sx={{ backgroundColor: "red" }}
        onSubmit={(e) => { e.preventDefault(); createUser() }}
        className='form'
        component="form"
        sx={{ gap: "1.5rem" }}

      >


        <TextField
          required
          disabled={loading}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PersonIcon sx={{ fontSize: "1.7rem" }} />
              </InputAdornment>

            ),
          }}
          size='large'
          id="input-with-icon-adornment"
          onChange={(e) => setInfo({ ...info, name: e.target.value })}
          fullWidth label="Name" type="text" variant="outlined" />






        <TextField
          required
          disabled={loading}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <MailOutlineIcon sx={{ fontSize: "1.7rem" }} />
              </InputAdornment>
            ),
          }}
          size='large'
          id="input-with-icon-adornment"
          onChange={(e) => setInfo({ ...info, email: e.target.value })}
          fullWidth label="Email" type="email" variant="outlined" />


        <TextField
          required
          disabled={loading}


          InputProps={{
            endAdornment: (
              <InputAdornment variant="standard" position="end">

                {showPassword ?
                  <VisibilityRoundedIcon onClick={() => setShowPassword(!showPassword)} sx={{ fontSize: "1.7rem" }} />
                  :
                  <VisibilityOffRoundedIcon onClick={() => setShowPassword(!showPassword)} sx={{ fontSize: "1.7rem" }} />
                }
              </InputAdornment>
            ),
          }}


          type={showPassword ? "text" : "password"}
          size='large'
          id="input-with-icon-adornment"
          onChange={(e) => setInfo({ ...info, password: e.target.value })}

          fullWidth label="Password" variant="outlined" />


        <Button disabled={loading} type="submit" fullWidth size='large' color="secondary" variant="contained">Sign Up</Button>


        <span className={state?.darkMode ? "white" : "black"} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "-1rem", marginBottom: "-1rem" }}>

          <hr className="line" style={{ width: "40%", height: "1px", border: "none", backgroundColor: "gray" }} />
          or
          <hr className="line" style={{ width: "40%", height: "1px", border: "none", backgroundColor: "gray" }} />

        </span>




        <Button color="inherit" disabled={loading} onClick={() => google_login()} className={state.darkMode ? 'google_btn google_btn_light' : 'google_btn'} fullWidth size='large' startIcon={<img style={{ width: "1.8rem", height: "1.8rem" }} src="https://img.icons8.com/fluency/48/null/google-logo.png" />} variant="contained">
          Continue with Google
        </Button>




        <span className='flex item-center justify-end' style={{ color: "blue", width: '100%' }}>
          {/* <Link to="/forgetPassword">Forget your password?</Link> */}
          <Link to="/openAi_chat/signin" className={loading && "disabled_link"} >Sign in here</Link>
        </span>



      </Box>



    </Card >


  );
}

export default App;
