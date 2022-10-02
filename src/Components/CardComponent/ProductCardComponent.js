import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./ProductCardComponent.scss"
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';



function ProductCardComponent(props) {
    let { catagory } = useParams();
    const [size, setSize] = useState({});


    //here we are handeling the size of the product
    //by 2 functions
    let sizeList = props.data.sizes.map((size) => {
        return (
            <MenuItem value={size} key={size}>{size}</MenuItem>
        )
    })

    const handleChange = (event) => {
        setSize(event.target.value);
    };


    //add to cart function 
    const addToCart = () => {

        let newProduct = {
            id: props.data.id,
            title: props.data.title,
            price: props.data.price,
            size: size,
            image: props.data.image
        }
        props.addProducts([...props.productsInCart, newProduct])
        console.log("added to cart")
    }


    function ConditionalLink() {
        if (catagory === undefined || props.DoWantToRender === false) {
            return (
                <>
                    <Button
                        variant='outlined'
                        className="moreInfoButton"
                    >
                        <Link to={`/shop/sup/${props.data.id}`}>
                            More Info
                        </Link>
                    </Button>
                </>
            )
        } else {
            return (
                <>
                    <Button
                        onClick={addToCart}
                        className="addToCartBtn"
                        variant="contained">
                        Add to Cart
                    </Button>
                    <Button
                        variant='outlined'
                        className="moreInfoButton"
                    >
                        <a href={`/shop/${catagory}/${props.data.id}`}>
                            More Info
                        </a>
                    </Button>
                </>
            )
        }
    }


    return (
        <>
            <Grid item xs={12} sm={6} md={4}>
                <Card className="product-card">
                    <CardMedia
                        className="product-image"
                        component="img"
                        height="155"
                        image={props.data.image}
                    />
                    <CardContent>
                        <Typography
                            variant="h1"
                            className="product-title"
                            component="div">
                            {props.data.title}
                        </Typography>
                    </CardContent>
                    <CardContent className="priceAndSizeDiv">
                        <Typography
                            className="product-price"
                            variant="body1">
                            {`price: $${props.data.price}`}
                        </Typography>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 70 }}>
                            <InputLabel id="demo-simple-select-standard-label">size</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                defaultValue={""}
                                onChange={handleChange}
                                label="Age"
                            >
                                {sizeList}
                            </Select>
                        </FormControl>
                    </CardContent>
                    <CardActions className='card-actions'>
<ConditionalLink/>
                    </CardActions>
                </Card>
            </Grid>
        </>
    )
}

export default ProductCardComponent;