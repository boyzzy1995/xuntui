//app.js
import {
  login,
  userMessage
} from './api/api.js'
import {
  deleteQRCode,
  getHexiaoRecords
} from './api/StoreApi.js'
App({
  onLaunch: function() {
    let id = wx.getStorageSync('id');
    // 更新token
    if (id) {
      wx.showLoading({
        title: '正在加载'
      });
      wx.login({
        success: resp => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          if (resp.code) {
            login(resp.code).then((resp) => {
              wx.hideLoading();
              wx.setStorage({
                key: "userToken",
                data: resp.data.data.userToken
              });
            })
          }
        }
      })
    }
  },
  onShow: function() {
    let id = wx.getStorageSync('id');
    if (!this.checkLogin()){
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return;
    }
    let storeId = wx.getStorageSync('storeId');
    userMessage(id).then((resp) => {
      if (resp.data.code == 1000) {
        if (storeId != null) {
          getHexiaoRecords(storeId).then((resp) => {
            if (resp.data.code == 5001) {
              wx.showToast({
                title: '商家登入已过期,请重新登入',
                duration: 2000,
                icon: 'none'
              })
              setTimeout(function () {
                wx.navigateTo({
                  url: '/pages/login/login/login',
                })
              }, 2000)
            }
          })
        }
      } else if (resp.data.code == 5001) {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }
      else {
        wx.showToast({
          title: resp.data.data,
          icon: 'none',
          duration: 2000,
        });
      }
    })
  },
  globalData: {
    userInfo: null
  },
  checkLogin: () => {
    if (wx.getStorageSync('id') && wx.getStorageSync('userToken')) {
      return true;
    } else {
      return false;
    }
  },
  checkStoreLogin: () => {
    if (wx.getStorageSync('storeId') && wx.getStorageSync('storeToken')) {
      return true;
    } else {
      return false;
    }
  }
})