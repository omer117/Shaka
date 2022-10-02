import "./MyCart.scss"
import { Button } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

function MyCart(props) {


    function OverAllPrice() {
        let price = 0;
        for (let i = 0; i < props.productsInCart.length; i++) {
            price += Number(props.productsInCart[i].price);
        }
        return <h1>price: {price}$</h1>
    }


    const deleteBtn = (productId) => {
        let product = props.productsInCart.filter(product => product.id !== productId)
        props.addProducts(product)
    }

    let productsElement = props.productsInCart.map((product) => {
        return (
            <div className="mainProductDiv" key={product.id}>
                <div className="productInfo">
                    <img src={product.image} alt={product.title} />
                    <div className="productInfoSpecific">
                        <p className="title">{product.title}</p>
                        <p>size: {product.size}</p>
                        <p>price: {product.price}</p>
                    </div>
                </div>
                <div className="deleteBtn" >
                    <Button
                        variant="contained"
                    onClick={() => deleteBtn(product.id)}
                    ><ClearIcon /></Button>
                </div>
            </div>
        )
    })

    return (
        <>
            <h1>My cart:</h1>
            <div className="productsInCart">
                {productsElement}
            </div>
            <div className="dealFinishing">
                <div><OverAllPrice /> </div>
                <Button
                    variant="contained"
                    className="buyBtn"
                >Buy Now</Button>
            </div>
        </>
    )
}

export default MyCart;