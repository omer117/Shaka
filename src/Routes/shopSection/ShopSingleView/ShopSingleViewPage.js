import { useParams } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react";


function ShopSingleViewPage(props) {
    let [product,setProducts] = useState({})
    const catagory = useParams()

    
console.log(catagory)

    useEffect(() => {        
        axios.post('/getProduct',
            [catagory.id, catagory.catagory]
        ).then((response) => {
            setProducts(JSON.parse(response.data));
            // console.log(response);
        }).then((err) => {
            console.log(err);
        })
    }, [])
    
    console.log(product);
    return (
        <div>
        </div>
    )
}

export default ShopSingleViewPage