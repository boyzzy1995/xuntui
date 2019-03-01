// pages/login/login.js
import { login, updateUser} from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userToken:'',
    userId:''
  },
  onGotUserInfo:function(e){
    let _this=this;
    wx.showLoading({
      title: '正在加载'
    })
    updateUser(this.data.userId,e.detail.userInfo).then((resp)=>{
      wx.hideLoading();
     if(resp.data.code==2002){
       wx.setStorage({
         key: "id",
         data: _this.data.userId
       });
       wx.showToast({
         title: '登陆成功',
         icon: 'success',
         duration: 2000,
       })
       setTimeout(() => {
         wx.navigateBack({
           delta: 1
         })
       }, 2000);
     }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title:'正在加载'
    })
    let _this=this;
    wx.login({
      success:function(resp){
        if(resp.code){
         login(resp.code).then((resp)=>{
           wx.hideLoading();
           wx.setStorage({
             key: "userToken",
             data: resp.data.data.userToken
           });
          if(resp.data.code=='2001'){
            //不跳转，除非用户主动登陆，再保存用户信息
            _this.setData({
              userToken: resp.data.data.userToken,
              userId: resp.data.data.id
            })

          }else{

            wx.setStorage({
              key: "id",
              data: resp.data.data.id
            });


            //此时保存用户信息并返回
            wx.showToast({
              title: '登陆成功',
              icon: 'success',
              duration: 2000,
            })
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
            }, 2000);
          }
         })
        }
      }
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
      path: '/pages/index/index'
    }
  }
})