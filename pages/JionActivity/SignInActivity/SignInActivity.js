// pages/JionActivity/SignInActivity/SignInActivity.js
import {
  getSign,
  Sign
} from '../../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    submitData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getSignActivity(options.id);
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

  getSignActivity: function(id) {
    let me = this;
    wx.showLoading({
      title: '加载中',
    })
    getSign(id).then((resp) => {
      wx.hideLoading();
      if (resp.data.code == 1000) {
        me.setData({
          list: resp.data.data
        })
      }
    })
  },

  input: function(e) {
    let data = this.data.submitData;
    data[e.currentTarget.dataset.index] = e.detail.value;
    this.setData({
      submitData: data
    });
  },

  submit: function(e) {
    wx.showLoading({
      title: '加载中',
    })
    var me=this;
    var id = e.currentTarget.dataset.id;
    var data = {items:this.data.submitData.join('#')};
    Sign(id,data).then((resp)=>{
       wx.hideLoading();
       if(resp.data.code == 2001){
         wx.showToast({
           title: '报名成功',
           duration:2000
         })
         setTimeout(()=>{
           me.getSignActivity(id);
         },2000)
       }else if(resp.data.code==4002){
         wx.showToast({
           title: '你已报名,请勿重复报名',
           icon:'none'
         })
       }
    })
  },
  /**
     * 浏览商家其他活动
     */
  toStoreActivity: function (e) {
    wx.navigateTo({
      url: '/pages/NewMyShop/VisitOtherStore/VisitOtherStore?storeId=' + e.currentTarget.dataset.storeid
    })
  },
  /**
   * 更多商家活动
   */
  moreActivity: function () {
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },
  toRules: function () {
    wx.navigateTo({
      url: '../Rules/Rules?index=' + 2
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})