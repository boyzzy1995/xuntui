// pages/index/LocationSearch/LocationSearch.js
var bmap = require('../../../utils/bmap-wx.min.js');
var wxMarkerData = [];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    sugData: '',
    LocationDisplay: true,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.LoadLoaction();
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
  // 绑定input输入 
  bindKeyInput: function(e) {
    var that = this;
    // 新建百度地图对象 
    if (e.detail.value == '') {
      that.setData({
        LocationDisplay: true
      })
    } else {
      var BMap = new bmap.BMapWX({
        ak: 'jg9uKQ64vqBgO5oG6bsQtKX87qBoiINT'
      });
      var fail = function(data) {
        console.log(data)
      };
      var success = function(data) {
        var sugData = '';
        for (var i = 0; i < data.result.length; i++) {
          sugData = sugData + data.result[i].name + '\n';
        }
        that.setData({
          sugData: data,
          LocationDisplay: false
        });
      }
      // 发起suggestion检索请求 
      BMap.suggestion({
        query: e.detail.value,
        region: '杭州',
        city_limit: true,
        fail: fail,
        success: success
      });
    }
  },
  /**
   *加载当前地址
   */
  LoadLoaction: function () {
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'jg9uKQ64vqBgO5oG6bsQtKX87qBoiINT'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      let Mydata = data.wxMarkerData;
      that.setData({
        markers: wxMarkerData,
        placeData: {
          address: Mydata[0].address + '\n',
        }
      });
      that.setData({
        latitude: wxMarkerData[0].latitude
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });
    }
    // 发起POI检索请求 
    BMap.regeocoding({
      fail: fail,
      success: success,
      iconPath: '../../img/marker_red.png',
      iconTapPath: '../../img/marker_red.png'
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})