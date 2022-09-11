import axios from 'axios';
import { useEffect, useState } from 'react'


function SignUpPage(props) {
    const [usersDetails, setDetails] = useState([])

    useEffect(() => {
        axios.get('/getMailUser')
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
            if (user === usersDetails[i].user || specialCharsForName.test(user)) {
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
        formData = Object.fromEntries(formData)
        formData.userName = formData.userName;
        formData.mailAddress = formData.mailAddress;
        formData.password = formData.password;

        if (passwordValidation(formData.password) && userValidation(formData.userName)
            && emailValidation(formData.mailAddress)) {
            console.log(formData);
        } else {
            alert("Please enter a valid password");
        }
        await axios.post('/addUser', {
            userDetails: formData
        }).then((res) => {
            console.log(res)//TODO:add handle succes edit
        });
        window.location.href = "/login"
    }


    return (
        <>
            <div>
                {/* <Link to={'/'}>Home</Link> */}
                <form onSubmit={onFormSubmit} id="addForm">
                    <label htmlFor="userName">user name</label><br />
                    <input type="text" name="userName" /><br />

                    <label htmlFor="mailAddress">mail address</label><br />
                    <input type="text" name="mailAddress" /><br />

                    <label htmlFor="password">password</label><br />
                    <input type="text" name="password" /><br />
                </form>
                <br />
                <button type="submit" form="addForm" value="Submit">register</button>
            </div>
            <div>
                <p>please insert a valid letters only! </p>
                <p>no:<b>  !#$%^&*()_+\- </b> </p>
                <p>password greater then 8 letters only </p>
            </div>
        </>

    )
}

export default SignUpPage;