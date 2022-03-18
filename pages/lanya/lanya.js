// pages/index/lanya.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   array:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var Id=[]
    var Name=[]
    
    var data = JSON.parse(options.data)
    console.log(data)
    var that=this
    console.log(data)
    that.setData({
      array:data
    })
  },
  sub:function(e){
    var deviceId = e.currentTarget.id
    app.globalData.deviceId=deviceId
    console.log(e.currentTarget.id)
    //连接设备
    wx.createBLEConnection({
     
      deviceId:deviceId,
      success: function(res) {
        console.log(res)
        //获取服务列表
      wx.navigateTo({
        url: '../res/res?id='+deviceId,
      })
        console.log('id:' + deviceId)
      },
      fail:function(res){
        wx.showModal({
          title: '提示',
          content: '连接超时，请重试',
        })
       // console.log('id:' + deviceId)
        console.log(res)
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