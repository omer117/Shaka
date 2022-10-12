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
import { useState } from 'react';



function ProductCardComponent(props) {
    let { catagory } = useParams();
    const [size, setSize] = useState({});


    //here we are handeling the size of the product
    //by 2 functions
    let sizeList = props.data.Products_sizes.map((size) => {
        return (
            <MenuItem value={size} key={size}>{size}</MenuItem>
        )
    })

    const handleChange = (event) => {
        setSize(event.target.value);
    };

    //add to cart function 
    const addToCart = () => {
if(!(typeof size === 'object')){

    let newProduct = {
        catagory:catagory,
        id: props.data.Products_product_id,
        title: props.data.Products_title,
        price: props.data.Products_price,
        size: size,
        image: props.data.Products_image
    }
    props.addProducts([...props.productsInCart, newProduct])
    console.log("added to cart")
}else{
    alert('please pick a size')
}
    }


    function ConditionalLink() {
        if (catagory === undefined || props.DoWantToRender === false) {
            return (
                <>
                    <Button
                        variant='outlined'
                        className="moreInfoButton"
                    >
                        <Link to={`/shop/sup/${props.data.Products_product_id}`}>
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
                        <Link to={`/shop/${catagory}/${props.data.Products_product_id}`}>
                            More Info
                        </Link>
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
                    alt={props.data.Products_title}
                        className="product-image"
                        component="img"
                        height="155"
                        image={props.data.Products_image}
                    />
                    <CardContent>
                        <Typography
                            variant="h1"
                            className="product-title"
                            component="div">
                            {props.data.Products_title}
                        </Typography>
                    </CardContent>
                    <CardContent className="priceAndSizeDiv">
                        <Typography
                            className="product-price"
                            variant="body1">
                            {`price: $${props.data.Products_price}`}
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