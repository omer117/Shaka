import axios from 'axios';

function SignUpPage(props){
    
     const onFormSubmit = async (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        formData = Object.fromEntries(formData)
        formData.userName = formData.userName;
        formData.mailAddress = formData.mailAddress;
        formData.password = formData.password;
        console.log(formData)
        await axios.post('/addUser', {
            userDetails: formData
        }).then((res) => {
            console.log(res)//TODO:add handle succes edit
        });
        window.location.href = "/login"
    }

    return (
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

    )
}

export default SignUpPage;