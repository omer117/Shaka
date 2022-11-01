import axios from 'axios';
import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SignUpPage.scss";


function SignUpPage(props) {
    const [usersDetails, setDetails] = useState([])
    const navigate = useNavigate();


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
            if (email === usersDetails[i].email || specialCharsForEmail.test(email)) {
                return false
            }
            else {
                return true;
            }
        }
    }

    let userValidation = (user) => {
        const specialCharsForName = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;


        for (let i = 0; i < usersDetails.length; i++) {
            if (specialCharsForName.test(user)) {
                return false
            }
            else {
                return true;
            }
        }
    }


    const onFormSubmit = async (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        console.log(formData.password);
        formData = Object.fromEntries(formData)
            if (passwordValidation(formData.password) && userValidation(formData.userName)
            && emailValidation(formData.mailAddress)) {
            await axios.post('https://shakaserver2.herokuapp.com/addUser', {
                userDetails: formData
            }).then((res) => {
                console.log(res)//TODO:add handle succes edit
            }).catch((err) => console.log(err));
            
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
                            label="user name"
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