import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SignUpPage.scss";


function SignUpPage(props) {
    const [usersDetails, setDetails] = useState([])
    const navigate = useNavigate();



    let passwordValidation = (password) => {
        const specialCharsForPassowrd = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

        if (specialCharsForPassowrd.test(password)) return false
        else return true
    }

    let emailValidation = (email) => {
        const specialCharsForEmail = /[`!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;

        if (specialCharsForEmail.test(email)) {
            return false
        }
        else {
            return true;
        }
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
        console.log(userValidation(formData.userName));
        if (passwordValidation(formData.password) && userValidation(formData.userName)
            && emailValidation(formData.mailAddress)) {
            await axios.post('https://shakanest14.herokuapp.com/auth/signUp', {
                username: formData.userName,
                email: formData.mailAddress,
                password: formData.password
            }).then((res) => {
                console.log(res)//TODO:add handle succes edit
            }).catch((err) => alert(err.response.data.message));

            navigate("/login",{ replace: true })
        } else {
            alert("Please enter a valid password");
        }
    }


    return (
        <>
            <div className="container">
                <div className="signUpHeader">Sign Up</div>
                <div className='logInForm'>

                    <form onSubmit={onFormSubmit} id="signUpForm">
                        <TextField
                            required
                            className="form"
                            label="userName"
                            variant="outlined"
                            htmlFor="userName"
                            type="text"
                            name="userName"
                        />
                        <TextField
                            required
                            className="form"
                            id="outlined-basic"
                            label="mail address"
                            variant="outlined"
                            htmlFor="mailAddress"
                            type="text"
                            name="mailAddress"
                        />

                        <TextField
                            required
                            className="form"
                            id="password"
                            label="password"
                            variant="outlined"
                            htmlFor="password"
                            type="password"
                            autoComplete="current-password"
                            name="password"
                        />

                    </form>
                </div>
                <div className='instructionsDiv'>
                    <p>please insert a valid letters only! </p>
                    <p>no:<b>  !#$%^&*()_+\-'' </b> </p>
                    <p>password greater then 8 letters only </p>
                </div>
                <div className="formActions">

                    <Button
                        className="joinUs"
                        variant="contained"
                        type="submit"
                        form="signUpForm"
                        value="Submit"
                    >Join Shaka!</Button>
                </div>
            </div>
        </>

    )
}

export default SignUpPage;