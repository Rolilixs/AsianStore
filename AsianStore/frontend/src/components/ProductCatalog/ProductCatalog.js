import React, {Component, useEffect, useState} from "react";
import styles from "./ProductCatalog.module.css";
import ProductCard from "./../ProductCard/ProductCard";
import ConnectService from "../../services/Connect";
import {useParams} from "react-router-dom";


const ProductCatalog = () => {
    const { id } = useParams();
    const [productsList, setProductsList] = useState([]);

    useEffect(() => {
        ConnectService.products(id)
            .then((response) => {
                setProductsList(response.data);
            })
    }, [id]);

    return (
        <div>
            <h2 className={styles.category_name}>Сковородки</h2>
            <div className={styles.product_list}>
                {productsList.map((product, index) => (
                    <ProductCard key={index} {...product} />
                ))}
                {productsList.map((product, index) => (
                    <ProductCard key={index} {...product} />
                ))}
                {productsList.map((product, index) => (
                    <ProductCard key={index} {...product} />
                ))}
            </div>
        </div>
    );
};

export default ProductCatalog;