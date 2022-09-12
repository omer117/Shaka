import "./MyCart.scss"
import { useEffect } from 'react'
import { Button } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

function MyCart() {

    let products = JSON.parse(localStorage.getItem('productsInCart'));
    console.log(products);

    useEffect(() => {
        console.log('dsa')

    })

    function OverAllPrice() {
        let price = 0;
        for (let i = 0; i < products.length; i++) {
            price += products[i].price;
        }
        return <h1>price: {price}$</h1>
    }


    let productsElement = products.map((product) => {
        return (
            <div className="mainProductDiv" key={product.id}>
                <div className="productInfo">
                    <img src={product.image} alt={product.title} />
                    <div className="productInfoSpecific">
                        <p className="title">{product.title}</p>
                        <p>{product.size}</p>
                        <p>{product.price}</p>
                    </div>
                </div>
                <div className="deleteBtn">
                    <Button
                        variant="contained"
                    // onClick={deleteProduct}
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