import React, {useEffect, useState} from "react";
import styles from "./Favourites.module.css";
import ProductCard from "../../ProductCard/ProductCard";
import ConnectService from "../../../services/Connect";

const Favourites = (props) => {
    const [productList, setProductList] = useState([])

    useEffect(() => {
        ConnectService.getFavourites(props.token)
            .then((response) => {
                setProductList(response.data)
            })
        console.log(productList)
    }, []);

    return (
        <div>
            <h2>Favourites</h2>
        </div>
    )
}

export default Favourites;