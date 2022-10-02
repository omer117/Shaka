import "./LogInPage.scss"
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';



function LogInPage(props) {
    const [usersDetails, setDetails] = useState([])

    useEffect(() => {
        axios.get('https://shakaserver2.herokuapp.com/getMailUser')
            .then((res) => setDetails(res.data))
            .catch((err) => console.log(err));
    }, [])


    let passwordValidation = (password) => {
        const specialCharsForPassowrd = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

        if (password.length < 8 || specialCharsForPassowrd.test(password)) return false
        else return true
    }

    let emailValidation = (email) => {
        const specialCharsForEmail = /[`!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;

        for (let i = 0; i < usersDetails.length; i++) {
            if (email === usersDetails[i].email || !specialCharsForEmail.test(email)) {
                return true
            }
            else {
                return false;
            }
        }
    }


    const onFormSubmit = async (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        formData = Object.fromEntries(formData)
        formData.mailAddress = formData.mailAddress;
        formData.password = formData.password;
        if (emailValidation(formData.mailAddress) && passwordValidation(formData.password)) {
            await axios.post('https://shakaserver2.herokuapp.com/CheckLogIn', {
                userDetails: formData
            }).then((res) => {
                if (res.data === 'no email like this bro sorry') {
                    console.log('nope');
                } else {
                    window.sessionStorage.setItem("user", res.data)
                }
                // console.log(res.data)
            }).catch((err) => {
                console.log(err);
            });
            window.location.href = '/'
        }
        else {
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
                            label="Email Address"
                            variant="outlined"
                            htmlFor="mailAddress"
                            type="text"
                            name="mailAddress"
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