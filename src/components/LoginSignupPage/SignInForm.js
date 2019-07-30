import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import UseForm from '../../services/UseForm'
import validate from '../../services/ValidateForm/ValidateSignIn'

const SignInForm = ({ signUpForm, logInWithFB, handleSignIn, handleChangeSignIn, isLogged }) => {
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')


    const onSignIn = () => {
        console.log('flash', inputs);
        handleSignIn(inputs.email, inputs.password)
    }
    const { inputs, errors, handleInputChange, handleSubmit } = UseForm(
        onSignIn,
        validate
    );

    return (
        <div className='m-4 mr-5 pull-right' style={{ width: '24em' }}>
            <Card>
                <CardHeader id='recipeCardHeader' title="Sign in" style={{ backgroundColor: '#BD1E1E', color: 'white', textAlign: 'center', boxShadow: '0 0.5rem 1rem rgba(0,0,0,.25)' }} />
                {/* <div id="logo" style={{background: '#BD1E1E'}} className="pull-left text-center">
                <img  src="img/Cook_this_logo.png" style={{ width: '300px'}} title="Cook this" />
            </div> */}
                <form className="border border-light p-5" onSubmit={handleSubmit}>
                    <div className='mb-2'>
                        <input
                            className={`form-control ${errors.email && 'is-invalid'}`}
                            placeholder="Email"
                            type="email"
                            name="email"
                            value={inputs.email || ""}
                            onChange={handleInputChange}
                        />
                        {errors.email && (
                            <div className="invalid-feedback mt-0 ml-2">{errors.email}</div>
                        )}
                    </div>
                    <div className='mb-2'>
                        <input
                            className={`form-control ${errors.password && 'is-invalid'}`}
                            placeholder="Password"
                            type="password"
                            name="password"
                            value={inputs.password || ""}
                            onChange={handleInputChange}
                        />
                        {errors.password && (
                            <div className="invalid-feedback mt-0 ml-2">{errors.password}</div>
                        )}
                    </div>
                    <div className="d-flex justify-content-around">
                        <div>
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="defaultLoginFormRemember" />
                                <label className="custom-control-label" for="defaultLoginFormRemember">Remember me</label>
                            </div>
                        </div>
                        <div>
                            <a href='#'>Forgot password?</a>
                        </div>
                    </div>
                    <button className="btn btn-block mt-4 my-1" style={{ backgroundColor: '#BD1E1E !important' }} type="submit">Sign in</button>
                    <div className='text-center'>
                        <small>Not a member?
                        <a className='ml-1' style={{ color: 'blue' }} onClick={signUpForm}>Sign up</a>
                        </small>
                        <hr />
                        <p>or sign in with facebook:</p>
                        <button onClick={logInWithFB} className="loginBtn loginBtn--facebook">
                            Login with Facebook
                </button>
                    </div>
                </form>
            </Card>
        </div>
    )
}

export default SignInForm