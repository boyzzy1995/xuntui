// pages/person/person.js
import { contact, userMessage, getUserScore} from '../../api/api.js'
import { deleteIntegral } from '../../api/StoreApi.js'
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    url:'',
    score:'',
    isStore:false,
    submitData: {
      "storeId": 1,
      "total": "",
      "userId": "",
      "time": ""
    }
  },
  about:function(){
    wx.navigateTo({
      url: '../about/about'
    })
  },
  myCoupon:function(){
   wx.navigateTo({
     url: '../coupon/coupon',
   })
  },
  toKefu:function(){
    // wx.showToast({
    //   title: '功能正在开发中，敬请期待',
    //   icon: 'none',
    //   duration: 2000,
    // })
  },
  payIntegral:function(){
     wx.navigateTo({
       url: 'integral/integral',
     })
  },
  callPhone:function(){
    wx.showLoading({
      title: '正在获取手机号码'
    });
    contact().then((resp)=>{
      wx.hideLoading();
      if(resp.data.code==1000){
        wx.makePhoneCall({
          phoneNumber: resp.data.data.contact
        })
      }else{
        wx.showToast({
          title: resp.data.data,
          icon: 'none',
          duration: 2000,
        })
      }
    })
  },
  toIndex:function(){
    wx.navigateTo({
      url: '../throwIn/throwIn'
    })
  },
  toInvite:function(){
    wx.navigateTo({
      url: '../invite/invite',
    })
  },
  GameScore:function(){
   wx.navigateTo({
     url: 'GameScore/GameScore',
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  storeLogin:function(){
    wx.navigateTo({
      url: '../login/login/login',
    })
  },
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.selectComponent("#component").checkLogin();
    let that = this;
    if (app.checkStoreLogin()) {
      that.setData({
        isStore: true
      })
    }
    wx.getStorage({
      key: 'id',
      success: function (res) {
        getUserScore(res.data).then((resp) => {
          if (resp.data.code == 1000) {
            that.setData({
              score: resp.data.data
            })
          }
        })
      },
    })
    wx.showLoading({
      title: '获取用户信息中...',
    })
    let id = wx.getStorageSync('id');
    userMessage(id).then((resp) => {
      wx.hideLoading();
      if (resp.data.code == 1000) {
        that.setData({
          name: resp.data.data.nickName,
          url: resp.data.data.avatarUrl
        })
      } else if (resp.data.code == 5001) {
        wx.navigateTo({
          url: '../login/login',
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  exit:function(){
    
    wx.removeStorage({
      key: 'storeToken',
      success(res) {
        wx.removeStorageSync('storeId');
        wx.removeStorageSync('username');
        wx.removeStorageSync('password');
        wx.showToast({
          title: '退出成功',
          icon: 'success',
          duration: 2000,
        })
        setTimeout(() => {
          wx.redirectTo({
            url: "../person/person"
          })
        }, 2000);
      }
    })
  },
  //核销积分
  hexiao: function () {
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res)
        let json = JSON.parse(res.result)
        wx.showLoading({
          title: '核销中',
        })
        this.data.submitData.total = json.total
        this.data.submitData.userId = json.id
        this.data.submitData.time = json.time

        deleteIntegral(this.data.submitData).then((resp) => {
          wx.hideLoading()
          if (resp.data.code == 2003) {
            wx.showToast({
              title: '核销成功',
              icon: 'success',
              duration: 2000,
            })
          } else {
            wx.showToast({
              title: '核销失败',
              icon: 'none',
              duration: 2000,
            })
          }
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '做营销活动就用寻推',
      path: '/pages/index/index',
    }
  }
})