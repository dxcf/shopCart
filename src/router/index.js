import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
// 使用插件
Vue.use(VueRouter)
// 引入store
import store from '@/store'
// 先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写vueRouter.prototype身上的push|
// 第一个参数：告诉原来push方法，你往哪里跳转（传递哪些参数）
VueRouter.prototype.push = function(location,resolve,reject){
  if(resolve && reject){
    originPush.call(this,location,resolve,reject)
  }else{
    originPush.call(this,location,()=>{},()=>{});
  }
}
// 重写vueRouter.prototype身上的replace
VueRouter.prototype.replace = function(location,resolve,reject){
  if(resolve && reject){
    originReplace.call(this,location,resolve,reject)
  }else{
    originReplace.call(this,location,()=>{},()=>{});
  }
}

// 对外暴露VueRouter类的实例
let router =  new VueRouter({
  routes,
  // 滚动行为
  scrollBehavior (to, from, savedPosition) {
    // 返回的y=0，代表的滚动条在最上方
    return {  y: 0 }
  }
});

// 全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async(to,from,next)=>{
  // to:可以获取到你要跳转到那个路由信息
  // from:可以获取到你从哪个路由而来的信息
  // next:放行函数
  // 为了测试先全都放行
  // next();
  // 用户登录了，才会有token,未登录一定不会有token
  let token = store.state.users.token;
  // 用户信息
  let name = store.state.users.userInfo.name;
  // 用户已经登录了
  if(token){
    // 用户已经登录了去login休想[不能去，停留在首页]
    if(to.path=='/login' || to.path=='/regitar'){
      next('/home')
    }else{
      // 登录了，去的不是login[home|search|detail|shopcart]
      if(name){
        next()
      }else{
        // 登录了没有用户信息，派发action让仓库存储用户信息再跳转
        try {
          await store.dispatch('getUserInfo');
          next()
        } catch (error) {
          // token失效了获取不到用户的信息，重新登录
          //清除token
          await store.dispatch('userLogout');
          next('/login');
        }
      }
    }
  }else{
    // 未登录暂时没有处理完毕，后期再处理
    // 未登录：不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心[center]--到这些页面到跳转到登录页
    let toPath = to.path;
    if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 ||toPath.indexOf('/center')!=-1){
      // console.log(toPath)
      // 把未登录的时候想去而没有去成的信息，存储于地址栏中【路由】
      next('/login?redirect='+toPath)
    }else{
      // 去的不是上面这些路由(home|center|shopCart)--放行
      next();
    }
  }
})

export default router;


