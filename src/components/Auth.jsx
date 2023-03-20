import React, {useState, useEffect} from 'react'
import styles from './styles/Auth.module.css'
import hero from '../hero.png';
import axios from 'axios';
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom"



function Auth() {
    const [ showLogin, setShowLogin ] = useState(true)
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ fullName, setFullName ] = useState("")
    const [ type, setType ] = useState("password")
    const [ showPassword, setShowPassword ] = useState(false)
    const [ emailBorder, setEmailBorder ] = useState({border: '1px solid #CBDBEA'})
    const [ passwordBorder, setPasswordBorder ] = useState({border: '1px solid #CBDBEA'})
    const [ fullNameBorder, setFullNameBorder ] = useState({border: '1px solid #CBDBEA'})
    const [ message, setMessage ] = useState({})
    const [ isUser, setIsUser ] = useState(false)
    const [ isChecked, setIsChecked ] = useState(false)

    const navigate = useNavigate()


    useEffect(() => {
        
        if(showPassword){
            setType("text")
        }
        else{
            setType("password")
        }
        setEmailBorder({border: '1px solid #CBDBEA'})
        setFullNameBorder({border: '1px solid #CBDBEA'})
        setPasswordBorder({border: '1px solid #CBDBEA'})
    },[showPassword, showLogin])

    const handleFocus = (e) => {
        setMessage("")
        if(e.target.placeholder === "Email"){
            // setEmailFocus(true)
            setEmailBorder({border: '2px solid #329C89'})
            setFullNameBorder({border: '1px solid #CBDBEA'})
            setPasswordBorder({border: '1px solid #CBDBEA'})
            // setPasswordFocus(false)
            // setFullNameFocus(false)
        }
        else if(e.target.placeholder === "Full Name"){
            // setFullNameFocus(true)
            setEmailBorder({border: '1px solid #CBDBEA'})
            setFullNameBorder({border: '2px solid #329C89'})
            setPasswordBorder({border: '1px solid #CBDBEA'})
            // setPasswordFocus(false)
            // setEmailFocus(false)
        }
        else{
            // setPasswordFocus(true)
            setEmailBorder({border: '1px solid #CBDBEA'})
            setFullNameBorder({border: '1px solid #CBDBEA'})
            setPasswordBorder({border: '2px solid #329C89'})
            // setEmailFocus(false)
            // setFullNameFocus(false)
        }
    }

    const handleBlur = () => {
        setEmailBorder({border: '1px solid #CBDBEA'})
        setFullNameBorder({border: '1px solid #CBDBEA'})
        setPasswordBorder({border: '1px solid #CBDBEA'})
       
    }    

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handlefullNameChange = (e) => {
        setFullName(e.target.value)
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleCheckbox = () => {
        setIsChecked(!isChecked)
    }

    const handleShowLogin = (type) => {
        setEmail("")
        setPassword("")
        setFullName("")
        if(type === 'signin'){
            setShowLogin(true)
        }
        else{
            setShowLogin(false)
        }
    }

    const handleLogin = () => {
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if(!emailRegex.test(email)){
            let msg = {
                message: "Please Enter a valid Email",
                color: "#F65B2A"
            }
            setMessage(msg)
            setEmailBorder({border: '1px solid #F65B2A'})
        }
        axios.get(`https://bristle-lace-tempo.glitch.me/users?email=${email}&password=${password}`)
        .then((res) => {
            // console.log(res)
            if(res.data.length > 0){
                let payload = {
                    isLoggedIn: true,
                    userData: res?.data[0]
                }
                if(isChecked){
                    localStorage.setItem('user', JSON.stringify(payload))
                }
                else{
                    sessionStorage.setItem('user', JSON.stringify(payload))
                }
                navigate('/tasks', {replace: true})
                window.location.reload()

            }
            else{
                let msg = {
                    message: "Your Email and Password do not match",
                    color: "#F65B2A"
                }
                setMessage(msg)
                setEmailBorder({border: '1px solid #F65B2A'})
                setFullNameBorder({border: '1px solid #F65B2A'})
                setPasswordBorder({border: '1px solid #F65B2A'})
            }
        })
        .catch(err => console.log(err))
    }
    // https://bristle-lace-tempo.glitch.me
    const checkUser = async () => {
        // axios.get("http://localhost:3001/users")
        axios.get("https://bristle-lace-tempo.glitch.me/users")
        .then(response => {
            response && response.data.forEach(item => {
                if(item.email === email){
                    setIsUser(true)
                }
            })
        })
        .catch(err => console.log(err))
        
    }

    const handleSignUp = async() => {
        await checkUser()
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
        if(!emailRegex.test(email)){
            let msg = {
                message: "Please Enter a valid Email",
                color: "#F65B2A"
            }
            setMessage(msg)
            setEmailBorder({border: '1px solid #F65B2A'})
        }
        if(!passwordRegex.test(password)){
            let msg = {
                message: "Invalid Password",
                color: "#F65B2A"
            }
            setMessage(msg)
            setPasswordBorder({border: '1px solid #F65B2A'})
        }
        
        // console.log({isUser})
        if(isUser){
            let msg = {
                message: "User Already exists",
                color: "#F65B2A"
            }
            setMessage(msg)
            setEmailBorder({border: '1px solid #F65B2A'})
            setFullNameBorder({border: '1px solid #F65B2A'})
            setPasswordBorder({border: '1px solid #F65B2A'})
        }
        else {
            let payload = {
                id: uuid(),
                fullName: fullName,
                email: email,
                password: password
            }
    
            axios.post("https://bristle-lace-tempo.glitch.me/users", {...payload})
            .then((res) => {
                let msg = {
                    message: "User successfully created!",
                    color: "#329C89"
                }
                setMessage(msg)
                setTimeout(() => {
                    setShowLogin(true)
                    setMessage({})
                    setEmail("")
                    setPassword("")
                }, 2000)
            })
            .catch((err) => console.log(err))
        }
        
    }

    return (
        <div className={styles.container}>
            <div className={styles.heroImageContainer}>
                <img src={hero} alt="hero"/>
            </div>
            {
                showLogin ? (
                    <div className={styles.authContainer}>
                        <div className={styles.authBox}>
                            <div className={styles.header}>
                                <p 
                                    onClick={() => handleShowLogin('signin')} 
                                    className={styles.login}
                                    style={showLogin ? {color: '#1A3B58'} : {color: '#1A3B5854'}}
                                >
                                    Log In
                                </p>
                                <p 
                                    onClick={() => handleShowLogin('signup')} 
                                    className={styles.signup}
                                    style={showLogin ? {color: '#1A3B5854'} : {color: '#1A3B58'}}
                                >
                                    Sign Up
                                </p>
                            </div>
                            <div className={styles.contentContainer}>
                                <p className={styles.firstInfo}>
                                    To Continue
                                </p>
                                <p className={styles.secondInfo}>
                                    We need your Name & Email
                                </p>
                                <div 
                                    className={styles.inputContainer}
                                    style = {emailBorder}    
                                >
                                    <input 
                                        onFocus={handleFocus} 
                                        onBlur={handleBlur} 
                                        onChange={handleEmailChange}
                                        className={styles.input} 
                                        type="text" 
                                        value={email} 
                                        placeholder="Email"/>
                                </div>
                                <div 
                                    className={styles.inputContainer}
                                    style = {passwordBorder}      
                                >
                                    <input 
                                        onFocus={handleFocus} 
                                        onBlur={handleBlur} 
                                        onChange={handlePasswordChange}
                                        className={styles.input}  t
                                        type={type} 
                                        value={password} 
                                        placeholder="Password"/>
                                    <div onClick={handleShowPassword} className={styles.showPassword}>
                                        {
                                            showPassword ? (
                                                <div>
                                                    <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 6.5C0 6.5 3.1875 0.65625 8.5 0.65625C13.8125 0.65625 17 6.5 17 6.5C17 6.5 13.8125 12.3438 8.5 12.3438C3.1875 12.3438 0 6.5 0 6.5ZM8.5 10.2188C9.48627 10.2188 10.4322 9.82695 11.1296 9.12955C11.827 8.43215 12.2188 7.48627 12.2188 6.5C12.2188 5.51373 11.827 4.56785 11.1296 3.87045C10.4322 3.17305 9.48627 2.78125 8.5 2.78125C7.51373 2.78125 6.56785 3.17305 5.87045 3.87045C5.17305 4.56785 4.78125 5.51373 4.78125 6.5C4.78125 7.48627 5.17305 8.43215 5.87045 9.12955C6.56785 9.82695 7.51373 10.2187 8.5 10.2188V10.2188Z" fill="#B7C0C9"/>
                                                    </svg>
                                                </div>
                                            ) : (
                                                <div>
                                                    <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 6.5C0 6.5 3.1875 0.65625 8.5 0.65625C13.8125 0.65625 17 6.5 17 6.5C17 6.5 13.8125 12.3438 8.5 12.3438C3.1875 12.3438 0 6.5 0 6.5ZM8.5 10.2188C9.48627 10.2188 10.4322 9.82695 11.1296 9.12955C11.827 8.43215 12.2188 7.48627 12.2188 6.5C12.2188 5.51373 11.827 4.56785 11.1296 3.87045C10.4322 3.17305 9.48627 2.78125 8.5 2.78125C7.51373 2.78125 6.56785 3.17305 5.87045 3.87045C5.17305 4.56785 4.78125 5.51373 4.78125 6.5C4.78125 7.48627 5.17305 8.43215 5.87045 9.12955C6.56785 9.82695 7.51373 10.2188 8.5 10.2188Z" fill="#B7C0C9"/>
                                                    </svg>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                {
                                    message ? (
                                        <div className={styles.errorMessage} style={{color: message.color}}>
                                            <p>{message.message}</p>
                                        </div>
                                    ) : (
                                        null
                                    )
                                }
                                <button onClick={handleLogin} className={styles.button}>
                                    Log In
                                </button>
                                <div className={styles.rememberMeContainer}>
                                    <input 
                                        onChange={handleCheckbox}
                                        className={styles.checkbox} 
                                        type="checkbox"
                                        style={{accentColor: '#329C89'}}
                                    />
                                    <p className={styles.rememberMe}>
                                        Remember Me
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.authContainer}>
                        <div className={styles.authBox}>
                            <div className={styles.header}>
                                <p 
                                    onClick={() => handleShowLogin('signin')} 
                                    className={styles.login}
                                    style={showLogin ? {color: '#1A3B58'} : {color: '#1A3B5854'}}
                                >
                                    Log In
                                </p>
                                <p 
                                    onClick={() => handleShowLogin('signup')} 
                                    className={styles.signup}
                                    style={showLogin ? {color: '#1A3B5854'} : {color: '#1A3B58'}}
                                >
                                    Sign Up
                                </p>
                            </div>
                            <div className={styles.contentContainer}>
                                <div 
                                    className={styles.inputContainer}
                                    style = {fullNameBorder}    
                                >
                                    <input 
                                        onFocus={handleFocus} 
                                        onBlur={handleBlur} 
                                        onChange={handlefullNameChange}
                                        className={styles.input} 
                                        type="text" 
                                        value={fullName} 
                                        placeholder="Full Name"/>
                                </div>
                                <div 
                                    className={styles.inputContainer}
                                    style = {emailBorder}    
                                >
                                    <input 
                                        onFocus={handleFocus} 
                                        onBlur={handleBlur} 
                                        onChange={handleEmailChange}
                                        className={styles.input} 
                                        type="text" 
                                        value={email} 
                                        placeholder="Email"/>
                                </div>
                                <div 
                                    className={styles.inputContainer}
                                    style = {passwordBorder}      
                                >
                                    <input 
                                        onFocus={handleFocus} 
                                        onBlur={handleBlur} 
                                        onChange={handlePasswordChange}
                                        className={styles.input}  t
                                        type={type} 
                                        value={password} 
                                        placeholder="Password"/>
                                    <div onClick={handleShowPassword} className={styles.showPassword}>
                                        {
                                            showPassword ? (
                                                <div>
                                                    <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 6.5C0 6.5 3.1875 0.65625 8.5 0.65625C13.8125 0.65625 17 6.5 17 6.5C17 6.5 13.8125 12.3438 8.5 12.3438C3.1875 12.3438 0 6.5 0 6.5ZM8.5 10.2188C9.48627 10.2188 10.4322 9.82695 11.1296 9.12955C11.827 8.43215 12.2188 7.48627 12.2188 6.5C12.2188 5.51373 11.827 4.56785 11.1296 3.87045C10.4322 3.17305 9.48627 2.78125 8.5 2.78125C7.51373 2.78125 6.56785 3.17305 5.87045 3.87045C5.17305 4.56785 4.78125 5.51373 4.78125 6.5C4.78125 7.48627 5.17305 8.43215 5.87045 9.12955C6.56785 9.82695 7.51373 10.2187 8.5 10.2188V10.2188Z" fill="#B7C0C9"/>
                                                    </svg>
                                                </div>
                                            ) : (
                                                <div>
                                                    <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 6.5C0 6.5 3.1875 0.65625 8.5 0.65625C13.8125 0.65625 17 6.5 17 6.5C17 6.5 13.8125 12.3438 8.5 12.3438C3.1875 12.3438 0 6.5 0 6.5ZM8.5 10.2188C9.48627 10.2188 10.4322 9.82695 11.1296 9.12955C11.827 8.43215 12.2188 7.48627 12.2188 6.5C12.2188 5.51373 11.827 4.56785 11.1296 3.87045C10.4322 3.17305 9.48627 2.78125 8.5 2.78125C7.51373 2.78125 6.56785 3.17305 5.87045 3.87045C5.17305 4.56785 4.78125 5.51373 4.78125 6.5C4.78125 7.48627 5.17305 8.43215 5.87045 9.12955C6.56785 9.82695 7.51373 10.2188 8.5 10.2188Z" fill="#B7C0C9"/>
                                                    </svg>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                {
                                    message ? (
                                        <div className={styles.errorMessage} style={{color: message.color}}>
                                            <p>{message.message}</p>
                                        </div>
                                    ) : (
                                        null
                                    )
                                }
                                <button onClick={handleSignUp} className={styles.button}>
                                    Sign Up
                                </button>
                                <div className={styles.rememberMeContainer}>
                                    <input 
                                        className={styles.checkbox} 
                                        type="checkbox"
                                        style={{accentColor: '#329C89'}}
                                    />
                                    <p className={styles.rememberMe}>
                                        Remember Me
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            
        </div>
    )
}

export default Auth
