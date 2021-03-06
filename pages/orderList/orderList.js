// pages/orderList/orderList.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    service:app.globalData.Service,
    orderListInfo:[  //orderStatus: 0:未发货， 1：待收货（这里确认收货），2：已收货，3：退货中（确认退货），4：已退货
      [
        {orderDid:1,goodName:"wefas",goodsShoper:'qwd',goodsProtrait:"../../picture/colUnselect.png",goodsRid:"1",orderPrice:48,orderStatus:0,orderDate:"2017/5/5",desInfo:["zl ","15885695598","重庆市,重庆市,沙坪坝区,重庆大学aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbaa"]},
        {orderDid:5,goodName:"wef35gWas",goodsShoper:'qwd',goodsProtrait:"../../picture/colUnselect.png",goodsRid:"1",orderPrice:654,orderStatus:0,orderDate:"2017/5/5",desInfo:["zl ","15885695598","重庆市,重庆市,沙坪坝区,重庆大学"]}
      ],
      [
        {orderDid:1,goodName:"12TF WGVwefas",goodsShoper:'qwd',goodsProtrait:"../../picture/colUnselect.png",goodsRid:"1",orderPrice:568,orderStatus:0,orderDate:"2019/5/5",desInfo:["jlj ","15885695598","重庆市,重庆市,沙坪坝区,重庆大学"]},
        {orderDid:5,goodName:"weffsdgf4235BN2RdaVas",goodsShoper:'qwd',goodsProtrait:"../../picture/colUnselect.png",goodsRid:"1",orderPrice:74,orderStatus:0,orderDate:"2019/5/5",desInfo:["jlj ","15885695598","重庆市,重庆市,沙坪坝区,重庆大学"]}
      ]
    ],
  },
  GoToGood(e)
  {
    console.log(e.currentTarget.dataset.rid)
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?rid='+e.currentTarget.dataset.rid
    })
  },
  confirmRecive(e)
  {
    let that = this
    console.log("确认收货",e.currentTarget.dataset.orderid)
    wx.request({
      url: this.data.service+ '/OrderController/changeOrderStatus',
      data:{
        oid:e.currentTarget.dataset.orderid,
        status : 2
      },
      success(res)
      {
        if(res.data==1)
        {
          wx.showToast({
            title: '已确认收货',
            icon: "success",
          })
          that.onLoad()
        }
        else if(res.data==0)
        {
          wx.showModal({
            title: '提示',
            content: "状态码错误",
          })
        }
      }
    })
  },
  requestBack(e)
  {
    let that = this
    console.log("请求退货",e.currentTarget.dataset.orderid)
    wx.request({
      url: this.data.service+ '/OrderController/changeOrderStatus',
      data:{
        oid:e.currentTarget.dataset.orderid,
        status : 3
      },
      success(res)
      {
        if(res.data==1)
        {
          wx.showToast({
            title: '已申请退款',
            icon: "success",
          })
          that.onLoad()
        }
        else if(res.data==0)
        {
          wx.showModal({
            title: '提示',
            content: "状态码错误",
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.request({
      url: this.data.service + '/OrderController/getAllMyOrder/'+app.globalData.openId,
      success(res){
        console.log(res),
        that.setData({
          orderListInfo : res.data
        })
        console.log("orderlist中orderListInfo：",that.data.orderListInfo)
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