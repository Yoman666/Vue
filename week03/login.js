import {createApp} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';


const app = {
    data(){
        return{
            url:'https://vue3-course-api.hexschool.io/v2',
            data:{
                username: '',
                password: ''
            }
        }
    },
    methods: {
        login(){
            axios.post(`${this.url}/admin/signin`,this.data)
            .then(res=>{
                console.log(res);
                const {expired, token} = res.data;
                console.log(expired, token);
                document.cookie=`yoyocookie = ${token};expires=${expired};`;
                window.location = 'productEdit.html';
            })
            .catch(err=>console.log(err))
        }
    },
}

createApp(app).mount('#app');