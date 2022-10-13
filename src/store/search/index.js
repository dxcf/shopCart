import { reqGetSearchInfo } from "@/api";
// search模块的小仓库
const state = {
    searchList:{},
};
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
};
const actions = {
    async getSearchlist({commit},params={}){
        let result = await reqGetSearchInfo(params);
        if(result.code == 200){
            commit("GETSEARCHLIST",result.data);
        }
    }
};
// 计算属性，在项目当中，是为了简化数据而生的
// 可以把我们将来在组件当中需要用的数据简化一下【将来组件在获取数据的时候就方便了】
const getters = {
    // 当前形参state,当前仓库中的state,并非大仓库中的那个state
        // state.searchList.goodsList如果服务器数据回来了，，没问题是一个数组
        // 假如网络没有网state.searchList.goodsList返回的undefined
        // 计算新的属性的属性值至少给人家来一个数组
    goodsList(state) {
         return state.searchList.goodsList;
    },
    trademarkList(state){
        return state.searchList.trademarkList;
    },
    attrsList(state){
        return state.searchList.attrsList;
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}