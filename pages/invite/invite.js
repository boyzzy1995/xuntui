// pages/invite/invite.js
import {
  recruitmentAd
} from '../../api/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: [],
    regionCode: [],
    pics: [],
    submitData: {
      "name": "",
      "telephone": "",
      "storeName": '',
      "address": "",
      "inviteCode": '',
      password: ''
    },
    latitude: '',
    longitude: ''
  },
  input: function(e) {
    let data = this.data.submitData;
    data[e.currentTarget.id] = e.detail.value;
    this.setData({
      submitData: data
    });
  },
  bindRegionChange(e) {
    this.setData({
      region: e.detail.value,
      regionCode: e.detail.code,
    })
  },
  choose: function() { //这里是选取图片的方法
    var that = this,
      pics = [];
    wx.chooseImage({
      count: 3 - pics.length, // 最多可以选择的图片张数，默认3
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
        url: 'https://wxupload.jinghangkuajing.com/api/upload',
        filePath: pics[index],
        name: 'files',
        success: function(res) {
          wx.hideLoading();
          if (JSON.parse(res.data).code == 1000) {
            let thisPics = that.data.pics;
            thisPics.push(JSON.parse(res.data).data[0]);
            that.setData({
              pics: thisPics
            });
            that.upLoadImg(pics, index + 1);
          }
        }
      })
    } else {

    }
  },
  submit: function() {
    let t = true;
    for (let v in this.data.submitData) {
      if (v != 'inviteCode') {
        if (this.data.submitData[v] == '') {
          t = false;
        }
      }
    }
    console.log(this.data.submitData);
    if (this.data.regionCode.length <= 0 || this.data.pics.length <= 0) {
      t = false;
    }
    if (t) {
      wx.showLoading({
        title: '正在加载'
      });
      let submitData = {
        ...this.data.submitData,
        areaId: this.data.regionCode[2],
        explodedViews: this.data.pics
      }
      let id = wx.getStorageSync('id')
      recruitmentAd(id, submitData).then((resp) => {
        wx.hideLoading();
        if (resp.data.code == '2001') {
          wx.showToast({
            title: '申请成功，等待审核，请勿重复提交',
            icon: 'success',
            duration: 3000,
          })
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/index/index',
            })
          }, 3000);
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let me = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        me.setData({
          latitude,
          longitude
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.mapCtx = wx.createMapContext('myMap');
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