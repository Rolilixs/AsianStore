import React, {Component} from "react";
import {Outlet} from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import styles from "./Layout.module.css";

class Layout extends Component {


    render() {
        return(
            <div className={styles.layout}>
                <Header/>
                <div className={styles.content_wrapper}>
                    <Outlet/>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Layout;