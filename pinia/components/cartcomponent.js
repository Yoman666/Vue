import cartstore from '../store/cartstore.js';
const { mapState, mapActions } = Pinia;

export default {
    template: `<div class="bg-light p-4 my-4">
    <div v-if="!cartlist.carts.length">購物車沒有任何品項</div>
    <table v-else class="table align-middle">
        <tbody>
            <tr v-for='item in cartlist.carts' :key="item.key">
                <td width="100">
                    <a href="#" class="text-dark" @click="removecartitem(item.cartid)"><i class="fas fa-times"></i></a>
                </td>
                <td width="100">
                    <img :src="item.product.imageUrl"
                        class="table-image" alt="" />
                </td>
                <td>{{item.product.title}}</td>
                <td width="200">
                    <select name="" id="" class="form-select" :value="item.qty" 
                    @change="(evt)=>setcartqty(item.proid,evt)">
                        <option v-for="i in 20" :key="i">{{i}}</option>
                    </select>
                </td>
                <td width="200" class="text-end">$ {{item.subtotal}}</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="5" class="text-end">總金額 NT$ {{cartlist.total}}</td>
            </tr>
        </tfoot>
    </table>
</div>`,
    computed: {
        ...mapState(cartstore, ['cartlist']),
    },
    methods: {
        ...mapActions(cartstore, ['removecartitem', 'setcartqty'])

    },
}