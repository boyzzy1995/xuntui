// pages/StoreGame/StoreGame.js
import {
  getGameList,
  pushGame
} from '../../api/StoreApi.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    gameList: '',
    submitData: {
      description: '',
      gameId: '',
      storeId:''
    },
    storeId: '',
    gameId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '',
    })
    getGameList().then((resp) => {
      wx.hideLoading();
      if (resp.data.code != 1000) {
        wx.showToast({
          title: '暂无数据',
          icon: 'none',
          duration: 2000,
        })
      } else {
        this.setData({
          gameList: resp.data.data
        });
      }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 弹窗
   */
  showDialogBtn: function(e) {
    this.setData({
      showModal: true,
      gameId: e.currentTarget.dataset.gameid
    })

  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function() {},
  /**
   * 隐藏模态对话框
   */
  hideModal: function() {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function() {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function() {
    let that=this;
    this.data.submitData.gameId=this.data.gameId;
    wx.showLoading();
    this.hideModal();
    wx.getStorage({
      key:'storeId',
      success:function(e){
        that.data.submitData.storeId=e.data
        pushGame(that.data.submitData).then((resp) => {
          wx.hideLoading();
          if(code==2001){
            wx.showToast({
              title: '创建成功',
              icon: 'success',
              duration: 2000,
            })
          }else{
            wx.showToast({
              title: '创建失败',
              icon: '',
              duration: 2000,
            })
          }
        })
      }
    })
    
  },
  inputChange: function(e) {
    let data = this.data.submitData;
    data[e.currentTarget.id] = e.detail.value;
    this.setData({
      submitData: data
    });
  }
})