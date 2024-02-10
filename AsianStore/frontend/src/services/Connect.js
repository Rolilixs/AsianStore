import axios from 'axios';


class ConnectService{
    static login(data){
        return axios.post('/api/login/', data);
    }

    static register(data){
        return axios.post('/api/register/', data);
    }

    static products(categoryId){
        // return axios.get(`./api/products?${categoryId}`, categoryId)
        return axios.get(`/api/products?category_id=${categoryId}`)
    }

    static profile_data(token) {
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get('/api/profile_data/')
    }

    static updateProfileData(token, newData) {
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.patch('/api/profile_data/', newData)
    }
}

export default ConnectService;
