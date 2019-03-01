// pages/StartActivity/ChoiceTools/ChoiceTools.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ToolsList: [{
      "Name": "砍价助手",
      "Descripe": "[通用]商家发起砍价活动",
      "url": "../Tools/Common/Common",
      "imgurl": 'https://img.jinghangkuajing.com/advertising/resource/common.png-compress',
      flag: true
    }, {
      "Name": "砍价-门店版",
      "Descripe": "[门店]到店顾客发起消费砍价拓展新客",
      "url": "../Tools/Store/Store",
      "imgurl": 'https://img.jinghangkuajing.com/advertising/resource/store.png-compress',
      flag: true
    }, {
      "Name": "预约/报名",
      "Descripe": "[通用]推新品做活动预热神器",
      "url": "../Tools/RegistOfActivity/RegistOfActivity",
      "imgurl": 'https://img.jinghangkuajing.com/advertising/resource/SignIn.png-compress',
      flag: true
    }, {
      "Name": "投票助手",
      "Descripe": "[通用]发起门店专属的投票活动",
      "url": "../Tools/Vote/Vote",
      "imgurl": 'https://img.jinghangkuajing.com/advertising/resource/vote.png-compress',
      flag: true
      }, {
        "Name": "打卡领奖",
        "Descripe": "[门店]消费打卡集满即送",
        "url": "../Tools/Punch/Punch",
        "imgurl": 'https://img.jinghangkuajing.com/advertising/resource/daka.png-compress',
        flag: false
      }, {
      "Name": "幸运锦鲤",
      "Descripe": "[通用]发起线上抽奖吸粉活动",
      "url": "../Tools/RegistOfActivity/RegistOfActivity",
      "imgurl": 'https://img.jinghangkuajing.com/advertising/resource/luckyfish.png-compress'
    }, {
      "Name": "门店锦鲤",
      "Descripe": "[门店]店内抽奖活动工具",
      "url": "../Tools/RegistOfActivity/RegistOfActivity",
      "imgurl": 'https://img.jinghangkuajing.com/advertising/resource/storeluckyfish.png-compress'
    }, {
      "Name": "服务点评",
      "Descripe": "[门店]员工服务考评神器",
      "url": "../Tools/RegistOfActivity/RegistOfActivity",
      "imgurl": 'https://img.jinghangkuajing.com/advertising/resource/service.png-compress'
    }, {
      "Name": "预充代金券",
      "Descripe": "[门店]预售绑定长期消费顾客",
      "url": "../Tools/RegistOfActivity/RegistOfActivity",
      "imgurl": 'https://img.jinghangkuajing.com/advertising/resource/djq.png-compress'
    }, {
      "Name": "老客推新",
      "Descripe": "[门店]顾客档案系统定期推送新服务",
      "url": "../Tools/RegistOfActivity/RegistOfActivity",
      "imgurl": 'https://img.jinghangkuajing.com/advertising/resource/xlkh.png-compress'
      }, {
        "Name": "我是代言人",
        "Descripe": "[门店]让顾客成为你的分销商",
        "url": "../Tools/RegistOfActivity/RegistOfActivity",
        "imgurl": 'https://img.jinghangkuajing.com/advertising/resource/wsdyr.png-compress'
      }, {
        "Name": "多店联盟",
        "Descripe": "[门店]多店折扣联盟客流共享",
        "url": "../Tools/RegistOfActivity/RegistOfActivity",
        "imgurl": 'https://img.jinghangkuajing.com/advertising/resource/ddlm.png-compress'
      }, {
        "Name": "每日惊喜",
        "Descripe": "[门店]临期产品+消费券免费送吸粉",
        "url": "../Tools/RegistOfActivity/RegistOfActivity",
        "imgurl": 'https://img.jinghangkuajing.com/advertising/resource/mrjx.png-compress'
      }],
    tipFlag: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.selectComponent("#Picker").sileshows();
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
    this.selectComponent("#component").checkLogin();
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
   * 选择工具
   */
  toTools: function(e) {
    if (!app.checkStoreLogin()) {
      wx.showModal({
        title: '提示',
        content: '请先注册或登入',
        success: function(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login/login',
            })
          };
        }
      })
    } else {
      let url = e.currentTarget.dataset.url;
      wx.navigateTo({
        url
      })
    }
  },
  /**
   * 关闭提示
   */
  handlerCloseTip: function() {
    this.setData({
      tipFlag: false
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
  },

})