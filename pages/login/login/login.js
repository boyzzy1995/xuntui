// pages/login/login/login.js
import {
  StoreLogin
} from '../../../api/StoreApi.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    submitData: {
      "username": '',
      "password": ''
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (wx.getStorageSync("username") != null && wx.getStorageSync("password") != null) {
      let submitData = {
        username: wx.getStorageSync("username"),
        password: wx.getStorageSync("password")
      }
      this.setData({
        submitData
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  input: function(e) {
    let data = this.data.submitData;
    data[e.currentTarget.id] = e.detail.value;
    this.setData({
      submitData: data
    });
  },
  submit: function() {
    let t = true;
    let me = this;
    for (let v in this.data.submitData) {
      if (this.data.submitData[v] == '') {
        t = false;
      }
    }
    if (t) {
      wx.showLoading({
        title: '正在加载'
      });
      let submitData = {
        ...this.data.submitData,
      }
      StoreLogin(submitData).then((resp) => {
        wx.hideLoading();
        if (resp.data.code == '1000') {
          wx.setStorageSync("storeToken", resp.data.data.token);
          wx.setStorageSync("storeId", resp.data.data.storeId);
          wx.setStorageSync("username", me.data.submitData.username);
          wx.setStorageSync("password", me.data.submitData.password);
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000,
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 2000);
        } else {
          wx.showToast({
            title: resp.data.data,
            icon: 'none',
            duration: 2000,
          })
        }
      })
    } else {
      wx.showToast({
        title: '数据不完整',
        icon: 'none',
        duration: 1000
      });
    }
  },
  /**
   * 进入注册页面
   */
  toRegist: function() {
    wx.redirectTo({
      url: '/pages/invite/invite',
    })
  },
  onShareAppMessage: function() {
    return {
      title: '做营销活动就用寻推',
      path: '/pages/index/index',
    }
  }
})