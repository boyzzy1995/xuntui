// pages/coupon/coupon.js
import {
  getUserCouponList
} from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Coupon: [],
    code: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '获取信息中...',
    })
    var that = this;
    var id;
    wx.getStorage({
      key: 'id',
      success: function(res) {
        id = res.data
        getUserCouponList(id).then((resp) => {
          wx.hideLoading()
          if (resp.data.code == 4003) {
            that.setData({
              code: resp.data.code
            })
          } else {
            that.setData({
              Coupon: resp.data.data
            })
          }
        });
      },
    })
  },
  //跳转到扫描二维码页面
  use:function(){
    wx.setStorageSync({
        key:'couponId'
    })     
     wx.navigateTo({
       
       url:'code/code'
     })
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
  onShareAppMessage: function() {

  }
})