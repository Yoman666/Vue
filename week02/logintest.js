

const url = 'https://vue3-course-api.hexschool.io/v2/';
const path = 'yoyo123456';

// axios.get(`${url}/api/${path}/products/all`)
// .then(res => console.log(res))
// .catch(err => console.log(err))

const emailInput = document.querySelector('#email');
const passInput = document.querySelector('#password');
const loginBtn = document.querySelector('#login');
const logoutBtn = document.querySelector('#logout');
const checkBtn = document.querySelector('#check');
const getProducts = document.querySelector('#getProducts');

//登入api
loginBtn.addEventListener('click', () => {
    const username = emailInput.value;
    const password = passInput.value;
    const user = {
        username,
        password
    }
    axios.post(`${url}/admin/signin`, user)
        .then(res => {
            console.log(res);
            const { expired, token } = res.data;
            // console.log(expired,token);
            //✪ cookie驗證
            document.cookie = `yoyocookie=${token}; expires=${expired};`;
        })
        .catch(err => console.log(err))
});

//✪ 可以放在外面當cookie有儲存的時候就取資料，checkBtn/logoutBtn會用到
//✪ 從cookie中取出的token
const token = document.cookie.replace(/(?:(?:^|.*;\s*)yoyocookie\s*\=\s*([^;]*).*$)|^.*$/, "$1",);
//✪ 將取出的token預設一直加入在header裡面驗證
axios.defaults.headers.common['Authorization'] = token;

//檢查是否登入api
checkBtn.addEventListener('click', () => {
    axios.post(`${url}/api/user/check`)
        .then(res => {
            console.log(res)
        })
});

//登出api
logoutBtn.addEventListener('click', function (e) {
    axios.post(`${url}/logout`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
});

//取出商品
getProducts.addEventListener('click',()=>{
    axios.get(`${url}/api/${path}/admin/products/all`)
    .then(res=>{
        console.log(res);
        console.log(res.data.products);
    })
    .catch(err=>console.log(err))
});



// res.data 裡面的資料
// expired(到期日): 1710317269770
// token(驗證，驗證成功伺服器才會傳資料): "eyJhbGciOiJSUzI1NiIsImtpZCI6IkFrZEJodyJ9.eyJpc3MiOiJodHRwczovL3Nlc3Npb24uZmlyZWJhc2UuZ29vZ2xlLmNvbS92dWUtY291cnNlLWFwaSIsImF1ZCI6InZ1ZS1jb3Vyc2UtYXBpIiwiYXV0aF90aW1lIjoxNzA5ODg1MjY5LCJ1c2VyX2lkIjoiSW1WWnZXM0pqZWVuNUN4WjJ2ZGNSamhmTXJtMiIsInN1YiI6IkltVlp2VzNKamVlbjVDeFoydmRjUmpoZk1ybTIiLCJpYXQiOjE3MDk4ODUyNjksImV4cCI6MTcxMDMxNzI2OSwiZW1haWwiOiJpdnk0MTAzODRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIml2eTQxMDM4NEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.RWbxRwkfMuAIrvlGAGOHUwbIJSqIEOOw2ZRqwf4bGAyuU6vzPznlpAKDN7O7G7TJJz_TmQY610en5AFhuNVlIftWnHkknfTsjXAbiLqbON074NpFStY35JMIO2yjiuYnOUq8ysUgg7Pghd_LiJWbkSDK26xIWtcvs9gYGgaAzfyQ2wgbRMvXWfYOvONLrdP67TIEBDMMN7F04hg4kaJuTEZ0PRxGQn0fHADgFYhZmJP99XKgzgUmynNCAQF7HrH6QW0YSJs3x-wO7H77SKiQwxrXrmMH0Ixcz9NvnDogTE7jAJ1iGobvjgm-zM0Ybhr07vJ2fI0AfhU9dKwL3oCzjA"
// uid(知道是誰): "ImVZvW3Jjeen5CxZ2vdcRjhfMrm2"


//筆記
//✪ login api
//axios串接取出 expired、token
//存入cookie : https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie#%E7%A4%BA%E4%BE%8B2_%E5%BE%97%E5%88%B0%E5%90%8D%E4%B8%BAtest2%E7%9A%84cookie
// 原本：document.cookie = "someCookieName=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
// 改成：document.cookie = `yoyocookie=${token}; expires=${expired};`;

//✪ check api
//auth 驗證 token : https://github.com/axios/axios?tab=readme-ov-file#cdn
// 原本：axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// defaults 每次都會帶入到 headers 裡面
// 改成：axios.defaults.headers.common['Authorization'] = token;

// 取得token的方法：
// var myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)test2\s*\=\s*([^;]*).*$)|^.*$/,"$1",);
// const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)yoyocookie\s*\=\s*([^;]*).*$)|^.*$/,"$1",);