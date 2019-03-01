// pages/NewMyShop/MyShop.js
import {
  getAllStoreAcitivityList,
  getStoreInfo
} from '../../../api/api.js'
import {
  deleteQRCode
} from '../../../api/StoreApi.js'
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
      },
      {
        title: "",
        style: "NavNonSelect"
      }
    ],
    ActivityListDisplay: "block",
    StoreInfoDisplay: "none",
    HeXiaoDisplay: "none"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let me = this;
    if (options.storeId != null) {
      me.getActivityList(options.storeId);
      me.getStoreInfo(options.storeId);
      me.setData({
        storeId:options.storeId
      })
    } else {
      wx.getStorage({
        key: 'storeId',
        success: function(res) {
          me.getActivityList(res.data);
          me.getStoreInfo(res.data);
          me.setData({
            storeId:res.data
          })
        },
      })
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
    let list = this.data.NavList;
    let id=this.data.storeId;
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
      this.getActivityList(id);
    } else if (index == 1) {
      this.setData({
        NavList: list,
        ActivityListDisplay: "none",
        StoreInfoDisplay: "flex",
        HeXiaoDisplay: "none",
        NullTip: "none"
      })
      this.getActivityList(id);
    } else if (index == 2) {
      // this.setData({
      //   NavList: list,
      //   ActivityListDisplay: "none",
      //   StoreInfoDisplay: "none",
      //   HeXiaoDisplay: "flex"
      // })
    }
  },
  /**
   * 查看营业执照
   */
  toLicence: function() {
    wx.navigateTo({
      url: '../Licence/Licence',
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
      wx.hideLoading()
      var list = resp.data.data;
      if (me.data.ActivityListDisplay == "block") {
        if (resp.data.code != 4003) {
          me.setData({
            NullTip: "none",
            ActivityList: resp.data.data
          })
        } else {
          me.setData({
            NullTip: "flex",
            ActivityList: []
          })
        }
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
   * 查看二维码
   */
  toEWMDetail: function(e) {
    wx.navigateTo({
      url: '../EWMDetail/EWMDetail?qrCode=' + e.currentTarget.dataset.qrcode
    })
  },
  toJionActivity:function(e){
    wx.navigateTo({
      url: '../../JionActivity/JionActivity?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 查看营业执照
   */
  toLicence: function (e) {
    wx.navigateTo({
      url: '../Licence/Licence?img=' + e.currentTarget.dataset.img
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