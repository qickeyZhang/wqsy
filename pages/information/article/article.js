// pages/information/article/article.js
import ajax from '../../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    articleData: {}
  },

  // 文章详情
  actdetails(){
    wx.showLoading({
      title: '数据加载中...',
      mask: true
    })
    ajax.get('/api/article/articles/info', {
      id: this.data.id
    }).then(res => {
      wx.hideLoading()
      wx.setNavigationBarTitle({title: res.data.data.title})
      res.data.data.content = res.data.data.content ? res.data.data.content.replace(/<img /g, '<img style="width:100%"') : ''
      res.data.data.content = res.data.data.content ? res.data.data.content.replace(/<iframe /g, '<iframe style="width:100%" ') : ''
      res.data.data.content = res.data.data.content ? res.data.data.content.replace(/iframe/g, 'video') : ''
      // desc = desc.replace(/<section/g, '<div').replace(/\/section>/g, '/div>')
      this.setData({articleData: res.data.data})
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({id: options.id})
    this.actdetails()
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
    let title = this.data.articleData ? this.data.articleData.title : ''
    return {
      title: title,
      path: '/pages/information/article/article?id=' + this.data.id
    }
  }
})