import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import pagenation from './pagenation.js';

let productModal = {};
let delProductModal = {};

const App = createApp({
    data() {
        return {
            url: 'https://vue3-course-api.hexschool.io/v2',
            path: 'yoyo123456',
            products: [],
            tempor: {
                imgesUrl: [],
            },
            isNew: true,
            outpage: {},
        }
    }, mounted() {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)yoyocookie\s*\=\s*([^;]*).*$)|^.*$/, "$1",);
        axios.defaults.headers.common['Authorization'] = token;
        this.check();
        // modal初始化
        productModal = new bootstrap.Modal('#productModal');
        delProductModal = new bootstrap.Modal('#delProductModal');
        // productModal.show();
    },
    // 區域註冊
    components: {
        pagenation,
    },
    methods: {
        check() {
            axios.post(`${this.url}/api/user/check`)
                .then(res => {
                    console.log(res);
                    this.getproduct();
                })
                .catch(err => {
                    console.log(err);
                    window.location = 'login.html';
                })
        },
        getproduct(page = 1) {
            //預設參數
            axios.get(`${this.url}/api/${this.path}/admin/products?page=${page}`)
                .then(res => {
                    console.log(res);
                    this.products = res.data.products;
                    this.outpage = res.data.pagination;
                    // console.log(this.outpage);
                    // console.dir(this.products);
                })
                .catch(err => console.log(err))
        },
        addproduct() {
            var http = 'post';
            var addurl = `${this.url}/api/${this.path}/admin/product`;
            if (!this.isNew) {
                http = 'put';
                addurl = `${this.url}/api/${this.path}/admin/product/${this.tempor.id}`;
            }

            axios[http](addurl, { data: this.tempor })
                .then(res => {
                    console.log(res);
                    productModal.hide();
                    alert('跟新完成');
                    this.getproduct();
                    // console.dir(this.products);
                })
                .catch(err => console.log(err))
        },
        delproduct() {
            axios.delete(`${this.url}/api/${this.path}/admin/product/${this.tempor.id}`)
                .then(res => {
                    console.log(res);
                    delProductModal.hide();
                    this.getproduct();
                })
                .catch(err => console.log(err))
        },
        openModal(state, pro) {
            if (state === 'new') {
                productModal.show();
                this.isNew = true;
                this.tempor = {
                    imagesUrl: [],
                }
            } else if (state === 'old') {
                productModal.show();
                this.isNew = false;
                this.tempor = { ...pro };
            } else {
                delProductModal.show();
                this.tempor = { ...pro };
            }
        },
        addimage() {
            this.tempor.imagesUrl = [];
            this.tempor.imagesUrl.push('');
        }
    },
});

App.component('tempproduct', {
    props:['tempor','addproduct','isNew'],
    template: '#product_modal_templage',
});
// App.component('paginagtion', paginagtion)
App.mount('#app');