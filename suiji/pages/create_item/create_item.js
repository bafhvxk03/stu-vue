//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    list:['','']
  },
  addlist:function(){
    this.data.list.push('');
    this.setData({
      list:this.data.list
    })
  },
  subhandle:function(){
     
  },

  onLoad: function () {
    // 
  },
  deletehandle(e){
    var {dataset: {tag}} = e.target;
    this.data.list.splice(tag,1);
    console.log(tag);
    this.setData({
      list:this.data.list
    })
  },
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    function unique(a) {  
      var res = [];  
  
        for (var i = 0, len = a.length; i < len; i++) {  
          var item = a[i];  
        
          (res.indexOf(item) === -1) && res.push(item);  
        }  
  
      return res;  
  }  

    if(!e.detail.value.title){
      console.log('标题不能为空')
      return;
    }

    if(!e.detail.value.comment){
      console.log('补充内容不能为空')
      return;
    }

    if(!e.detail.value.option1 ||  !e.detail.value.option2){
      console.log('至少要两个选项');
      return;
    }

    var _tempArr = [];
    //处理选项相同的情况
    for(var i = 1;i<=this.data.list.length;i+=1){
      _tempArr.push(e.detail.value['option'+i])
    }
  
    var ans = unique(_tempArr); 

    if(ans.length < _tempArr.length){
      console.log('不能有重复的选项')
      return;
    }


    var key = wx.getStorageSync('KEY');
    
    const _data = Object.assign({},{openid:key},e.detail.value)
    console.log(_data)
     wx.request({
       url: 'https://17887487.qcloud.la/createRandom',
       data: _data,
       method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
       success: function(res){
         console.log(res);
         var randomId = res.data.randomId;
         wx.navigateTo({
          url: '../detail_item/detail_item?randomId='+randomId
        })
         // success
       },
       fail: function(res) {
         // fail
       },
       complete: function(res) {
         // complete
       }
     })
  },
  formReset: function() {
    console.log('form发生了reset事件')
  }
})
