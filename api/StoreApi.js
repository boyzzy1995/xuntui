import { host } from './config.js';
import $http from './StoreHttp.js'
//商家登入接口
export const StoreLogin = (data) => $http.post(`${host}/api/store/account/login`, data);
//商家核销优惠券
export const deleteIntegral = (data) => $http.post(`${host}/api/user/integral/use`, data);
//查询所有游戏
export const getGameList = () => $http.get(`${host}/api/store/game`);
//商家发布小游戏
export const pushGame = (data) => $http.post(`${host}/api/store/game`, data);
//商家查询自己发起的游戏
export const getStoreGameList = (id) => $http.get(`${host}/api/store/game/${id}`);
//商家发布砍价工具通用版
export const bargainCommon = (data) => $http.post(`${host}/api/bargains`,data);
//查询商家发布砍价活动
export const getAllBargainCommon = () => $http.get(`${host}/api/bargains`);
//商家核销二维码
export const deleteQRCode = (bargainId, teamId,data) => $http.put(`${host}/api/bargains/${bargainId}/team/${teamId}/qrcode`,data);
//获取商家核销记录
export const getHexiaoRecords = (storeId) => $http.get(`${host}/api/stores/${storeId}/records`);
//商家发布投票活动
export const addVote = (data) => $http.post(`${host}/api/votes`, data);
//商家发布报名活动
export const addSignIn = (data) => $http.post(`${host}/api/activities`, data);
//获取商家小程序码
export const getMiniCode = (data) => $http.get(`${host}/api/bargains/minicode`,data);
