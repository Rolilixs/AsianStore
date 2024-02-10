import React, {Component, useState} from "react";
import styles from "./Authorization.module.css";
import Login from "./Login/Login";
import {Route, Switch} from "react-router-dom";
import Register from "./Register/Register";


const im_auth = '/static/auth/background_auth.png';


const Authorization = (props) => {
    const [currentForm, setCurrentForm] = useState("login");

    const toggleForm = (form) => {
        setCurrentForm(form);
    };

    return (
        <div className={styles.auth}>
            <img src={im_auth} alt="" />
            <div className={styles.content_wrapper}>
                <h1 className={styles.company_name}>Asian Equipment Store</h1>
                {currentForm === "login" ? (
                    <Login login={props.login} onSwitchForm={toggleForm} {...props} />
                ) : (
                    <Register register={props.register} onSwitchForm={toggleForm} {...props} />
                )}
            </div>
        </div>
    );
};

export default Authorization;