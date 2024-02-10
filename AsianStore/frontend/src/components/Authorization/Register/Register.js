import React, {Component, useState} from "react";
import styles from "../LogReg.module.css";
import {useNavigate} from "react-router-dom";


const Register = ({ register, onSwitchForm, history }) => {
    const [formData, setFormData] = useState({
        username: null,
        phone_number: null,
        email: null,
        password: null,
        password_sec: null,
    });

    const navigate = useNavigate();

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        register({
            username: formData.username,
            phone_number: formData.phone_number,
            email: formData.email,
            password: formData.password,
        });
        navigate(-1);
    };

    return (
        <form action="">
            <div>
                <h2>Регистрация</h2>
                <p>Есть аккаунт?</p>
                <p className={styles.switch_form} onClick={() => onSwitchForm("login")}>
                    Войти
                </p>
            </div>
            <div>
                <label htmlFor={"username"}>Имя</label>
                <input
                    id={"username"}
                    name={"username"}
                    type="text"
                    onChange={onInputChange}
                /><br />

                <label htmlFor={"phone_number"}>Номер телефона</label>
                <input
                    id={"phone_number"}
                    name={"phone_number"}
                    type="tel"
                    onChange={onInputChange}
                /><br />

                <label htmlFor={"email"}>Почтовый адрес</label>
                <input id={"email"} name={"email"} type="email" onChange={onInputChange}/><br/>

                <label htmlFor={"password"}>Пароль</label>
                <input id={"password"} name={"password"} type="password" onChange={onInputChange}/>

                <label htmlFor={"password_sec"}>Повторите пароль</label>
                <input id={"password_sec"} name={"password_sec"} type="password" onChange={onInputChange}/>
            </div>
            <button type="submit" onClick={onSubmit}>Продолжить</button>
        </form>
    );
};

export default Register;