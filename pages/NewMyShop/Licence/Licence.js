// pages/NewMyShop/Licence/Licence.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let me = this;
    wx.downloadFile({
      url: options.img,
      success: function(res) {
        me.createNewImg(res.tempFilePath)
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
  setCanvasSize: function() {
    let me = this;
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var width = res.windowWidth; //画布宽度
      var height = res.windowHeight;
      size.h = (414 / 375) * 200;
      size.w = width - 22;
      me.setData({
        canvasHeight: size.h
      })
    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);

    }
    return size;

  },
  //将1绘制到canvas的固定
  setNameText: function(context) {
    let that = this;
    var size = that.setCanvasSize();
    var textFir = '寻推签约商户，禁止它用，复印无效';
    context.setFontSize(20);
    context.setTextAlign("left");
    context.setFillStyle("#8a8a8a");
    context.fillText(textFir, size.w * 0.05, size.h * 0.5);
    context.rotate(90 * Math.PI / 180);
    context.stroke();
  },

  //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
  createNewImg: function(img) {
    var that = this;
    var size = that.setCanvasSize();
    var context = wx.createCanvasContext('myCanvas');
    var path = img;

    context.drawImage(img, 0, 0, size.w, size.h);

    this.setNameText(context);
    //绘制图片
    context.draw();
    //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
    // wx.showToast({
    //   title: '生成中...',
    //   icon: 'loading',
    //   duration: 2000
    // });
    setTimeout(function() {
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        success: function(res) {
          var tempFilePath = res.tempFilePath;
          that.setData({
            imagePath: tempFilePath,
            canvasHidden: false,
            maskHidden: true,
          });
          //将生成的图片放入到《image》标签里
          var img = that.data.imagePath;
          // wx.previewImage({
          //   current: img, // 当前显示图片的http链接
          //   urls: [img] // 需要预览的图片http链接列表
          // })
        },
        fail: function(res) {

        }
      });
    }, 0);
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