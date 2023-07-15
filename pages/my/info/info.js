// pages/my/info/info.js
import ajax from '../../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    info: {}
  },

  // 获取个人信息
  getinfo(){
    wx.showLoading({
      title: '数据加载中...',
      mask: true
    })
    ajax.get('/api/base/users/userInfo').then(res => {
      wx.hideLoading()
      this.setData({info: res.data.data})
    })
  },
  // 头像
  chooseavatar(e){
    let that = this
    let img = e.detail.avatarUrl
    let suffix = img.substring(img.lastIndexOf("."))
    ajax.post('/api/common/upload').then(res => {
      // console.log(res.data)
      if(res.data.code == 200){
        let host = res.data.data.host
        let filename = res.data.data.filename + suffix
        wx.uploadFile({
          filePath: img, 
          name: 'file',
          url: host,
          formData:{
            policy: res.data.data.policy,
            signature: res.data.data.signature,
            OSSAccessKeyId: res.data.data.accessid,
            key: filename,
            success_action_status: '200'
          },
          success:function(res){
            let headPic = 'info.headPic'
            that.setData({[headPic]: host + '/' + filename})
            wx.hideLoading()
          }
        })
      }
    })
  },
  // 昵称
  ncval(e){
    this.setData({['info.nickName']: e.detail.value})
  },
  // 更新个人信息
  uploadinfo(){
    wx.showLoading({
      title: '请稍候...',
      mask: true
    })
    ajax.post('/api/base/users/updateUserInfo', {
      nickName: this.data.info.nickName,
      headPic: this.data.info.headPic,
      id: this.data.id
    }).then(res => {
      wx.hideLoading()
      if(res.data.code == 200){
        wx.showToast({
          title: '更新成功',
          mask: true
        })
        this.getinfo()
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getinfo()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})