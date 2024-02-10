import React, {Component} from "react";
import styles from "./Profile.module.css";
import Favourites from "./Favourites/Favourites";
import Busket from "./Busket/Busket";
import Orders from "./Orders/Orders";
import UserData from "./UserData/UserData";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: this.props.currentTab === undefined ? "busket" : this.props.currentTab,
        }
    }

    toggleTab = (tab) => {
        this.setState({currentTab: tab});
    }

    switchTab() {
        switch (this.state.currentTab) {
            case "favourites":
                return <Favourites {...this.props}/>;
            case "orders":
                return <Orders {...this.props}/>;
            case "userdata":
                return <UserData {...this.props}/>;
            case "busket":
                return <Busket {...this.props}/>;
        }
    }

    render() {
        return (
            <div className={styles.profile}>
                <h2 className={styles.page_title}>Личный кабинет</h2>
                <div className={styles.content_wrapper}>
                    <ul className={styles.profile_menu}>
                        <li className={styles.menu_label}
                            onClick={() => this.toggleTab("favourites")}>Избранное
                        </li>
                        <li className={styles.menu_label}
                            onClick={() => this.toggleTab("busket")}>Корзина
                        </li>
                        <li className={styles.menu_label}
                            onClick={() => this.toggleTab("orders")}>Мои заказы
                        </li>
                        <li className={styles.menu_label}
                            onClick={() => this.toggleTab("userdata")}>Мои данные
                        </li>
                    </ul>
                    <div className={styles.info_block}>
                    {this.switchTab()}
                    </div>
                </div>
            </div>

        )
    }
}

export default Profile;