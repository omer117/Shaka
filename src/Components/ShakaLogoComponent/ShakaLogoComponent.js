import { useRef } from "react";
import { useParams } from "react-router-dom";
import "./ShakaLogoComponent.scss";


function ShakaLogoComponent(props){
const pageSelector = useRef();


    return(
        <div 
        className={`ShakaLogoShop ${props.class1}`}
        >
                <span>
                    S H A K A
                </span>
            </div>
    )
}

export default ShakaLogoComponent;