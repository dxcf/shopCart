// 当前这个模块：API进行统一管理
import requests from "./request";
import mockRequests from './mockAjax'
// 三级联动的接口
// /api/product/getBaseCategoryList   get  无参数
// 发请求:axios发送请求结果结果Promise对象
export const reqCategoryList = ()=>requests({url:'/product/getBaseCategoryList',method:'get'});
// 切记：当前函数执行需要把服务器返回结果返回

// 获取banner(Home首页轮播图接口)
// export const reqGetBannerList = ()=>mockRequests({url:'/banner',method:'get'})
// 简写
export const reqGetBannerList = ()=>mockRequests.get('/banner');

// 获取floor数据
export const reqFloorList = ()=>mockRequests.get('/floor');

// 获取搜索模块数据 地址：/api/list 请求方法POST
/* {
    "category3Id": "61", 
    "categoryName": "手机",
    "keyword": "小米",
    "order": "1:desc",
    "pageNo": 1,
    "pageSize": 10,
    "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
    "trademark": "4:小米"
  } */

//   当前这个函数不需要接收外部传递参数
// 当前这个接口（获取搜索模块的数据），给服务器传递一个默认参数【至少是一个空对象】 
export const reqGetSearchInfo = (params)=>requests({url:"/list",method:"post",data:params});

// 获取产品详情信息的接口 URL：/api/item/{ skuId }   请求方式:get
export const reqGoodsInfo = (skuId)=>requests({url:`/item/${skuId}`,method:"get"});

// 加入购物车|将来修改商品个数的接口（获取更新某一产品的个数）/api/cart/addToCart/{ skuId }/{ skuNum }  post请求
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:"post"});

// 获取购物车列表数据的接口/api/cart/cartList
export const reqCartList = ()=>requests({url:'/cart/cartList',method:'get' });
  
// 删除购物产品的接口 /api/cart/deleteCart/{skuId}   请求方式：DELETE
export const reqDeleteCartById = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'});

// 修改商品的选中状态 /api/cart/checkCart/{skuId}/{isChecked}   请求方式：GET
export const reqUpdateCheckedById = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'});

// 获取验证码/api/user/passport/sendCode/{phone} 请求方式：GET
export const reqGetCode = (phone) =>requests({url:`/user/passport/sendCode/${phone}`,method:'get'});

// 注册用户 /api/user/passport/register  请求方式：POST   phone code password
export const reqUserRegister = (data) =>requests({url:`/user/passport/register`,data,method:'post'});

// 登录  /api/user/passport/login    请求方式：POST    phone  password
export const reqUserLogin = (data) =>requests({url:'/user/passport/login',data,method:'post'})

// 获取登录后用户信息【带着用户的token向服务器要】 api/user/passport/auth/getUserInfo   请求方式：GET 
export const reqUserInfo = () =>requests({url:'/user/passport/auth/getUserInfo',method:'get'})

// 退出登录  /api/user/passport/logout    请求方式：GET
export const reqLogout = () =>requests({url:'/user/passport/logout',method:'get'})

//获取用户地址信息  /api/user/userAddress/auth/findUserAddressList   请求方式：GET
export const reqAddressInfo = () =>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

//获取订单交易页信息  /api/order/auth/trade   请求方式：GET
export const reqOrderInfo = () =>requests({url:'/order/auth/trade',method:'get'})

//提交订单的接口 /api/order/auth/submitOrder?tradeNo={tradeNo}   请求方式：POST
export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,method:'post',data});

// 获取支付信息 /api/payment/weixin/createNative/{orderId}  请求方式：GET
export const reqPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

// 获取支付订单状态 /api/payment/weixin/queryPayStatus/{orderId}  请求方式：GET
export const reqPayStatus = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

// 获取我的订单列表  /api/order/auth/{page}/{limit}  请求方式：GET
export const reqOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})