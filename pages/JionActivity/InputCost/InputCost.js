// pages/JionActivity/InputCost/InputCost.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cost: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var str = decodeURIComponent(options.scene);
    var arry = str.split(":");
    this.setData({
      bargainId: arry[1]
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
  input: function(e) {
    this.setData({
      cost: e.detail.value
    });
  },
  submit: function() {
    var cost = this.data.cost;
    var bargainId = this.data.bargainId;
    if (cost == '') {
      wx.showToast({
        title: '请输入消费金额',
        icon: 'none'
      })
      return;
    }

    wx.navigateTo({
      url: '/pages/JionActivity/JionActivity?storeBargainId=' + bargainId + "&&cost=" + cost,
    })
  },
  toIndex: function() {
    wx.redirectTo({
      url: '/pages/index/index'
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '做营销活动就用寻推',
      path: '/pages/index/index',
    }
  }
})