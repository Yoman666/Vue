import cartstore from '../store/cartstore.js';

const { mapState } = Pinia;


export default {
    template: `<nav class="navbar bg-light">
            <div class="container-fluid">
            
                <span class="navbar-brand" href="#">香香麵攤</span>
                <button type="button" class="btn nav-link">
                    購物車
                    <span class="badge rounded-pill bg-danger text-white">{{cart.length}}</span>
                </button>
            </div>
        </nav>`,
    computed: {
        ...mapState(cartstore, ['cart'])
    }

}