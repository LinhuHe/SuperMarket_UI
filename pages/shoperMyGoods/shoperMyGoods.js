// pages/shoperMyGoods/shoperMyGoods.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    service:app.globalData.Service,
    navbar:["全部商品", "商品管理","上架商品"],
    currentTab:  2,
    allSoldGoods:[],
    allTypesGoods:[
      {
        unfold:false,
        goodsName:'aabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',goodsRid:1,goodsType:"bushi",shoper:"a",goodsProtrait:"../../picture/colSelect.png",isOnSale:1,goodsCollection:5,goodsSales:7,
        detail:[
          {goodsDid:33,color:"6c",style:"sgt",size:"ks",price:355.2,stock:12},
          {goodsDid:44,color:"4c",style:"sst",size:"sh",price:155.2,stock:12},
        ]
      },
      {
        unfold:false,
        goodsName:'ab',goodsRid:2,goodsType:"bushi",shoper:"a",goodsProtrait:"../../picture/colSelect.png",isOnSale:1,goodsCollection:15,goodsSales:27,
        detail:[
          {goodsDid:11,color:"c1",style:"st3",size:"s5",price:55.2,stock:12},
          {goodsDid:22,color:"c2",style:"st4",size:"s6",price:525.2,stock:12},
        ]
      }
    ],
    /*allTypesGoods:[[] ],*/
    //testClass:{goodsDid:11,goodsStock:25,goodsRid:9,goodsStyle:"dw",goodsColor:"qw",goodsSize:"tw",goodsPrice:49},
    newName:'默认物品名',
    newPrice:'-1', //防止误操作
    newStock: -1, //防止误操作
    shoperInfo:[],
    uploadRoughInfo:
    {
      name:"",shoper:"",type:"",portrait:"",moreimg:"",
      uploadDetails:[
        {goodsStock:0,goodsPrice:0,goodsColor:"",goodsStyle:"",goodsSize:""}
        //这里没法指定rid 所以必须和Rough绑定插入
      ]
    },
    portraitURL:"../../picture/add.png",
    detailImages:["../../picture/add.png"]
  },

  /*classTest()
  {
    let that =this
    console.log("传入数据",JSON.stringify(that.data.uploadDetails))
    wx.request({
      url: this.data.service+'/classTest',
      data:{
        gds:JSON.stringify(that.data.uploadDetails)
      },
      success(res)
      {
        console.log("suc",res)
      },
      fali(res)
      {
        console.log("fail",res)
      }
    })
  },*/

  navbarTap(e)
  {
    console.log(e.currentTarget.dataset.idx)
    this.setData({
      currentTab : e.currentTarget.dataset.idx
    })
    this.onLoad()
  },

  confirmSend(e)
  {
    let that = this
    console.log("确认寄出",e.currentTarget.dataset.orderid)
    wx.request({
      url: this.data.service+ '/OrderController/changeOrderStatus',
      data:{
        oid:e.currentTarget.dataset.orderid,
        status : 1
      },
      success(res)
      {
        if(res.data==1)
        {
          wx.showToast({
            title: '确认寄出',
            icon:'success'
          })
          that.onLoad()
        }
        else if(res.data==0)
        {
          wx.showModal({
            title: '提示',
            content: "状态码错误",
          })
        }
      }
    })
  },
  refuseBack(e)
  {
    let that = this
    console.log("拒绝退货",e.currentTarget.dataset.orderid)
    wx.request({
      url: this.data.service+ '/OrderController/changeOrderStatus',
      data:{
        oid:e.currentTarget.dataset.orderid,
        status : 5
      },
      success(res)
      {
        if(res.data==1)
        {
          wx.showToast({
            title: '拒绝退货',
            icon:'success'
          })
          that.onLoad()
        }
        else if(res.data==0)
        {
          wx.showModal({
            title: '提示',
            content: "状态码错误",
          })
        }
      }
    })
  },
  agreeBack(e)
  {
    let that = this
    console.log("同意退货",e.currentTarget.dataset.orderid)
    wx.request({
      url: this.data.service+ '/OrderController/changeOrderStatus',
      data:{
        oid:e.currentTarget.dataset.orderid,
        status : 4
      },
      success(res)
      {
        if(res.data==1)
        {
          wx.showToast({
            title: '同意退货',
            icon:'success'
          })
          that.onLoad()
        }
        else if(res.data==0)
        {
          wx.showModal({
            title: '提示',
            content: "状态码错误",
          })
        }
      }
    })
  },

  changGoodsPortrait(e)
  {
    console.log("修改物品图片 rid",e.currentTarget.dataset.rid)
    let that = this
    wx.chooseImage({
      count: 1, // 最多
      sizeType: ['compressed'], // 指定是原图还是压缩图
      sourceType: ['camera','album'], // 指定来源是相册还是相机 
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: that.data.service + "/GoodsRough/updateGoodsRoughProtrait",
          filePath: tempFilePaths[0],
          name: "portrait",
          formData:{
            rid:e.currentTarget.dataset.rid,
            uid:app.globalData.openId
          },
          success:function(res){
            that.onLoad()
          }
        })
      }
    })
  },
  inputGoodsName(e)
  {
    console.log("正在输入新名字",e.detail.value)
    this.setData({
      newName:e.detail.value
    })
  },
  changeGoodsName(e)
  {
    
    let that = this
    console.log("失去焦距，设置新名字 rid:",e.currentTarget.dataset.rid,"新名字:",this.data.newName)
    wx.request({
      url: this.data.service+'/GoodsRough/updateGoodsRoughInfo',
      data:{
        rid:e.currentTarget.dataset.rid,
        Info:that.data.newName,
        type:"name"
      },
      success(res)
      {
        that.onLoad()
      }
    })
  },
  deleteGoods(e)
  {
    let that =this
    console.log("下架商品 rid：",e.currentTarget.dataset.rid)
    wx.request({
      url: this.data.service+'/GoodsRough/updateGoodsRoughInfo',
      data:{
        rid:e.currentTarget.dataset.rid,
        Info:"0",
        type:"notOnSale"
      },
      success(res)
      {
        that.onLoad()
      }
    })
  },
  showupGoods(e)
  {
    let that =this
    console.log("上架商品 rid：",e.currentTarget.dataset.rid)
    wx.request({
      url: this.data.service+'/GoodsRough/updateGoodsRoughInfo',
      data:{
        rid:e.currentTarget.dataset.rid,
        Info:"1",
        type:"OnSale"
      },
      success(res)
      {
        that.onLoad()
      }
    })
  },
  unfoldType(e)
  {
    console.log("展开所有型号,序号为:",e.currentTarget.dataset.idx)
    var data={
      allTypesGoods : this.data.allTypesGoods
    }
    data.allTypesGoods[e.currentTarget.dataset.idx].unfold = !data.allTypesGoods[e.currentTarget.dataset.idx].unfold;
    this.setData(data);
  },
  inputPrice(e)
  {
    console.log("正在输入新价格",e.detail.value)
    this.setData({
      newPrice:e.detail.value
    })
  },
  changePrice(e)
  {
    let that =this
    console.log("失去焦距，设置新价格 did:",e.currentTarget.dataset.did,"新价格:",this.data.newPrice)
    wx.request({
      url: this.data.service+'/GoodsDetailController/uploadGoodsDetailInfo',
      data:{
        did:e.currentTarget.dataset.did,
        Info:that.data.newPrice,
        type:'price'
      },
      success(res)
      {
        if(res.data==0)
        {
          wx.showToast({
            title: '请输入合理数值',
            icon:'fail'
          })
        }
      }
    })
  },
  inputStock(e)
  {
    console.log("正在输入新库存",e.detail.value)
    this.setData({
      newStock:e.detail.value
    })
  },
  changeStock(e)
  {
    let that =this
    console.log("失去焦距，设置新库存 did:",e.currentTarget.dataset.did,"新库存:",this.data.newStock)
    wx.request({
      url: this.data.service+'/GoodsDetailController/uploadGoodsDetailInfo',
      data:{
        did:e.currentTarget.dataset.did,
        Info:that.data.newStock,
        type:'stock'
      },
      success(res)
      {
        if(res.data==0)
        {
          wx.showToast({
            title: '请输入合理数值',
            icon:'fail'
          })
        }
      }
    })
  },
  deleteType(e)
  {
    let that =this
    console.log("删除类型 did=",e.currentTarget.dataset.did)
    wx.request({
      url: this.data.service+'/GoodsDetailController/uploadGoodsDetailInfo',
      data:{
        did:e.currentTarget.dataset.did,
        Info:that.data.newStock,
        type:'deleteType'
      },
      success(res)
      {
        that.onLoad()
      }
    })
  },
  inputUploadGoodsName(e)
  {
    console.log("输入上传商品名",e.detail.value);
    var data={
      uploadRoughInfo : this.data.uploadRoughInfo
    }
    data.uploadRoughInfo.name = e.detail.value
    this.setData(data)
    console.log("当前upload信息为",this.data.uploadRoughInfo)
  },
  inputUploadGoodsType(e)
  {
    console.log("输入上传商品类型",e.detail.value);
    var data={
      uploadRoughInfo : this.data.uploadRoughInfo
    }
    data.uploadRoughInfo.type = e.detail.value
    this.setData(data)
    console.log("当前upload信息为",this.data.uploadRoughInfo)
  },
  
  selectprotraot()
  {
    let that = this
    wx.chooseImage({
      count: 1, // 最多
      sizeType: ['compressed'], // 指定是原图还是压缩图
      sourceType: ['camera','album'], // 指定来源是相册还是相机 
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          portraitURL : res.tempFilePaths[0]
        })  
      }
    })
  },
  selectDetailImages()
  {
    let that = this
    var data={
      detailImages : this.data.detailImages
    }
    wx.chooseImage({
      count: 8, // 最多
      sizeType: ['compressed'], // 指定是原图还是压缩图
      sourceType: ['camera','album'], // 指定来源是相册还是相机 
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        data.detailImages = res.tempFilePaths.concat(data.detailImages)
        that.setData(data)  
      }
    })
  },
  addDetail()
  {
    console.log("添加一个类型")
    var data={
      uploadRoughInfo : this.data.uploadRoughInfo
    }
    //this.data.uploadRoughInfo.uploadDetails.push({goodsStock:0,goodsPrice:0,goodsColor:"",goodsStyle:"",goodsSize:""})
    data.uploadRoughInfo.uploadDetails.push({goodsStock:0,goodsPrice:0,goodsColor:"",goodsStyle:"",goodsSize:""})
    this.setData(data)
    console.log(this.data.uploadRoughInfo.uploadDetails)
  },
  inputUpdateColor(e)
  {
    console.log("输入上传商品detail-color",e.detail.value," 修改序号为",e.currentTarget.dataset.idx);
    var data={
      uploadRoughInfo : this.data.uploadRoughInfo
    }
    data.uploadRoughInfo.uploadDetails[e.currentTarget.dataset.idx].goodsColor = e.detail.value
    this.setData(data)
    console.log("当前upload信息为",this.data.uploadRoughInfo)
  },
  inputUpdateStyle(e)
  {
    console.log("输入上传商品detail-style",e.detail.value," 修改序号为",e.currentTarget.dataset.idx);
    var data={
      uploadRoughInfo : this.data.uploadRoughInfo
    }
    data.uploadRoughInfo.uploadDetails[e.currentTarget.dataset.idx].goodsStyle = e.detail.value
    this.setData(data)
    console.log("当前upload信息为",this.data.uploadRoughInfo)
  },
  inputUpdateSize(e)
  {
    console.log("输入上传商品detail-size",e.detail.value," 修改序号为",e.currentTarget.dataset.idx);
    var data={
      uploadRoughInfo : this.data.uploadRoughInfo
    }
    data.uploadRoughInfo.uploadDetails[e.currentTarget.dataset.idx].goodsSize = e.detail.value
    this.setData(data)
    console.log("当前upload信息为",this.data.uploadRoughInfo)
  },
  inputUpdatePrice(e)
  {
    console.log("输入上传商品detail-price",e.detail.value," 修改序号为",e.currentTarget.dataset.idx);
    if(e.detail.value<=0)
    {
      wx.showToast({
        title: '非法价格',
        image:'../../picture/fail.png'
      })
      return;
    }
    var data={
      uploadRoughInfo : this.data.uploadRoughInfo
    }
    data.uploadRoughInfo.uploadDetails[e.currentTarget.dataset.idx].goodsPrice = e.detail.value
    this.setData(data)
    console.log("当前upload信息为",this.data.uploadRoughInfo)
  },
  inputUpdateStock(e)
  {
    console.log("输入上传商品detail-stock",e.detail.value," 修改序号为",e.currentTarget.dataset.idx);
    if(e.detail.value<=0)
    {
      wx.showToast({
        title: '非法库存量',
        image:'../../picture/fail.png'
      })
      return;
    }
    var data={
      uploadRoughInfo : this.data.uploadRoughInfo
    }
    data.uploadRoughInfo.uploadDetails[e.currentTarget.dataset.idx].goodsStock = e.detail.value
    this.setData(data)
    console.log("当前upload信息为",this.data.uploadRoughInfo)
  },

  uploadGoods()
  {
    let that = this
    console.log("点击上传")
    var tempRough =  this.data.uploadRoughInfo
    var tempDetail = this.data.uploadRoughInfo.uploadDetails
    console.log("replaceNull测试 rough",tempRough)
    if(tempRough.name!=null && tempRough.type!=null && (tempRough.name.replace(/\s*/g,"")=="" || tempRough.type.replace(/\s*/g,"")==''))
    {
      wx.showToast({
        title: '请完善信息',
        image:'../../picture/fail.png'
      })
      return;
    }
    console.log("replaceNull测试 detail",tempDetail)
    if(tempDetail.length==1 && (tempDetail[0].goodsColor.replace(/\s*/g,"")=='' || tempDetail[0].goodsStyle.replace(/\s*/g,"")=='' || tempDetail[0].goodsSize.replace(/\s*/g,"")==''))
    {
      wx.showToast({
        title: '缺少型号',
        image:'../../picture/fail.png'
      })
      return;
    }
    //发送除moreimg的所有信息
    var thisRid=0
    wx.uploadFile({
      url: that.data.service + "/GoodsRough/addNewGoods",
      filePath: this.data.portraitURL,
      name: "portrait",
      formData:{
        goodsInfo:JSON.stringify(this.data.uploadRoughInfo)
      },
      success:function(res){
        console.log("上传rough&detail信息返回值",res)  //返回的rid
        if(res.data== -1)
        {
          wx.showToast({
              title: '存在同名商品',
              image:"../../picture/fail.png"
            })
          return;
        }
        else if(res.data==0){
          wx.showToast({
            title: '出现某些错误',
            image:"../../picture/fail.png"
          })
          return;
        }
        else{  //rough成功了
          thisRid = res.data
          //设置moreimg栏
          for(var i=0;i<that.data.detailImages.length;i++)
          {
            wx.uploadFile({
              url: that.data.service + "/GoodsRough/upLoadImage",
              filePath: that.data.detailImages[i],
              name: "moreimg",
              formData:{
                uid : app.globalData.openId,
                rid : thisRid
              },
              success:function(res){
                console.log("插入图片返回值",res)
              }
              
            })
            wx.showToast({
              title: '上架成功',
            })
          }

          //全部成功 重置
          var reset={
            portraitURL : that.data.portraitURL,
            detailImages : that.data.detailImages,
            uploadRoughInfo :that.data.uploadRoughInfo,
            currentTab : that.data.currentTab
          }
      
          reset.portraitURL = "../../picture/add.png",
          reset.detailImages = ["../../picture/add.png"],
          reset.uploadRoughInfo = {
            name:"",shoper:"",type:"",portrait:"",moreimg:"",
            uploadDetails:[
              {goodsStock:0,goodsPrice:0,goodsColor:"",goodsStyle:"",goodsSize:""}
            ]
          }
          reset.currentTab = 1;
      
          that.setData(reset)
        }
      }
    })  
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log("当前页面index："+this.data.currentTab)
    if(options)
    {
      this.setData({
        shoperInfo : JSON.parse(options.shoperInfo)  //解JSON
      })
      console.log("我的商品得到shoperInfo",this.data.shoperInfo)
    }

    if(this.data.currentTab==0)  //全部商品
    {
      wx.request({
        url: this.data.service+'/OrderController/getAllShoperOrder/'+app.globalData.openId,
        success(res)
        {
          that.setData({
            allSoldGoods : res.data
          })
          console.log("得到全部商品信息",that.data.allSoldGoods)
        }
      })
    }
    else if(this.data.currentTab==1) //商品管理
    {
      wx.request({
        url:this.data.service+ '/GoodsRough/getShoperGoodsManageInfo/'+app.globalData.openId, //我上架的商品所有信息
        success(res)
        {
          that.setData({
            allTypesGoods:res.data,
          })
          console.log("商品类型管理数据",that.data.allTypesGoods)
        }
      })
    }
    else if(this.data.currentTab==2)
    {
      var data = {
        uploadRoughInfo : this.data.uploadRoughInfo
      }
      data.uploadRoughInfo.shoper = app.globalData.openId
      this.setData(data)
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
    wx.stopPullDownRefresh()
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