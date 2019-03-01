// pages/person/integral/integral.js
import {
  deleteUserScore,
  isDestory
} from '../../../api/api.js'
import { host } from '../../../api/config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total: "",
    url: "",
    imgView: "",
    restTime: "",
    disabled: false
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

  },
  input: function(e) {
    this.setData({
      total: e.detail.value
    })
  },
  payIntegral: function() {
    let that = this
    if (that.data.total == "" || that.data.total == 0) {
      wx.showToast({
        title: "请输入积分",
        icon: 'none',
        duration: 2000,
      })
      return
    }
    wx.getStorage({
      key: 'id',
      success: function(res) {
        wx.request({
          url: host+"api/user/integral/" + res.data + "/code/" + that.data.total,
          success(res) {
            that.setData({
              url: res.data.data.data,
              imgView: "img-view",
              restTime: 60 + "秒后失效",
              disabled: true
            })
            let time = 59;
            var setInter = setInterval(function() {
              if (time == 0) {
                that.setData({
                  disabled: false
                })
                clearInterval(setInter);
                that.setData({
                  restTime: "点击确定重新刷新"
                })
                return
              }
              that.setData({
                restTime: time + "秒后失效"
              })
              time = time - 1;
            }, 1000)
            let json = JSON.parse(res.data.data.result)
            let key = json.key
            isDestory(key).then((resp) => {
              if (resp.data.data == true) {
                wx.navigateBack({

                })
                wx.showToast({
                  title: '扣除积分成功',
                  icon: 'none',
                  duration: 2000
                })
              }
            })
          }
        })
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})