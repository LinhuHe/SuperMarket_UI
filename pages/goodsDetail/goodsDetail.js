// pages/goodsDetail/goodsDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rid:0,
    goodInfo:[
      {name:"还是一款神奇的抗雾霾防有神器真的巨实惠现在买送8838手机一台不管多长的文字他都能放下",shoper:"wo",src:"../../picture/收藏选中.png",priceL:17.5,priceH:56.8,type:"运动",col:20,sales:2}
    ],
    moreImg:[
    "../../picture/meSelect.png",
    "../../picture/tuiHuo.png",
    "../../picture/spcUnselect.png",
    "../../picture/colSelect.png"
    ],
    iscollect:["../../picture/userUncollect.png",0]
  },

  tapOnCollect() //不完整的方法 向数据库传值的请求还没写 目前只满足了本地测试
  {
    if(this.data.iscollect[1]==0)
    {
      this.setData({
        iscollect:["../../picture/userCollected.png",1]
      })
    }
    else if(this.data.iscollect[1]==1)
    {
      this.setData({
        iscollect:["../../picture/userUncollect.png",0]
      })
    }
   
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { /*接收home来的参数 rid*/ 
    this.setData({
        rid:options.rid
      })
      console.log("this.data.rid="+this.data.rid)
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