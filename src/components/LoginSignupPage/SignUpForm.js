import React, { Component } from "react";
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import UseForm from '../../services/UseForm'
import validate from '../../services/ValidateForm/ValidateSignUp'

const SignUpForm = (props) => {

    const Register = async () => {
        console.log('value of name', inputs.name.length);
        console.log('what is the input', inputs)
        const response = await fetch(`https://cook-this-by-phil.herokuapp.com/createaccount`, {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(inputs)
        })
        const result = await response.json()
        // console.log('welcome to the jungle', result)
        props.signInForm()
    }

    const { inputs, errors, handleInputChange, handleSubmit } = UseForm(
        Register,
        validate
    );

    return (

        <div className='m-4 mr-5 pull-right' style={{ width: '24em' }}>
            <Card>
                <CardHeader id='recipeCardHeader' title="Sign up" style={{ backgroundColor: '#BD1E1E', color: 'white', textAlign: 'center', boxShadow: '0 0.5rem 1rem rgba(0,0,0,.25)' }} />
                <form className="border border-light p-5" onSubmit={handleSubmit}>
                    <div className='mb-2'>
                        <input
                            className={`form-control ${errors.name && 'is-invalid'}`}
                            placeholder="Name"
                            type="text"
                            name="name"
                            value={inputs.name || ""}
                            onChange={handleInputChange}
                        />
                        {errors.name && (
                            <div className="invalid-feedback mt-0 ml-2">{errors.name}</div>
                        )}
                    </div>
                    <div className='mb-2'>
                        <input
                            className={`form-control ${errors.username && 'is-invalid'}`}
                            placeholder="Username"
                            type="text"
                            name="username"
                            value={inputs.username || ""}
                            onChange={handleInputChange}
                        />
                        {errors.username && (
                            <div className="invalid-feedback mt-0 ml-2">{errors.username}</div>
                        )}
                    </div>
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
                    <div className='mb-2'>
                        <input
                            className={`form-control ${errors.confirmPass && 'is-invalid'}`}
                            placeholder="Confirm Password"
                            type="password"
                            name="confirmPass"
                            value={inputs.confirmPass || ""}
                            onChange={handleInputChange}
                        />
                        {errors.confirmPass && (
                            <div className="invalid-feedback mt-0 ml-2">{errors.confirmPass}</div>
                        )}
                    </div>
                    <button class="btn btn-block mt-4 my-1" style={{ backgroundColor: '#BD1E1E !important' }} type="submit">Register</button>
                    <div className='text-center'>
                        <small>Have an account?
                        <a className='ml-1' style={{ color: 'blue' }} onClick={props.signInForm}>Sign up</a>
                        </small>
                        <hr />
                        <p>or sign in with facebook:</p>
                        <button onClick={props.logInWithFB} class="loginBtn loginBtn--facebook">
                            Login with Facebook
                        </button>
                    </div>
                </form>
            </Card>
        </div>

    );
}


export default SignUpForm;