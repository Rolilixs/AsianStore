import React, {Component} from "react";
import styles from "../LogReg.module.css";
import {Link} from "react-router-dom";



class Login extends Component {
    state = {
        phone_number: null,
        password: null,
    }

    constructor(props) {
        super(props);
    }

    onPhoneNumberChange = e => {
        this.setState({phone_number: e.target.value})
    }

    onPasswordChange = e => {
        this.setState({password: e.target.value})
    }

    login = (e) => {
        e.preventDefault();
        this.props.login({
            phone_number: this.state.phone_number,
            password: this.state.password,
        })
        this.props.history.push('/');
    }

    render() {
        return (
            <form action="">
                <div>
                    <h2>Вход</h2>
                    <p>Новый пользователь?</p>
                    <p className={styles.switch_form}
                       onClick={() => this.props.onSwitchForm("register")}>Регистрация</p>
                </div>
                <div>
                    <label htmlFor={"phone_number"}>Номер телефона</label>
                    <input id={"phone_number"} name={"phone_number"} type="tel"
                           onChange={this.onPhoneNumberChange}/><br/>

                    <label htmlFor={"password"}>Пароль</label>
                    <input id={"password"} name={"password"} type="password" onChange={this.onPasswordChange}/>
                </div>
                <button type="submit" onClick={this.login}>Продолжить</button>
            </form>
        )
    }
}

export default Login;