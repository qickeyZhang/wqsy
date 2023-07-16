// pages/my/personnels/personnels.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allLists: [
      {
        typename: '顾问',
        list: [
          {
            name: '史光柱',
            txt: '大校军衔，被评为新中国成立以来100位感动中国人物，中央军委授予“战斗英雄”称号。先后荣立过一等功一次、二等功两次、三等功两次。',
            imglist: [
              'http://question-shop.oss-cn-beijing.aliyuncs.com/common/headimg_default.jpg',
              'http://question-shop.oss-cn-beijing.aliyuncs.com/common/headimg_default.jpg'
            ]
          },
          {
            name: '胡国桥',
            txt: '大校军衔。一等功臣，北京军区“优秀共产党员”“全国拥政爱民先进个人”“全国优秀军训工作者”“全军装备理论研究先进个人”。',
            imglist: [
              'http://question-shop.oss-cn-beijing.aliyuncs.com/common/headimg_default.jpg',
            ]
          }
        ]
      },
      {
        typename: '主任',
        list: [
          {
            name: '张茂忠',
            txt: '中央军委授予“战斗英雄”荣誉称号，一等功臣。',
            imglist: []
          },
          {
            name: '张茂忠',
            txt: '中央军委授予“战斗英雄”荣誉称号，一等功臣。',
            imglist: []
          }
        ]
      }
    ]
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
      title: '组织架构——领导成员名单',
      path: '/pages/my/personnels/personnels'
    }
  }
})