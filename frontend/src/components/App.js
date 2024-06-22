import React, {useState} from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ConnectService from "./../services/Connect";
import Authorization from "./Authorization/Authorization";
import ProductCatalog from "./ProductCatalog/ProductCatalog";
import ProductDetails from "./ProductDetails/ProductDetails"
import HeroPage from "./HeroPage/HeroPage";
import Profile from "./Profile/Profile";
import Layout from "./Layout";


const App = () => {
    const [user, setUser] = useState(localStorage.getItem('user'));
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [error, setError] = useState(null);
    const [cartItems, setCartItems] = useState([])

    const login = (data) => {
        ConnectService.login(data)
            .then(response => {
                    setUser(response.data.username);
                    setToken(response.data.token);
                    setError('');
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', response.data.username);
                }
            )
            .catch(e => {
                console.log('login', e);
                setError(e.toString())
            })
    }

    const logout = () => {
        setUser(null);
        setToken(null);
    }

    const register = (user = null) => {
        ConnectService.register(user)
            .then(response => {
                setUser(user.username);
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', user.username);
            })
            .catch(e => {
                console.log('login', e);
                setError(e.toString())
            })
    }

    const addToCart_bt = (item) => {
        setCartItems([...cartItems, item])
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Layout/>}>
                    <Route index element={<Profile token={token} cartItems={cartItems}/>}/>
                    <Route path="catalog/:id" element={<ProductCatalog token={token} addToCart_bt={addToCart_bt}/>}/>
                    <Route path="catalog/:id/product/:id" element={<ProductDetails/>}/>
                    <Route path="hero" element={<HeroPage/>}/>
                    {/*<Route index element={<HeroPage/>}/>*/}
                </Route>

                <Route path="/auth"
                       element={<Authorization register={register} login={login}/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;

const container = document.getElementById('root');
render(<App/>, container);
