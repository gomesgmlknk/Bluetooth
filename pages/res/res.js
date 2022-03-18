// pages/res/res.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   array:'',
   characteristics:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var deviceId=options.id
    var that=this
    //获取所有服务
    wx.getBLEDeviceServices({
      deviceId: deviceId,
      success: function (res) {
       // console.log(res)
        console.log(res.services)
       
       that.setData({
         array:res.services
       })
      },
    })
  },
    sub:function(e){
      var that = this
      var serviceId=e.target.id

    //获取蓝牙设备某个服务中的所有特征值
    wx.getBLEDeviceCharacteristics({
      deviceId:app.globalData.deviceId,
      serviceId:serviceId,
      success: function(res) {
        console.log(res)
        that.data.characteristics=res.characteristics//获取characteristic

        wx.navigateTo({
          url: '../notify/notify?ct=' + JSON.stringify(that.data.characteristics) + '&serviceId=' + serviceId,
        })
      },
      fail:function(res){
        console.log(res)
      }
    })
    
      //监听设备连接状态
      wx.onBLEConnectionStateChange(function (res) {
        console.log(res)
        if (res.connected == false) {
          wx.showModal({
            title: '提示',
            content: '设备连接已断开',
          })
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