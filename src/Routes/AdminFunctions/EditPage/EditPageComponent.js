import axios from 'axios';
import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useParams } from 'react-router-dom';

function isValidParams(name) {
    const specialCharsForName = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialCharsForName.test(name)
}



function EditPageComponent(props) {
    let [product, setProduct] = useState({})
    let details = useParams()


    useEffect(() => {

        if (isNaN(Number(details.id)) && isValidParams(details.catagory)) {
            axios.post('/getProduct',
                [details.id, details.catagory])
                .then((response) => setProduct(JSON.parse(response.data)))
                .catch((err) => console.log(err))
        } else {
            alert('nope')
        }
    }, [])


    const onFormSubmit = async (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        formData = Object.fromEntries(formData)
        formData.catagory = details.catagory
        formData.title = formData.title;
        formData.price = Number(formData.price);
        formData.info = formData.info;
        formData.sizes = (formData.sizes);
        formData.imgLink = formData.imgLink;
        console.log(formData)

        await axios.post('/deleteProduct', {
            sqlString: `DELETE FROM ${details.catagory} WHERE id=${details.id}`,
        }).then((res) => {
            console.log(res)//TODO:add handle succes edit
        }).catch((err)=>{
            console.log(err);
        });


        await axios.post('/addProduct', {
            sqlString: `
            INSERT INTO ${formData.catagory} (title,price,info,sizes,image)
            VAlUES ('${formData.title}', ${formData.price},'${formData.info}','{${formData.sizes}}','${formData.imgLink}');                            
            `,
        }).then((res) => {
            console.log(res)//TODO:add handle succes edit
        }).catch((err)=>{
            console.log(err);
        });

        window.location.href = "/";
    }


    let deleteHandler = () => {

    }


    return (
        <>
            <div>
                {/* <Link to={'/'}>Home</Link> */}

                <form onSubmit={onFormSubmit} id="EditProductForm">
                    <label htmlFor="title">Title</label><br />
                    <input type="text" defaultValue={product.title || ""} name="title" /><br />

                    <label htmlFor="price">Price</label><br />
                    <input type="number" defaultValue={product.price} name="price" /><br />

                    <label htmlFor="info">Info</label><br />
                    <input type="text" defaultValue={product.info} name="info" /><br />

                    <label htmlFor="sizes">Sizes</label><br />
                    <input type="text" defaultValue={product.sizes} name="sizes" /><br />

                    <label htmlFor="imgLink">Image Link</label><br />
                    <input type="text" defaultValue={product.image} name="imgLink" /><br />

                </form>
                <br />
                <button onClick={deleteHandler}>Delete product</button>
                <button type="submit" form="EditProductForm" value="Submit">edit Product!</button>
            </div>
        </>

    )
}

export default EditPageComponent;