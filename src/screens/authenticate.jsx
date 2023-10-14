import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const App = () => {

    const navigate = useNavigate()
    const state = useSelector(state => state.counter)


    useEffect(() => {
        state?.currentUser?.uid ? navigate("/openAi_chat/conversation") : navigate("/openAi_chat/signin")


    }, [navigate])






}


export default App