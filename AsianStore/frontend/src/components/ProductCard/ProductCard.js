import React from "react";
import styles from "./ProductCard.module.css";
import {Link} from "react-router-dom";


const ProductCard = (props) => {
    return (
        <div className={styles.product_card}>
            <div className={styles.img_wrapper}>
                <img src={props.main_image} alt="" />
            </div>
            <div className={styles.product_info_wrapper}>
                <p className={styles.name}>{props.name}</p>
                <div className={styles.price_btn_wrapper}>
                    <p className={styles.price}>{props.price} &#8381;</p>
                    <button className={styles.btn_add_to_cart}>В корзину</button>
                    <Link to={`product/${1}`}>подробнее...</Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;