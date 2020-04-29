// pages/orderListSingleStatus/orderListSingleStatus.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    service:app.globalData.Service,
    orderListInfo:[
        {orderDid:1,goodName:"wefas",goodsShoper:'qwd',goodsProtrait:"../../picture/colUnselect.png",goodsRid:"1",orderPrice:48,orderStatus:0,orderDate:"2017/5/5",desInfo:["zl ","15885695598","重庆市,重庆市,沙坪坝区,重庆大学aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbaa"]},
        {orderDid:5,goodName:"wef35gWas",goodsShoper:'qwd',goodsProtrait:"../../picture/colUnselect.png",goodsRid:"1",orderPrice:654,orderStatus:0,orderDate:"2017/5/5",desInfo:["zl ","15885695598","重庆市,重庆市,沙坪坝区,重庆大学"]},
        {orderDid:1,goodName:"12TF WGVwefas",goodsShoper:'qwd',goodsProtrait:"../../picture/colUnselect.png",goodsRid:"1",orderPrice:568,orderStatus:0,orderDate:"2019/5/5",desInfo:["jlj ","15885695598","重庆市,重庆市,沙坪坝区,重庆大学"]},
        {orderDid:5,goodName:"weffsdgf4235BN2RdaVas",goodsShoper:'qwd',goodsProtrait:"../../picture/colUnselect.png",goodsRid:"1",orderPrice:74,orderStatus:0,orderDate:"2019/5/5",desInfo:["jlj ","15885695598","重庆市,重庆市,沙坪坝区,重庆大学"]}
    ],
  },
  GoToGood(e)
  {
    console.log(e.currentTarget.dataset.rid)
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?rid='+e.currentTarget.dataset.rid
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log(options)
    wx.request({
      url: this.data.service+'/OrderController/getSingleStatusOrder/'+app.globalData.openId+"/"+options.status,
      success(res)
      {
        that.setData({
          orderListInfo : res.data
        })
        console.log("单状态订单数据：",that.data.orderListInfo)
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