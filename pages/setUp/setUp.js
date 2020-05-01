// pages/setUp/setUp.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    service:app.globalData.Service,
    userInfo:[]
  },

  changePortrait()
  {
    let that = this
    wx.chooseImage({
      count: 1, // 最多
      sizeType: ['compressed'], // 指定是原图还是压缩图
      sourceType: ['camera','album'], // 指定来源是相册还是相机 
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: that.data.service + "/UserInfoController/changeProtrait",
          filePath: tempFilePaths[0],
          name: "portrait",
          formData:{
            userName:that.data.userInfo.userNickname,
            uid:app.globalData.openId
          },
          success:function(res){
            that.onLoad()
          }
        })
      }
    })
   
  },

  changeNickname()
  {
    wx.navigateTo({
      url: '../setUpNickname/setUpNickname?userInfo='+JSON.stringify(this.data.userInfo)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    if(options)
    {
      this.setData({
        userInfo : JSON.parse(options.userInfo)  //解JSON
      })
      console.log("设置得到userInfo",this.data.userInfo)
    }
    else{
      wx.request({
        url: this.data.service+'/UserInfoController/getUserInfo/'+app.globalData.openId,
        success(res)
        {
          that.setData({
            userInfo : res.data
          })
          console.log("设置得到userInfo",that.data.userInfo)
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