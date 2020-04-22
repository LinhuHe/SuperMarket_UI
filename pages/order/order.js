// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address : "",
    region: ['重庆市', '重庆市', '沙坪坝区'],
    customItem : '全部',
    orderData:[
      [
        {goodsShoper:"shea",goodsDid:11,goodsRid:1,goodsName:"warhsssdeqgsdgr官网如果风EGHFDQWgagha",goodsProtrait:"../../picture/colSelect.png",goodsPrice:85.25,goodsStock:0,goodsColor:"绿色",goodsSize:"L",isOnSale:"1",style:""},
        {goodsShoper:"shea",goodsDid:21,goodsRid:2,goodsName:"gay",goodsProtrait:"../../picture/colSelect.png",goodsPrice:14.25,goodsStock:352,goodsColor:"绿色",goodsSize:"L",isOnSale:"1",style:""}
      ],
      [
        {goodsShoper:"woshimaijia",goodsDid:31,goodsRid:3,goodsName:"asfy",goodsProtrait:"../../picture/colSelect.png",goodsPrice:14.25,goodsStock:52,goodsColor:"绿色",goodsSize:"L",isOnSale:"0",style:""},
        {goodsShoper:"woshimaijia",goodsDid:41,goodsRid:4,goodsName:"nnay",goodsProtrait:"../../picture/colSelect.png",goodsPrice:114.25,goodsStock:342,goodsColor:"绿色",goodsSize:"L",isOnSale:"1",style:""},
        {goodsShoper:"woshimaijia",goodsDid:51,goodsRid:5,goodsName:"utejay",goodsProtrait:"../../picture/colSelect.png",goodsPrice:14.25,goodsStock:852,goodsColor:"绿色",goodsSize:"L",isOnSale:"1",style:""}
      ],
      [
        {goodsShoper:"biroie",goodsDid:6,goodsRid:61,goodsName:"t134qy",goodsProtrait:"../../picture/colSelect.png",goodsPrice:153.25,goodsStock:356,goodsColor:"绿色",goodsSize:"L",isOnSale:"1",style:""},
        {goodsShoper:"biroie",goodsDid:7,goodsRid:71,goodsName:"j75wsr",goodsProtrait:"../../picture/colSelect.png",goodsPrice:214.25,goodsStock:3554,goodsColor:"绿色",goodsSize:"L",isOnSale:"1",style:""}
      ]
    ],
    totalPrice:0,
    goodDids:[]
  },

  selectRegion(e){
    var zone = e.detail.value;
    this.setData({
      address:zone
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
    var data = this.data.orderData
    var sum=0;
    for(let i=0;i<data.length;i++)
    {
      for(let j=0;j<data[i].length;j++)
      {
        sum += Number(data[i][j].goodsPrice)
      }
    }
    this.setData({
      totalPrice:sum
    })
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