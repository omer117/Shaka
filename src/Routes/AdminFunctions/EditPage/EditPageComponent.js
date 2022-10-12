import "./EditPageComponent.scss";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const defaultState = {
    title: "",
    price: 0,
    info: "",
    sizes: [],
    image: "",
};

function EditPageComponent({ user }) {
    const [product, setProduct] = useState(defaultState);
    const [price, setPrice] = useState(0);
    const [sizes, setSizes] = useState("");
    const details = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        if (user !== "admin") {
            window.location.href = "404";
        }
        axios.get(`http://localhost:9001/products/${details.id}`)
            .then((response) => setProduct(response.data))
            .catch((err) => console.log(err));
    }, [user, details]);

    useEffect(() => {
        setPrice(product.price);
    }, [product.price]);

    useEffect(() => {
        setSizes(product.sizes?.join(","));
    }, [product.sizes]);


    const onFormSubmit = async (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        formData = Object.fromEntries(formData);
        formData.catagory = details.catagory;
        formData.price = Number(formData.price);
        await axios.patch(`http://localhost:9001/products/${details.id}`, {
            catagory: formData.catagory,
            title: formData.title,
            price: formData.price,
            info: formData.info,
            sizes: (formData.sizes).split(','),
            image: formData.image,
        })
            .then((res) => {
                console.log(res); //TODO:add handle succes edit
            })
            .catch((err) => {
                console.log(err);
            });
        window.location.href = "/";
    };

    const deleteHandler = async () => {
        await axios.delete(`http://localhost:9001/products/${details.id}`)
            .then((res) => {
                console.log(res); //TODO:add handle succes edit
            })
            .catch((err) => {
                console.log(err);
            });
        navigate("/", { replace: true })
    };

    const handlePriceChange = (e) => {
        setProduct((prev) => ({ ...prev, price: e.target.value }));
    };

    const handleImageChange = (e) => {
        setProduct((prev) => ({ ...prev, image: e.target.value }));
    };

    if (user === "admin") {
        return (
            <>
                <div id="editProductFormDiv">
                    <form onSubmit={onFormSubmit} id="EditProductForm">
                        <TextField
                            required
                            className="text-field"
                            label="title"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            type="text"
                            name="title"
                            multiline
                            maxRows={2}
                            defaultValue={product.title}
                        />

                        <TextField
                            required
                            className="text-field"
                            label="price"
                            variant="outlined"
                            inputProps={{
                                inputMode: "numeric",
                                pattern: "[0-9]*",
                                shrink: true,
                            }}
                            name="price"
                            value={price}
                            onChange={handlePriceChange}
                        />

                        <TextField
                            required
                            className="text-field"
                            label="info"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            type="text"
                            name="info"
                            multiline
                            maxRows={5}
                            defaultValue={product.info || ""}
                        />

                        <TextField
                            required
                            className="text-field"
                            label="sizes"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            type="text"
                            name="sizes"
                            value={sizes}
                        />

                        <TextField
                            required
                            name="image"
                            className="text-field"
                            label="image"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            type="text"
                            value={product.image}
                            onChange={handleImageChange}
                        />
                    </form>
                    <br />
                    <Button className="adminFunctionsBtn" onClick={deleteHandler}>
                        Delete product
                    </Button>
                    <Button
                        className="adminFunctionsBtn"
                        type="submit"
                        form="EditProductForm"
                        value="Submit"
                    >
                        edit Product!
                    </Button>
                </div>
            </>
        );
    } else {
        return <></>;
    }
}

export default EditPageComponent;
