// pages/StartActivity/Tools/Common/Common.js
var commonCityData = require('../../../../utils/city.js');
import {
  addSignIn
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
      "detail": ""
    },
    ActivityPics: [],
    inputList: [{
      value: '姓名'
    }, {
      value: '手机号'
    }],
    pics: [],
    provinces: [],
    citys: [],
    districts: [],
    selProvince: '请选择',
    selCity: '请选择',
    selDistrict: '请选择',
    selProvinceIndex: 0,
    selCityIndex: 0,
    selDistrictIndex: 0,
    items: [{
        name: '是',
        value: '是',
        checked: 'true'
      },
      {
        name: '否',
        value: '否'
      },
    ],
    isJionPrice: '是'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getDate();
    this.initCityData(1);
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
   * 获得日期
   */
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

  /**
   * 上传配文图片
   */
  addPic: function() {
    var that = this,
      pics = [];
    wx.chooseImage({
      count: 9 - pics.length, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res) {
        var imgsrc = res.tempFilePaths;
        pics = pics.concat(imgsrc);
        that.setData({
          ActivityPics: []
        });
        that.upLoadActivityImg(pics, 0);
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  upLoadActivityImg(pics, index) {
    let that = this
    if (index < pics.length) {
      wx.showLoading({
        title: '正在上传第' + (index + 1) + '张'
      })
      wx.uploadFile({
        url: `${uploadUrl}`,
        name: 'files',
        filePath: pics[index],
        success: function(res) {
          wx.hideLoading();
          if (JSON.parse(res.data).code == 1000) {
            let thisPics = that.data.ActivityPics;
            thisPics.push(JSON.parse(res.data).data[0]);
            that.setData({
              ActivityPics: thisPics,
            });
            that.upLoadActivityImg(pics, index + 1);
          }
        }
      })
    } else {

    }
  },
  /**
   * 初始化地址信息
   */
  initCityData: function(level, obj) {
    if (level == 1) {
      var pinkArray = [];
      for (var i = 0; i < commonCityData.cityData.length; i++) {
        pinkArray.push(commonCityData.cityData[i].name);
      }
      this.setData({
        provinces: pinkArray
      });
    } else if (level == 2) {
      var pinkArray = [];
      var dataArray = obj.cityList
      for (var i = 0; i < dataArray.length; i++) {
        pinkArray.push(dataArray[i].name);
      }
      this.setData({
        citys: pinkArray
      });
    } else if (level == 3) {
      var pinkArray = [];
      var dataArray = obj.districtList
      for (var i = 0; i < dataArray.length; i++) {
        pinkArray.push(dataArray[i].name);
      }
      this.setData({
        districts: pinkArray
      });
    }
  },

  bindPickerProvinceChange: function(event) {
    var selIterm = commonCityData.cityData[event.detail.value];
    this.setData({
      selProvince: selIterm.name,
      selProvinceIndex: event.detail.value,
      selCity: '请选择',
      selCityIndex: 0,
      selDistrict: '请选择',
      selDistrictIndex: 0
    })
    this.initCityData(2, selIterm)
  },

  bindPickerCityChange: function(event) {
    var selIterm = commonCityData.cityData[this.data.selProvinceIndex].cityList[event.detail.value];
    this.setData({
      selCity: selIterm.name,
      selCityIndex: event.detail.value,
      selDistrict: '请选择',
      selDistrictIndex: 0
    })
    this.initCityData(3, selIterm)
  },

  bindPickerChange: function(event) {
    var selIterm = commonCityData.cityData[this.data.selProvinceIndex].cityList[this.data.selCityIndex].districtList[event.detail.value];
    if (selIterm && selIterm.name && event.detail.value) {
      this.setData({
        selDistrict: selIterm.name,
        selDistrictIndex: event.detail.value
      })
    }
  },

  /**
   * 输入框监听
   */
  input: function(e) {
    let data = this.data.submitData;
    data[e.currentTarget.id] = e.detail.value;
    this.setData({
      submitData: data
    });
  },
  /**
   * 详细地址
   */
  addressinput: function(e) {
    this.setData({
      detailAddress: e.detail.value
    });
  },
  /**
   * 提交按钮
   */
  submit: function() {
    let t = true;
    let me = this;
    let selDistrict = me.data.selDistrict;
    let imgs = '';
    let items = [];

    for (let v in this.data.submitData) {
      if (this.data.submitData[v] == '') {
        t = false;
      }
    }

    /**选择地址判断 */
    if (me.data.selProvince == '请选择') {
      wx.showToast({
        title: '省份不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    if (me.data.selCity == '请选择') {
      wx.showToast({
        title: '城市不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    if (selDistrict == '请选择') {
      selDistrict = '';
    }

    if (this.data.ActivityPics.length > 0) {
      imgs = this.data.ActivityPics.join('#');
    }

    for (let v in this.data.inputList) {
      items.push(this.data.inputList[v].value);
    }

    items = items.join('#');
    if (this.data.pics.length <= 0 || imgs == '' || items == '') {
      t = false;
    }

    var address = this.data.selProvince + "#" + this.data.selCity + "#" + this.data.selDistrict + "#" + this.data.detailAddress;

    if (t) {
      wx.showLoading({
        title: '正在加载'
      });

      let submitData = {
        ...this.data.submitData,
        address,
        imgs,
        items,
        storeId: wx.getStorageSync('storeId'),
        preview: this.data.pics[0],
        startTime: this.data.startTime + " 00:00:00",
        endTime: this.data.endTime + " 00:00:00"
      }

      addSignIn(submitData).then((resp) => {
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
   * 输入监听事件
   */
  SignInput: function(e) {
    let list = this.data.inputList;
    list[e.currentTarget.dataset.id].value = e.detail.value;
    this.setData({
      inputList: list
    });
  },
  /**
   * 添加输入框
   */
  addInputList: function() {
    var list = this.data.inputList;
    var newInput = {
      value: ''
    };
    list.push(newInput);
    this.setData({
      inputList: list
    })
  },
  /**
   *删除输入框 
   */
  deleteInput: function(e) {
    var list = this.data.inputList;
    list.splice(e.currentTarget.dataset.index, 1);
    this.setData({
      inputList: list
    })
  },
  /**
   * 单选按钮
   */
  radioChange: function(e) {
    this.setData({
      isJionPrice: e.detail.value
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