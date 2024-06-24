import axios from 'axios';


class ConnectService {
    static login(data) {
        return axios.post('http://localhost:8000/api/login/', data);
    }

    static register(data) {
        return axios.post('http://localhost:8000/api/register/', data);
    }

    static products(categoryId) {
        // return axios.get(`./api/products?${categoryId}`, categoryId)
        return axios.get(`http://localhost:8000/api/products/${categoryId}`)
    }

    static product(productId) {
        return axios.get(`http://localhost:8000/api/product/${productId}`)
    }

    static productPhotos(product_id) {
        return axios.get(`http://localhost:8000/api/product_photos/${product_id}`)
    }

    static favourites(token) {
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`http://localhost:8000/api/favourites`)
    }

    static favouritesCreate(token, id) {
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.post(`http://localhost:8000/api/favourites/${id}`)
    }

    static favouritesDestroy(token, id) {
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.delete(`http://localhost:8000/api/favourites/${id}`)
    }

    static getDinamycCart(cart) {
        // axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`http://localhost:8000/api/dbusket?items=${cart}`)
    }

    static category() {
        return axios.get(`http://localhost:8000/api/category`)
    }

    static profileData(token) {
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get('http://localhost:8000/api/profile_data/')
    }

    static updateProfileData(token, newData) {
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.patch('http://localhost:8000/api/profile_data/', newData)
    }
}

export default ConnectService;
