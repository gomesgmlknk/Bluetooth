// pages/notify/notify.js
var app = getApp()
var serviceId
function ab2str(arrayBuffer) {
  return String.fromCharCode.apply(null, new Uint8Array(arrayBuffer));
//   let unit8Arr = new Uint8Array(arrayBuffer);
//   let encodedString = String.fromCharCode.apply(null, unit8Arr),
//     decodedString = decodeURIComponent(escape((encodedString)));//没有这一步中文会乱码
//  return decodedString;
}
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
    var ct = JSON.parse(options.ct)
      serviceId=options.serviceId
     var that=this
    that.setData({
      array:ct,
      serviceId:serviceId,
      
    })
  },
  sub:function(e){
    var that = this
    var cht = e.target.id
    var deviceId = app.globalData.deviceId
  // 启用低功耗蓝牙设备特征值变化是的notify功能
  wx.notifyBLECharacteristicValueChange({
     deviceId: deviceId,
    serviceId: serviceId,
    characteristicId: cht,
    state: true,
    success: function (res) {
      //开始监听
      wx.onBLECharacteristicValueChange(function (characteristics) {
          console.log(characteristics.value)
        var a = characteristics.value
       
        var int8array = new Int8Array(a);
        
        console.log("监听到特征值更新:" + int8array[0])
        // var hex = ab2str(a);
        // console.log("返回的值:  ".hex)

      })
     
         console.log(res)
      wx.navigateTo({
        url: '../write/write?cht=' + cht + '&serviceId=' + serviceId + '&deviceId=' + deviceId,
      })
     },
     fail:function(res){
       console.log(res)
     },
  })
  },

  buf2string: function (buffer) {
    var arr = Array.prototype.map.call(new Int8Array(buffer), x => x)
    var str = ''
    for (var i = 0; i < arr.length; i++) {
      str += String.fromCharCode(arr[i])
    }
    return str
  },
  buf2hex: function (buffer) {
    // buffer is an ArrayBuffer
    return Array.prototype.map.call(new Uint8Array(buffer), 
    x => ('00' + x.toString(16)).slice(-2)).join('');
  },
   ab2hex:function (buffer) {
    const hexArr = Array.prototype.map.call(
      new Uint8Array(buffer),
      function (bit) {
        return ('00' + bit.toString(16)).slice(-2)
      }
    )
  return hexArr.join('')
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
