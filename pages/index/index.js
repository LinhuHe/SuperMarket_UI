//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    player:[
      {id:1,name:'k'},
      {id:2,name:'s'}
    ],
    counter:0,
    isshow:0,
    pickerindex:[0,0,0],
    pickercolumn:[
      ["color",'ls','hs','bs'],
      ["style"],
      ["size"]
    ],
    pickerstyle:["无"],
    sizels:['l','m'],
    sizehs:['g'],
    sizebs:['h','r','q'],
    
  },
  tapToShow(){
    this.setData({
      isshow:1
    })
  },
  bindMultiPickerChange(e)  //点击确认后的index数组
  {
    console.log('picker最终选择是 ： ', e.detail.value)
    this.setData({
      pickerindex: e.detail.value
    })
  },
  bindMultiPickerColumnChange(e) //知道哪一行变化
  {
    var stand = 1;
    console.log('修改的列为', e.detail.column, '，这一列值为', e.detail.value);
    var data={
      pickercolumn: this.data.pickercolumn,
      pickerindex: this.data.pickerindex
    }
    data.pickerindex[e.detail.column] = e.detail.value
    //console.log(e.detail.column)
    if(e.detail.column==0)
    {
    //console.log(data.pickerindex[0])
    switch(data.pickerindex[0])
    {
      case 1:{ 
      data.pickercolum[2]=['l','m']
      break;
      }
      case 2:{ 
        data.pickercolum[2]=this.data.sizehs
      break;
      }
      case 3:{ 
        data.pickercolum[2]=this.data.sizebs
      break;
      }
    }
    this.setData(data);
    console.log(data.pickercolum[2])
    console.log(this.data.pickercolum[2])
    }
  },

  tapOnButton(){
    this.setData({
      counter:this.data.counter+1
    })
    console.log(this.data.counter);
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
