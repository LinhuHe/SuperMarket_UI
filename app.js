//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              //console.log("app.js/wx.getSetting↓")
              console.log("用户的userInfo",this.globalData.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              } 
            }
          })
        }
      }
    })

    wx.login({
      success: (res) => {
        // 获取到用户的 code 之后：res.code
        //console.log("用户的code:" + res.code);
        // 可以传给后台，再经过解析获取用户的 openid
        // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
        wx.request({
          //     // 自行补上自己的 APPID 和 SECRET
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx1d1c09bef8994e61&secret=0be88d39d9bc10a53c8f173112b0b2a6&js_code=' + res.code + '&grant_type=authorization_code',
          success: (res) => {
                     // 获取到用户的 openid
          //console.log("用户的openid:" + res.data.openid);
           this.globalData.openId=res.data.openid
          console.log("用户的openid:"+this.globalData.openId)
          }
        });
      }
    });
  },
  
  globalData: {
    userInfo: null,
    openId:"",
    Service:"http://30bm574434.zicp.vip/",
    userinfo_service:''
  }
})
