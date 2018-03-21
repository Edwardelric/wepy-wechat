export default class Tips {
  constructor() {
    this.loading = false;
    this.duration = 500;
    this.timeDuration = 300;
    this.timeEndDuration = 500;
  }
  /*
  * 弹出提示框
  * */
  static success(title, duration) {
    setTimeout(() => {
      wx.showToast({
        title,
        icon: "success",
        mask: true,
        duration: duration || this.duration
      })
    }, this.timeDuration);
    if (duration > 0) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, duration);
      });
    }
  }
  /*
  * 弹出确认窗口
  * */
  static confirm(content, payload = {}, title="提示") {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title,
        content,
        showCancel: true,
        success: (res) => {
          if (res.confirm) {
            resolve(payload);
          } else if(res.cancel) {
            reject(payload);
          }
        },
        fail: res => {
          reject(payload);
        }
      })
    })
  }
  /*
  *  弹出提示窗口
  * */
  static toast(title, onHide, icon="success") {
    setTimeout(() => {
      wx.showToast({
        title,
        icon,
        mask: true,
        duration: this.duration
      })
    }, this.timeDuration);
    /*
    * 隐藏结束回调
    * */
    if (onHide) {
      setTimeout(() => {
        onHide();
      }, 500);
    }
  }
  /*
  * 警告框
  * */
  static alert(title) {
    wx.showToast({
      title,
      icon: "warn",
      mask: true,
      duration: this.duration
    })
  }
  /*
  * 加载
  * */
  static loading(title = "加载中") {
    if (Tips.isLoading) {
      return;
    }
    Tips.isLoading = true;
    wx.showLoading({
      title,
      mask: true
    })
  }
  static loaded() {
    if (Tips.isLoading) {
      Tips.isLoading = false;
      wx.hideLoading();
    }
  }
}
Tips.isLoading = false;
