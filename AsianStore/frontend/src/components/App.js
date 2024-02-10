import React, {Component} from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ConnectService from "./../services/Connect";
import Authorization from "./Authorization/Authorization";
import ProductCatalog from "./ProductCatalog/ProductCatalog";
import HeroPage from "./HeroPage/HeroPage";
import Profile from "./Profile/Profile";
import Layout from "./Layout";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('user'),
            token: localStorage.getItem('token'),
            error: null,
        }
    }

    login = (data) => {
        ConnectService.login(data)
            .then(response => {
                    this.setState({
                        user: response.data.username,
                        token: response.data.token,
                        error: '',
                    });
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', response.data.username);
                }
            )
            .catch(e => {
                console.log('login', e);
                this.setState({error: e.toString()})
            })
    }

    logout = () => {
        this.setState({
            user: null,
            token: null,
        })
    }

    register = (user = null) => {
        ConnectService.register(user)
            .then(response => {
                this.setState({
                    user: user.username,
                    token: response.data.token
                })
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', user.username);
            })
            .catch(e => {
                console.log(e);
                this.setState({error: e.toString()});
            })
    }

    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Layout/>}>
                        {/*<Route index element={<Profile token={this.state.token}/>}/>*/}
                        {/*<Route path="catalog/" element={<ProductCatalog/>}/>*/}
                        <Route path="catalog/:id" element={<ProductCatalog/>}/>
                        {/*<Route path="hero" element={<HeroPage/>}/>*/}
                        <Route index element={<HeroPage/>}/>
                    </Route>

                    <Route path="/auth"
                           element={<Authorization register={this.register} login={this.login} />}/>

                    {/*<Route path="/"*/}
                    {/*       component={(props =>*/}
                    {/*           <div className={styles.App}>*/}
                    {/*               <Header/>*/}
                    {/*               <div className={styles.content_wrapper}>*/}
                    {/*                   <Routes>*/}
                    {/*                       <Route exact path="/catalog"*/}
                    {/*                              component={(props => <ProductCatalog {...props}/>)}/>*/}
                    {/*                       <Route exact path="/"*/}
                    {/*                              component={(props => <Profile*/}
                    {/*                                  token={this.state.token} {...props}/>)}/>*/}
                    {/*                       <Route exact path="/hero" component={(props => <HeroPage {...props}/>)}/>*/}
                    {/*                   </Routes>*/}
                    {/*               </div>*/}
                    {/*               <Footer/>*/}
                    {/*           </div>)}*/}
                    {/*/>*/}

                </Routes>
            </BrowserRouter>)
    };
}


export default App;

const container = document.getElementById('root');
render(<App/>, container);
