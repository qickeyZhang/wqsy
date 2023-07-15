// my.js
import ajax from '../../../utils/request'

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: false // 如需尝试获取用户信息可改为false； wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName')
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({canIUseGetUserProfile: true})
    }
  },
  // 获取个人信息
  getinfo(){
    wx.showLoading({
      title: '数据加载中...',
      mask: true
    })
    ajax.get('/api/base/users/userInfo').then(res => {
      wx.hideLoading()
      this.setData({userInfo: res.data.data})
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.getcode()
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.getcode()
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getcode(){
    wx.login({
      success: res => {
        ajax.get('/api/base/users/login', {
          code: res.code,
          recommendId: ''
        }).then(res => {
          wx.setStorageSync('token', res.data.data.token)
        })
      }
    })
    
  },
  // 跳转页面
  navigatorto(e){
    var num = e.currentTarget.dataset.num;
    var tourl = '/pages/login/login'
    if(num == 1){
      tourl = '/pages/my/info/info'
    }
    if(num == 2){
      tourl = '/pages/logs/logs'
    }
    wx.navigateTo({
      url: tourl
    })
  },
  onShow(){
    this.getinfo()
  }
})
