
import productsstore from "./productsstore.js";

const { defineStore } = Pinia;

export default defineStore('cart', {
    state: () => ({
        cart: []
    }),
    actions: {
        addtocart(proid, qty = 1) {

            //找相同產品id的產品
            const currentcart = this.cart.find((item) => item.proid === proid)

            // console.log('repy', currentcart);

            //找到有相同的話就把數量加1
            if (currentcart) {
                currentcart.qty += qty;
            } else {
                this.cart.push({
                    cartid: new Date().getTime(),
                    proid, qty
                });
            }

            // console.log('購物車', this.cart)
            // console.log(proid, qty);
        },
        removecartitem(id) {
            const index = this.cart.findIndex((item) => item.cartid === id);
            console.log(index);
            this.cart.splice(index, 1);
        },
        setcartqty(proid, event) {
            //找相同產品id的產品
            const currentcart = this.cart.find((item) => item.proid === proid)
            currentcart.qty = event.target.value * 1;
            // console.log(id, event.target.value);
        }
    },
    getters: {
        //透過解構的方式取得cart值
        cartlist: ({ cart }) => {
            //store 之間的資料傳遞只需要引用就好不需要用到mapstate
            const { products } = productsstore();
            // console.log('從productsstore取的產品資料:',products);
            // console.log('箭頭函式解構方式取得cart:',cart);
            const carts = cart.map((item) => {
                //類似foreach
                // console.log('map:',item);

                // 取出單一產品? 
                // 單存取出對應的產品資料，不用想的太多
                const product = products.find((product) => product.id === item.proid)
                // console.log('取出單一產品',product);
                return {
                    ...item,
                    product,
                    subtotal: product.price * item.qty,
                }


            });
            console.log(carts);
            //???
            const total = carts.reduce((a, b) => a + b.subtotal, 0);
            console.log(total);



            return {
                carts,
                total
            }
        }

    }
})