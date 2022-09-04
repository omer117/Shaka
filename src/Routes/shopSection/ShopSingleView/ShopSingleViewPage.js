import { useParams } from "react-router-dom"
import axios from "axios"
import { useEffect } from "react";

function ShopSingleViewPage(props) {

    
    const catagory = useParams()
    let sqlStr = `SELECT * FROM ${catagory.catagory} WHERE id=${catagory.id}`
    
    // useEffect(()=>{
    //     axios.post('https://shakaserver2.herokuapp.com/getProduct', {
    //         id: catagory.id,
    //         catagory: catagory.catagory
    //         }).then((response) => {
    //                 console.log(response);
    //             }).then((err) => {
    //                 console.log(err);
    //             })
    //         },[])

    return (
        <div>
            {sqlStr}
        </div>
    )
}

export default ShopSingleViewPage