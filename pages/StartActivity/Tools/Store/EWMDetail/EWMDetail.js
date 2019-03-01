// pages/NewMyShop/EWMDetail/EWMDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var state = options.state === "false" ? false : true;
    this.setData({
      imgUrl:options.url,
      isShow: state
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
  * 保存图片
  */
  saveImg: function () {
    let me = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
               
            }
          })
        }
      }
    })
    wx.saveImageToPhotosAlbum({
      filePath: me.data.imgUrl,
      success: function (data) {
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  /**
   * 
   */
  getBack:function(){
    wx.redirectTo({
      url: '/pages/StartActivity/ChoiceTools/ChoiceTools',
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