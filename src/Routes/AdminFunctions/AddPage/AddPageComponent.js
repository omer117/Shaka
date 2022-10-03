import './AddPageComponent.scss'
import axios from 'axios';
import { useState } from 'react'
import { useNavigate} from 'react-router-dom'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function AddPageComponent(props) {
    const [catagory, setCatgory] = useState({})
    let catagorys = ['boogi', 'mansuit', 'sup', 'soft', 'womansuit']
    const navigate = useNavigate();


    let catagoryList = catagorys.map((catagory) => {
        return (
            <MenuItem value={catagory || ""} key={catagory}>{catagory}</MenuItem>
        )
    })

    const handleChange = (event) => {
        setCatgory(event.target.value);
    };

    if (props.user !== 'admin') {
        navigate("/",{ replace: true })
    }

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

        
        navigate("/",{ replace: true })
    }

    if (props.user == 'admin') {

        return (
            <>
                <div className='formDiv'>
                    <FormControl required  id="catagorySelect" variant="standard" sx={{ m: 1, minWidth: 70 }}>
                        <InputLabel required>catagory</InputLabel>
                        <Select
                            onChange={handleChange}
                        >
                            {catagoryList}
                        </Select>
                    </FormControl>
                    <form onSubmit={onFormSubmit} id="addProductForm" className='addProductFormDiv'>
                        <TextField
                            required
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
                            required
                            className='text-field'
                            label="Price"
                            variant="outlined"
                            htmlFor="price"
                            type="number"
                            name="price"

                        />

                        <TextField
                            required
                            className='text-field'
                            label="Info"
                            variant="outlined"
                            htmlFor="info"
                            type="text"
                            name="info"
                            multiline
                            maxRows={5}
                        />


                        <TextField
                            required
                            className='text-field'
                            label="Sizes"
                            variant="outlined"
                            htmlFor="sizes"
                            type="text"
                            name="sizes"
                        />


                        <TextField
                            className='text-field'
                            label="Image Link"
                            required
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
    } else {
        return <>
            nope
        </>
    }
}

export default AddPageComponent;