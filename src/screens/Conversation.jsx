import { useEffect, useState } from 'react';
import '../style/login.css';
import '../style/chat.css';

import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import SendIcon from '@mui/icons-material/Send';
import React from "react"
import { createTheme } from '@mui/material/styles';
import Navbar from '../components/navbar'
import { useDispatch, useSelector } from 'react-redux';

import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Card } from '@mui/material';

import axios from "axios"
import { addToChat, setChat } from '../store/counterSlice';
import { useRef } from 'react';
import { IconButton, Badge, Avatar } from '@mui/material';
import Logo from "../asset/logo.png"
import { Alert, Snackbar, InputAdornment, TextField, Backdrop, CircularProgress } from '@mui/material';






export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8e24aa',

    },
    secondary: {
      main: '#8e24aa',

    },

  },
  overrides: {
    MuiFilledInput: {
      root: {
        backgroundColor: '#8e24aa',
        '&:hover': {
          backgroundColor: '#8e24aa',
        },
        '&.Mui-focused': {
          backgroundColor: '#8e24aa',
        },
      },
    },
  },



});





function App() {
  const divRef = useRef(null);

  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isDarkTheme = theme.palette.mode === 'dark';




  const [loading, setLoading] = useState(false)
  const [arhamic, setArhamic] = useState(false)
  const [dummyText, setDummyText] = useState(false)
  const [message, setMessage] = useState("")



  const state = useSelector(state => state?.counter)





  const send_message = () => {

    setDummyText(true)
    setLoading(true)


    axios.post(`${process.env.REACT_APP_API_URL}/api/user/${state?.currentUser?.uid}`, {
      text: message,
      arhamic
    },)


      .then(res => { setLoading(false); setDummyText(false); res.data?.success ? dispatch(setChat(res.data?.user?.chat)) : setShowAlert({ ...showalert, open: true, text: "Something went wrong" }); setLoading(false); setMessage("") })
      .catch(err => { setMessage(""); setLoading(false); setShowAlert({ open: true, text: "Network Problem", severity: "error" }); setLoading(false) })





  }


  const calculate_days = (timeString) => {

    const today = new Date();
    const date = new Date(timeString);
    const diffTime = today - date;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));


    if (diffDays <= 1) {
      return ("today")
    } else if (diffDays == 2) {
      return ("yesterday")
    } else if (diffDays > 2) {
      return (`${diffDays} days ago`)
    }

  }


  const fetch_chat = () => {

    setLoading(true)

    axios.get(`${process.env.REACT_APP_API_URL}/api/user/${state?.currentUser?.uid}`)
      // .then(res => console.log(res))
      // .catch(err => console.log(err))
      .then(res => { res.data?.success ? dispatch(setChat(res.data.chat)) : setShowAlert({ ...showalert, open: true, text: "Something went wrong" }); setLoading(false) })
      .catch(err => { setShowAlert({ open: true, text: "Network Problem", severity: "error" }); setLoading(false) })


  }


  useEffect(() => {


    !state?.currentUser?.uid ? navigate("/OpenAi_chat/signin") : fetch_chat()

    divRef.current.scrollIntoView({ behavior: 'smooth' });

  }, [])




  const [showalert, setShowAlert] = useState({ text: "", open: false, severity: "error" })




  return (


    <div className={state?.darkMode ? 'main_parent_div main_parent_div_dark' : 'main_parent_div'}>




      <Snackbar open={showalert.open} autoHideDuration={5000} onClose={() => setShowAlert(false)} >
        <Alert severity={showalert.severity} sx={{ width: '100%' }} onClose={() => setShowAlert(false)}>
          {`${showalert.text}`}
        </Alert>
      </Snackbar>

      {/* 
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      // onClick={handleClose}
      >
        <CircularProgress color="secondary" />
      </Backdrop> */}


      <Navbar setArhamic={setArhamic} arhamic={arhamic} />

      <span ref={divRef} className="chat_screen_middle">


        <PerfectScrollbar className="chat_area">





          {state?.chat?.map((v, i) =>

            <span key={i} style={{ width: "100%", height: "min-content", display: "flex", flexDirection: "column", gap: "1.5rem" }}>


              <span className={

                (state?.darkMode) ?
                  'text_div text_message_own'
                  :
                  "text_div text_message_own text_message_own_purple"

              } style={{ marginTop: "1rem", marginBottom: "1rem", minHeight: "4rem", height: "max-content", display: "flex", alignItems: "center", gap: "0rem", justifyContent: "flex-start" }}>




                <Badge>
                  <Avatar sx={{ height: 45, width: 45, fontSize: "1.5rem" }} alt={state?.currentUser?.displayName} src="{state?.currentUser?.photoURL}" />
                </Badge>



                <Card sx={{ position: "relative" }} elevation={3} className={

                  (state.darkMode) ?

                    'text_message text_message_own'
                    :
                    "text_message text_message_own text_message_own_purple"

                }>

                  {v.text}

                  <span className='flex justify-center items-center' style={{ position: "absolute", bottom: 0, right: 0, width: "7rem", fontSize: "0.9rem", height: "2rem" }}> {calculate_days(v.time)}</span>


                </Card>

              </span >



              <span className="text_div" sx={{ marginTop: "1rem", marginBottom: "1rem", minHeight: "4rem", height: "max-content", display: "flex", alignItems: "center", gap: "0rem", justifyContent: "flex-start" }}>


                <Badge>
                  <Avatar sx={{ height: 45, width: 45, fontSize: "1.5rem" }} src={Logo} />
                </Badge>


                <Card sx={{ position: "relative" }} elevation={3} className="text_message">

                  {v.response}
                  <span className='flex justify-center items-center' style={{ position: "absolute", bottom: 0, right: 0, width: "7rem", fontSize: "0.9rem", height: "2rem" }}> {calculate_days(v.time)}</span>


                </Card>



              </span>


            </span>



          )}

          {dummyText &&

            <span style={{ width: "100%", height: "min-content", display: "flex", flexDirection: "column", gap: "1.5rem" }}>


              <span className={

                (state?.darkMode) ?
                  'text_div text_message_own'
                  :
                  "text_div text_message_own text_message_own_purple"

              } sx={{ marginTop: "1rem", marginBottom: "1rem", minHeight: "4rem", height: "max-content", display: "flex", alignItems: "center", gap: "0rem", justifyContent: "flex-start" }}>



                <Card sx={{ position: "relative" }} elevation={3} className={

                  (state.darkMode) ?

                    'text_message text_message_own'
                    :
                    "text_message text_message_own text_message_own_purple"

                }>

                  {message}
                  <span className='flex justify-center items-center' style={{ position: "absolute", bottom: 0, right: 0, width: "7rem", fontSize: "0.9rem", height: "2rem" }}> today </span>


                </Card>

              </span >



            </span>


          }





        </PerfectScrollbar>




        <TextField
          required
          value={message}
          disabled={loading}
          onKeyDown={(e) => {
            if (e.keyCode === 13 && message.trim() !== '') {
              send_message();
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment onClick={() => send_message()} position="end">
                <SendIcon sx={{ fontSize: "2.3rem" }} />
              </InputAdornment>
            ),
            sx: {
              '& input': {
                color: isDarkTheme ? '#fff' : 'inherit',
              },
              '& label': {
                color: isDarkTheme ? '#fff' : 'inherit',
              },
              '& .MuiFilledInput-underline::before': {
                borderBottomColor: isDarkTheme ? '#fff' : 'rgba(0, 0, 0, 0.42)',
              },
              '& .MuiFilledInput-underline::after': {
                borderBottomColor: isDarkTheme ? '#fff' : '#1976d2',
              },
            },
          }}
          size='large'
          id="input-with-icon-adornment"
          fullWidth
          onChange={(e) => setMessage(e.target.value)}
          label="Send a message" type="text" variant="outlined" />


      </span>






    </div >


  );
}

export default App;

