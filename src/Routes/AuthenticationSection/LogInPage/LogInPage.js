import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { log } from 'util';




function LogInPage() {
const [user, setUser] = useState({})




let passwordValidation =  (password) =>{
    if(password.length<=8) return false
    else return true
}



console.log(passwordValidation('asdfds8978321'))
    

const onFormSubmit = async (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        formData = Object.fromEntries(formData)
        formData.mailAddress = formData.mailAddress;
        formData.password = formData.password;

        if(passwordValidation(formData.password)){
            console.log(formData);
        }else{
            alert("Please enter a valid password");
        }
        await axios.post('/CheckLogIn', {
            userDetails: formData
        }).then((res) => {
            setUser(res.data)
        }).catch((err) => {
console.log(err);
        });
        // window.location.href = "/"
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