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

        if (password.length < 8 || specialCharsForPassowrd.test(password)) return false
        else return true
    }

    let userValidation = (user) => {
        const specialCharsForuser = /[`!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
        if (!specialCharsForuser.test(user)) {
            return true
        }
        else {
            return false;
        }
    }



    const onFormSubmit = async (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        formData = Object.fromEntries(formData)
        console.log(passwordValidation(formData.password));
        if (userValidation(formData.username) && passwordValidation(formData.password)) {
            await axios.post('https://shaka-nest-remastered.onrender.com/users/validation', {
                username:formData.username,
                password:formData.password
            }).then((res) => {
                    window.sessionStorage.setItem("user", res.data[1])
                    window.sessionStorage.setItem("user_id", res.data[0])
                    navigate("/", { replace: true })
                    window.location.reload()
            }).catch((err) => {
                console.log(err);
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
                            label="Username"
                            variant="outlined"
                            htmlFor="username"
                            type="text"
                            name="username"
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