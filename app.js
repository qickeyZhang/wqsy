// app.js
App({
  onLaunch() {
    // 设备
    wx.getSystemInfo({
      success: res => {
        // console.log(res)
        wx.setStorageSync('SystemInfo', res)
      }
    })
  },
  globalData: {
    baseUrl: 'https://vip.china-cac.cn'
  }
})
