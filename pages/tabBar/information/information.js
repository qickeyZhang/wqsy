// pages/information/information.js
import ajax from '../../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperIndex: 0,
    newbanner: [],
    actIndex: 0,
    acttype: [],
    actlist: [],
    pagenum: 1,
    nolist: false,
    xiding: false
  },

  // 获取banner和文章分类数据
  getData(){
    ajax.get('/api/base/banners/list').then(res => {
      this.setData({newbanner: res.data.rows})
    })
    ajax.get('/api/article/articlesCategory/list').then(res => {
      this.setData({acttype: res.data.rows})
      this.getartlist()
    })
  },
  // banner改变
  bannerswiperChange(e){
    let current = e.detail.current;
    this.setData({swiperIndex: current})
  },
  // banner 跳转
  bannerto(e){
    var item = e.currentTarget.dataset.item;
    if(!item.type) return
    if(item.appid){
      wx.navigateToMiniProgram({
        appId: item.appid,
        path: item.location_url,
      })
      return
    }
    wx.navigateTo({
      url: '/' + item.location_url
    })
  },
  // 切换文章分类
  choosetype(e){
    var index = e.currentTarget.dataset.index;
    if(this.data.actIndex == index) return
    this.setData({
      actIndex: index,
      actlist: [],
      pagenum: 1,
      nolist: false
    })
    wx.showLoading({
      title: '数据加载中...',
      mask: true
    })
    this.getartlist()
  },
  // 获取文章列表
  getartlist(){
    ajax.get('/api/article/articles/list', {
      categoryId: this.data.acttype[this.data.actIndex].id,
      pageNum: this.data.pagenum,
      pageSize: 10
    }).then(res => {
      wx.hideLoading()
      this.setData({actlist: this.data.actlist.concat(res.data.rows)})
      if(this.data.actlist.length == 0){
        this.setData({nolist: true})
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.showLoading({
      title: '数据加载中...',
      mask: true
    })
    this.getData()
  },

  onPageScroll: function(e) {
    let that = this
    const query = wx.createSelectorQuery()
    query.select('.scroll').boundingClientRect()
    query.exec(function(res){
      that.setData({xiding: res[0].top < 0 ? true : false})
    })
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
    this.setData({pagenum: this.data.pagenum + 1})
    this.getartlist()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})