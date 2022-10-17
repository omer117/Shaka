import React from "react";
import ReactDOM from "react-dom";
import FooterComponent from '../Components/FooterComponent/FooterComponent'
import {render} from  '@testing-library/react'
// it('renders without crashing',()=>{
//     const div = document.createElement('div');
//     root.render(<FooterComponent/>,div)
// })

it('renders footer correctely',()=>{
render(<FooterComponent/>)
})

it('need to link you to other place',()=>{
    
})