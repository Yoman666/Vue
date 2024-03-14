export default {
    props: ['innerpage','getproduct'],
    template: `
    <nav aria-label="Page navigation example">
    <!-- 直接檢視外層是否有傳送資料到內層{{pages}}-->
                    <ul class="pagination">
                    
                    <li class="page-item" v-bind:class="{disabled : !innerpage.has_pre}">
                        <a class="page-link" href="#" aria-label="Previous" v-on:click="getproduct(innerpage.current_page-1)">
                        <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>

                    <li class="page-item" v-for="(item,key) in innerpage.total_pages" v-bind:class="{active : item === innerpage.current_page}">
                    <!--props寫法-->
                    <!--<a class="page-link" href="#" v-on:click="getproduct(item)">{{item}}</a>-->
                    <!--emit寫法-->
                    <a class="page-link" href="#" v-on:click="$emit('changepage',item)">{{item}}</a>
                    </li>

                    <li class="page-item"  v-bind:class="{disabled : !innerpage.has_next}">
                        <a class="page-link" href="#" aria-label="Next" v-on:click="getproduct(innerpage.current_page+1)">
                        <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                    </ul>
                </nav>
    `
};
