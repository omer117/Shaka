import {useParams} from "react-router-dom"
import { useState,useEffect } from "react";
import axios from "axios";

function ShopCatagoryPage(){

let {catagory} = useParams();

let [products, setProducts] = useState([]);
useEffect(() => {
    axios.get(`https://shakaserver2.herokuapp.com/getAll${catagory}`).then((res) => {
        setProducts(res.data);
    });
}, []);

console.log(products);

// let productList = products.map((product) => {
//     return (<SockCard key={product.sock_id} data={product} />);
// });

console.log(catagory);
return(

<>

<div>hiiiiiiiiiiiiiiiiiiiiiiiii</div>
</>
)
}

export default ShopCatagoryPage;