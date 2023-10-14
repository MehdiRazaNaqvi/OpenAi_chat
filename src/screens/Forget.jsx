import { useState } from 'react';
import '../style/login.css';


import { InputAdornment, Card, TextField, Box, Button, Snackbar, Backdrop, CircularProgress , IconButton } from '@mui/material';

import { Link, useNavigate } from 'react-router-dom';

import Logo from "../asset/logo.png"
import MailOutlineIcon from '@mui/icons-material/MailOutline';


import MuiAlert from '@mui/material/Alert';

import React from "react"
import { useDispatch, useSelector } from "react-redux"

import { auth } from '../firebase/firebase';

import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { sendPasswordResetEmail } from "firebase/auth";
import { switchMode } from '../store/counterSlice';




function App() {

  const state = useSelector(state => state?.counter)

  const navigate = useNavigate()
  const dispatch = useDispatch()



  const send_reset_email = () => {




    sendPasswordResetEmail(auth, email)
      .then((res) => {

        setShowAlert({ open: true, text: "We have sent you a password reset email", severity: "success" })
        setShowAlert({ open: true, text: "You can sign in with your new password", severity: "success" })

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setShowAlert({ open: true, text: "Something went wrong", severity: "success" })

      });

  }




  const [loading, setLoading] = useState(false)



  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });



  const [showalert, setShowAlert] = useState({ open: false, text: "", severity: "success" })
  const [email, setEmail] = useState("")









  return (


    <Card sx={{paddingTop:"2rem"}} className={state?.darkMode ? 'main_parent_div main_parent_div_dark' : 'main_parent_div'}>


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
        Forgot password?
      </h4>

      <Box
        onSubmit={(e) => { e.preventDefault(); send_reset_email() }}
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
          onChange={(e) => setEmail(e.target.value)}

          fullWidth label="Email" type="email" variant="outlined" />



        <Button disabled={loading} type="submit" fullWidth size='large' color="secondary" variant="contained">Send Email</Button>







        <span className='flex item-center justify-between' style={{ color: "blue", width: '100%' }}>

          <Link to="/openAi_chat/signin" className={loading && "disabled_link"}>Sign in here</Link>
          <Link to="/openAi_chat/signup" className={loading && "disabled_link"}>Sign up here</Link>
        </span>



      </Box>



    </Card >


  );
}

export default App;
