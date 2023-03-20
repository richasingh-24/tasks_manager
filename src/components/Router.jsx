import React, {useState, useEffect} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Auth from './Auth';
import Tasks from './Tasks';

function Router() {
    const [ loggedIn, setLoggedIn ] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'))
        if(!user){
            navigate("/")
        }
        else{
            navigate("/tasks")
        }
        setLoggedIn(user?.isLoggedIn)
    }, [loggedIn])
    return (
        <Routes>
            <Route path="/tasks" element={<Tasks/>}/>
            <Route path="/" element={<Auth/>}/>
        </Routes>
    )
}

export default Router