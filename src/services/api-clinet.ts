import axios from "axios";

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: '53fb3090a3444912ac4fdba53745357d'
    }
});