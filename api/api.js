import { host } from './config.js';
import $http from './http.js'


//测试接口
export const checkApi = () => $http.get(`${host}/api/ping`);
//轮播图信息
export const slideshows = () => $http.get(`${host}/api/slideshows`);
//城市信息接口
export const cities = () => $http.get(`${host}/api/cities`);
export const citiesRecommends = (cityId) => $http.get(`${host}/api/cities/${cityId}/recommends`);

//分类信息查询
export const categories = () => $http.get(`${host}/api/categories`);

//获取某一城市下某一分类信息
export const stores = (city, category) => $http.get(`${host}/api/cities/${city}/categories/${category}/stores`);
export const storesDetail = (id) => $http.get(`${host}/api/stores/${id}`);

//登陆
export const login = (id) => $http.post(`${host}/api/users/login`,{code:id});
export const updateUser = (userID, data) => $http.post(`${host}/api/users/${userID}`, data);

//用户申请广告位
export const applicationAd = (userID, data) => $http.put(`${host}/api/users/${userID}/application`, data);

//申请寻推账号
export const recruitmentAd = (userID, data) => $http.put(`${host}/api/users/${userID}/recruitment`, data);

//联系我们
export const contact = () => $http.get(`${host}/api/options/contact`);

//获取用户信息
export const userMessage = (userId) => $http.get(`${host}/api/users/${userId}`);

//关于我们
export const aboutUs = () => $http.get(`${host}/api/options/about`);

//查询优惠券
export const getCouponList = (listData) => $http.get(`${host}/api/user/coupons/listAllCoupons`, listData);

//领取优惠券
export const receiveCoupon = (data) => $http.put(`${host}/api/user/coupons`, data);

//查询用户优惠券
export const getUserCouponList = (userid) => $http.get(`${host}/api/user/coupons/listOwnCoupons/${userid}`);

//查询用户积分
export const getUserScore = (userid) => $http.get(`${host}/api/user/integral/${userid}`);

//核销用户积分
export const deleteUserScore = (userid, total) => $http.get(`${host}/api/user/integral/${userid}/code/${total}`);

//商家添加优惠券
export const addStoreCoupon = (data) => $http.put(`${host}/api/stores/coupons`, data);

//轮询优惠券接口
export const isDestory = (key) => $http.get(`${host}/api/user/integral/isDestroy/${key}`);
//查询制定活动信息
export const getSpecialBargain = (id) => $http.get(`${host}/api/bargains/${id}`);
//参与制定活动
export const jionSpecialBargain = (id,data) => $http.put(`${host}/api/bargains/${id}/team`,data);
//参与砍价
export const jionBargain = (id,teamId) => $http.put(`${host}/api/bargains/${id}/team/${teamId}`);
//获取门店所有活动
export const getAllStoreAcitivityList = (storeId) => $http.get(`${host}/api/stores/${storeId}/bargains`); 
//获取制定门店信息
export const getStoreInfo = (storeId) => $http.get(`${host}/api/stores/${storeId}`); 
//获取条形支付码
export const getBarCode = (bargainId,teamId) => $http.get(`${host}/api/bargains/${bargainId}/team/${teamId}/qrcode`); 
//获取小程序二维码
export const getMiniCode = (bargainId, teamId) => $http.get(`${host}/api/bargains/${bargainId}/team/${teamId}/minicode`); 
//查询所有投票活动
export const getAllVotes = () => $http.get(`${host}/api/votes`); 
//查询单个投票活动
export const getVotes = (id) => $http.get(`${host}/api/votes/${id}`); 
//用户提交投票
export const votes = (id, data) => $http.put(`${host}/api/votes/${id}/items`,data);
//查询所有报名活动
export const getAllSigns = () => $http.get(`${host}/api/activities`);
//查询单个报名活动
export const getSign = (id) => $http.get(`${host}/api/activities/${id}`); 
//用户提交报名活动
export const Sign = (id, data) => $http.put(`${host}/api/activities/${id}/info`, data);