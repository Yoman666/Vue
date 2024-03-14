import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';


createApp({
    data() {
        return {
            url: 'https://vue3-course-api.hexschool.io/v2',
            data: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        login() {
            axios.post(`${this.url}/admin/signin`, this.data)
                .then(res => {
                    console.log(res);
                    const {token, expired} = res.data;
                    document.cookie = `yoyocookie = ${token}; expires = ${expired};`;
                    // console.log(document.cookie);
                    window.location = 'productpage.html';
                })
                .catch(err => console.log(err))
        }
    },
}).mount('#app');