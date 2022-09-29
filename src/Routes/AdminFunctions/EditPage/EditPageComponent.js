import './EditPageComponent.scss'
import axios from 'axios';
import { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useParams, Link } from 'react-router-dom';




function EditPageComponent(props) {
    let [product, setProduct] = useState({ title: "", price: 0, info: "", sizes: [], image: "" })
    let details = useParams()
    const {title, price, info, sizes,image} = product
    useEffect(() => {
        if (props.user !== 'admin') {
            window.location.href = '404'
        }



        axios.post('https://shakaserver2.herokuapp.com/getProduct',
            [details.id, details.catagory])
            .then((response) => setProduct(JSON.parse(response.data)))
            .catch((err) => console.log(err))

        console.log((product));
    }, [details, props.user, product])


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
        }).catch((err) => {
            console.log(err);
        });


        await axios.post('/addProduct', {
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

    const deleteHandler = async () => {
        await axios.post('/deleteProduct', {
            sqlString: `DELETE FROM ${details.catagory} WHERE id=${details.id}`,
        }).then((res) => {
            console.log(res)//TODO:add handle succes edit
        }).catch((err) => {
            console.log(err);
        });
        window.location.href = "/";
    }

    const handleChange = (e) => {
    setProduct( (prev) =>{
    return {...prev, price: e.value}
    })
    }

    if (props.user === 'admin') {

        return (

            <>
                <Button className='adminFunctionsBtn'><Link to={'/'}>Home</Link></Button>
                <div id='editProductFormDiv'>
                    <form onSubmit={onFormSubmit} id="EditProductForm">

                        <TextField
                            className='text-field'
                            label="Title"
                            variant="outlined"
                            htmlFor="Title"
                            type="text"
                            name="Title"
                            multiline
                            maxRows={2}
                            defaultValue={product.title}
                        />

                        <TextField
                            className='text-field'
                            label="price"
                            variant="outlined"
                            htmlFor="price"
                            type="number"
                            name="price"
                            value={price}
                            onChange={handleChange}
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
                            defaultValue={product.info || ""}
                        />


                        <TextField
                            className='text-field'
                            label="sizes"
                            variant="outlined"
                            htmlFor="sizes"
                            type="text"
                            name="sizes"
                            defaultValue={product.sizes?.join(', ') || ""}
                        />


                        <TextField
                            className='text-field'
                            label="image Link"
                            variant="outlined"
                            htmlFor="imgLink"
                            type="text"
                            defaultValue={product.image}
                        />

                    </form>
                    <br />
                    <Button className="adminFunctionsBtn" onClick={deleteHandler}>Delete product</Button>
                    <Button className="adminFunctionsBtn" type="submit" form="EditProductForm" value="Submit">edit Product!</Button>
                </div>
            </>

        )
    } else {
        return (<></>)
    }

}

export default EditPageComponent;