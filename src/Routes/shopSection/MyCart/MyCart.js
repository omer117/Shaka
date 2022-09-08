import "./MyCart.scss"

import { Button } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

function MyCart() {
    let products = JSON.parse(localStorage.getItem('productsInCart'));
    console.log(products.length);

        
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
                {/* <h2>price: {overAllPrice} </h2> */}
                <Button>Buy Now</Button>
            </div>
        </>
    )
}

export default MyCart;