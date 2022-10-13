import {reqCartList,reqDeleteCartById,reqUpdateCheckedById} from '@/api/index'
const state = {
    cartList:[],
};
const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList=cartList
    }
};
const actions = {
    // 获取购物车数据
    async getCartList({commit}){
        let result = await reqCartList();
        // 测试是否获取数据console.log(result);
        if(result.code == 200){
            commit("GETCARTLIST",result.data);
        }
    },
    // 删除购物车某一个产品
    async deleteCartBySkuId({commit},skuId){
        let result = await reqDeleteCartById(skuId);
        // console.log( result);
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 修改购物车某一产品的选中状态
    async UpdateCheckedById({commit},{skuId,isChecked}){
        let ressult = await reqUpdateCheckedById(skuId,isChecked);
        if(ressult.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    // 删除全部勾选的产品
    deleteAllCheckedCart({dispatch,getters}){
        // context:小仓库，commit【提交mutations修改state】,getters【计算属性】,dispatch【派发actions】,state【当前仓库数据】
        // 获取购物车全部的产品(是一个数组)console.log(getters.cartList.cartInfoList)
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item=>{
            let promise = item.isChecked==1? dispatch('deleteCartBySkuId',item.skuId):'';
            // 将每一次返回的Promise添加到数组当中
            PromiseAll.push(promise);
        });
        // 只要全部的p1|p2...都成功，返回即为成功；如果有一个失败，返回即为失败结果
        return Promise.all(PromiseAll);
    },
    // 修改全部商品的状态
    updateAllCartIsChecked({dispatch,state}, isChecked){
        // console.log(state);
        // 数组
        let promiseAll = [];
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('UpdateCheckedById',{skuId:item.skuId,isChecked});
            promiseAll.push(promise);
        });
        // 最终返回的结果
        return Promise.all(promiseAll);
    }
};
const getters = {
    cartList(state){
        return state.cartList[0] || {}
    },
};
export default {
    state,
    mutations,
    actions,
    getters,
}