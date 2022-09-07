import { useParams } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react";
import "./ShopSingleViewPage.scss"
import ShakaLogoComponent from '../../../Components/ShakaLogoComponent/ShakaLogoComponent'


function ShopSingleViewPage(props) {
    let [product, setProducts] = useState({})
    const catagory = useParams()

    useEffect(() => {
        if (isNaN(Number(catagory.id))) {
            alert('no sqli in here sryyy')
            window.location.href = "/"
        }
        //to add another chack for sqli in catagory params
        else {
            axios.post('/getProduct',
                [catagory.id, catagory.catagory])
                .then((response) => setProducts(JSON.parse(response.data)))
                .catch((err) => console.log(err));
        }
    }, [])

    return (
        <>
        <ShakaLogoComponent class1="SingleView"/>
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