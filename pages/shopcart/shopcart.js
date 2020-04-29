// pages/shopcart/shopcart.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    service : app.globalData.Service,
    shopers:[
      "shea",
      "woshimaijia",
      "biroie"
    ],
    shopCartData:[
      [
        {shoper:"shea",did:11,rid:1,name:"warhsssdeqgsdgr官网如果风EGHFDQWgagha",src:"../../picture/colSelect.png",price:85.25,stock:0,color:"绿色",size:"L",isOnSale:"1",style:""},
        {shoper:"shea",did:21,rid:2,name:"gay",src:"../../picture/colSelect.png",price:14.25,stock:352,color:"绿色",size:"L",isOnSale:"1",style:""}
      ],
      [
        {shoper:"woshimaijia",did:31,rid:3,name:"asfy",src:"../../picture/colSelect.png",price:14.25,stock:52,color:"绿色",size:"L",isOnSale:"0",style:""},
        {shoper:"woshimaijia",did:41,rid:4,name:"nnay",src:"../../picture/colSelect.png",price:114.25,stock:342,color:"绿色",size:"L",isOnSale:"1",style:""},
        {shoper:"woshimaijia",did:51,rid:5,name:"utejay",src:"../../picture/colSelect.png",price:8814.25,stock:852,color:"绿色",size:"L",isOnSale:"1",style:""}
      ],
      [
        {shoper:"biroie",did:6,rid:61,name:"t134qy",src:"../../picture/colSelect.png",price:153.25,stock:356,color:"绿色",size:"L",isOnSale:"1",style:""},
        {shoper:"biroie",did:7,rid:71,name:"j75wsr",src:"../../picture/colSelect.png",price:214.25,stock:3554,color:"绿色",size:"L",isOnSale:"1",style:""}
      ]
    ],
    totalPrice:0,
    selectedGoods:[]
  },

  selected(e)  //计算合计价格 合计商品did
  {
    var sum=0;
    let dids = [];
    for(var i=0;i<e.detail.value.length;i++)
    {
      sum+=Number(e.detail.value[i].split(",")[0]);
      dids.push(e.detail.value[i].split(",")[1])
    }
    this.setData({
      totalPrice:sum,
      selectedGoods:dids
    })

    console.log("checked price is:"+e.detail.value+"\n"+"total is:"+this.data.totalPrice+"\n"+"所有did = ",this.data.selectedGoods)
  },

  tapOnGood(e)
  {
    console.log(e.currentTarget.dataset.rid)
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?rid='+e.currentTarget.dataset.rid
    })
  },
  removeShopcart(e)
  {
    let that = this
    console.log("removeed did is:"+e.currentTarget.dataset.did)
    wx.request({
      url: this.data.service+'/ShopCartController/getShopCartGoodsInfo',
      data:{
        uid : app.globalData.openId,
        did : e.currentTarget.dataset.did
      },
      success(res){
        if(res.data==1){
          wx.showModal({
            title: '提示',
            content: '商品已从购物车删除',
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
  tapOnBuy(event)
  {
    wx.navigateTo({
      url: '../order/order?dids='+event.currentTarget.dataset.dids
    })
    
  },
  removeShopcartAfterBuy()
  {
    for(var i=0;i<this.data.selectedGoods.length;i++)
    {
      let that = this
      wx.request({
        url: this.data.service+'/ShopCartController/getShopCartGoodsInfo',
        data:{
          uid : app.globalData.openId,
          did : this.data.selectedGoods[i]
        },
      })
    }
    this.setData({  //初始化
      totalPrice:0,
      selectedGoods:[]
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that =this;
    wx.request({
      url: this.data.service+ '/ShopCartController/getShopCartGoodsInfo/'+app.globalData.openId,
      success(res)
      {
        console.log(res)
        that.setData({
          shopCartData : res.data
        })
        console.log(that.data.shopCartData)
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