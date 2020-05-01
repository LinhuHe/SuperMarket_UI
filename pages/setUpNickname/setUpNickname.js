// pages/setUpNickname/setUpNickname.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    service:app.globalData.Service,
    userInfo:[],
    newNickname:'',
    status:-1, //-1:初始状态 0：错误 1：重复 2：成功
  },

  inputNickname(e)
  {
    console.log("新的nickname",e.detail.value)
    this.setData({
      newNickname:e.detail.value
    })
  },

  finishInput()
  {
    console.log("修改nickname")
    let that = this
    wx.request({
      url: this.data.service+'/UserInfoController/changeNickname',
      data:{
        newNickname : this.data.newNickname,
        uid:app.globalData.openId
      },
      success(res)
      {
        that.setData({
          status:res.data
        })
        console.log("修改nickname状态码：",that.data.status)
        if(that.data.status==2)  //成功 返回并刷新
        {
          let pages = getCurrentPages();
          let prevPage = pages[pages.length - 2]
          prevPage.onLoad()
          wx.navigateBack({
          delta: 1
        })
        }
      },
      fali(res)
      {
        console.log(res)
      }
    })
  },

  cancle()
  {
    wx.navigateBack({
      delta: 1
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    if(options)  //第一次
    {
      this.setData({
        userInfo : JSON.parse(options.userInfo)  //解JSON
      })
      console.log("修改nickname得到userInfo",this.data.userInfo)
    }
    else{  //多次进入
      wx.request({
        url: this.data.service+'/UserInfoController/getUserInfo/'+app.globalData.openId,
        success(res)
        {
          that.setData({
            userInfo : res.data
          })
          console.log("修改nickname得到userInfo",that.data.userInfo)
        },
        fali(res)
        {
          console.log(res)
        }
      })
    }
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