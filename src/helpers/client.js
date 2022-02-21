import axios from 'axios';

const axiosClient = () => {
    const defaultOptions = {
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("access-token")}`
        },
    };

    // Create instance
    let instance = axios.create(defaultOptions);

    return instance;
};

export default axiosClient();