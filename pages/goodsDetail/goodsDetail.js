// pages/goodsDetail/goodsDetail.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    service : app.globalData.Service,
    rid:0,
    goodInfo:[],
    moreImg:"",
    moreImgs:[],
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

    let that = this;
    wx.request({
      url: this.data.service+'GoodsRough/findGoodShowInfoByRid/'+this.data.rid,
      success(res){
        that.setData({
          goodInfo: res.data,
          moreImg: res.data.goodsMoreimg
        })
        console.log(that.data.goodInfo)
        //console.log(that.data.moreImg)

        if(that.data.moreImg!=null){
        var temp = that.data.moreImg.split("/")
        that.setData({
          moreImgs : temp
        })
        console.log(that.data.moreImg)
        console.log(that.data.moreImgs)
        }
        
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