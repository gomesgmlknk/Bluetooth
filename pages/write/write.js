// pages/write/write.js
var app = getApp()
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
    var cht = options.cht
   var  deviceId=options.deviceId
    var serviceId = options.serviceId
   that.setData({
     deviceId:deviceId,
     cht:cht,
     serviceId:serviceId

   })
  },
  formSubmit:function(e){
    var that = this
    var value=e.detail.value.psw //这里是通讯协议内容

    console.log(value)
      //写入数据
      wx.writeBLECharacteristicValue({
        deviceId: that.data.deviceId,
        serviceId: that.data.serviceId,
        characteristicId: that.data.cht,   
        value: that.str2ab(value),
        success: function (res) {
          console.log(res)

        },
        fail:function(res){
          console.log(res)
        }
      });
    wx.readBLECharacteristicValue({
      deviceId: that.data.deviceId,
      serviceId: that.data.serviceId,
      characteristicId: that.data.cht,
      success: function(e) {
        console.log(e)
      },
    })
  },


  
  // 字符串转为ArrayBuffer对象，参数为字符串
  str2ab: function(str) {
    var buf = new ArrayBuffer(str.length * 2); // 每个字符占用2个字节
    var bufView = new Uint16Array(buf);
    for(var i = 0, strLen=str.length; i<strLen; i++) {
  bufView[i] = str.charCodeAt(i);
}
return buf;
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