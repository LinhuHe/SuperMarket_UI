// pages/home/home.js
const app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      service : app.globalData.Service,

      swiperimgs:[
        {src:"../../picture/tupian1.jpg",rid:0},
        {src:"../../picture/tupian2.jpg",rid:0},
        {src:"../../picture/tupian3.jpg",rid:0}
      ],

      goodsData:[  //价格应该去detail表中寻找
        
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
    let that = this;
    
      wx.request({
        url: this.data.service+'GoodsRough/findGoodsRoughByTimeDesc',
        success(res) {
          console.log(res)
          that.setData({
            goodsData:res.data
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