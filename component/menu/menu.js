
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: "String",
      value: "",
      observer: function(news, olds, path) {
        this.setData({
          homeColor: "#FC6103",
          homeUrl: "../../static/menu/home-click2.png"
        })
      }
    },
    jion: {
      type: "String",
      value: "",
      observer: function(news, olds, path) {
        this.setData({
          jionColor: "#FC6103",
          jionUrl: "../../static/menu/jionin-click.png"
        })
      }
    },
    activity:{
      type: "String",
      value: "",
      observer: function(news, olds, path) {
        this.setData({
          StartActivityColor: "#FC6103",
          StartActivityUrl: "../../static/menu/StartActivity-click.png"
        })
      }
    },
    person: {
      type: "String",
      value: "",
      observer: function(news, olds, path) {
        this.setData({
          personColor: "#FC6103",
          personUrl: "../../static/menu/me-click.png"
        })
      }
    },
    // adv: {
    //   type: "String",
    //   value: "",
    //   observer: function(news, olds, path) {
    //     this.setData({
    //       advColor: "#FC6103",
    //       advUrl: "../../static/menu/push-click.png"
    //     })
    //   }
    // },
    shop: {
      type: "String",
      value: "",
      observer: function(news, olds, path) {
        this.setData({
          shopColor: "#FC6103",
          shopUrl: "../../static/menu/store-click.png"
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    homeColor: "",
    homeUrl: "../../static/menu/home2.png",
    jionColor: "",
    jionUrl: "../../static/menu/jionin.png",
    StartActivityColor: "",
    StartActivityUrl: "../../static/menu/StartActivityCopy.png",
    personColor: "",
    personUrl: "../../static/menu/me.png",
    // advColor: "",
    // advUrl: "../../static/menu/push.png",
    shopUrl: "../../static/menu/store.png",
    shopColor: "",
    index: "index",
    jion: "jion",
    activity:"activity",
    person: "person",
    adv: "adv",
    shop: "shop",
    isStore:false
  },

  /**
   * 组件的方法列表
   */
  attached:function(){
    if (app.checkStoreLogin()) {
      this.setData({
        isStore: true
      })
    }
  },
  methods: {
    checkLogin: function () {
      if (app.checkStoreLogin()) {
        this.setData({
          isStore: true
        })
      }
    },
    toInvite:function(){
      wx.showToast({
        title: '您还未注册噢！请先加入寻推',
        duration:2000,
        icon:"none"
      });
      setTimeout(function (){
        wx.redirectTo({
          url: '/pages/invite/invite',
        })
      },2000);
    },
    ifLogin: function(e) {
      if (app.checkLogin()) {
        if (e.currentTarget.dataset.flag == this.data.index) {
          return;
        }
        if (e.currentTarget.dataset.flag == this.data.jion) {
          return;
        }
         if (e.currentTarget.dataset.flag == this.data.activity) {
          return;
        }
        // if (e.currentTarget.dataset.flag == this.data.adv) {
        //   return;
        // }
        if (e.currentTarget.dataset.flag == this.data.person) {
          return;
        }
        if (e.currentTarget.dataset.flag == this.data.shop) {
          if(app.checkStoreLogin){
            return;
          }else{
            wx.navigateTo({
              url: '/pages/login/login/login',
            })
          }
        }
        wx.redirectTo({
          url: e.currentTarget.dataset.url,
        })
      } else {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }
    }
  }
})