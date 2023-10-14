import { useEffect, useState } from 'react';
import '../style/login.css';

import { Button, Card, InputAdornment, TextField, Box, Snackbar, Backdrop, CircularProgress, IconButton } from '@mui/material';

import { Link, useNavigate } from 'react-router-dom';

import Logo from "../asset/logo.png"
import MailOutlineIcon from '@mui/icons-material/MailOutline';


import MuiAlert from '@mui/material/Alert';

import GroupsIcon from '@mui/icons-material/Groups';
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from 'axios';
import { switchMode } from '../store/counterSlice';

import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';


import emailjs from "emailjs-com"

function App() {


  const navigate = useNavigate()
  const dispatch = useDispatch()



  const [loading, setLoading] = useState(false)



  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const submit = (e) => {

    setLoading(true)


    emailjs.sendForm("service_kulgzqp", "template_e2uaurm", e.target, "2sQT7v8YEPNxvnA02")
      .then(res => {
        console.log(res)
        if (res.status == 200 && res.text == 'OK') { setShowAlert({ open: true, severity: "success", text: "Thank You! We are glad to hear from you" }); setLoading(false) }
        else { setShowAlert({ open: true, severity: "error", text: "Something went wrong... You can still contact us directlty on our email" }); setLoading(false) }

      }

      )
      .catch(err => { setLoading(false); setShowAlert({ open: true, severity: "error", text: "Something went wrong... You can still contact us directlty on our email" }) })




  }




  const [showalert, setShowAlert] = useState({ open: false, text: "", severity: "" })
  const [info, setInfo] = useState({ email: "", message: "" })




  const state = useSelector(state => state?.counter)


  return (


    <Card sx={{ paddingTop: "2rem" }} className={state?.darkMode ? 'main_parent_div main_parent_div_dark' : 'main_parent_div'}>

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
        Contact Us!
      </h4>

      <Box
        onSubmit={(e) => { e.preventDefault(); submit(e) }}
        className='form'
        component="form"

      >




        <TextField
          required
          name="user_email"
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
          name="message"

          disabled={loading}
          InputProps={{


            sx: { height: '10rem', display: "flex", alignItems: 'center', hustifyContent: "center" }
          }}



          size='large'
          id="input-with-icon-adornment"
          onChange={(e) => setInfo({ ...info, message: e.target.value })}
          fullWidth label="Message" variant="outlined" />



        <Button disabled={loading} type="submit" fullWidth size='large' color="secondary" variant="contained">Send Us</Button>
        <Button onClick={() => navigate("/openAi_chat/conversation")} disabled={loading} type="button" fullWidth size='large' color="inherit" variant="contained">Go Back</Button>






        {/* 
        <span className='flex item-center justify-between' style={{ color: "blue", width: '100%' }}>
          <Link to="/forgetPassword" className={loading && "disabled_link"}>Forget your password?</Link>
          <Link to="/signup" className={loading && "disabled_link"}>Sign up here</Link>
        </span> */}



      </Box>



    </Card >


  );
}

export default App;
