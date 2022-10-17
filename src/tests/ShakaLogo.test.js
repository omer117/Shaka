import {render, screen} from "@testing-library/react"
import ShakaLogoComponent from "../Components/ShakaLogoComponent/ShakaLogoComponent"
import toBeInTheDocument from '@testing-library/jest-dom'

it('Renders the logo', ()=>{
    render(<ShakaLogoComponent/>);
    const logoElement = screen.getByText(/S H A K A/i);
    expect(logoElement).toBeInTheDocument()
});