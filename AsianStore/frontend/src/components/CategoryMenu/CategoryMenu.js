import React, {Component} from "react";
import styles from './CategoryMenu.module.css';
import {Link} from "react-router-dom";


class CategoryMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: []
        }
    }

    componentDidMount() {
        fetch('./api/category').then(
            response => { return response.json() }
        ).then(
            categoryList => {
                this.setState(() => { return { categoryList } });
            }
        );
    }

    render() {
        if (this.props.menuVisible)
        return(
            <div className={styles.category}>
                <ul>
                    {this.state.categoryList.map(category => {
                        return(
                            <li key={category.id}>
                                <Link to={`/catalog/${category.id}`}>{category.name}</Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default CategoryMenu;
