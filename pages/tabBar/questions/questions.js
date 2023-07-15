// pages/questions/questions.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headIndex: 0,
    typelist: [
      {name: '长征', id: 1},
      {name: '抗日', id: 2},
      {name: '长征', id: 1},
      {name: '抗日', id: 2},
      {name: '长征', id: 1},
      {name: '抗日', id: 2},
      {name: '长征', id: 1},
      {name: '抗日', id: 2},
    ],
  },

   // 选择分类
   choosehead(e){
    var index = e.currentTarget.dataset.index;
    if(index == this.data.headIndex) return
    this.setData({headIndex: index})
  },
  // 进入题库
  todetails(e){
    var num = e.currentTarget.dataset.num;
    wx.navigateTo({
      url: '/pages/questions/details/details?type=' + num
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
  onShareAppMessage() {

  }
})