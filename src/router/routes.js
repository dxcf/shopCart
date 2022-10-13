// import Home from '@/views/Home/index.vue';
// import Search from '@/views/Search/index.vue';
import Login from '@/views/Login/index.vue';
import Regitar from '@/views/Register';
import Detail from '@/views/Detail/index.vue';
import AddCartSuccess from '@/views/AddCartSuccess';
import ShopCart from '@/views/ShopCart';
import Trade from '@/views/Trade';
import Pay from '@/views/Pay';
import PaySuccess from '@/views/PaySuccess';
import Center from '@/views/Center';
// 引入二级路由组件
import MyOrder from '@/views/Center/myOrder';
import GroupOrder from '@/views/Center/groupOrder';

// const foo = () =>{
//   console.log(111111)
//   return import("@/views/Home")
// }
// 简化
// const foo = () =>import("@/views/Home")
/* 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。 */
// 路由配置信息
export default [ 
    {
      path: '/center',//订单中心
      component: Center,
      meta:{show:true},
      // 二级路由组件
      children:[
        {
          path:'myorder',
          component:MyOrder,
        },
        {
          path:'grouporder',
          component:GroupOrder,
        },
        {
          // 重定向
          path:'/center',
          redirect:'/center/myorder'
        }
      ]
    },
    {
      path: '/paysuccess',
      component: PaySuccess,
      meta:{show:true}
    },
    {
      path: '/pay',
      component: Pay,
      meta:{show:true},
      beforeEnter: (to, from, next) => {
        if(from.path=='/trade'){
          next();
        }else{
          next(false)
        }
      }
    },
    {
      path: '/trade',//购买页面
      component: Trade,
      meta:{show:true},
      // 路由独享守卫
      beforeEnter: (to, from, next) => {
        // 去交易页面，必须是从购物车而来
        if(from.path=='/shopcart'){
          next();
        }else{
          // 其他路由组件而来，停留在当前
          // 中断当前的导航
          next(false)
        }
      }
    },
    {
      path: '/shopcart',
      component: ShopCart,
      meta:{show:true},
    },
    {
      path: '/addcartsuccess',
      name:'addcartsuccess',
      component: AddCartSuccess,
      meta:{show:true}
    },
    {
      // 跳转需要传递params参数，所有要占位
      path: '/detail/:skuid',
      component: Detail,
      meta:{show:true}
    },
    {
      path: '/home',
      component: () =>import("@/views/Home"),//当用户访问的时候会执行一次并返回相应的组件
      // 路由元信息
      meta:{show:true}
    },
    {
      path: '/search/:keyword?',
      component: ()=>import("@/views/Search"),
      meta:{show:true},
      name:"search",
      // 路由组件能不能传递props数据？
      // 布尔值的写法 params
      // props:true,
      // 对象写法:额外的给路由组件传递一些props
      // props:{a:1,b:2}
      // 函数写法：可以把params参数、query参数，通过props传递给路由组件
      // props:($route)=>{
      //   return {keyword:$route.params.keyword,k:$route.query.k}
      // }
    },
    {
      path: '/login',
      component: Login,
      meta:{show:false}
    },
    {
      path: '/regitar',
      component: Regitar,
      meta:{show:false}
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
    // 重定向、在项目跑起来的时候，访问/，立马让他定向到首页
    {
      path: '*',
      redirect:"/home"
    },
  ]