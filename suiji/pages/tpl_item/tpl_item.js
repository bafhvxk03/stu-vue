//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },

  onLoad: function () {
    console.log('onLoad')
    wx.request({
      url: 'https://17887487.qcloud.la/getRandom.action',
      header: {
        'content-type': 'application/json'
      },
      data: {
        randomId:'e3ce1f1ab83e57394b081382a9d9968c'
      },
      dataType: "json",  
      success: function (res) {
        console.log(res);
        console.log(res.data);
        console.log(res.data.status)
      }
    })
  }
})
