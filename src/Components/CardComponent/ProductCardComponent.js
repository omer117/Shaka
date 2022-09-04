import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./ProductCardComponent.scss"
import Grid from '@mui/material/Grid';


function ProductCardComponent(props) {



    console.log(props.data.image);
    return (
        <>
<Grid item xs={12} sm={6} md={4}>

            <Card className="product-card">
                <CardMedia
                className="profuct-image"
                    component="img"
                    height="199"
                    image={props.data.image}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {props.data.title}
                    </Typography>
                    <Typography>
                        {props.data.price}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button>
                        Add to Cart
                    </Button>
                </CardActions>
            </Card>
                </Grid>
        </>
    )
}

export default ProductCardComponent;