//app.js
App({
  onLaunch: function () {
    this.getUserInfo();
  },
  save: function () {

  },
  getUserInfo: function (cb) {
    var that = this
    //调用登录接口
    wx.login({
      success: function (res) {
        const _res = res;
        console.log('code',_res.code)
        if (_res.code) {
          wx.getUserInfo({
            success: function (res1) {
              const res2 = res1.rawData;
              var userInfo = res1.userInfo
              console.log(userInfo)
              console.log(userInfo.nickName, userInfo.avatarUrl)
              //发起网络请求
              wx.request({
                url: 'https://17887487.qcloud.la/getOpenId',
                data: {
                  code: _res.code,
                  name: userInfo.nickName,
                  pic: userInfo.avatarUrl
                },
                 method: 'POST', 
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                  console.log(res);
                  var _opneid = res.data.openid;
                  console.log(_opneid)
                  try {
                    wx.setStorageSync('KEY', _opneid)
                  } catch (e) {
                  }
                }
              })

            }
          })
        } else {
          console.log('获取失败')
        }
      }
    })
  },
  globalData: {

  }
})