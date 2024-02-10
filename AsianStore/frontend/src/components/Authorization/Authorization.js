import React, {Component} from "react";
import styles from "./Authorization.module.css";
import Login from "./Login/Login";
import {Route, Switch} from "react-router-dom";
import Register from "./Register/Register";

const im_auth = '/static/auth/background_auth.png';

class Authorization extends Component{
    constructor(props) {
        super(props);
        this.state = {
            currentForm: "login",
        }
    }

    toggleForm = (form) => {
        this.setState({currentForm: form});
    }

    render() {
        return(
            <div className={styles.auth}>
                <img src={im_auth} alt=""/>
                <div className={styles.content_wrapper}>
                    <h1 className={styles.company_name}>Asian Equipment Store</h1>
                    {this.state.currentForm === "login" ?
                        <Login login={this.props.login} onSwitchForm={this.toggleForm} {...this.props}/> :
                        <Register register={this.props.register} onSwitchForm={this.toggleForm} {...this.props}/>}
                </div>
            </div>
        )
    }
}

export default Authorization;