// pages/goodsDetail/goodsDetail.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    service : app.globalData.Service,
    rid:0,
    goodInfo:[],
    moreImg:"",
    moreImgs:[],
    iscollect:["../../picture/userUncollect.png",0],
    pickercolumn:[
      ["颜色",'ohuo'],
      ["样式"],
      ["规格"]
    ],
    pickerindex:[0,0,0],
    colors:["l","q","w","e"],
    styles:["样式",'无'], //基于color的style
    size:['l','m'],  //基于cololr和style的size

  },

  tapOnCollect(event) //不完整的方法 向数据库传值的请求还没写 目前只满足了本地测试
  {
    console.log(event.currentTarget.dataset)
    let that =this;
    if(this.data.iscollect[1]==0)  //还没收藏
    {
      wx.request({
        url: this.data.service+'/CollectionController/addCollectionByKey',
        data:{
          uid:app.globalData.openId,
          rid:event.currentTarget.dataset.rid
        },
        success(res)
        {
          that.setData({
            iscollect : ["../../picture/userCollected.png",1]
          })
        }
      })
    }
    else if(this.data.iscollect[1]==1) //已经收藏
    {
      wx.request({
        url: this.data.service+'/CollectionController/deleteCollectionByKey',
        data:{
          uid:app.globalData.openId,
          rid:event.currentTarget.dataset.rid
        },
        success(res)
        {
          that.setData({
            iscollect : ["../../picture/userUncollect.png",0]
          })
        }
      })
    }  
  },
  bindMultiPickerChange(e)
  {
    console.log('picker最终选择是 ： ', e.detail.value)
    this.setData({
      pickerindex: e.detail.value
    })
  },
  bindMultiPickerColumnChange(e)
  {
    console.log('修改的列为', e.detail.column, '，这一列值为', e.detail.value);
    var data={
      pickercolumn: this.data.pickercolumn,
      pickerindex: this.data.pickerindex
    }
    data.pickerindex[e.detail.column] = e.detail.value
    console.log(e.detail.column)
    //下面有个问题，如果只有一个属性则无法移动 也就无法改变列值就无法触发这个函数
    if(e.detail.column==0) //颜色列
    {
      data.pickercolumn[1] = this.data.styles //前面需要根据颜色向服务器更新styles信息
    }
    else if(e.detail.column==1) //style列
    {
      data.pickercolumn[2] = this.data.size //根据color和style获取符合的size 
    }
    //console.log(data)
    this.setData(data)
    //console.log(this.data.pickercolumn)
  },
  tapOnShopcart(event){

  },
  tapOnBuy(event){

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { /*接收home来的参数 rid*/ 
    this.setData({
      rid:options.rid
    })
    console.log("this.data.rid="+this.data.rid)

    let that = this;
    wx.request({
      url: this.data.service+'GoodsRough/findGoodShowInfoByRid/'+this.data.rid,
      success(res){
        that.setData({
          goodInfo: res.data,
          moreImg: res.data.goodsMoreimg
        })
        console.log(that.data.goodInfo)
        //console.log(that.data.moreImg)

        if(that.data.moreImg!=null) //解析moreImg项
        {
        var temp = that.data.moreImg.split("/")
        that.setData({
          moreImgs : temp
        })
        //console.log(that.data.moreImg)
        //console.log(that.data.moreImgs)
        }
      }  
    })
    wx.request({
      url: this.data.service+'/CollectionController/isContain',
      data:{
        uid:app.globalData.openId,
        rid:this.data.rid
      },
      success(res)
      {
        if(res.data==0)
        {
          that.setData({
            iscollect : ["../../picture/userUncollect.png",0]
          })
        }
        else if(res.data>=1)
        {
          that.setData({
            iscollect : ["../../picture/userCollected.png",1]
          })
        }
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