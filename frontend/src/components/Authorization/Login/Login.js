import React, {useState} from "react";
import styles from "../LogReg.module.css";
import {useNavigate} from "react-router-dom";


const Login = ({ login, onSwitchForm, history }) => {
    const [formData, setFormData] = useState({
        phone_number: null,
        password: null,
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
        login({
            phone_number: formData.phone_number,
            password: formData.password,
        });
        navigate(-1);
    };

    return (
        <form action="">
            <div>
                <h2>Вход</h2>
                <p>Новый пользователь?</p>
                <p className={styles.switch_form} onClick={() => onSwitchForm("register")}>
                    Регистрация
                </p>
            </div>
            <div>
                <label htmlFor={"phone_number"}>Номер телефона</label>
                <input id={"phone_number"} name={"phone_number"} type="tel" onChange={onInputChange} /><br />

                <label htmlFor={"password"}>Пароль</label>
                <input id={"password"} name={"password"} type="password" onChange={onInputChange} />
            </div>
            <button type="submit" onClick={onSubmit}>Продолжить</button>
        </form>
    );
};

export default Login;