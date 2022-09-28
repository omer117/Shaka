import './AddPageComponent.scss'
import axios from 'axios';
import { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function AddPageComponent(props) {
    const [catagory, setCatgory] = useState({})
    let catagorys = ['boogi', 'mansuit', 'sup', 'soft', 'womansuit']

    let catagoryList = catagorys.map((catagory) => {
        return (
            <MenuItem value={catagory || ""} key={catagory}>{catagory}</MenuItem>
        )
    })


    const handleChange = (event) => {
        setCatgory(event.target.value);
    };




    const onFormSubmit = async (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        formData = Object.fromEntries(formData)
        formData.catagory = catagory
        formData.title = formData.title;
        formData.price = Number(formData.price);
        formData.info = formData.info;
        formData.sizes = (formData.sizes);
        formData.imgLink = formData.imgLink;
        console.log(formData)

        await axios.post('https://shakaserver2.herokuapp.com/addProduct', {
            sqlString: `
            INSERT INTO ${formData.catagory} (title,price,info,sizes,image)
            VAlUES ('${formData.title}', ${formData.price},'${formData.info}','{${formData.sizes}}','${formData.imgLink}');                            
            `,
        }).then((res) => {
            console.log(res)//TODO:add handle succes edit
        }).catch((err) => {
            console.log(err);
        });

        window.location.href = "/";
    }


    return (
        <>
            <div >
                {/* <Link to={'/'}>Home</Link> */}
                <FormControl variant="standard" sx={{ m: 1, minWidth: 70 }}>
                    <InputLabel id="demo-simple-select-standard-label">catagory</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        onChange={handleChange}
                        label="Age"
                    >
                        {catagoryList}
                    </Select>
                </FormControl>
                <form onSubmit={onFormSubmit} id="addProductForm" className='addProductFormDiv'>
                    <TextField
                        className='text-field'
                        label="Title"
                        variant="outlined"
                        htmlFor="Title"
                        type="text"
                        name="Title"
                        multiline
                        maxRows={2}
                    />

                    <TextField
                        className='text-field'
                        label="price"
                        variant="outlined"
                        htmlFor="price"
                        type="number"
                        name="price"

                    />

                    <TextField
                        className='text-field'
                        label="info"
                        variant="outlined"
                        htmlFor="info"
                        type="text"
                        name="info"
                        multiline
                        maxRows={5}
                    />


                    <TextField
                        className='text-field'
                        label="sizes"
                        variant="outlined"
                        htmlFor="sizes"
                        type="text"
                        name="sizes"
                    />


                    <TextField
                        className='text-field'
                        label="imgLink"
                        variant="outlined"
                        htmlFor="imgLink"
                        type="text"
                        name="imgLink"
                    />

                </form>
                <br />

                <Button
                className='add-btn'
                    variant="contained"
                    type="submit"
                    form="addProductForm"
                    value="Submit"
                >add Product!
                </Button>
            </div>
        </>

    )
}

export default AddPageComponent;