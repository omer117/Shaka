import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./ProductCardComponent.scss"
import Grid from '@mui/material/Grid';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';


let productAdded = []
function ProductCardComponent(props) {
    let { catagory } = useParams();

    useEffect(()=>{
        console.log(JSON.parse(localStorage.getItem(`${catagory}productsInCart`)));
    })


    const addToCart = () => {
        productAdded.push(props.data)
        localStorage.setItem(`${catagory}productsInCart`, JSON.stringify(productAdded));
        console.log(JSON.parse(localStorage.getItem(`${catagory}productsInCart`)));
        console.log("added to cart")
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
                    </CardActions>
                </Card>
            </Grid>
        </>
    )
}

export default ProductCardComponent;