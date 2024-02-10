import React, {Component, useEffect, useState} from "react";
import styles from './CategoryMenu.module.css';
import {Link} from "react-router-dom";


const CategoryMenu = ({ menuVisible }) => {
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        fetch('./api/category').then(
            response => { return response.json() }
        ).then(
            categoryList => {
                setCategoryList(categoryList);
            }
        );
    }, []);

    if (menuVisible) {
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
