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
    baseUrl: 'http://62.234.17.167:8080'
  }
})
