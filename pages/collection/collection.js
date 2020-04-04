// pages/collection/collection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colData:
    [
      {rid:"1",name:"1231fqee13r23ty3h54uj256whtfW234Y5GH3FE456",priceL:1.25,priceH:5.36,src:"../../picture/kaBao.png",collect:115,sales:35,isOnSale:"1"},
      {rid:"2",name:"12sdas456",priceL:54.25,priceH:5653.36,src:"../../picture/meSelect.png",collect:15,sales:51,isOnSale:"1"},
      {rid:"3",name:"1asfgrwqd456",priceL:23.25,priceH:5342.36,src:"../../picture/spcUnselect.png",collect:515,sales:152,isOnSale:"1"},
      {rid:"4",name:"abdfj456",priceL:564.25,priceH:74345.36,src:"../../picture/tuiHuo.png",collect:75,sales:55,isOnSale:"0"},
    ]
  },

  taoOnUnCollection(event)  /*取消收藏 还需要传openid*/
  {
    console.log("取消收藏"+event.currentTarget.dataset.rid);
  },
  tapOnItem(event) /*点到某个商品 跳转 */
  {
    console.log("进入商品"+event.currentTarget.dataset.rid);
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