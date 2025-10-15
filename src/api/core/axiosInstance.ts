import { accessStorageKey } from "../../features/auth/authSlice";
import { storage } from "../../utils/localStorage";
import { BASE_URL } from "./apiRoutes";

import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})


axiosInstance.interceptors.request.use(
    (config) => {
        const token = storage.get(accessStorageKey);
        if (token && config.headers) {            
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


let isRefreshing = false;
let failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (err: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token!);
        }
    });

    failedQueue = [];
};


axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        if (originalRequest.headers)
                            originalRequest.headers['Authorization'] = 'Bearer ' + token;
                        return axiosInstance(originalRequest);
                    })
                    .catch(err => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                //api call to refresh token


                const newAccessToken = "";

                localStorage.setItem('accessToken', newAccessToken)


                if (originalRequest.headers) {
                    originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
                }
                processQueue(null, newAccessToken);

                return axiosInstance(originalRequest);
            } catch (err) {
                processQueue(err, null);
                localStorage.clear()

                window.location.href = '/auth'
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;