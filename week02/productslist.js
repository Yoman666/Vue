import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';


createApp({
    data() {
        return {
            url: 'https://vue3-course-api.hexschool.io/v2',
            path: 'yoyo123456',
            products: [],
            temp: {},
        }
    },
    mounted() {
        // 取出 Token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;
        this.check();
    },
    methods: {
        check() {
            axios.post(`${this.url}/api/user/check`)
                .then(res => {
                    console.log(res);
                    this.getProducts();
                })
                .catch(err => console.log(err))
        },
        getProducts() {
            axios.get(`${this.url}/api/${this.path}/admin/products/all`)
                .then(res => {
                    console.log(res);
                    this.products = res.data.products;
                    console.log(this.products);
                })
                .catch(err => console.log(err))
        },
        detail(item) {
            this.temp = item;
        }
    },

}).mount('#app')