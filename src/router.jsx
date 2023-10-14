
import Login from "./screens/Login"
import ForgetPassword from "./screens/Forget"
import Signup from "./screens/Signup"
import Contact from "./screens/Contact"
import Authenticate from "./screens/authenticate"
import Conversation from "./screens/Conversation"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from './screens/Conversation.jsx';
import { useSelector } from "react-redux";






const App = () => {

    const darkMode = useSelector(state => state.counter?.darkMode)



    return (

        <Router>

            <Routes>
                <Route path="/openAi_chat" element={<Authenticate />} />
                <Route path="/openAi_chat/signin" element={<ThemeProvider theme={darkMode && darkTheme} > <Login /> </ThemeProvider>} />
                <Route path="/openAi_chat/contactUs" element={<ThemeProvider theme={darkMode && darkTheme} > <Contact /> </ThemeProvider>} />
                <Route path="/openAi_chat/forgetPassword" element={<ThemeProvider theme={darkMode && darkTheme} > <ForgetPassword /> </ThemeProvider>} />
                <Route path="/openAi_chat/signup" element={<ThemeProvider theme={darkMode && darkTheme} > <Signup /> </ThemeProvider>} />
                <Route path="/openAi_chat/conversation" element={<ThemeProvider theme={darkMode && darkTheme} > <Conversation /> </ThemeProvider>} />
                <Route path="/*" element={<ThemeProvider theme={darkMode && darkTheme} > <Login /> </ThemeProvider>} />

            </Routes>
        </Router>
    )


}



export default App