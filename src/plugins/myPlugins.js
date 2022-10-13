// 自定义插件  Vue插件一定暴露一个对象
let myPlugins = {};

myPlugins.install = function(Vue,options){
    // Vue.prototype.$bus:任何组件都可以使用
    // Vue.directive 全局指令
    // Vue.component 全局组件
    // Vue.filter...
    Vue.directive(options.name,(element,params)=>{
        element.innerHTML = params.value.toUpperCase();
        console.log(params)
    })
}

export default myPlugins;