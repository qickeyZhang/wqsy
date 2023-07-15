// pages/inquiry/inquiry.js
import ajax from '../../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    c_name: '',
    c_num: ''
  },

  // input值
  iptval(e){
    var num = e.currentTarget.dataset.num;
    if(num == 1){this.setData({c_name: e.detail.value,})}
    if(num == 2){this.setData({c_num: e.detail.value,})}
  },

  // 查询
  search(){
    if(!this.data.c_name){
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        mask: true
      })
      return
    }
    if(!this.data.c_num){
      wx.showToast({
        title: '请输入证书编号',
        icon: 'none',
        mask: true
      })
      return
    }
    ajax.get('/api/user/userCertificate/info', {
      userName: this.data.c_name,
      certificateSn: this.data.c_num
    }).then(res => {
      wx.navigateTo({
        url: '/pages/inquiry/details/details?id=' + res.data.data.id,
      })
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
    return {
      title: '证书查询',
      path: '/pages/tabBar/inquiry/inquiry'
    }
  }
})