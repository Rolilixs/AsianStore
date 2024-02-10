import React, {Component} from "react";
import styles from "./UserData.module.css";
import ConnectService from "../../../services/Connect";


class UserData extends Component {
    state = {
        username: 'Нет данных',
        phone_number: 'Нет данных',
        email: 'Нет данных',
    }

    constructor(props) {
        super(props);
        ConnectService.profile_data(this.props.token)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    phone_number: response.data.phone_number,
                    email: response.data.email,
                })
            })
    }

    changeData = (data) => {
        let newData;
        // EDIT THIS SHIT LATER -> ADD CUSTOM MODAL WINDOW
        switch (data) {
            case 'username':
                newData = {username: prompt('Введите новое имя:')};
                break;
            case 'phone_number':
                newData = {phone_number: prompt('Введите новый номер телефона:')};
                break;
            case 'email':
                newData = {email: prompt('Введите новый адрес электронный почты:')};
                break;
        }
        ConnectService.updateProfileData(this.props.token, newData)
            .then(response => {
                this.setState(response.data)
            })
    }

    buttonChange = (onClick) => {
        return (
            <button className={styles.btn_change} onClick={onClick}>Изменить</button>
        )
    }

    render() {

        return (
            <div className={styles.userdata}>
                <p className={styles.section_label}>Учётные данные</p>
                <table>
                    <tbody>
                    <tr>
                        <td>Имя</td>
                        <td>{this.state.username}</td>
                        <td>{this.buttonChange(() => this.changeData("username"))}</td>
                    </tr>
                    <tr>
                        <td>Номер телефона</td>
                        <td>{this.state.phone_number}</td>
                        <td>{this.buttonChange(() => this.changeData("phone_number"))}</td>
                    </tr>
                    <tr>
                        <td>Адрес электронной почты</td>
                        <td>{this.state.email}</td>
                        <td>{this.buttonChange(() => this.changeData("email"))}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}


export default UserData;