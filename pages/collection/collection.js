// pages/collection/collection.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    service:app.globalData.Service,
    //openid:app.globalData.openId,
    colData:[]
  },

  taoOnUnCollection(event)  /*取消收藏 还需要传openid*/
  {
    let that = this
    console.log("取消收藏"+event.currentTarget.dataset.rid);
    wx.request({
      url: this.data.service+'CollectionController/deleteCollectionByKey/',
      data:{
        uid:app.globalData.openId,
        rid:event.currentTarget.dataset.rid
      },
      success(res)
      {
        //console.log(res)
        if(res.data==1)
        {
          wx.showModal({
            title: '提示',
            content: '商品已从收藏夹删除',
          })
        that.onLoad()
        }
        if(res.data==0)
        {
          wx.showModal({
            title: '提示',
            content: '商品不存在',
          })
        that.onLoad()
        }
      }
    })
  },
  tapOnItem(event) /*点到某个商品 跳转 */
  {
    console.log(event.currentTarget.dataset);
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?rid='+event.currentTarget.dataset.rid
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.request({
      url: this.data.service+'CollectionController/getCollectedGoodsShowInfo/'+app.globalData.openId,
      success(res)
      {
        that.setData({
          colData : res.data
        })
        console.log(that.data.colData)
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
    this.onLoad()
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