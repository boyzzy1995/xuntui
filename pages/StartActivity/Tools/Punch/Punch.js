// pages/StartActivity/Tools/Common/Common.js
import {
  bargainCommon
} from '../../../../api/StoreApi.js'
import {
  uploadUrl
} from '../../../../api/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fixdate: '',
    activedate: '',
    pickertimestrat: [],
    TipsDisplay: "block",
    submitData: {
      "title": "",
      "originalPrice": '',
      "minValue": '',
      "type": 1000
    },
    pics: [],
    items: [{
        name: '是',
        value: '是'
      },
      {
        name: '否',
        value: '否'
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getDate();
  },
  getDate: function() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (month < 10) {
      month = "0" + month
    }

    var day = date.getDate();
    var endDay = day + 1;
    if (day < 10) {
      day = "0" + day;
      endDay = "0" + endDay;
    }

    this.setData({
      pickertimestrat: year + "-" + month + "-" + day,
      pickertimeend: year + 1 + "-" + month + "-" + day,
      startTime: year + "-" + month + "-" + day,
      endTime: year + "-" + month + "-" + endDay
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
  bindFixDateChange: function(e) {
    this.setData({
      startTime: e.detail.value
    })
  },
  bindActiveDateChange: function(e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  /**
   * 更换图片
   */
  ChangeImg: function() {
    var that = this,
      pics = [];
    wx.chooseImage({
      count: 1 - pics.length, // 最多可以选择的图片张数，默认1
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res) {
        var imgsrc = res.tempFilePaths;
        pics = pics.concat(imgsrc);
        that.setData({
          pics: []
        });
        that.upLoadImg(pics, 0);
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  upLoadImg(pics, index) {
    let that = this
    if (index < pics.length) {
      wx.showLoading({
        title: '正在上传第' + (index + 1) + '张'
      })
      wx.uploadFile({
        //url: 'https://wxupload.jinghangkuajing.com/api/upload',
        // url: 'http://192.168.1.3:28023/api/upload',
        url: `${uploadUrl}`,
        filePath: pics[index],
        name: 'files',
        success: function(res) {
          wx.hideLoading();
          if (JSON.parse(res.data).code == 1000) {
            let thisPics = that.data.pics;
            thisPics.push(JSON.parse(res.data).data[0]);
            that.setData({
              pics: thisPics,
              TipsDisplay: "none"
            });
            that.upLoadImg(pics, index + 1);
          }
        }
      })
    } else {

    }
  },
  input: function(e) {
    let data = this.data.submitData;
    data[e.currentTarget.id] = e.detail.value;
    this.setData({
      submitData: data
    });
  },
  submit: function() {
    let t = true;
    for (let v in this.data.submitData) {
      if (this.data.submitData[v] == '') {
        t = false;
      }
    }
    if (this.data.pics.length <= 0) {
      t = false;
    }
    if (t) {
      wx.showLoading({
        title: '正在加载'
      });
      let submitData = {
        ...this.data.submitData,
        storeId: wx.getStorageSync('storeId'),
        preview: this.data.pics[0],
        startTime: this.data.startTime + " 00:00:00",
        endTime: this.data.endTime + " 00:00:00"
      }
      let id = wx.getStorageSync('id')
      bargainCommon(submitData).then((resp) => {
        wx.hideLoading();
        if (resp.data.code == '2001') {
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 2000,
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 2000);
        } else {
          wx.showToast({
            title: resp.data.data,
            icon: 'none',
            duration: 2000,
          })
        }
      })
    } else {
      wx.showToast({
        title: '数据不完整',
        icon: 'none',
        duration: 1000
      });
    }
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