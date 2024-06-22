import React, {useState} from "react";
import styles from "../LogReg.module.css";
import {useNavigate} from "react-router-dom";


const Register = ({register, onSwitchForm, history}) => {
    const [formData, setFormData] = useState({
        username: null,
        phone_number: null,
        email: null,
        password: null,
        password_sec: null,
    });

    const navigate = useNavigate();

    const onInputChange = (e) => {
        // Сохранение значений в state
        let {name, value} = e.target;
        if (name === "phone_number") {
            value = `${value.substring(0, 1)}${value.substring(1, 4)} ${value.substring(4, 7)} ${value.substring(7, 9)} ${value.substring(9, value.length)}`
        }
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onSubmit = (e) => {
        // Отправка данных в бекенд
        e.preventDefault();
        register({
            username: formData.username,
            phone_number: formData.phone_number,
            email: formData.email,
            password: formData.password,
        });
        navigate(-1);
    };

/*    const handlerSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const inputs = form.querySelectorAll("input");
        const formData = {};
        Array.from(inputs).map(input => {
            if (input.name === "phone_number") {
                formData[input.name] = input.value.replace(/\D/g, '')
            } else {
                formData[input.name] = input.value
            }
        })
        console.log(formData);
    }*/

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
                /><br/>

                <label htmlFor={"phone_number"}>Номер телефона</label>
                <input
                    id={"phone_number"}
                    value={formData.phone_number}
                    name={"phone_number"}
                    type="tel"
                    onChange={onInputChange}
                /><br/>

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