// pages/MyShop/MyShop.js
import {
  getUserCouponList
} from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gameView: "left-view-click",
    couponView: "left-view",
    gameScrollView: "right-scroll-show",
    couponScrollView: "right-scroll",
    bodyMine: "body-show",
    bodyDetail: "body",
    navViewShow: "nav-view-click",
    navView: "nav-view",
    Coupon: [],
    code: [],
  },
  showGameView: function () {
    this.setData({
      gameView: "left-view-click",
      couponView: "left-view",
      gameScrollView: "right-scroll-show",
      couponScrollView: "right-scroll"
    })
  },
  showCouponView: function () {
    this.setData({
      gameView: "left-view",
      couponView: "left-view-click",
      gameScrollView: "right-scroll",
      couponScrollView: "right-scroll-show"
    })
  },
  showMine: function () {
    this.setData({
      bodyMine: "body-show",
      bodyDetail: "body",
      navViewShow: "nav-view-click",
      navView: "nav-view"
    })
  },
  showDetail: function () {
    this.setData({
      bodyMine: "body",
      bodyDetail: "body-show-block",
      navViewShow: "nav-view",
      navView: "nav-view-click"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '获取信息中...',
    })
    var that = this;
    var id;
    wx.getStorage({
      key: 'id',
      success: function (res) {
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
      title: '做营销活动就用寻推',
      path: '/pages/index/index',
    }
  }
})