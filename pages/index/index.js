//index.js
//获取应用实例
const app = getApp()
// pages/index/lanya.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      
      var that=this
      //蓝牙初始化
      wx.openBluetoothAdapter({
        success: function(res) {
          console.log(res)
          //监听寻找到新设备的事件
          wx.onBluetoothDeviceFound(function (res) {
           // console.log(res)

          })
        },
        fail:function(res){
          wx.showModal({
            title: '提示',
            content: '请检查手机蓝牙是否打开',
          })
        }
      })



  },
  lanya: function () {
    wx.showLoading({
      title: '搜索中',
    })
    setTimeout(function(){
      wx.hideLoading()
    },1500)
    //开始搜寻附近的蓝牙外围设备
    wx.startBluetoothDevicesDiscovery({

      success: function (res) {

        console.log('搜索完成')
        //获取在蓝牙模块生效期间所有已发现的蓝牙设备。包括已经和本机处于连接状态的设备。
        wx.getBluetoothDevices({
          success: function (res) {
            if(res.devices.length==0){
              wx.showModal({
                title: '提示',
                content: '没有搜索到设备，请重试',
              })
              wx.navigateTo({
                url: '../index/index',
              })
            }
            console.log(res)
            //console.log(res.devices[0].deviceId)
           // console.log(res.devices[0].name)
           console.log(res.devices)
         var data=res.devices
           wx.navigateTo({
             url: '../lanya/lanya?data=' + JSON.stringify(data),
           })
            //停止搜寻附近的蓝牙外围设备。若已经找到需要的蓝牙设备并不需要继续搜索时，建议调用该接口停止蓝牙搜索。
            // wx.stopBluetoothDevicesDiscovery({
            //   success: function(res) {
            //    console.log('已经停止搜索')
            //   },
            // })
          },
          fail:function(res){
            console.log('没有找到设备')
          }
        })
      },
      fail: function (fa) {
        console.log(fa)
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