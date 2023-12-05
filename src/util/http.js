import axios from 'axios'
import {store} from '../redux/store'

//axios.defaults.headers
axios.defaults.baseURL = "http://localhost:5000"

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // display loading icon
    store.dispatch({
        type: "change_loading",
        payload: true
    })
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // hide loading icon
    store.dispatch({
        type: "change_loading",
        payload: false
    })

    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // hide loading icon
    store.dispatch({
        type: "change_loading",
        payload: false
    })
    return Promise.reject(error);
});