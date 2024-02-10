import React, {useState} from "react";
import styles from "./Profile.module.css";
import Favourites from "./Favourites/Favourites";
import Busket from "./Busket/Busket";
import Orders from "./Orders/Orders";
import UserData from "./UserData/UserData";


const Profile = (props) => {
    const [currentTab, setCurrentTab] = useState(props.currentTab || "busket");

    const toggleTab = (tab) => {
        setCurrentTab(tab);
    }

    const switchTab = () => {
        switch (currentTab) {
            case "favourites":
                return <Favourites {...props}/>;
            case "orders":
                return <Orders {...props}/>;
            case "userdata":
                return <UserData {...props}/>;
            case "busket":
                return <Busket {...props}/>;
        }
    }

    return (
        <div className={styles.profile}>
            <h2 className={styles.page_title}>Личный кабинет</h2>
            <div className={styles.content_wrapper}>
                <ul className={styles.profile_menu}>
                    <li className={styles.menu_label}
                        onClick={() => toggleTab("favourites")}>Избранное
                    </li>
                    <li className={styles.menu_label}
                        onClick={() => toggleTab("busket")}>Корзина
                    </li>
                    <li className={styles.menu_label}
                        onClick={() => toggleTab("orders")}>Мои заказы
                    </li>
                    <li className={styles.menu_label}
                        onClick={() => toggleTab("userdata")}>Мои данные
                    </li>
                </ul>
                <div className={styles.info_block}>
                    {switchTab()}
                </div>
            </div>
        </div>

    )
}

export default Profile;