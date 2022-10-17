import jwt_decode from "jwt-decode";
import "./LogInPage.scss"
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';



function LogInPage(props) {
    const navigate = useNavigate()

    let passwordValidation = (password) => {
        const specialCharsForPassowrd = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

        if (specialCharsForPassowrd.test(password)) return false
        else return true
    }


    let userValidation = (user) => {
        const specialCharsForName = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (specialCharsForName.test(user)) {
            return false
        }
        else {
            return true;
        }
    }


    const onFormSubmit = async (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        formData = Object.fromEntries(formData)
        if (userValidation(formData.userName) && passwordValidation(formData.password)) {
            await axios.post('https://shakanest14.herokuapp.com/auth/signIn', {
                username: formData.userName,
                password: formData.password
            }).then((res) => {
                let ses = jwt_decode(res.data.accessToken)
                window.sessionStorage.setItem('user', ses.username)
                window.sessionStorage.setItem('user_id', ses.user_id)
                navigate("/", { replace: true })
                window.location.reload()
            }).catch((err) => {
                console.log(err)
            });
        } else {
            alert("Password or email validation failed");
        }
    }


    return (
        <>
            <div className="container">

                <div className="header">Log In</div>
                <div className='logInForm'>

                    <form onSubmit={onFormSubmit} id="LogInForm">

                        <TextField
                            required
                            className='form'
                            id="outlined-basic"
                            label="user name"
                            variant="outlined"
                            htmlFor="userName"
                            type="text"
                            name="userName"
                        />

                        <TextField
                            required
                            className='form'
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            htmlFor="password"
                            name="password"
                        />
                    </form>
                </div>
                <div className="formActions">

                    <Button
                        variant="contained"
                        type="submit"
                        form="LogInForm"
                        value="Submit"
                    >Log In
                    </Button>
                    <Button
                        variant="contained"
                        className='register'>
                        <Link to="/signUp">Register</Link>
                    </Button>
                </div>
            </div>

        </>
    )

}

export default LogInPage;