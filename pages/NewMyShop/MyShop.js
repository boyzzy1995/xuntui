// pages/NewMyShop/MyShop.js
import {
  getAllStoreAcitivityList,
  getStoreInfo
} from '../../api/api.js'
import {
  host
} from '../../api/config.js'
import {
  deleteQRCode,
  getHexiaoRecords
} from '../../api/StoreApi.js'
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    NavList: [{
      title: "活动列表",
      style: "NavSelect"
    }, {
      title: "商家信息",
      style: "NavNonSelect"
    }, {
      title: "核销管理",
      style: "NavNonSelect"
    }],
    ActivityListDisplay: "block",
    StoreInfoDisplay: "none",
    HeXiaoDisplay: "none"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    app.onShow();
    let me = this;
    wx.getStorage({
      key: 'storeId',
      success: function(res) {
        me.getStoreInfo(res.data);
        me.getActivityList(res.data);
        me.getHexiaoRecords(res.data);
      }
    })
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
   * 导航栏点击
   */
  navTap: function(e) {
    let me = this;
    let list = this.data.NavList;
    let storeId = wx.getStorageSync('storeId');
    let index = e.currentTarget.dataset.index;
    for (var i = 0; i < list.length; i++) {
      list[i].style = "NavNonSelect";
    }
    list[index].style = "NavSelect";
    //navBar切换view
    if (index == 0) {
      this.setData({
        NavList: list,
        ActivityListDisplay: "block",
        StoreInfoDisplay: "none",
        HeXiaoDisplay: "none"
      })
      if (me.data.ActivityList.length <= 0) {
        me.setData({
          NullTip:'flex'
        })
      }
      // this.getActivityList(storeId);
    } else if (index == 1) {
      this.setData({
        NavList: list,
        ActivityListDisplay: "none",
        StoreInfoDisplay: "flex",
        HeXiaoDisplay: "none",
        NullTip: "none"
      })
      // this.getActivityList(storeId);
    } else {
      this.setData({
        NavList: list,
        ActivityListDisplay: "none",
        StoreInfoDisplay: "none",
        HeXiaoDisplay: "flex",
        NullTip: "none"
      })
      // this.getActivityList(storeId);
    }
  },
  /**
   * 查看营业执照
   */
  toLicence: function(e) {
    wx.navigateTo({
      url: 'Licence/Licence?img=' + e.currentTarget.dataset.img
    })
  },
  /**
   * 获得商店所有活动信息
   */
  getActivityList: function(storeId) {
    wx.showLoading({
      title: '加载中',
    })
    let me = this;
    getAllStoreAcitivityList(storeId).then((resp) => {
      wx.hideLoading();
      var list = resp.data.data;
      if (me.data.ActivityListDisplay == "block") {
        if (resp.data.code != 4003) {
          me.setData({
            NullTip: "none",
            ActivityList: list
          })
        } else {
          me.setData({
            NullTip: "flex",
            ActivityList: []
          })
        }
      } else {
        me.setData({
          NullTip: "none",
          ActivityList: []
        })
      }
    })
  },
  /**
   * 获得商家信息
   */
  getStoreInfo: function(storeId) {
    wx.showLoading({
      title: '加载中',
    })
    getStoreInfo(storeId).then((resp) => {
      wx.hideLoading()
      this.setData({
        StoreInfo: resp.data.data
      })
    })
  },
  /**
   * 打电话
   */
  callPhone: function() {
    wx.makePhoneCall({
      phoneNumber: this.data.StoreInfo.telephone,
    })
  },
  /**
   * 核销
   */
  hexiao: function() {
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        let json = JSON.parse(res.result)
        let data = {
          userId: json.userId,
          code: json.code
        }
        wx.showLoading({
          title: '加载中',
        })
        deleteQRCode(json.bargainId, json.teamId, data).then((resp) => {
          wx.hideLoading()
          if (resp.data.code == 2002) {
            wx.showToast({
              title: '核销成功',
              icon: 'success',
              duration: 2000,
            })
          } else {
            wx.showToast({
              title: '核销失败',
              icon: 'none',
              duration: 2000,
            })
          }
        })
      }
    })
  },
  /**
   * 获得核销记录
   */
  getHexiaoRecords: function(storeId) {
    let me = this;
    getHexiaoRecords(storeId).then((resp) => {
      if (resp.data.code == 4003) {
        me.setData({
          records: []
        })
      } else {
        me.setData({
          records: resp.data.data
        })
      }
    })
  },
  /**
   * 查看二维码
   */
  toEWMDetail: function(e) {
    wx.navigateTo({
      url: 'EWMDetail/EWMDetail?qrCode=' + e.currentTarget.dataset.qrcode
    })
  },
  /**
   * 查看小程序码
   */
  toCheckEWM: function(e) {
    wx.showLoading({
      title: '正在生成二维码,即将跳转',
    })
    var path = "pages/JionActivity/InputCost/InputCost",
      bargainId = e.currentTarget.dataset.id,
      storeToken = wx.getStorageSync("storeToken"),
      url = "path=" + path + "&&scene=bargainId:" + bargainId;
    wx.downloadFile({
      url: `${host}` + "/api/bargains/minicode?" + url,
      header: {
        "API-STORE-TOKEN": storeToken
      },
      success: function(resp) {
        wx.hideLoading();
        wx.navigateTo({
          url: '/pages/StartActivity/Tools/Store/EWMDetail/EWMDetail?url=' + resp.tempFilePath + "&&state=false",
        })
      }
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