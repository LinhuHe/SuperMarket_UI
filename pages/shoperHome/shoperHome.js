// pages/shoperHome/shoperHome.js
const app =  getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    service:app.globalData.Service,
    shoperInfo:[],
    gains:[0,0],
    shoperOperation:[
      {name:"我的商品",src:"../../picture/shoper_mygoods.png",nums:-1,jumpid:0},
      {name:"状态管理",src:"../../picture/shoper_orderStatus.png",nums:-1,jumpid:1},
      {name:"售出商品",src:"../../picture/shoper_sold.png",nums:-1,jumpid:2},
    ]
  },
  tapOnSetUp()
  {
    wx.navigateTo({
      url: '../setUp/setUp?userInfo='+JSON.stringify(this.data.shoperInfo)
    })
  },
  tapOnSingleOperation(e)
  {
    console.log("0:我的商品,1:状态管理,2:售出商品->当前:",e.currentTarget.dataset.jumpid);
    if(e.currentTarget.dataset.jumpid==0)
    {
      wx.navigateTo({
        url: '../shoperMyGoods/shoperMyGoods?shoperInfo='+JSON.stringify(this.data.shoperInfo)
      })
    }
    else if(e.currentTarget.dataset.jumpid==1)
    {
      wx.navigateTo({
        url: '../shoperGoodsStatus/shoperGoodsStatus'
      })
    }
    else if(e.currentTarget.dataset.jumpid==2)
    {
      wx.navigateTo({
        url: '../shoperSoldGoods/shoperSoldGoods?shoperInfo='+JSON.stringify(this.data.shoperInfo)
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that =this
    if(options)
    {
      this.setData({
        shoperInfo : JSON.parse(options.shoperInfo)  //解JSON
      })
      console.log("得到shoperInfo",this.data.shoperInfo)
    }
    
    wx.request({
      url: this.data.service+'/OrderController/dayGainAndTotalGain/'+app.globalData.openId,
      success(res)
      {
        that.setData({
          gains:res.data
        })
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
    this.onLoad()
    wx.stopPullDownRefresh();
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

  }
})