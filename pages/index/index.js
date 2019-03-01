//index.js
//获取应用实例
var bmap = require('../../utils/bmap-wx.min.js');
var wxMarkerData = [];
import {
  checkApi,
  slideshows,
  cities,
  citiesRecommends,
  categories,
  getCouponList,
  receiveCoupon,
  getAllVotes,
  getAllSigns
} from '../../api/api.js'
import {
  getAllBargainCommon
} from '../../api/StoreApi.js'
const app = getApp()

Page({
  data: {
    imgheights: [],
    current: 0,
    icons: [],
    Coupon: [],
    flag: false,
    recommends: [],
    placeData: {},
    listData: {
      page: 0,
      limit: 2,
    },
    yhq: {
      text: "立即领取",
      color: "#8a8a8a"
    },
    IconList: [{
        color: "red",
        style: "SelectedIcon"
      },
      {
        color: "pink",
        style: "NonSelectedIcon"
      },
      {
        color: "yellow",
        style: "NonSelectedIcon"
      },
      {
        color: "black",
        style: "NonSelectedIcon"
      },
      {
        color: "blue",
        style: "NonSelectedIcon"
      },
      {
        color: "orange",
        style: "NonSelectedIcon"
      }
    ],
    WordsList: [
      ["xxx砍了2000元"],
      ["XXX砍了1000元"]
    ],
    ProductAllList: [{
      Name: "电动牙刷",
      Descripe: "我爱这个牙刷",
      Price: "199"
    }, {
      Name: "枕头",
      Descripe: "我爱这个枕头",
      Price: "99"
    }, {
      Name: "电脑",
      Descripe: "我爱这个电脑",
      Price: "4999"
    }],
    ProductList: {},
    ActivityList: {},
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    vertical: true,
    NavList: [{
      title: "正在进行",
      style: "NavSelect"
    }, {
      title: "即将开始",
      style: "NavNonSelect"
    }, {
      title: "全部活动",
      style: "NavNonSelect"
    }],
    VoteNavList: [{
      title: "正在进行",
      style: "NavSelect"
    }, {
      title: "即将开始",
      style: "NavNonSelect"
    }, {
      title: "全部活动",
      style: "NavNonSelect"
    }],
    SignNavList: [{
      title: "正在进行",
      style: "NavSelect"
    }, {
      title: "即将开始",
      style: "NavNonSelect"
    }, {
      title: "全部活动",
      style: "NavNonSelect"
    }],
    NavIndex: 0,
    VoteNavIndex: 0,
    SignNavIndex: 0,
    NullTip: "flex",
    VoteNullTip: "flex",
    SignNullTip: "flex",
    array: ['砍价活动', '投票', '活动报名'],
    activityType: 0
  },
  /*
  toDetail(event) {
    if (app.checkLogin()) {
      wx.navigateTo({
        url: '../shopDetail/shopDetail?id=' + event.currentTarget.dataset.id + '&name=' + event.currentTarget.dataset.name,
      })
    } else {
      wx.navigateTo({
        url: '../login/login',
      })
    }
  },
  */
  //点击图片进入关于寻推界面
  toAbout(e) {
    //判断如果是第一张轮播图点击进入关于寻推
    if (e.currentTarget.dataset.index == 0) {
      wx.navigateTo({
        url: '../about/about',
      })
    }
  },
  /**
   * 进入添加优惠券页面
   */
  toAddYhq: function() {
    if (app.checkStoreLogin()) {
      wx.navigateTo({
        url: '../add_yhq/add_yhq',
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '你还没登入商家,登入后可以使用该功能',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../login/login/login',
            })
          } else if (res.cancel) {

          }
        }
      })
    }
  },
  /** 
   *导航栏跳转到对应的图标页面
   */
  toCategories(event) {
    wx.navigateTo({
      url: '../categories/categories?id=' + event.currentTarget.id + '&name=' + event.currentTarget.dataset.name,
    })
  },
  //加载
  onLoad: function() {
    //加载地址
    this.LoadLoaction();
    //运行滑动方法
    // this.selectComponent("#Picker").sileshows();
    //获得优惠券
    getCouponList(this.data.listData).then((resp) => {
      this.setData({
        Coupon: resp.data.data
      })
    });

    //分类信息
    categories().then((resp) => {
      this.setData({
        icons: resp.data.data
      })
    })

    //获取城市信息
    // cities().then((resp)=>{
    //   cosnole.log(resp);
    // })
    citiesRecommends(1).then((resp) => {
      this.setData({
        recommends: resp.data.data
      })
    })
    //展示第一个精选
    this.setData({
      ProductList: {
        Name: "电动牙刷",
        Descripe: "我爱这个牙刷",
        Price: "199"
      }
    })
  },
  onShow: function() {
    this.getAllBargins(0);
    this.getAllVotes(0);
    this.getAllSigns(0);
  },
  //领取优惠券方法
  getCoupon: function(e) {
    var that = this;
    wx.getStorage({
      key: "id",
      success: function(res) {
        var data = {
          userId: res.data,
          couponId: e.target.dataset.couponid,
          storeId: e.target.dataset.storeid
        }
        receiveCoupon(data).then((resp) => {
          if (resp.data.code == 4002) {
            wx.showToast({
              title: "啊哦,你已经领取过该优惠券咯",
              icon: 'none',
              duration: 1000
            });
          } else {
            wx.showToast({
              title: "领取成功",
              icon: 'none',
              duration: 1000
            });
          }
          console.log(resp.data.data);
        })
      }
    })
  },
  imageLoad: function(e) {
    //获取图片真实宽度
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比
      ratio = imgwidth / imgheight;
    console.log(imgwidth, imgheight)
    //计算的高度值
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight
    var imgheights = this.data.imgheights
    //把每一张图片的高度记录到数组里
    imgheights.push(imgheight)
    this.setData({
      imgheights: imgheights,
    })
  },

  bindchange: function(e) {
    this.setData({
      current: e.detail.current
    })
  },

  /**
   * 跳转到创建小游戏界面
   */
  toCreateGame: function() {
    if (app.checkStoreLogin()) {
      wx.showModal({
        title: '提示',
        content: '你还没加入寻推商户联盟,加入之后可以使用该功能',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../StoreGame/StoreGame',
            })
          } else if (res.cancel) {

          }
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '你还没登入商家,登入后可以使用该功能',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../login/login/login',
            })
          } else if (res.cancel) {

          }
        }
      })
    }
  },
  /**
   * 跳转到玩游戏界面
   */
  toh5game: function() {
    wx.navigateTo({
      url: '../selectGame/selectGame',
    })
  },
  /**
   * 跳转到获得优惠券界面
   */
  toGetCoupon: function() {
    wx.navigateTo({
      url: '../coupon/moreCoupons/moreCoupons',
    })
  },
  /**
   * 跳转到参加活动界面
   */
  toJionActivity: function(e) {
    wx.navigateTo({
      url: '../JionActivity/JionActivity?id=' + e.currentTarget.dataset.id,
    })
  },

  toJionVoteActivity: function(e) {
    wx.navigateTo({
      url: '../JionActivity/Vote/Vote?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 点击图标切换推荐
   */
  IconClick: function(e) {
    let list = this.data.IconList;
    for (var i = 0; i < list.length; i++) {
      list[i].style = "NonSelectedIcon";
    }
    list[e.currentTarget.dataset.index].style = "SelectedIcon";
    this.setData({
      IconList: list,
      ProductList: this.data.ProductAllList[e.currentTarget.dataset.index]
    })
  },
  /**
   * 导航栏点击
   */
  navTap: function(e) {
    let list = this.data.NavList;
    for (var i = 0; i < list.length; i++) {
      list[i].style = "NavNonSelect";
    }
    list[e.currentTarget.dataset.index].style = "NavSelect";
    if (e.currentTarget.dataset.index == 2) {
      this.setData({
        NavList: list,
        NavIndex: e.currentTarget.dataset.index,
        NavAll: true
      })
    } else {
      this.setData({
        NavList: list,
        NavIndex: e.currentTarget.dataset.index
      })
    }
    this.getAllBargins(e.currentTarget.dataset.index);
  },

  VotenavTap: function(e) {
    let list = this.data.VoteNavList;
    for (var i = 0; i < list.length; i++) {
      list[i].style = "NavNonSelect";
    }
    list[e.currentTarget.dataset.index].style = "NavSelect";
    if (e.currentTarget.dataset.index == 2) {
      this.setData({
        VoteNavList: list,
        VoteNavIndex: e.currentTarget.dataset.index,
        VoteNavAll: true
      })
    } else {
      this.setData({
        VoteNavList: list,
        VoteNavIndex: e.currentTarget.dataset.index
      })
    }
    this.getAllVotes(e.currentTarget.dataset.index);
  },

  SignnavTap: function(e) {
    let list = this.data.SignNavList;
    for (var i = 0; i < list.length; i++) {
      list[i].style = "NavNonSelect";
    }
    list[e.currentTarget.dataset.index].style = "NavSelect";
    if (e.currentTarget.dataset.index == 2) {
      this.setData({
        SignNavList: list,
        SignNavIndex: e.currentTarget.dataset.index,
        SignNavAll: true
      })
    } else {
      this.setData({
        SignNavList: list,
        SignNavIndex: e.currentTarget.dataset.index
      })
    }
    this.getAllSigns(e.currentTarget.dataset.index);
  },
  /**
   *加载当前地址
   */
  LoadLoaction: function() {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'jg9uKQ64vqBgO5oG6bsQtKX87qBoiINT'
    });
    var fail = function(data) {
      console.log(data)
    };
    var success = function(data) {
      wx.hideLoading()
      wxMarkerData = data.wxMarkerData;
      let Mydata = data.wxMarkerData;
      that.setData({
        markers: wxMarkerData,
        placeData: {
          address: Mydata[0].address + '\n',
        }
      });
      that.setData({
        latitude: wxMarkerData[0].latitude
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });
    }
    // 发起POI检索请求 
    BMap.regeocoding({
      fail: fail,
      success: success,
      iconPath: '../../img/marker_red.png',
      iconTapPath: '../../img/marker_red.png'
    });
  },
  /**
   * 获得所有店铺在进行的活动
   */
  getAllBargins: function(recState) {
    wx.showLoading({
      title: '加载中',
    })
    let me = this;
    getAllBargainCommon().then((resp) => {
      wx.hideLoading()
      var list = resp.data.data;
      var flag = false;
      if (recState != 2 && resp.data.code == 1000) {
        for (var i = 0; i < list.length; i++) {
          if (list[i].state == recState) {
            flag = true;
          }
        }
        if (flag) {
          me.setData({
            NullTip: "none"
          })
        } else {
          me.setData({
            NullTip: "flex"
          })
        }
      }
      if (recState == 2) {
        if (resp.data.code != 4003) {
          me.setData({
            NullTip: "none"
          })
        } else {
          me.setData({
            NullTip: "flex"
          })
        }
      }
      if (resp.data.code != 4003) {
        me.setData({
          ActivityList: list
        })
      }
    })
  },
  /**
   * 到地址定位
   */
  toLocationSearch: function() {
    wx.navigateTo({
      url: 'LocationSearch/LocationSearch',
    })
  },
  /** 
   * 到报名活动
   */
  toJionSignActivity: function(e) {
    wx.navigateTo({
      url: '/pages/JionActivity/SignInActivity/SignInActivity?id=' + e.currentTarget.dataset.id,
    })
  },
  inputcost: function() {
    wx.navigateTo({
      url: '/pages/JionActivity/InputCost/InputCost',
    })
  },
  getAllVotes: function(recState) {
    wx.showLoading({
      title: '加载中'
    })
    let me = this;
    getAllVotes().then((resp) => {
      wx.hideLoading()
      var list = resp.data.data;
      var flag = false;
      if (recState != 2 && resp.data.code == 1000) {
        for (var i = 0; i < list.length; i++) {
          if (list[i].state == recState) {
            flag = true;
          }
        }
        if (flag) {
          me.setData({
            VoteNullTip: "none"
          })
        } else {
          me.setData({
            VoteNullTip: "flex"
          })
        }
      }
      if (recState == 2) {
        if (resp.data.code != 4003) {
          me.setData({
            VoteNullTip: "none"
          })
        } else {
          me.setData({
            VoteNullTip: "flex"
          })
        }
      }
      if (resp.data.code != 4003) {
        me.setData({
          VoteActivityList: list
        })
      }
    })
  },
  getAllSigns: function(recState) {
    wx.showLoading({
      title: '加载中'
    })
    let me = this;
    getAllSigns().then((resp) => {
      wx.hideLoading()
      var list = resp.data.data;
      var flag = false;
      if (recState != 2 && resp.data.code == 1000) {
        for (var i = 0; i < list.length; i++) {
          if (list[i].info.state == recState) {
            flag = true;
          }
        }
        if (flag) {
          me.setData({
            SignNullTip: "none"
          })
        } else {
          me.setData({
            SignNullTip: "flex"
          })
        }
      }
      if (recState == 2) {
        if (resp.data.code != 4003) {
          me.setData({
            SignNullTip: "none"
          })
        } else {
          me.setData({
            SignNullTip: "flex"
          })
        }
      }
      if (resp.data.code != 4003) {
        me.setData({
          SignActivityList: list
        })
      }
    })
  },
  /**
   * 筛选选择框
   */
  bindPickerChange(e) {
    console.log(e.detail.value);
    this.setData({
      activityType: e.detail.value
    })
    if (e.detail.value == 0) {

    } else if (e.detail.value == 1) {

    } else if (e.detail.value == 2) {

    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '做营销活动就用寻推',
      path: '/pages/index/index',
      imageUrl: '/images/Share-Images.png'
    }
  }
})