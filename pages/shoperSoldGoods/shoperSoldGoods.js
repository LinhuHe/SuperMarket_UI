// pages/shoperSoldGoods/shoperSoldGoods.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    service:app.globalData.Service,
    shoperInfo:[],
    allSoldGods:[
      {orderid:1,orderKey:"fw4e89F1WF1EW89FW4EF89w412f89",name:1234123412412423412,src:"../../picture/colUnselect.png",price:55,date:'2041/5/4',color:"c",style:"st",size:"s",desInfo:["zl ","15885695598","重庆市,重庆市,沙坪坝区,重庆大学"]},
    ],
    totalGain:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    if(options)
    {
      this.setData({
        shoperInfo : JSON.parse(options.shoperInfo)  //解JSON
      })
      console.log("已售商品得到shoperInfo",this.data.shoperInfo)
    }

    wx.request({
      url: app.globalData.Service+'/OrderController/getMyFinishedOrder/'+app.globalData.openId,
      success(res)
      {
        that.setData({
          allSoldGods:res.data,
        })
        console.log("已售商品得到数据",that.data.allSoldGods)
        var tempGain=0;
        for(var i=0;i<res.data.length;i++)
        {
          tempGain += res.data[i].orderPrice
        }
        that.setData({
          totalGain:tempGain
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
    wx.stopPullDownRefresh()
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