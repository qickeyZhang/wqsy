// pages/shop/s_form/s_form.js
import ajax from '../../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsInfo: {},
    goodsList: [],
    goodsregion: [],
    addressee: '',
    phonenum: '',
    area: '',
    address: ''
  },

  // 商品列表
  getgoodslist(){
    wx.showLoading({
      title: '数据加载中...',
      mask: true
    })
    ajax.get('/api/shop/goods/list').then(res => {
      wx.hideLoading()
      if(res.data.code == 200) {
        let arr = []
        res.data.rows.map(item => {
          arr.push(item.goodsName)
        })
        this.setData({
          goodsList: res.data.rows,
          goodsregion: arr
        })
      }
    })
  },
  // 商品
  bindGoodsChange(e) {
    this.setData({goodsInfo: this.data.goodsList[e.detail.value]})
  },
  // 收货人、手机号。详细地址
  inputval(e){
    var num = parseInt(e.currentTarget.dataset.num);
    var datanam  = ''
    switch (num) {
      case 1:
        datanam = 'addressee'
      break
      case 2:
        datanam = 'phonenum'
      break
      case 3:
        datanam = 'address'
      break
    }
    this.setData({
      [datanam]: e.detail.value
    })
  },
  // 选择省市区
  bindRegionChange(e) {
    let region = e.detail.value
    this.setData({
      area: region[0] == region[1] ? region[1] + region[2] : region[0] + region[1] + region[2]
    })
  },
  // 提交
  save(){
    if(!this.data.goodsInfo.id){
      wx.showToast({
        title: '请选择购买商品',
        icon: 'none'
      })
      return
    }
    if(!this.data.addressee){
      wx.showToast({
        title: '请输入收货人',
        icon: 'none'
      })
      return
    }
    if(!this.data.phonenum){
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return
    } else {
      let _tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if(!_tel.test(this.data.phonenum)){
        wx.showToast({
          title: '请输入正确手机号',
          icon: 'none'
        })
        return
      }
    }
    if(!this.data.area){
      wx.showToast({
        title: '请选择所在地区',
        icon: 'none'
      })
      return
    }
    if(!this.data.address){
      wx.showToast({
        title: '请输入详细地址',
        icon: 'none'
      })
      return
    }
    wx.showLoading({
      title: '提交中...',
      mask: true
    })
    ajax.post( '/api/shop/order',{
      consignee: this.data.addressee,
      mobile: this.data.phonenum,
      address: this.data.area + ' ' + this.data.address,
      goodsId: this.data.goodsInfo.id
    }).then(res => {
      if(res.data.code == 200){
        wx.showToast({
          title: '提交成功',
          mask: true
        })
        setTimeout(() => {
          wx.reLaunch({
            url: '/pages/tabBar/information/information',
          })
        }, 2000)
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
    this.getgoodslist()
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