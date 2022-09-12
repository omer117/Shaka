import { useParams } from "react-router-dom"
import axios from "axios"
import { useEffect, useRef, useState } from "react";
import "./ShopSingleViewPage.scss"
import ShakaLogoComponent from '../../../Components/ShakaLogoComponent/ShakaLogoComponent'
import { Button } from "@mui/material";

let productAdded = []

function ShopSingleViewPage(props) {
    let [product, setProducts] = useState({ sizes: [] })
    let [Chosensize, setSize] = useState({})
    let [moreProducts, setMoreProducts] = useState({})
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
            axios.post('/getProduct',
                [catagory.id, catagory.catagory])
                .then((response) => setProducts(JSON.parse(response.data)))
                .catch((err) => console.log(err))
        }
    }, [])

    console.log(moreProducts);

    useEffect(() => {
        if (!isValidParams(catagory.catagory)) {
            axios.post('/youMayLike', [catagory.catagory])
                .then((response) => setMoreProducts(JSON.parse(response.data)))
                .catch((err) => console.log(err))
        }
    }, [])




    // addToCart function, Pretty self explanatory 
    const addToCart = () => {
        if (isNaN(Number(Chosensize))) {
            alert('Please Select a size')
        }
        else {
            let newProduct = {
                id: product.id,
                title: product.title,
                price: product.price,
                size: Chosensize,
                image: product.image
            }
            productAdded.push(newProduct)
            localStorage.setItem(`productsInCart`, JSON.stringify(productAdded));
            console.log(JSON.parse(localStorage.getItem(`productsInCart`)));
            console.log("added to cart")
        }
    }



    //function that handle the size of the product
    const sizeHandle = (e) => {
        setSize(e.target.innerText)
    }


    let sizeList = product.sizes.map((size) => {
        return (
            <Button
                variant="outlined"
                key={size}
                onClick={sizeHandle}
            >{size}
            </Button>)
    })


    return (
        <>
            <div className="mainContainer">
                <img className="productImage" src={product.image} />
                <div className="productInfo">
                    <h1>{product.title}</h1>
                    <p>{product.info}</p>
                </div>
            </div>
            <div className="productMoreInfo">
                <h2>{product.price}$</h2>
                <div className="productSizes">
                    <p>
                        please choose a size:
                    </p>
                    {sizeList}
                </div>
            </div>
            <Button
                onClick={addToCart}
                className="addToCartBtn"
                variant="contained">
                Add to Cart
            </Button>
            <div className="youMayDiv">
                <p>Things you may like</p>
            </div>
        </>
    )
}

export default ShopSingleViewPage