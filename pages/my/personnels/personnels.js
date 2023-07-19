// pages/my/personnels/personnels.js
import ajax from '../../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    allLists: []
  },

  // 获取列表
  getlist(){
    wx.showLoading({
      title: '数据加载中...',
      mask: true
    })
    ajax.get('/leader/leader/list').then(res => {
      wx.hideLoading()
      if(res.data.code == 200){
        this.setData({allLists: res.data.rows})
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getlist()
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
  onShareAppMessage() {
    return {
      title: '组织架构——领导成员名单',
      path: '/pages/my/personnels/personnels'
    }
  }
})