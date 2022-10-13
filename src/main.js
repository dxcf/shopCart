import Vue from 'vue';

import App from './App.vue';
// 引入路由
import router from './router';
// 引入仓库进行注册
import store from './store';
// 三级联动组件--全局组件
import TypeNav from '@/components/TypeNav';
// 轮播图--全局组件
import Carousel from '@/components/Carousel'
// 分页器--全局组件
import Pagination from '@/components/Pagination'

// 第一个参数：全局组件的名字 第二个组件：哪一个组件
Vue.component(TypeNav.name,TypeNav);
Vue.component(Carousel.name,Carousel);
Vue.component(Pagination.name,Pagination);
Vue.config.productionTip = false;

// 引入组件element-ui
import { MessageBox } from 'element-ui';
// elementUi注册组件第一种写法
// Vue.component(Button.name,Button);
// elementUi注册组件第二种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
//消息提示框
Vue.prototype.$alert = MessageBox.alert;
// 引入MockServer.js--mock数据
import '@/mock/mockServe';
// 引入swiper样式
import "swiper/css/swiper.css"
// import './registerServiceWorker';
/* import {reqGetSearchInfo} from '@/api'
console.log(reqGetSearchInfo({})) */
// 统一接收api文件夹里面全部请求函数，统一引入
import * as API from '@/api';
import atm from '@/assets/1b.gif';
// const loadimage = require('@/assets/2.gif');

// 引入插件
import VueLazyload from 'vue-lazyload'
// 注册插件
Vue.use(VueLazyload, {
  // 懒加载默认图片
  loading:atm,
});

// 引入自定义插件
import myPlugins from '@/plugins/myPlugins';
Vue.use(myPlugins,{
  name:'upper'
});


// 引入表单校验插件
import "@/plugins/validate"
new Vue({
  render: h => h(App),
  // 全局事件总线$bus配置
  beforeCreate(){
    Vue.prototype.$bus = this;
    // 所有的请求的接口统一接收并挂载了Vue的原型对象上，好处是所有的组件不用在一个个引入了
    Vue.prototype.$API = API;
  },
  router,
  store,
}).$mount('#app')
