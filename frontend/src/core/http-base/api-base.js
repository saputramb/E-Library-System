import axios from "axios";

const client = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

client.interceptors.request.use(
    (client) => {
        const token = localStorage.getItem('token');
        if (token) client.headers.Authorization = `Bearer ${token}`;

        return client;
    },
    (error) => Promise.resolve(error)
);

client.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const response = await axios.get('http://localhost:5000/api/refresh-token');
                const { data } = response.data;
                console.log('ini token cuk');
                console.log(data);

                localStorage.setItem('token', data);

                originalRequest.headers.Authorization = `Bearer ${data}`;
                return client(originalRequest);
            } catch (error) {
                localStorage.removeItem('token');
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

export default client;