// pages/throwIn/throwIn.js
import {applicationAd} from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    name:'',
    submitData:{
      "name": "",
      "telephone": "",
      "companyName": "",
      "content": ""
    },
    items:[
     {
        name:"商家活动⻚插屏广告位",
        value:"商家活动⻚插屏广告位",
        checked:"checked"
     },
      {
        name: "线下门店实体桌卡/桌贴广告",
        value: "线下门店实体桌卡/桌贴广告",
      },
      {
        name: "寻推-平⾯/动画/影视⼴告制作",
        value: "寻推-平⾯/动画/影视⼴告制作",
      },
      {
        name: "印务服务",
        value: "印务服务",
      }
    ],
    CheckBoxValue:''
  },
  input:function(e){
    let data=this.data.submitData;
    data[e.currentTarget.id]=e.detail.value;
    this.setData({
      submitData:data
    });

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  if(options.id){
   this.setData({
     id:options.id,
     name:options.name
   })
  }
  },
  submit:function(e){
    let t=true;
    for(let v in this.data.submitData){
      if(this.data.submitData[v]==''){
        t=false;
      }
    }

    if(t){
      if(this.data.id){
      let data={
        storeId:this.data.id,
        ...this.data.submitData
      }
      }else{
        let data = {
          ...this.data.submitData
        }
      }
      let id = wx.getStorageSync('id')
      applicationAd(id,data).then((resp)=>{
        if(resp.data.code==2001){
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
        }else{
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
   * 复选框改变事件
   */
  checkboxChange:function(e){
    this.setData({
      CheckBoxValue:e.detail.value
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '做营销活动就用寻推',
      path: '/pages/index/index',
    }
  }
})