import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

//boostarp model 要先定義
let productModal = {};
let delProductModal = {};

createApp({
    data() {
        return {
            url: 'https://vue3-course-api.hexschool.io/v2',
            path: 'yoyo123456',
            products: [],
            temp: {
                imagesUrl: []
            },
            isNew: false
        }
    },
    mounted() {
        //取出token放在headers
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)yoyocookie\s*\=\s*([^;]*).*$)|^.*$/, "$1",);
        axios.defaults.headers.common['Authorization'] = token;
        this.check();

        //boostrap modal 用法
        //1. 初始化 newF
        //2. 呼叫方法 show,hide
        productModal = new bootstrap.Modal('#productModal');
        // productModal.show();
        delProductModal = new bootstrap.Modal('#delProductModal');

    },
    methods: {
        check() {
            axios.post(`${this.url}/api/user/check`)
                .then(res => {
                    console.log(res);
                    this.getproductslist();
                })
                .catch(err => console.log(err))
        },
        //取資料
        getproductslist() {
            axios.get(`${this.url}/api/${this.path}/admin/products/all`)
                .then(res => {
                    console.log(res);
                    this.products = res.data.products;
                    // console.log(this.products);
                })
                .catch(err => console.log(err))
        },
        //新增+更新
        updateProduct() {
            let url = `${this.url}/api/${this.path}/admin/product`;
            let method = 'post';
            if (!this.isNew) {
                method = 'put';
                url = `${this.url}/api/${this.path}/admin/product/${this.temp.id}`;
            }
            axios[method](url, { data: this.temp })
                .then(res => {
                    console.log(res);
                    this.getproductslist();
                    productModal.hide();

                })
                .catch(err => console.log(err))
        },
        // 開啟boostrap model時候的 狀態、產品(複製產品到tmep目前產品的位置)
        openModal(state, pro) {
            if (state === 'new') {
                productModal.show();
                this.temp = {
                    imagesUrl: [],
                }
                this.isNew = true;
            } else if (state === 'old') {
                productModal.show();
                //淺層拷貝
                this.temp = { ...pro };
                this.isNew = false;
            } else {
                delProductModal.show();
                this.temp = {...pro};
            }

        },
        deletepro() {
            // console.log(id);
            axios.delete(`${this.url}/api/${this.path}/admin/product/${this.temp.id}`)
                .then(res => {
                    console.log(res);
                    this.delProductModal.hide();
                    this.getproductslist();

                })
                .catch(err => console.log(err))
        }
    },
}).mount('#app');