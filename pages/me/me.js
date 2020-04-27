// pages/me/me.js
const app = getApp()

Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    service:app.globalData.Service,
    userInfo:'',
    upperItemData:[  //进入该页面时请求数据
      {name:"我收藏的",imgUrl:'../../picture/colUnselect.png',num:-1,jumpid:1},
      {name:"去购物车",imgUrl:'../../picture/spcUnselect.png',num:-1,jumpid:2},
      {name:"卡包",imgUrl:'../../picture/kaBao.png',num:-1,jumpid:3}
    ],
    orderstatusData:[
      {name:"待发货",imgUrl:'../../picture/weiFaHuo.png',jumpid:0},
      {name:"待收货",imgUrl:'../../picture/daiShouHuo.png',jumpid:1},
      {name:"已收货",imgUrl:'../../picture/yiShouHuo.png',jumpid:2},
      {name:"退货中",imgUrl:'../../picture/tuiHuo.png',jumpid:3},
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

  checkAllorder()
  {
    wx.navigateTo({
      url: '../orderList/orderList'
    })
  },

  tapOnSingleStatus(e)
  {
    //console.log(e)
    wx.navigateTo({
      url: '../orderListSingleStatus/orderListSingleStatus?status='+e.currentTarget.dataset.jumpid
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    this.setData({
      userInfo:app.globalData.userInfo
     })
    var temdata = {
      upperItemData : this.data.upperItemData
    }
    wx.request({ //收藏数
      url: this.data.service+'/CollectionController/countMyCollectionNums/'+app.globalData.openId,
      success(res)
      {
        temdata.upperItemData[0].num = res.data
        that.setData(temdata)
      }
    })
    wx.request({ //购物车数
      url: this.data.service+'/ShopCartController/countMyShopcartNums/'+app.globalData.openId,
      success(res)
      {
        temdata.upperItemData[1].num = res.data
        that.setData(temdata)
      }
    })
    console.log(this.data.upperItemData)
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