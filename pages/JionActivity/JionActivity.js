// pages/JionActivity/JionActivity.js
// import {
//   getSpecialBargain
// } from "../../api/StoreApi.js"
import {
  getSpecialBargain,
  jionSpecialBargain,
  jionBargain,
  getBarCode,
  getMiniCode
} from "../../api/api.js"
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    height: "100%",
    maskHidden: true,
    btnCallFriendHelpYou: true,
    BarCodeShow: "none"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    let me = this;
    if (options.id != null) {
      wx.setStorageSync('optionsId', options.id);
    }
    if (options.storeBargainId != null && options.cost != null) {
      wx.setStorageSync('storeBargainId', options.storeBargainId);
      wx.setStorageSync('cost', options.cost);
    }
    if (options.startAnotherId != null) {
      me.getInfo(options.startAnotherId);
    }
    if (options.bargainId != null && options.bargainTeamId != null) {
      wx.setStorageSync('bargainId', options.bargainId);
      wx.setStorageSync('bargainTeamId', options.bargainTeamId);
    }
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
    let me = this;
    if (wx.getStorageSync('optionsId') != '') {
      var data = {};
      me.getInfo(wx.getStorageSync('optionsId'), data);
    }
    if (wx.getStorageSync('storeBargainId') != '' && wx.getStorageSync('cost') != '') {
      var data = {
        originalPrice: wx.getStorageSync('cost')
      };
      me.getInfo(wx.getStorageSync('storeBargainId'), data);
    }
    if (wx.getStorageSync('bargainId') != '' && wx.getStorageSync('bargainTeamId') != '') {
      me.jionBargain(wx.getStorageSync('bargainId'), wx.getStorageSync('bargainTeamId'));
    }
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
  showMask: function() {
    this.setData({
      show: true
    })
  },
  cancel: function() {
    this.setData({
      show: false
    })

  },

  setCanvasSize: function() {
    let me = this;
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var width = res.windowWidth; //画布宽度
      var height = res.windowHeight;
      size.h = height + 64;
      size.w = width;
      me.setData({
        canvasHeight: size.h
      })
    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);

    }
    return size;

  },
  //将"名字"绘制到canvas的固定
  setNameText: function(context) {
    let that = this;
    var size = that.setCanvasSize();
    var textFir = that.data.bargainTeam.records[0].user.nickName;
    context.setFontSize(14);
    context.setTextAlign("center");
    context.setFillStyle("#FFF");
    context.fillText(textFir, size.w / 2, size.h * 0.13);
    context.stroke();

  },
  //将1绘制到canvas的固定
  settextFir: function(context) {
    let that = this;
    var size = that.setCanvasSize();
    var textFir = "发起了一个砍价活动";
    context.setFontSize(20);
    context.setTextAlign("center");
    context.setFillStyle("#FFF");
    context.fillText(textFir, size.w / 2, size.h * 0.17);
    context.stroke();
  },
  //将2绘制到canvas的固定
  settextSec: function(context) {
    let that = this;
    var size = that.setCanvasSize();
    var textSec = "长按识别小程序，参与砍价活动";
    context.setFontSize(16);
    context.setTextAlign("center");
    context.setFillStyle("#8a8a8a");
    context.fillText(textSec, size.w / 2, size.h * 0.8);
    context.stroke();
  },

  //将说明文字绘制到canvas的固定
  setDesText: function(context) {
    let that = this;
    var size = that.setCanvasSize();
    var textSec = "砍价说明:推荐给好友,好友帮助砍价";
    context.setFontSize(16);
    context.setTextAlign("left");
    context.setFillStyle("#8a8a8a");
    context.fillText(textSec, size.w * 0.1, size.h * 0.845);
    context.stroke();
  },
  /**
   * 生成分享图
   */
  showShareImg: function() {
    let userToken = wx.getStorageSync("userToken");
    wx.showLoading({
      title: '请稍后',
    })
    let codeUrl = "https://api.51xuntui.com/api/bargains/" + this.data.bargain.id + "/team/" + this.data.bargainTeam.id + "/minicode";
    let me = this;
    wx.downloadFile({
      url: codeUrl,
      header: {
        "API-USER-TOKEN": userToken,
      },
      success: function(res) {
        me.setData({
          imageEwm: res.tempFilePath,
          maskHidden: false
        })
        wx.downloadFile({
          url: me.data.bargain.preview,
          success: function(res) {
            wx.hideLoading();
            var prduct = res.tempFilePath;
            wx.downloadFile({
              url: me.data.bargainTeam.records[0].user.avatarUrl,
              success: function(res) {
                me.createNewImg(prduct, res.tempFilePath);
              }
            })
          }
        })
      }
    })
  },
  //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
  createNewImg: function(prduct, tx) {
    var that = this;
    var size = that.setCanvasSize();
    var context = wx.createCanvasContext('myCanvas');
    var path = "/images/bg.jpg";
    var pathWhite = "/images/bg-white.jpg";
    var imageTx = tx;
    var imageEwm = that.data.imageEwm;
    var imageProduct = prduct;
    var imageLine = "/images/line.png";
    context.drawImage(path, 0, 0, size.w, size.h);
    context.drawImage(imageTx, size.w / 2 - 30, size.h * 0.02, size.w * 0.14, size.w * 0.14);
    context.drawImage(pathWhite, size.w * 0.03, size.h * 0.2, size.w * 0.94, size.h * 0.78);
    context.drawImage(imageProduct, size.w * 0.05, size.h * 0.21, size.w * 0.9, size.h * 0.36);
    context.drawImage(imageLine, size.w * 0.05, size.h * 0.58, size.w * 0.9, size.h * 0.001);
    context.drawImage(imageLine, size.w * 0.05, size.h * 0.583, size.w * 0.9, size.h * 0.001);
    context.drawImage(imageEwm, size.w / 2 - 70, size.h * 0.59, size.w * 0.33, size.w * 0.33);
    context.drawImage(imageLine, size.w * 0.05, size.h * 0.81, size.w * 0.9, size.h * 0.001);
    context.drawImage(imageLine, size.w * 0.05, size.h * 0.813, size.w * 0.9, size.h * 0.001);
    this.setNameText(context);
    this.settextFir(context);
    this.settextSec(context);
    this.setDesText(context);
    //绘制图片
    context.draw();
    //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
    wx.showToast({
      title: '生成中...',
      icon: 'loading',
      duration: 2000
    });
    setTimeout(function() {
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        success: function(res) {
          var tempFilePath = res.tempFilePath;
          that.setData({
            imagePath: tempFilePath,
            canvasHidden: false,
            maskHidden: true,
          });　　　　　　　　 //将生成的图片放入到《image》标签里
          var img = that.data.imagePath;
          wx.previewImage({
            current: img, // 当前显示图片的http链接
            urls: [img] // 需要预览的图片http链接列表
          })
        },
        fail: function(res) {

        }
      });

    }, 2000);
  },

  /**
   * 进入到嵌入公众号页面
   */
  toJionGongZhongPage: function(e) {
    let userToken = wx.getStorageSync("userToken");
    var imgUrl = e.currentTarget.dataset.imgurl;
    var title = e.currentTarget.dataset.title;
    var endTime = e.currentTarget.dataset.endtime;
    let codeUrl = "https://api.51xuntui.com/api/bargains/" + this.data.bargain.id + "/team/" + this.data.bargainTeam.id + "/minicode";
    let me = this;
    wx.showLoading({
      title: '请稍后'
    })
    wx.downloadFile({
      url: codeUrl,
      header: {
        "API-USER-TOKEN": userToken,
      },
      success: function(res) {
        wx.hideLoading();
        wx.navigateTo({
          url: 'JionGongZhong/jionGongZhong?imgUrl=' + imgUrl + "&title=" + title + "&endTime=" + endTime + "&ewm=" + res.tempFilePath
        })
      }
    });
  },
  /**
   * 更多商家活动
   */
  moreActivity: function() {
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },
  /**
   * 获得活动信息
   */
  getInfo: function(id, data) {
    let me = this;
    wx.showLoading({
      title: '加载中',
    })
    jionSpecialBargain(id, data).then((resp) => {
      wx.hideLoading()
      if (resp.data.code == 1000) {
        me.setData({
          bargain: resp.data.data.bargain,
          bargainTeam: resp.data.data.bargainTeam
        })
        this.clearStorage();

      }
    })
  },

  //加入砍价
  jionBargain: function(id, teamid) {
    let me = this;
    wx.showLoading({
      title: '加载中',
    })
    jionBargain(id, teamid).then((resp) => {
      wx.hideLoading();
      if (resp.data.code == 1000) {
        me.clearStorage();
        let shareId = wx.getStorage({
          key: 'id',
          success: function(res) {
            if (resp.data.data.bargainTeam.userId != res.data) { //显示我也要参加
              if (parseInt(resp.data.data.bargain.type) >= 2000) { //到店参与
                me.setData({
                  toStoreJionActivity: true,
                  btnCallFriendHelpYou: false,
                  btnMeWant:false
                })
              } else {
                me.setData({
                  btnCallFriendHelpYou: false,
                  toStoreJionActivity: false,
                  btnMeWant:true
                })
              }
            } else {
              me.setData({
                btnCallFriendHelpYou: true,
                toStoreJionActivity: false,
                btnMeWant: false
              })
            }
          }
        })
        this.setData({
          bargain: resp.data.data.bargain,
          bargainTeam: resp.data.data.bargainTeam
        })
        if (resp.data.data.bargainTeam.status == 1) {
          wx.showToast({
            title: '该活动已经结束',
            icon: "none"
          })
          me.setData({
            ActivityFinish: "none",
            shareBtn: "disabled"
          })
        }
      }
    })
  },
  /**
   * 浏览商家其他活动
   */
  toStoreActivity: function(e) {
    wx.navigateTo({
      url: '/pages/NewMyShop/VisitOtherStore/VisitOtherStore?storeId=' + e.currentTarget.dataset.storeid
    })
  },
  /**
   * 获得条形码
   */
  getBarCode: function() {
    let me = this;
    wx.showLoading({
      title: '加载中',
    })
    getBarCode(this.data.bargain.id, this.data.bargainTeam.id).then((resp) => {
      wx.hideLoading()
      me.setData({
        BarCodeImg: resp.data.data,
        BarCodeShow: "block"
      })
    })
  },
  /**
   * 我也要发起活动
   */
  toStartActivity: function() {
    wx.redirectTo({
      url: '/pages/StartActivity/ChoiceTools/ChoiceTools'
    })
  },
  /**
   * 我也要参加活动
   */
  toJoinActivity: function(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/JionActivity/JionActivity?startAnotherId=' + id,
    })
  },

  clearStorage: function() {
    wx.removeStorageSync('bargainId');
    wx.removeStorageSync('optionsId');
    wx.removeStorageSync('bargainTeamId');
    wx.removeStorageSync('storeBargainId');
    wx.removeStorageSync('cost');
  },

  ShowRules: function() {
    wx.navigateTo({
      url: 'Rules/Rules?index=' + 0
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '我正在砍价，快来帮我吧！',
      path: '/pages/JionActivity/JionActivity?bargainId=' + this.data.bargain.id + '&bargainTeamId=' + this.data.bargainTeam.id,
    }
  }
})