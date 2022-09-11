import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function LogInPage() {
const [user, setUser] = useState({})
const [usersDetails, setDetails] = useState([])

useEffect(()=>{
axios.get('/getMailUser')
.then((res)=>setDetails(res.data))
.catch((err)=>console.log(err));
},[])


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
console.log(usersDetails);
    

const onFormSubmit = async (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        formData = Object.fromEntries(formData)
        formData.mailAddress = formData.mailAddress;
        formData.password = formData.password;

        if(emailValidation(formData.mailAddress)&& passwordValidation(formData.password)){
            await axios.post('/CheckLogIn', {
                userDetails: formData
            }).then((res) => {
                setUser(res.data)
            }).catch((err) => {
    console.log(err);
            });
            window.location.reload();
            window.location.href = "/"
        }else{
            alert("Password or email validation failed");
        }
    }

    useEffect(() =>{
        localStorage.setItem("user", JSON.stringify(user))
        console.log(JSON.parse(localStorage.getItem("user")));
})

    return (
        <div>
            <Link to={'/'}>Home</Link>
            <form onSubmit={onFormSubmit} id="LogInForm">

                <label htmlFor="mailAddress">mail address</label><br />
                <input type="text" name="mailAddress" /><br />

                <label htmlFor="password">password</label><br />
                <input type="text" name="password" /><br />
            </form>
            <br />
            <button type="submit" form="LogInForm" value="Submit">Log In</button>
            <Link to="/signUp">Register</Link>
        </div>

    )

}

export default LogInPage;