// pages/JionActivity/Rules/Rules.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rules: [{
      item: ['1.	该活动可转发微信好友/群/朋友圈',
        '2.	砍价2 + 次即可使用折扣',
        '3.	点击“立即使用”向商家出示折扣码',
        '4.	请在活动结束前使用折扣券，过期无效',
        '5.	快喊小伙伴帮你砍价吧'
      ]
    }, {
      item: ['1.	该活动可转发微信好友/群/朋友圈',
        '2.	分享到朋友圈让小伙伴帮你砍价吧',
        '3.	砍价后点击“立即使用”向商家出示折扣码',
        '4.	该活动为店内活动，请在买单前完成砍价，买单时向商家出示砍后折扣券',
        '5.	离店后无效，商家核销后，请按照砍后价向商家支付消费款',
        '6.	快喊小伙伴帮你砍价吧'
      ]
    }, {
      item: ['1.该活动可转发微信好友/群/朋友圈', '2.参与活动获得的商家奖励请向商家出示折扣码领取', '3.请在活动结束前使用折扣券，过期无效']
    }, {
      item: ['1.	该活动可转发微信好友/群/朋友圈',
        '2.	参与活动获得的商家奖励请向商家出示折扣码领取',
        '3.	请在活动结束前使用折扣券，过期无效'
      ]
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var index = parseInt(options.index);
    this.setData({
      rules: this.data.rules[index].item
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
    return {
      title: '做营销活动就用寻推',
      path: '/pages/index/index',
    }
  }
})