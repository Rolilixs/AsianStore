import React, {useEffect, useState} from "react";
import styles from "./UserData.module.css";
import ConnectService from "../../../services/Connect";


const UserData = ({token}) => {
    const [userData, setUserData] = useState({
        username: 'Нет данных',
        phone_number: 'Нет данных',
        email: 'Нет данных',
    });

    useEffect(() => {
        ConnectService.profileData(token)
            .then(response => {
                setUserData({
                    username: response.data.username,
                    phone_number: response.data.phone_number,
                    email: response.data.email,
                })
            })
    }, [token]);

    const changeData = (data) => {
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
            default:
                break;

        }
        if (newData) {
            ConnectService.updateProfileData(token, newData)
                .then(response => {
                    setUserData(response.data);
                })
                .catch(error => {
                    console.error('Error updating profile data:', error);
                });
        }
    }

    const buttonChange = (onClick) => (
        <button className={styles.btn_change} onClick={onClick}>
            Изменить
        </button>
    );

    return (
        <div className={styles.userdata}>
            <p className={styles.section_label}>Учётные данные</p>
            <table>
                <tbody>
                <tr>
                    <td>Имя</td>
                    <td>{userData.username}</td>
                    <td>{buttonChange(() => changeData("username"))}</td>
                </tr>
                <tr>
                    <td>Номер телефона</td>
                    <td>{userData.phone_number}</td>
                    <td>{buttonChange(() => changeData("phone_number"))}</td>
                </tr>
                <tr>
                    <td>Адрес электронной почты</td>
                    <td>{userData.email}</td>
                    <td>{buttonChange(() => changeData("email"))}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}


export default UserData;