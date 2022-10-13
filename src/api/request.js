// 对于axios进行二次封装
import axios from "axios";
import nprogress from "nprogress";
// 在当前模块中引入store
import store from '@/store';
// 引入进度条样式
import "nprogress/nprogress.css";
// console.log(nprogress) start:进度条开始  done:进度条结束

// 1:利用axios对象的方法create,去创建一个axios实例
// 2：request就是axios,只不过稍微配置一下
const requests = axios.create({
    // 配置对象
    // 基础路径，发请求的时候，路径当中会出现api
    baseURL:"/api",
    // 代表请求超时的时间5s
    timeout:5000,
});
// 请求拦截器，在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
    // config:配置对象，对象里面有一个属性很重要，headers请求头
    // 进度条开始动
    // console.log(store)打印查看下是否有数据
    if(store.state.detail.uuid_token){
        // 请求头添加一个字段(userTemId)：和后台人员商量好
        config.headers.userTempId = store.state.detail.uuid_token;
    }
    // 需要携带token带给服务器
    if(store.state.users.token){
        config.headers.token = store.state.users.token
    }
    nprogress.start();
    return config;
});
// 响应拦截器
requests.interceptors.response.use((res) => {
    // 成功的回调函数：服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
    nprogress.done();
    return res.data;
}, (err) => {
    // 响应失败的回调函数
    // return Promise.reject(new Error('faile'));
    //温馨提示:某一天发请求,请求失败,请求失败的信息打印出来
    alert(err.message);
    //终止Promise链
    return new Promise();
});

// 对外暴露
export default requests;