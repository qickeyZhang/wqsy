// pages/inquiry/details/details.js
import ajax from '../../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ownpage: false, //  从我的证书列表进入
    details: {}
  },

  // 获取证书详情
  getcdetails(){
    wx.showLoading({
      title: '数据加载中...',
      mask: true
    })
    ajax.get('/api/user/userCertificate/info', {
      id: this.data.id
    }).then(res => {
      wx.hideLoading()
      this.setData({details: res.data.data})
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id: options.id,
      ownpage: options.ownpage ? true : false
    })
    this.getcdetails()
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