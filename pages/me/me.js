// pages/me/me.js
const app = getApp()

Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    service:app.globalData.Service,
    userInfo:'',  //这是来自服务器的userInfo
    upperItemData:[  //进入该页面时请求数据
      {name:"我收藏的",imgUrl:'../../picture/colUnselect.png',num:-1,jumpid:1},
      {name:"去购物车",imgUrl:'../../picture/spcUnselect.png',num:-1,jumpid:2},
      //{name:"卡包",imgUrl:'../../picture/kaBao.png',num:-1,jumpid:3}
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
  tapOnIamShoper()
  {
    let that = this
    if(this.data.userInfo.isShoper == 0) //还不是
    {
      wx.showModal({
        title: '提示',
        content: '您还不是商户，是否开通商户功能',
        success(res){
          if(res.cancel){
            // 用户点击了取消
           
          }else if(res.confirm){
            // 用户点击了确定
            wx.request({
              url: that.data.service+'/UserInfoController/beOrNotBeShoper',
              data:{
                uid:app.globalData.openId,
                isShoper:1,
              },
              success(res)
              {
                if(res.data==1) //写入成功
                {
                  //跳到商家界面
                  wx.navigateTo({
                  url: '../shoperHome/shoperHome?shoperInfo='+JSON.stringify(that.data.userInfo)  //JSON string化
                })
                }
                else{ //写入失败
                  wx.showModal({
                    title: '提示',
                    content: '开通发生错误，请稍后重试',
                  })
                }
              }
            })
            
            
          }
        }
      })
    }
    else if(this.data.userInfo.isShoper == 1)
    {
      wx.navigateTo({
        url: '../shoperHome/shoperHome?shoperInfo='+JSON.stringify(that.data.userInfo)
      })
    }
    else{
      //错误
    }
  },
  tapOnSetUp()
  {
    wx.navigateTo({
      url: '../setUp/setUp?userInfo='+JSON.stringify(this.data.userInfo)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    //console.log(app.globalData.openId+"\n",app.globalData.userInfo.nickname,'\n',app.globalData.userInfo)
    console.log("传入的userInfo",app.globalData.userInfo)
    wx.request({
      url: this.data.service+'/UserInfoController/checkAndAddMyInfo',
      data:{
        uid : app.globalData.openId,
        nickname : app.globalData.userInfo.nickName,
        sex  :app.globalData.userInfo.gender,
        ip: "null NOW",
        portrait : app.globalData.userInfo.avatarUrl
      },
      success(res)
      {
        that.setData({
          userInfo:res.data
         })
         console.log("me界面userinfo：",that.data.userInfo)
      }
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
    //console.log(this.data.upperItemData)
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