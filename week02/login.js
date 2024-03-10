//使用js 串接
// const url = 'https://vue3-course-api.hexschool.io/v2';
// const path = 'yoyo123456';


// const inputEmail = document.querySelector('#inputEmail');
// const inputPass = document.querySelector('#inputPass');
// const loginBtn = document.querySelector('#loginBtn');

// loginBtn.addEventListener('click',()=>{
//     const data = {
//         'username': inputEmail.value,
//         'password': inputPass.value
//     }
//     axios.post(`${url}/admin/signin`,data)
//     .then(res =>{
//         // console.log(res);
//         const {expired, token} = res.data;
//         // console.log(expired, token);
//         document.cookie = `yoyocookiename=${token}; expires=${expired};`;
//     })
//     .catch(err=>console.log(err))
// });

// const token = document.cookie.replace(/(?:(?:^|.*;\s*)yoyocookie\s*\=\s*([^;]*).*$)|^.*$/, "$1",);
// axios.defaults.headers.common['Authorization'] = token;



//使用vue串接
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
createApp({
    data() {
        return {
            url: 'https://vue3-course-api.hexschool.io/v2',
            path: 'yoyo123456',
            user: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        login() {
            axios.post(`${this.url}/admin/signin`, this.user)
                .then(res => {
                    console.log(res);
                    const { expired, token } = res.data;
                    console.log(expired, token);
                    document.cookie = `yoyocookiename=${token}; expires=${expired};`;
                    window.location = 'productslist.html';

                })
                .catch(err => console.log(err))
        },
    },
}).mount('#app');

