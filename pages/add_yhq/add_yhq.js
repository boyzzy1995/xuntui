import { addStoreCoupon } from '../../api/api.js'

Page({
   
  /**
   * 页面的初始数据
   */
  data: {
    region: [],
    type_array: ['满减券', '打折券'],
    regionCode: [],
    effectiveRule:0,
    index:0,
    pics: [],
    pickertimestrat:[],
    fixdisplay:['flex'],
    activedisplay:['none'],
    fixdate: '',
    activedate:'',
    items: [
      { name: 'fixDate', value: '固定日期', checked: 'true'  },
      { name: 'active', value: '当天生效'},
    ],
    submitData: {
      "title": "",
      "effectiveRule":"",
      "type":"",
      "moneyThreshold":"",
      "value":"",
      "numberTotal":"",
      "numberPersonMax":"",
      "description":"",
      "dateStart":"",
      "dateEnd":"",
      "expireDays":"",
      "storeId":"1",
      "subtitle":"",
    },

  },
  input: function (e) {
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
  bindPickerChange(e){
    this.setData({
      index:e.detail.value
     
    })
  },
  radioChange: function (e) {
    if(e.detail.value=='active')
    this.setData({
      activedisplay:'flex',
      fixdisplay:'none',
      effectiveRule:1
    })
    else
      this.setData({
        activedisplay: 'none',
        fixdisplay: 'flex',
        effectiveRule: 0
      })
  },
  bindFixDateChange:function(e){
     this.setData({
       fixdate:e.detail.value
     })
  },
  bindActiveDateChange: function (e) {
     this.setData({
       activedate:e.detail.value
     })
  },
  choose: function () {//这里是选取图片的方法
    var that = this,
      pics = [];

    wx.chooseImage({
      count: 9 - pics.length, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        var imgsrc = res.tempFilePaths;
        pics = pics.concat(imgsrc);
        that.setData({
          pics: []
        });
        that.upLoadImg(pics, 0);
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })

  },
  upLoadImg(pics, index) {
    let that = this;
    console.log(pics);
    if (index < pics.length) {
      wx.showLoading({
        title: '正在上传第' + (index + 1) + '张'
      })
      wx.uploadFile({
        url: 'https://wxupload.jinghangkuajing.com/api/upload',
        filePath: pics[index],
        name: 'files',
        success: function (res) {
          wx.hideLoading();
          console.log(res);
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
  putInfo:function(){
    this.data.submitData.effectiveRule=this.data.effectiveRule
    this.data.submitData.type=this.data.index
    this.data.submitData.dateStart = this.data.fixdate+" 00:00:00"
    this.data.submitData.dateEnd = this.data.activedate+" 00:00:00"
    addStoreCoupon(this.data.submitData).then((resp) => {
      if (resp.data.code == '2001') {
        wx.showToast({
          title: '申请成功',
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
  },
  submit: function () {
    let t = true;
    for (let v in this.data.submitData) {
      if (this.data.submitData[v] == '') {
        t = false;
      }
    }
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
            title: '申请成功',
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var date=new Date();
     var year=date.getFullYear();
     var month=date.getMonth()+1;
     if(month<10){
       month="0"+month
     }
     
    var day = date.getDate();
    if (day < 10) {
      day = "0" + day
    }
    console.log(year + "-" + month + "-" + day);
     this.setData({
       pickertimestrat:year+"-"+month+"-"+day,
       fixdate: year + "-" + month + "-" + day,
       activedate: year +1+ "-" + month + "-" + day
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '门店广告位推广平台 线下推广如此简单',
      path: '../index/index'
    }
  }
})