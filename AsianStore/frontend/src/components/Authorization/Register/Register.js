import React, {Component} from "react";
import styles from "../LogReg.module.css";


class Register extends Component {
    state = {
        username: null,
        phone_number: null,
        email: null,
        password: null,
        password_sec: null,
    }

    constructor(props) {
        super(props);
    }

    onUsernameChange = e => {
        this.setState({username: e.target.value})
    }

    onPhoneNumberChange = e => {
        this.setState({phone_number: e.target.value})
    }

    onEmailChange = e => {
        this.setState({email: e.target.value})
    }

    onPasswordChange = e => {
        this.setState({password: e.target.value})
    }

    onPasswordSecChange = e => {
        this.setState({password_sec: e.target.value})
    }

    register = (e) => {
        e.preventDefault();
        this.props.register({
            username: this.state.username,
            phone_number: this.state.phone_number,
            email: this.state.email,
            password: this.state.password,
        });
        this.props.history.push("/");
    }

    render() {
        return (
            <form action="">
                <div>
                    <h2>Регистрация</h2>
                    <p>Есть аккаунт?</p>
                    <p className={styles.switch_form} onClick={() => this.props.onSwitchForm("login")}>Войти</p>
                </div>
                <div>
                    <label htmlFor={"username"}>Имя</label>
                    <input id={"username"} name={"username"} type="text" onChange={this.onUsernameChange}/><br/>

                    <label htmlFor={"phone_number"}>Номер телефона</label>
                    <input id={"phone_number"} name={"phone_number"} type="tel"
                           onChange={this.onPhoneNumberChange}/><br/>

                    <label htmlFor={"email"}>Почтовый адрес</label>
                    <input id={"email"} name={"email"} type="email" onChange={this.onEmailChange}/><br/>

                    <label htmlFor={"password"}>Пароль</label>
                    <input id={"password"} name={"password"} type="password" onChange={this.onPasswordChange}/>

                    <label htmlFor={"password_sec"}>Повторите пароль</label>
                    <input id={"password_sec"} name={"password_sec"} type="password"
                           onChange={this.onPasswordSecChange}/>

                </div>
                <button type="submit" onClick={this.register}>Продолжить</button>
            </form>
        )
    }
}

export default Register;