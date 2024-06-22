import React from "react";
import styles from "./Footer.module.css";


const Footer = () => {
    return (
        <div className={styles.footer_wrapper}>
            <footer>
                <p className={styles.company_name}>Asian Equipment Store</p>
                <div className={styles.data}>
                    <p>Адрес: <br/>Ул. Молодых миллионеров, 12</p>
                    <p>nifiganeprodam@mail.cry</p>
                    <p>+7 (800) 555-35-35</p>
                </div>
                <div className={styles.data}>
                    <p>&copy; 2023 Asian Equipment Store</p>
                    <p>Древняя Римская Империя</p>
                </div>
            </footer>
        </div>
    )
}

export default Footer;