<template>
  <!-- <div id="app">
  </div> -->
<div>
  <!-- 自定义插件 -->
  <!-- <h1 v-upper.erha="msg"></h1> -->
  <Header></Header>
  <!-- 路由组件出口的地方 -->
  <router-view></router-view>
  <!-- 在Home、Search显示的，在登录、注册隐藏 -->
  <Footer v-show="$route.meta.show"></Footer>
</div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer'
export default {
  name: '',
  data(){
    return{
      msg:'abc'
    }
  },
  components:{
    Header,
    Footer
  },
  mounted() {
     // 通知Vuex发请求，获取数据，存储于仓库当中
    this.$store.dispatch('categoryList');
  },
}
</script>

<style lang="scss">

</style>
