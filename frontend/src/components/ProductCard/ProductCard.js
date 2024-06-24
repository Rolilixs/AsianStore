import React, {useState} from "react";
import styles from "./ProductCard.module.css";
import {Link} from "react-router-dom";
import ConnectService from "../../services/Connect";


const ProductCard = (props) => {
    const addToFav = () => {
        // Проверка на авторизованность
        console.log(typeof props.id)
        ConnectService.favouritesCreate(props.token, props.id)
    }
    // const [type, setType] = useState("")
    // if (props.type === "del") {
    //     setType("Удалить");
    // } else {
    //     setType("В корзину");
    // }
    const buttonHandler = (item) => {
        props.addToCart_bt(item)
    }
    return (
        <div className={styles.product_card}>
            <div className={styles.img_wrapper}>
                <img src={props.main_image} alt=""/>
                {props.token !== null ?
                    <button className={styles.add_to_fav_bt} onClick={addToFav}>
                        <svg width="28" height="20" viewBox="0 0 62 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M56.8772 5.17973C53.8215 2.12741 49.6791 0.412925 45.36 0.412925C41.041 0.412925 36.8986 2.12741 33.8428 5.17973L30.9991 8.02348L28.1553 5.17973C26.6524 3.62775 24.8558 2.39029 22.87 1.53943C20.8842 0.688564 18.749 0.241302 16.5887 0.223686C14.4283 0.20607 12.2861 0.618454 10.2867 1.43682C8.28729 2.25519 6.47069 3.46318 4.9427 4.99045C3.4147 6.51772 2.20585 8.33374 1.38653 10.3328C0.567214 12.3318 0.153812 14.4738 0.170402 16.6341C0.186992 18.7945 0.633241 20.9299 1.48316 22.9161C2.33308 24.9023 3.56968 26.6995 5.12095 28.2032L30.1897 53.25C30.3382 53.3991 30.5293 53.4985 30.7366 53.5344H31.0319C31.1758 53.5352 31.3185 53.5077 31.4518 53.4532C31.585 53.3988 31.7063 53.3186 31.8085 53.2172L56.8772 28.2032C59.9148 25.153 61.6203 21.0235 61.6203 16.7188C61.6203 12.414 59.9148 8.28462 56.8772 5.23442V5.17973ZM55.3241 26.661L30.9991 50.986L6.67408 26.661C4.02999 24.0154 2.54514 20.4279 2.54616 16.6876C2.54719 12.9473 4.03401 9.36053 6.67955 6.71645C9.32508 4.07236 12.9126 2.58751 16.6529 2.58854C20.3933 2.58956 23.98 4.07638 26.6241 6.72192L30.2335 10.3422C30.3351 10.4447 30.4561 10.5261 30.5894 10.5816C30.7227 10.6372 30.8656 10.6658 31.01 10.6658C31.1544 10.6658 31.2974 10.6372 31.4306 10.5816C31.5639 10.5261 31.6849 10.4447 31.7866 10.3422L35.3741 6.72192C38.0182 4.07638 41.6049 2.58956 45.3452 2.58854C49.0855 2.58751 52.6731 4.07236 55.3186 6.71645C57.9641 9.36053 59.451 12.9473 59.452 16.6876C59.453 20.4279 57.9682 24.0154 55.3241 26.661Z"
                                fill="white"/>
                        </svg>
                    </button>
                    : null}
            </div>
            <div className={styles.product_info_wrapper}>
                <p className={styles.name}>{props.name}</p>
                <div className={styles.price_btn_wrapper}>
                    <p className={styles.price}>{props.price} &#8381;</p>
                    <button className={styles.btn_add_to_cart} onClick={() => buttonHandler(props.id)}>В корзину
                    </button>
                    <Link to={`product/${props.id}`}>подробнее...</Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;