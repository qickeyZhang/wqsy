// pages/login/login.js
import ajax from '../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ischeck: false
  },

  // 手机号快速验证组件
  getPhoneNumber (e) {
    wx.login({
      success: res => {
        ajax.get('/api/base/users/login', {
          code: res.code,
          mobileCode: e.detail.code,
          recommendId: ''
        }).then(res => {
          if(res.data.code == 200){
            wx.setStorageSync('token', res.data.data.token)
            wx.navigateBack()
          }
        })
      }
    })
  },
  // 暂不登录
  back:function(){
    let pages = getCurrentPages()
    if (pages.length > 2) {
      wx.navigateBack({delta: 2})
    } else {
      wx.reLaunch({
        url: '/pages/tabBar/information/information',
      })
    }
  },
  // 是否选中
  togglecheck(){
    this.setData({ischeck: !this.data.ischeck})
  },
  // 跳转协议
  toagree(){
    let link = encodeURIComponent('https://oss.boluoyunyu.com/share/20221026174347_pdf11427786.pdf')
    wx.navigateTo({
      url: '/pages/newindex/webview/webview?other=32&link=' + link
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