import "./ShopSingleViewPage.scss"
import axios from "axios"
import ProductCardComponent from "../../../Components/CardComponent/ProductCardComponent"
import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Grid } from '@mui/material';
import LoadingComponent from "../../../Components/LoadingComponent/LoadingComponent";



function ShopSingleViewPage(props) {
    let [product, setProducts] = useState({ sizes: [] })
    let [Chosensize, setSize] = useState({})
    let [moreProducts, setMoreProducts] = useState({})
    let [extraproducts, setExtraProducts] = useState({})

    const catagory = useParams()

    function isValidParams(name) {
        const specialCharsForName = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return specialCharsForName.test(name)
    }

    useEffect(() => {
        if (isNaN(Number(catagory.id)) && isValidParams(catagory.catagory)) {
            alert('no sqli in here sryyy')
            window.location.href = "/"
        }
        else {
            axios.get(
                `https://shaka-nest-remastered.onrender.com/products/${catagory.id}`)
                .then((response) => setProducts((response.data)))
                .catch((err) => console.log(err))
        }
    }, [])


    useEffect(() => {
        if (!isValidParams(catagory.catagory)) {
            axios.post('https://shaka-nest-remastered.onrender.com/products/youMayLike', {catagory:catagory.catagory})
                .then((response) => setMoreProducts((response.data)))
                .catch((err) => console.log(err))
        }
    }, [])

    useEffect(() => {
        if (moreProducts.length > 0) {
            let productList = moreProducts.map((moreProduct) => {
                return (<ProductCardComponent DoWantToRender={false} className="id" key={moreProduct.id} data={moreProduct} />);
            });
            setExtraProducts(productList)
        }
    }, [moreProducts])


    // addToCart function, Pretty self explanatory 
    const addToCart = () => {
        let newProduct = {
            catagory: catagory.catagory,
            id: product.product_id,
            title: product.title,
            price: product.price,
            size: Chosensize,
            image: product.image
        }
        props.addProducts([...props.productsInCart, newProduct])
        console.log("added to cart")

    }



    //function that handle the size of the product
    const sizeHandle = (e) => {
        setSize(e.target.innerText)
    }

    console.log(product);

    let sizeList = product.sizes.map((size) => {
        return (
            <Button
                className="sizeBtn"
                variant="outlined"
                key={size}
                onClick={sizeHandle}
            >{size}
            </Button>)
    })


    return (
        <>
            {props.user === 'admin' ? <Button className="ToAdd"><Link to={`/shop/${catagory.catagory}/${catagory.id}/editProduct`}>Edit!</Link></Button> : <></>}
            <div className="mainContainer">
                <img className="productImage" alt={product.title} src={product.image} />
                <div className="productInfo">
                    <h1>{product.title}</h1>
                    <p>{product.info}</p>
                </div>
            </div>
            <div className="productMoreInfo">
                <h2>price: {product.price}$</h2>
                <div className="productSizes">
                    <p>
                        please choose a size:
                    </p>
                    {sizeList}
                </div>
            </div>
            <Button
                onClick={addToCart}
                className="adminFunctionsBtn"
                variant="contained">
                Add to Cart
            </Button>
            <div className="youMayDiv">
                <h2>Things you may like</h2>
                <Grid container
                    spacing={4}
                    className="specific-catagory-container"
                    style={{
                        marginTop: '10px',
                        marginBottom: '10px',
                        alignItems: 'center',
                    }}
                >
                    {extraproducts.length !== undefined ? extraproducts : <LoadingComponent/>}
                </Grid>
            </div>
        </>
    )
}

export default ShopSingleViewPage