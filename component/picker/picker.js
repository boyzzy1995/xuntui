// component/picker/picker.js
import {
  slideshows
} from "../../api/api.js"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    topImgs: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //获取swiper图
    sileshows:function() {
      slideshows().then((resp) => {
        this.setData({
          topImgs: resp.data.data
        })
      });
    }
  }
})