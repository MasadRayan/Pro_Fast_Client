import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: `http://localhost:3000`
})

const useAxiosSecure = () => {

    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    axiosSecure.interceptors.request.use(config => {
        const token = user?.accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, error => {
        return Promise.reject(error);
    });

    axiosSecure.interceptors.response.use(res => {
        return res;
    }, error => {
        const status = error.response?.status; // FIXED HERE
        if (status === 403) {
            navigate('/forbidden');
        } else if (status === 401) {
            logOut().then(() => navigate('/login'));
        }
        return Promise.reject(error);
    });

    return axiosSecure;
};

export default useAxiosSecure;
