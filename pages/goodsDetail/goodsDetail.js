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
      ["颜色","请选择颜色"],
      ["样式"],
      ["规格"]
    ],
    pickerindex:[0,0,0],
    //colors:["l","q","w","e"],
    styles:["样式",'无'], //基于color的style
    size:['la','ma'],  //基于cololr和style的size
    attitude:0, //0 初始  1 加入购物车 2 购买
  },

  tapOnCollect(event) 
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
   // this.onLoad()
  },
  bindMultiPickerChange(e)
  {
    let that = this
    var atti = this.data.attitude
    console.log('picker最终选择是 ： ', e.detail.value, "  态度是:",atti)
    this.setData({
      pickerindex: e.detail.value
    })
    if(e.detail.value[0]==0){
      wx.showModal({
        title: '提示',
        content: '请选择颜色',
      })
    }
    else if(e.detail.value[1]==0){
      wx.showModal({
        title: '提示',
        content: '请选择样式',
      })
    }
    else if(e.detail.value[2]==0){
      wx.showModal({
        title: '提示',
        content: '请选择尺寸',
      })
    }
    else{  // 正确选择
      if(atti==1) //添加购物车
      {
        this.setData({attitude:0}) //重置
        wx.request({  //先得到did
        url: this.data.service+'/GoodsDetailController/getDidByRidCSS',
        data:{
          rid : this.data.goodInfo.goodsRid,
          color : this.data.pickercolumn[0][e.detail.value[0]],
          style : this.data.pickercolumn[1][e.detail.value[1]],
          size : this.data.pickercolumn[2][e.detail.value[2]],
        },
        success(res){
          console.log("加入购物车得到的did:",res.data)
          wx.request({
            url: that.data.service+'/ShopCartController/addIntoShopcart',
            data:{
              uid : app.globalData.openId,
              did : res.data
            },
            success(res){
              if(res.data==1)
              {
                wx.showModal({
                  title: '提示',
                  content: '商品加入购物车',
                })
              }
              if(res.data==0)
              {
                wx.showModal({
                  title: '提示',
                  content: '添加失败',
                })
              }
            }
          })
        }
        })
      }
      else if(atti==2)
      {
        this.setData({attitude:0})
        wx.request({
          url: this.data.service+'/GoodsDetailController/getDidByRidCSS',
          data:{
            rid : this.data.goodInfo.goodsRid,
            color : this.data.pickercolumn[0][e.detail.value[0]],
            style : this.data.pickercolumn[1][e.detail.value[1]],
            size : this.data.pickercolumn[2][e.detail.value[2]],
          },
          success(res){
            console.log("加入购物车得到的did:",res.data)
            wx.navigateTo({
            url: '../order/order?dids='+res.data
          })
          }
        })
        
      }
    }

  },
  bindMultiPickerColumnChange(e)
  {
    let that = this;
    console.log('修改的列为', e.detail.column, '，这一列值为', e.detail.value);
    console.log('this.data.pickerindex: ',this.data.pickerindex)//打印的时候会显示上一次的值，因为setData在下面
    var data={
      pickercolumn: this.data.pickercolumn,
      pickerindex: this.data.pickerindex
    }
    data.pickerindex[e.detail.column] = e.detail.value  
    console.log("data.pickerindex: ",data.pickerindex);
    //console.log(e.detail.column)
    //下面有个问题，如果只有一个属性则无法移动 也就无法改变列值就无法触发这个函数 在后端解决
    if(e.detail.column==0) //颜色列
    {
      wx.request({
        url: this.data.service+'/GoodsDetailController/getStyleByColor/',
        data:{
          rid:this.data.rid,
          color:data.pickercolumn[0][data.pickerindex[0]], //这里不用this.data因为那里的值还么有更新
        },
        success(res){
          that.setData({
            styles:res.data
          })
          //console.log(that.data.styles)
          data.pickercolumn[1] = that.data.styles //需放在success中 不然出去了style是之前的值
          console.log(data.pickercolumn[1])
          that.setData(data)  //需要原地更新， 毕竟picker显示的是this.data中的数据
        }
      })
      data.pickerindex[1] = 0;
      data.pickerindex[2] = 0;  //重置位置 免得误操作
    }
    else if(e.detail.column==1) //style列
    {
      wx.request({
        url: this.data.service+'/GoodsDetailController/getSizeByColorStyle/',
        data:{
          rid:this.data.rid,
          color:data.pickercolumn[0][data.pickerindex[0]],
          style:data.pickercolumn[1][data.pickerindex[1]]
        },
        success(res){
          //console.log(res);
          that.setData({
            size:res.data
          })
          data.pickercolumn[2] = that.data.size //需放在success中 不然出去了style是之前的值
          console.log(data.pickercolumn[2])
          that.setData(data)  //需要原地更新， 毕竟picker显示的是this.data中的数据
        }
      })
      data.pickerindex[2] = 0;
    }
    //console.log(data)
    this.setData(data)
    //console.log(this.data.pickercolumn)
  },
  tapOnShopcart(event){
    console.log("tapOnShopcart")
    this.setData({
      attitude : 1
    })
  },
  tapOnBuy(event){
    console.log("Buy")
    this.setData({
      attitude : 2
    })
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
        console.log("goodInfo:",that.data.goodInfo)
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
    var data = {
      pickercolumn: this.data.pickercolumn
    }
    wx.request({
      url: this.data.service+'/GoodsDetailController/getAllColors/'+this.data.rid,
      success(res){
       data.pickercolumn[0] = res.data
      },
    })
    //console.log(data)
    this.setData(data)
    console.log(this.data.pickercolumn)
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