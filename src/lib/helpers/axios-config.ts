import axios from 'axios';

const baseURL = 'http://localhost:3001/api/v1';
// const baseURL = 'http://dny15158.macincloud.com:3001/api/v1';

// function createCookieInterceptor() {
//
//
// }
// const session = document.cookie.split(';').find(cookie => cookie.includes('__session'))?.replace('__session=', '');

const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',

    }
})

// instance.interceptors.request.use(config => {
//     config.headers.setAuthorization(`Bearer ${session}`)
//     return config;
// }, error => Promise.reject(error));
//
// instance.interceptors.response.use(response => {
//     console.log(response);
//     return response;
// }, error => {
//     console.log('error', error);
//     if (error.response.status === 403) {
//         // window.location.replace('/auth');
//     }
//     Promise.reject(error)
// })

export default instance;
