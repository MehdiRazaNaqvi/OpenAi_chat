import { useEffect, useState } from 'react';
import '../style/login.css';


import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

import { Link, useNavigate } from 'react-router-dom';

import Logo from "../asset/logo.png"
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import MuiAlert from '@mui/material/Alert';


import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../firebase/firebase"


import { Snackbar, Card, Backdrop, CircularProgress, InputAdornment, TextField, Box, Button, IconButton } from '@mui/material';
import { signInWithEmailAndPassword } from "firebase/auth";


import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { login, switchMode } from '../store/counterSlice';



import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import axios from 'axios';

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
        // navigate("/openAi_chat/conversation")
        setLoading(false)

        // dispatch(login(user))


      }).catch((error) => {

        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        const credential = GoogleAuthProvider.credentialFromError(error);
        setShowAlert({ open: true, text: errorMessage, severity: "error" })
        setLoading(false)


      });
  }



  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)



  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });



  const [showalert, setShowAlert] = useState({ open: false, text: "", severity: "" })
  const [info, setInfo] = useState({ email: "", password: "" })

  console.log(process.env.STAGING_SERVER)

  const loginUser = () => {
    setLoading(true)
    axios.post(`https://staging.ancestrypass.com/api/auth/local`, { identifier: info.email, password: info.password })
      .then((res) => {
        console.log(res)
        if (res.status === 200) {

          navigate("/openAi_chat/conversation")
          setShowAlert({ open: true, text: res.data?.data?.user?.username, severity: "success" })

          dispatch(login(res.data))
          console.log("/openAi_chat/conversation")
        }

        setLoading(false)

      })


      .catch((error) => {
        setShowAlert({ open: true, text: error?.response?.data?.error?.message || "Something went wrong", severity: "secondary" })
        setLoading(false)

      });


    // signInWithEmailAndPassword(auth, info.email, info.password)
    //   .then((userCredential) => {
    //     // navigate("/chat")
    //     const user = userCredential.user;
    //     navigate("/openAi_chat/conversation")
    //     setLoading(false)
    //     dispatch(login(user))

    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     setShowAlert({ open: true, text: errorMessage, severity: "error" })
    // setLoading(false)

    // });
  }



  const state = useSelector(state => state?.counter)


  return (


    <Card sx={{ position: "relative", paddingTop: "2rem" }} className={state?.darkMode ? 'main_parent_div main_parent_div_dark' : 'main_parent_div'}>

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
        Sign In
      </h4>

      <Box
        onSubmit={(e) => { e.preventDefault(); loginUser() }}
        className='form'
        component="form"

      >




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



        <Button disabled={loading} type="submit" fullWidth size='large' color="secondary" variant="contained">Sign In</Button>


        <span className={state?.darkMode ? "white" : "black"} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "-1rem", marginBottom: "-1rem" }}>

          <hr className="line" style={{ width: "40%", height: "1px", border: "none", backgroundColor: "gray" }} />
          or
          <hr className="line" style={{ width: "40%", height: "1px", border: "none", backgroundColor: "gray" }} />

        </span>


        <Button color="inherit" disabled={loading} onClick={() => google_login()} className={state.darkMode ? 'google_btn google_btn_light' : 'google_btn'} fullWidth size='large' startIcon={<img style={{ width: "1.8rem", height: "1.8rem" }} src="https://img.icons8.com/fluency/48/null/google-logo.png" />} variant="contained">
          Continue with Google
        </Button>




        <span className='flex item-center justify-between' style={{ color: "blue", width: '100%' }}>
          <Link to="/openAi_chat/forgetPassword" className={loading && "disabled_link"}>Forget your password?</Link>
          <Link to="/openAi_chat/signup" className={loading && "disabled_link"}>Sign up here</Link>
        </span>



      </Box>



    </Card >


  );
}

export default App;
