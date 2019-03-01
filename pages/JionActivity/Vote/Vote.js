// pages/JionActivity/Vote/Vote.js
import {
  getVotes,
  votes
} from '../../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getVotes(options.id);
    this.setData({
      id: options.id
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
   * 获得投票信息
   */
  getVotes: function(id) {
    let me = this;
    getVotes(id).then((resp) => {
      if (resp.data.code == 1000) {
        if(resp.data.data.isVoted>0){
          wx.showToast({
            title: '你已经投过票了',
            icon:'none',
            duration:2000
          })
        }
        me.setData({
          list: resp.data.data,
          itemsList: resp.data.data.items
        })
      }
    })
  },
  /**
   * 浏览商家其他活动
   */
  toStoreActivity: function(e) {
    wx.navigateTo({
      url: '/pages/NewMyShop/VisitOtherStore/VisitOtherStore?storeId=' + e.currentTarget.dataset.storeid
    })
  },
  /**
   * 更多商家活动
   */
  moreActivity: function() {
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },
  /**
   * 投票按钮
   */
  selectItem: function(e) {
    var items = this.data.itemsList;
    var idList = this.data.idList;
    if (items[e.currentTarget.dataset.index].isClick == null) {
      idList.push(e.currentTarget.dataset.itemid);
    }
    var newItems = {
      ...items[e.currentTarget.dataset.index],
      isClick: true
    }
    items[e.currentTarget.dataset.index] = newItems;
    this.setData({
      itemsList: items,
      idList
    })
  },
  /**
   * 提交
   */
  sumbit: function(e) {
    var id = e.currentTarget.dataset.id;
    var data = this.data.idList;
    wx.showLoading({
      title: '提交中',
    })
    votes(id, data).then((resp) => {
      wx.hideLoading();
      if (resp.data.code == 2001) {
        wx.showToast({
          title: '提交成功',
          duration:2000
        })
        setTimeout(()=>{
          this.getVotes(this.data.id);
        },2000)
      } else if (resp.data.code == 4002) {
        wx.showToast({
          title: '你已经投过票了',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  /**
   * 
   */
  toRules: function() {
    wx.navigateTo({
      url: '../Rules/Rules?index='+3
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '我投了一票，你也来投票！',
      path: '/pages/JionActivity/Vote/Vote?id=' + this.data.list.id,
    }
  }
})