
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import LoginInSignUpHero from '../components/LoginSignupPage/LoginInSignUpHero'
import NavBar from '../components/NavBar'
import About from '../components/LoginSignupPage/About'
import Footer from '../components/Footer'
import SignUpForm from '../components/LoginSignupPage/SignUpForm'
import SignInForm from '../components/LoginSignupPage/SignInForm'


const LoginInSignUp = (props) => {
    const { isLogged, clearToken, testLogin, token, handleSignIn, handleChangeSignIn } = props
    const [toggle, setToggle] = useState(false)

    // if logged in then redirect to home page.
    if (isLogged) {
        return <Redirect to="/home" />
    }

    const signInForm = () => {
        setToggle(false);
    };

    const signUpForm = () => {
        setToggle(true);
    };

    const logInWithFB = () => {
        window.location.replace('https://cook-this-by-phil.herokuapp.com/login/facebook')
    }

    return (
        <div>
            {/* <NavBar
                isLogged={isLogged}
                clearToken={clearToken}
            /> */}
            <div className='container my-3 mb-5'>
                {toggle && <SignUpForm
                    signInForm={signInForm}
                    logInWithFB={logInWithFB}
                />}
                {!toggle && <SignInForm
                    testLogin={testLogin}
                    signUpForm={signUpForm}
                    logInWithFB={logInWithFB}
                    isLogged={isLogged}
                    handleSignIn={handleSignIn}
                    handleChangeSignIn={(type, name) => handleChangeSignIn(type, name)}
                />}
                <About
                    {...props}
                />
            </div>
            <Footer />
        </div>
    )
}

export default LoginInSignUp