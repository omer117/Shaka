import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./ProductCardComponent.scss"
import Grid from '@mui/material/Grid';
import { Link, useParams } from 'react-router-dom';


function ProductCardComponent(props) {

    let { catagory } = useParams();
    

    // const addToCart = () => {


    //     let productAdded = {
    //         name: props.data.title,
    //         price: props.data.price
    //     }
    //     localStorage.setItem('1',JSON.stringify(productAdded));
    //     console.log(window.localStorage.getItem('1'));
    //     console.log("added to cart")

    // }


    // console.log(catagory);
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