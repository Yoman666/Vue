import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

// 元件註冊
const productModal = {
    props: ['proid', 'addtocart', 'openmodal'],
    data() {
        return {
            modal: {},
            product: {},
            qty: 1

        }
    },
    template: '#userProductModal',
    watch: {

        proid() {
            if (this.proid) {
                console.log('watch-內層id: ', this.proid);
                axios.get(`${url}/api/${path}/product/${this.proid}`)
                    .then(res => {
                        console.log('單一產品:', res.data.product);
                        this.product = res.data.product;
                        this.modal.show();
                    })
            }

        }
    },
    methods: {
        hide() {
            this.modal.hide();
        }
    },
    mounted() {
        // boostrapmodal 初始化 並且使用 ref
        this.modal = new bootstrap.Modal(this.$refs.modal);
        // this.modal.show();

        //當modal關閉時會發生的事
        this.$refs.modal.addEventListener('hidden.bs.modal', (event) => {
            console.log('modal close');
            this.openmodal('');
        })
    }
}

const url = 'https://vue3-course-api.hexschool.io/v2';
const path = 'yoyo123456';
const app = createApp({
    data() {
        return {
            products: [],
            productid: '',
            cartlist: [],
            loadingid: ''
        }
    },
    methods: {
        getproducts() {
            axios.get(`${url}/api/${path}/products/all`)
                .then(res => {
                    console.log('getproducts:', res.data.products);
                    this.products = res.data.products;
                })
        },
        openmodal(id) {
            this.productid = id;
            console.log('外層id: ', this.productid);
        },
        addtocart(proid, qty = 1) {
            const data = {
                product_id: proid,
                qty
            };
            axios.post(`${url}/api/${path}/cart`, { data })
                .then(res => {
                    console.log(res);
                    alert(res.data.message);
                    this.$refs.contromodal.hide();
                    this.getcarts();

                })
                .catch(err => console.log(err))
        },
        getcarts() {
            axios.get(`${url}/api/${path}/cart`)
                .then(res => {
                    console.log('購物車列表', res.data.data);
                    this.cartlist = res.data.data;
                })
                .catch(err => console.log(err))
        },
        updatecarts(item) {
            const data = {
                product_id: item.product_id,
                qty: item.qty
            }
            // console.log(data);
            this.loadingid = item.id;
            axios.put(`${url}/api/${path}/cart/${item.id}`, { data })
                .then(res => {
                    console.log('更新購物車', res);
                    // this.cartlist = res.data.data;
                    this.getcarts();
                    this.loadingid = '';
                })
                .catch(err => console.log(err))
        },
        deletecarts(id) {
            axios.delete(`${url}/api/${path}/cart/${id}`)
                .then(res => {
                    console.log('刪除單一購物車', res);
                    this.getcarts();
                })
                .catch(err => console.log(err))
        },
    },
    mounted() {
        this.getproducts();
        this.getcarts();
    },
    components: {
        productModal
    }
});

app.mount('#app')