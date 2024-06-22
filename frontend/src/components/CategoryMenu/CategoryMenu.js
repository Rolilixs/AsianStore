import React, {useEffect, useState} from "react";
import ConnectService from "../../services/Connect";
import styles from './CategoryMenu.module.css';
import {Link} from "react-router-dom";


const CategoryMenu = ({menuVisible}) => {
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        ConnectService.category()
            .then(
                categoryList => {
                    setCategoryList(categoryList.data);
                }
            );
    }, []);

    if (menuVisible) {
        console.log(categoryList);
        return (
            <div className={styles.category}>
                <ul>
                    {categoryList.map(category => (
                        <li key={category.id}>
                            <Link to={`/catalog/${category.id}`}>{category.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return null; // Если меню не видимо, возвращаем null
};


export default CategoryMenu;
