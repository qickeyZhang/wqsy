// pages/my/info/info.js
import ajax from '../../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    info: {},
    ossId: '', // 上传oss后的图片id
  },

  // 获取个人信息
  getinfo(){
    ajax.get('/api/base/users/userInfo').then(res => {
      wx.hideLoading()
      this.setData({info: res.data.data})
    })
  },
  // 头像
  chooseavatar(e){
    let that = this
    let img = e.detail.avatarUrl
    wx.uploadFile({
      filePath: img, 
      name: 'file',
      url: 'http://62.234.17.167:8080/api/common/upload',
      success:function(res){
        let resdata = JSON.parse(res.data)
        if(resdata.code == 200){
          let headPic = 'info.headPic'
          that.setData({
            [headPic]: resdata.data.url,
            ossId: resdata.data.ossId
          })
          wx.hideLoading()
        } else {
          wx.showToast({
            title: '上传失败，请稍后重试',
            icon: 'none',
            mask: true
          })
        }
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
      ossId: this.data.ossId,
    }).then(res => {
      wx.hideLoading()
      if(res.data.code == 200){
        wx.showToast({
          title: '更新成功',
          mask: true
        })
        setTimeout(() => {this.getinfo()}, 2000)
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
    wx.showLoading({
      title: '数据加载中...',
      mask: true
    })
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
  // onShareAppMessage() {

  // }
})