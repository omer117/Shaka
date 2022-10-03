import "./EditPageComponent.scss";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";

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

        axios
            .post("https://shakaserver2.herokuapp.com/getProduct", [
                details.id,
                details.catagory,
            ])
            .then((response) => setProduct(JSON.parse(response.data)))
            .catch((err) => console.log(err));
    }, [user, details]);

    useEffect(() => {
        setPrice(product.price);
    }, [product.price]);

    useEffect(() => {
        setSizes(product.sizes?.join(","));
    }, [product.sizes]);

    console.log(product);

    const onFormSubmit = async (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        formData = Object.fromEntries(formData);
        formData.catagory = details.catagory;
        formData.title = formData.title;
        formData.price = Number(formData.price);
        formData.info = formData.info;
        formData.sizes = formData.sizes;
        formData.imgLink = formData.imgLink;
        console.log(formData);

        await axios
            .post("https://shakaserver2.herokuapp.com/deleteProduct", {
                sqlString: `DELETE FROM ${details.catagory} WHERE id=${details.id}`,
            })
            .then((res) => {
                console.log(res); //TODO:add handle succes edit
            })
            .catch((err) => {
                console.log(err);
            });

        await axios
            .post("https://shakaserver2.herokuapp.com/addProduct", {
                sqlString: `
            INSERT INTO ${formData.catagory} (title,price,info,sizes,image)
            VAlUES ('${formData.title}', ${formData.price},'${formData.info}','{${formData.sizes}}','${formData.imgLink}');                            
            `,
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
        await axios
            .post("https://shakaserver2.herokuapp.com/deleteProduct", {
                sqlString: `DELETE FROM ${details.catagory} WHERE id=${details.id}`,
            })
            .then((res) => {
                console.log(res); //TODO:add handle succes edit
            })
            .catch((err) => {
                console.log(err);
            });
            navigate("/",{ replace: true })
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
                            label="Title"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            type="text"
                            name="Title"
                            multiline
                            maxRows={2}
                            defaultValue={product.title}
                        />

                        <TextField
                            required
                            className="text-field"
                            label="Price"
                            variant="outlined"
                            inputProps={{
                                inputMode: "numeric",
                                pattern: "[0-9]*",
                                shrink: true,
                            }}
                            name="Price"
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
                            defaultvalue={sizes}
                        />

                        <TextField
                            required
                            className="text-field"
                            label="image Link"
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
