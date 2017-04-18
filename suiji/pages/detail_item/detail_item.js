//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    title:'',
    comment:''
  },
  onLoad: function (options) {
    console.log(options)
    this.getMsg(options.randomId)
  },
  getMsg:function(id){
      var _self = this;
      wx.request({
        url: 'https://17887487.qcloud.la/getRandom',
        data: {
          randomId:id
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
         header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
        success: function(res){
          console.log(res);
          // this.data.randomlist = res.data;
          console.log(res.data)
          var _data = JSON.parse(res.data);
          console.log(_data.title,res.comment);
          console.log(res.data.title,res.data.comment)
          _self.setData({
            title:res.data.title
          })
        },
        fail: function(res) {
          // fail
        },
        complete: function(res) {
          // complete
        }
      })
  }
})
