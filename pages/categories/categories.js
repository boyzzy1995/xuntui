// pages/categories/categories.js
import {
  stores,
  getUserCouponList
} from '../../api/api.js'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    recommends: [],
    leave: '',
    stores: []
  },
  toDetail(event) {
    if (app.checkLogin()) {
      wx.navigateTo({
        url: '../shopDetail/shopDetail?id=' + event.currentTarget.dataset.id + '&name=' + event.currentTarget.dataset.name,
      })
    } else {
      wx.navigateTo({
        url: '../login/login',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    wx.showLoading({
      title: '获取信息中...',
    })
    wx.setNavigationBarTitle({
      title: options.name
    });
    this.setData({
      id: options.id
    })
    stores(1, options.id).then((resp) => {
      wx.hideLoading();
      if (resp.data.code != 1000) {
        wx.showToast({
          title: '暂无数据',
          icon: 'none',
          duration: 2000,
        })
        this.setData({
          leave: setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 2000)
        })

      } else {
        
        this.setData({
          stores: resp.data.data
        });
      }
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
    //  console.log("页面隐藏");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    // console.log("页面销毁");
    clearTimeout(this.data.leave);
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
  gotoDetail:function(){
    wx.navigateTo({
      url: '../StoreShop/StoreShop',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '门店广告位推广平台 线下推广如此简单',
      path: '/pages/index/index'
    }
  }
})