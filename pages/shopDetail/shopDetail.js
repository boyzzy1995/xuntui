// pages/shopDetail/shopDetail.js
import {storesDetail} from '../../api/api.js'
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    data:{},
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    markers:[]
  },
  submit(){
    // wx.showToast({
    //   title: '功能正在开发中',
    //   icon: 'none',
    //   duration: 2000
    // })
    if (app.checkLogin()){
      wx.navigateTo({
        url: '../throwIn/throwIn?id='+this.data.data.id+'&name='+this.data.data.name,
      })
    }else{
      wx.navigateTo({
        url: '../login/login',
      })
    }
  },
  openMap:function(){
    let that=this;
    wx.authorize({
      scope: 'scope.userLocation',
      success() {
        // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
        wx.openLocation({
          latitude: that.data.data.latitude,
          longitude: that.data.data.longitude,
          scale: 18
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.name
    });
    this.setData({
      id:options.id
    })
    storesDetail(options.id).then((resp)=>{
      if(resp.data.code==1000){
        this.setData({
          data:resp.data.data,
          markers:[{
            latitude: resp.data.data.latitude,
            longitude: resp.data.data.longitude
          }]
        })
      }
    });
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '门店广告位推广平台 线下推广如此简单',
      path: '/pages/index/index'
    }
  }
})