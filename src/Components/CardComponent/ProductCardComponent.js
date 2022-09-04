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



    console.log(catagory);
    return (
        <>
            <Grid item xs={12} sm={6} md={4}>
                <Link to={`/shop/${catagory}/${props.data.id}`}>
                    <Card className="product-card">
                        <CardMedia
                            className="product-image"
                            component="img"
                            height="199"
                            image={props.data.image}
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="subtitle1"
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
                            <Button>
                                Add to Cart
                            </Button>
                        </CardActions>
                    </Card>
                </Link>
            </Grid>
        </>
    )
}

export default ProductCardComponent;