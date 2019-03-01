// pages/JionActivity/JionGongZhong/jionGongZhong.js
Page({

  /**
   * Page initial data
   */
  data: {
    show: false,
    imagePath: "/images/bg.jpg",
    imageTx: "/images/tx.png",
    imageEwm: "/images/ewm.jpg",
    maskHidden: true,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let me = this;
    wx.showLoading({
      title: '请稍后',
    })
    wx.downloadFile({
      url: options.imgUrl,
      success: function (resp) {
        wx.hideLoading()
        me.createNewImg(resp.tempFilePath, options.title, options.endTime);
      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },
  /**
   *设置画布的尺寸 
   */
  setCanvasSize: function () {
    let me = this;
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var width = res.windowWidth; //画布宽度
      var height = res.windowHeight;
      size.h = 300;
      size.w = width * 0.94;
      // me.setData({
      //   canvasHeight: size.h
      // })
    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);

    }
    return size;

  },
  //将"名字"绘制到canvas的固定
  setNameText: function (context, title) {
    let that = this;
    var size = that.setCanvasSize();
    var textFir = "商品:" + title;
    context.setFontSize(24);
    context.setTextAlign("left");
    context.setFillStyle("#000000");
    context.fillText(textFir, size.w * 0.1, size.h * 0.75);
    context.stroke();
  },
  //将1绘制到canvas的固定
  setTimeText: function (context, endtime) {
    let that = this;
    var size = that.setCanvasSize();
    var textFir = endtime + " 截止";
    context.setFontSize(22);
    context.setTextAlign("left");
    context.setFillStyle("#8a8a8a");
    context.fillText(textFir, size.w * 0.1, size.h * 0.88);
    context.stroke();
  },

  //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
  createNewImg: function (url, title, endtime) {
    var that = this;
    var size = that.setCanvasSize();
    var context = wx.createCanvasContext('myCanvas');
    var path = "/images/bg.jpg";
    var pathWhite = "/images/bg-white.jpg";
    var imageProduct = url;
    var imageLine = "/images/line.png";

    context.drawImage(path, 0, 0, size.w, size.h);
    context.drawImage(pathWhite, size.w * 0.02, size.h * 0.025, size.w * 0.96, size.h * 0.95);
    context.drawImage(imageProduct, size.w * 0.03, size.h * 0.038, size.w * 0.94, size.h * 0.6);
    this.setNameText(context, title);
    this.setTimeText(context, endtime);
    //绘制图片
    context.draw();
    //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
    // wx.showToast({
    //   title: '生成中...',
    //   icon: 'loading',
    //   duration: 2000
    // });
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        success: function (res) {
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
        fail: function (res) {

        }
      });
    }, 0);
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
      filePath: me.data.imagePath,
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
   * 分享
   */
  onShareAppMessage: function () {
    return {
      title: '做营销活动就用寻推',
      path: '/pages/index/index',
    }
  }
})