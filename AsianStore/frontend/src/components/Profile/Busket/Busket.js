import React, {useEffect, useState} from "react";
import styles from "./Busket.module.css";
import ConnectService from "../../../services/Connect";
import ProductCard from "../../ProductCard/ProductCard";


const Busket = (props) => {
    console.log(props.cartItems)
    const [cartItemsList, setCartItemsList] = useState([])

    useEffect(() => {
        ConnectService.getDinamycCart(props.cartItems)
            .then((response) => {
                setCartItemsList(response.data);
                console.log(cartItemsList)}
            )
    }, []);

    return (
        <div>
            <div className={styles.head_wrapper}>
                <h2 className={styles.he}>Busket</h2>
                <button className={styles.do_offer_bt}>Оформить заказ</button>
            </div>

            <div className={styles.cart_items_list}>
                {cartItemsList.map((product) => (
                    <ProductCard type={"del"} {...product}/>
                ))}
                {cartItemsList.map((product) => (
                    <ProductCard {...product}/>
                ))}
                {cartItemsList.map((product) => (
                    <ProductCard {...product}/>
                ))}
            </div>
        </div>
    )
}


export default Busket;