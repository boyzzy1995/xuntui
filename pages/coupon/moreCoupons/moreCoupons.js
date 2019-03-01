// pages/coupon/coupon.js
import {
  getCouponList
} from '../../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Coupon: [],
    code: [],
    listData: {
      page: 0,
      limit: 5
    },
    yhq: {
      text: "立即领取",
      color: "#8a8a8a"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '获取信息中...',
    })
    var that = this;
    getCouponList(that.data.listData).then((resp) => { 
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