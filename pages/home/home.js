// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      swiperimgs:[
        {src:"../../picture/tupian1.jpg",rid:0},
        {src:"../../picture/tupian2.jpg",rid:0},
        {src:"../../picture/tupian3.jpg",rid:0}
      ],

      goodsData:[  //价格应该去detail表中寻找
        {rid:0, src:"../../picture/收藏选中.png", name:"111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111",price:0},
        {rid:10, src:"../../picture/我选中.png", name:"2",price:10},
        {rid:20, src:"../../picture/退货.png", name:"3",price:20},
        {rid:30, src:"../../picture/购物车未选中.png", name:"4",price:30},
        {rid:40, src:"../../picture/收藏未选中.png", name:"5",price:40},
        {rid:50, src:"../../picture/待收货.png", name:"6",price:50},
        {rid:60, src:"../../picture/已收货.png", name:"7",price:60},
        {rid:70, src:"../../picture/tupian3.jpg", name:"8",price:70},
        {rid:80, src:"../../picture/tupian1.jpg", name:"9",price:80},
        {rid:90, src:"../../picture/卡包.png", name:"10",price:90},
      ]
  },

  tapOnImg(event)
  {
    console.log(event.currentTarget.dataset.rid);
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?rid='+event.currentTarget.dataset.rid
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