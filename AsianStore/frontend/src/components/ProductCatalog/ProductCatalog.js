import React, {Component} from "react";
import styles from "./ProductCatalog.module.css";
import ProductCard from "./../ProductCard/ProductCard";
import ConnectService from "../../services/Connect";
import {useParams} from "react-router-dom";

function withMyHook(Component) {
    return function WrappedComponent(props) {
        const Hook = useParams();
        return <Component {...props} hook={Hook} />;
    }
}

class ProductCatalog extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            productsList: []
        }

    }

    getParamId = this.props.hook
    // getParamId = this.props.match.params.id

    componentDidMount() {
        ConnectService.products(this.getParamId.id)
            .then(response => {
                // console.log(response);
                this.setState({
                    productsList: response.data,
                })
            })
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <h2 className={styles.category_name}>Сковородки</h2>
                <div className={styles.product_list}>
                    {
                        this.state.productsList.map(
                            product => {
                                return <ProductCard {...product}/>
                            }
                        )
                    }
                    {
                        this.state.productsList.map(
                            product => {
                                return <ProductCard {...product}/>
                            }
                        )
                    }
                    {
                        this.state.productsList.map(
                            product => {
                                return <ProductCard {...product}/>
                            }
                        )
                    }

                </div>
            </div>
        )
    }
}

export default withMyHook(ProductCatalog);