// pages/order/order.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    service : app.globalData.Service,
    Rname:"",
    Rphone:'',
    Rdaddr:'',  //详细地址
    address : "",  //地区
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
  inputName(e)
  {
    console.log('name',e.detail.value)
    this.setData({
      Rname : e.detail.value
    })
  },
  inputPhone(e)
  {
    console.log('phone',e.detail.value)
    this.setData({
      Rphone : e.detail.value
    })
  },
  inputDAddr(e)
  {
    console.log('detailAddress',this.data.address+','+e.detail.value)
    this.setData({
      Rdaddr : this.data.address+','+e.detail.value
    })
  },
  confirmToBuy()
  {
    let that = this
    if(this.data.Rname=='' || this.data.Rphone=='' || this.data.address=='' || this.data.Rdaddr==''){
      wx.showModal({
        title: '提示',
        content: '清先完整收件人信息',
      })
    }
    else{
    wx.request({
      url: this.data.service+'/OrderController/createOrder',
      data:{
        dids:this.data.goodDids,
        uid :app.globalData.openId,
        destination : this.data.Rname+ '/' +  this.data.Rphone + '/'+this.data.Rdaddr
      },
      success(res){
        if(res.data==1){
          
          let pages = getCurrentPages();
          let prevPage = pages[pages.length - 2]
          //调用前一个页面的方法
          console.log("在order页面看spc的selectedgoods",prevPage.data.selectedGoods)
          prevPage.removeShopcartAfterBuy();

          wx.showModal({
            title: '提示',
            content: '购买成功',
            success(res){
              if(res.cancel){
                // 用户点击了取消
                wx.switchTab({
                  url: '../home/home'
                })
              }else if(res.confirm){
                // 用户点击了确定
                wx.switchTab({
                  url: '../home/home'
                })
              }
            }
          })
        }
        else{
          wx.showModal({
            title: '提示',
            content: '存在失效商品，请检查后重试',
          })
        that.onReady()
        }
      }
    })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    //console.log("购物车跳转订单",options)
    this.setData({
      goodDids : options.dids
    })
    console.log("订单中dids",this.data.goodDids)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this
    var sum=0;
    wx.request({
      url: this.data.service+'/OrderController/getOrderGoodsInfoByDids',
      data:{
        dids:this.data.goodDids
      },
      success(res){
        that.setData({
          orderData : res.data
        })
        console.log("请求成功后 orderData：",that.data.orderData)
        var data = that.data.orderData //及时更新数据 不然读不到
        for(let i=0;i<data.length;i++)
        {
          for(let j=0;j<data[i].length;j++)
          {
            sum += Number(data[i][j].goodsPrice)
          }
        }
        that.setData({
          totalPrice:sum
        })
      }
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
    this.onReady()
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