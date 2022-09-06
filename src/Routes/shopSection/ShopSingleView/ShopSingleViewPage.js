import { useParams } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react";
import "./ShopSingleViewPage.scss"


function ShopSingleViewPage(props) {
    let [product, setProducts] = useState({})
    const catagory = useParams()


    console.log(catagory)

    useEffect(() => {
        axios.post('/getProduct',
            [catagory.id, catagory.catagory]
        ).then((response) => {
            setProducts(JSON.parse(response.data));
        }).then((err) => {
            console.log(err);
        })
    }, [])

    console.log(product);
    return (
        <>
            <div className="mainContainer">
                <img className="productImage" src={product.image} />
                <div className="SingleViewContainer">
                    sdfg
                </div>

            </div>
        </>
    )
}

export default ShopSingleViewPage