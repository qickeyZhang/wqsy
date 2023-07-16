import md5 from '../lib/md5.js'

let app = getApp()
let baseUrl = app.globalData.baseUrl

function request(url, data = {}, method) {
  let header = { 'content-type': 'application/json'}
  header['authorization'] = "Bearer " + wx.getStorageSync('token')


  // let token_time_int = parseInt(new Date().getTime() / 1000) // 时间戳
  // let sortKey = Object.keys(data || {}).sort() //排序Key
  // let newData = []
  // sortKey.map(r => {
  //   if (data[r]){
  //     newData.push(r + '=' + encodeURIComponent(data[r]))
  //   }
  // }) // 重新组装
  // let params_str = newData.join('&')
  // let unionid = wx.getStorageSync('_unionid') || ''
  // let api_sign_key = md5(unionid || '').substr(0, 10)
  // let token_sign = md5(`${params_str}&token_key=${api_sign_key}&token_time_int=${token_time_int}`)

  // data.token_time_int = token_time_int
  // data.token_sign = token_sign
  // data.union_id = unionid


  return new Promise(function (r) {
    wx.request({
      url: baseUrl + url, 
      data,
      method,
      header,
      success(res) {
        let pages = getCurrentPages()
        if (res.data.code == 401 && pages[pages.length - 1].route != 'pages/tabBar/my/my') {
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
        if (res.data.code == 500) {
          wx.showToast({
            title: "服务器错误，请稍后重试",
            icon: 'none',
            mask: true
          })
        }
        r(res)
      },
      fail(e) {
        wx.showToast({
          title: "请求失败，请稍后重试",
          icon: 'none',
          mask: true
        })
      }
    })
  })

}
let ajax = {
  post: function (url, data) {
    return request(url, data, 'POST')
  },
  get: function (url, data) {
    return request(url, data, 'GET')
  }
}
export default ajax