// pages/me/me.js
const app = getApp()

Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    userInfo:'',
    upperItemData:[  //进入该页面时请求数据
      {name:"我收藏的",imgUrl:'../../picture/收藏未选中.png',num:-1,jumpid:1},
      {name:"去购物车",imgUrl:'../../picture/购物车未选中.png',num:-1,jumpid:2},
      {name:"卡包",imgUrl:'../../picture/卡包.png',num:-1,jumpid:3}
    ],
    orderstatusData:[
      {name:"待发货",imgUrl:'../../picture/未发货.png',jumpid:1},
      {name:"待收货",imgUrl:'../../picture/待收货.png',jumpid:2},
      {name:"已收货",imgUrl:'../../picture/已收货.png',jumpid:3},
      {name:"退货中",imgUrl:'../../picture/退货.png',jumpid:4},
    ]
  },

  upperItemToUrl(event){
    var jumpid = event.currentTarget.dataset.jumpid;
    if(jumpid==1)
    wx.switchTab({
      url: '../collection/collection',
    })
    else if(jumpid==2)
    wx.switchTab({
      url: '../shopcart/shopcart',
    })
    else if(jumpid==3)
    wx.switchTab({
      url: '',
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.setData({
     userInfo:app.globalData.userInfo
    })
    //console.log(this.data.userInfo)
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

  }
})