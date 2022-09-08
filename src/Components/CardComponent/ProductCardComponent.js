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
import { log } from 'util';




let productAdded = []
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
        console.log(size)
    };



    //add to cart function 
    const addToCart = () => {
        if (isNaN(Number(size))) {
            alert('Please Select a size')
        }
        else {
            let newProduct = {
                id: props.data.id,
                title: props.data.title,
                price: props.data.price,
                size: size,
                image: props.data.image
            }
            productAdded.push(newProduct)
            localStorage.setItem(`productsInCart`, JSON.stringify(productAdded));
            console.log("added to cart")
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
                            gutterBottom
                            variant="h7"
                            className="product-title"
                            component="div">
                            {props.data.title}
                        </Typography>
                        <Typography
                            className="product-price"
                            variant="body1">
                            {`$${props.data.price}`}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            onClick={addToCart}
                            className="addToCartBtn"
                            variant="contained">
                            Add to Cart
                        </Button>
                        <Button
                            className="moreInfoButton"
                        >
                            <Link to={`/shop/${catagory}/${props.data.id}`}>
                                More Info
                            </Link>
                        </Button>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">size</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={props.data.sizes[1]}
                                onChange={handleChange}
                                label="Age"
                            >
                                {sizeList}
                            </Select>
                        </FormControl>
                    </CardActions>
                </Card>
            </Grid>
        </>
    )
}

export default ProductCardComponent;