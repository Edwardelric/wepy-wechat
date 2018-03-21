/*
* 获取当前时间
* @param {String} _symbol 连接符
* */
let getCurrentTime = (_symbol = ":") => {
  let date = new Date();
  let y = date.getFullYear();
  let m = ("0" + (date.getMonth() + 1)).slice(-2);
  let d = ("0" + date.getDate()).slice(-2);
  let h = ("0" + date.getHours()).slice(-2);
  let f = ("0" + date.getMinutes()).slice(-2);
  let s = ("0" + date.getSeconds()).slice(-2);
  return y + _symbol + m + _symbol + d + _symbol + h + _symbol + f + _symbol + s;
}

/*
* 时间格式化
* @param {String or Date} date 时间
* */
let formatDate = (date, format) => {
  let _date = date ? new Date(date) : new Date();
  let formatDate = {
    "M+": _date.getMonth() + 1,
    "d+": _date.getDate(),
    "h+": _date.getHours(),
    "m+": _date.getMinutes(),
    "s+": _date.getSeconds(),
    "S":  _date.getMilliseconds()
  }
  if (/(y+)/i.test(format)) {
    let $1 = (/(y+)/i.exec(format))[1];
    format = format.replace($1, (_date.getFullYear() + "").substr(4 - $1.length));
    for (let item in formatDate) {
      if(new RegExp("("+ item +")").test(format)) {
        let $$1 = (new RegExp("("+ item +")").exec(format))[1];
        format = format.replace($$1, ($$1.length==1) ? (formatDate[item]) : (("00"+ formatDate[item]).substr((""+ formatDate[item]).length)));
      }
    }
  }
  return format;
}

/*
* 千分位化金额
* @param {Number}  val 金额
* @param {Number}  _decimals 保留小数位
* @param {Boolean} _flag 是否千分位化
* @param {_symbol} _symbol 连接符
* */
let currency = (val, _decimals = 2, _flag = true, _symbol) => {
  val = parseFloat(val);
  if (!isFinite(val) || !val && val !== 0) {
    console.error("currency is invalid");
    return "";
  }
  let stringified = Math.abs(val).toFixed(_decimals),
      sign = val < 0 ? "-" : "";
  if (!_flag) {
    return sign + _symbol +  stringified;
  } else {
    let digitsRE = /(\d{3})(?=\d)/g,
      int = _decimals ? stringified.slice(0, -1 - _decimals) : stringified,
      i = int.length % 3,
      head = i > 0 ? int.slice(0, i) + (int.length > 3 ? "," : "") : "",
      _float = _decimals ? stringified.slice(-1 - _decimals) : "";
    
    return sign + _symbol + head + int.slice(i).replace(digitsRE, "$1,") + _float;
  }
}

/*
* 手机号验证
* @param {String} pNum 手机号
* */
let validatePhone = (pNum) => {
  let phone = (pNum + "").trim();
  let reg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
  if (pNum.length !== 11) {
    console.error("phone number must be 11 digits");
    return false;
  } else if (!reg.test(pNum)) {
    console.error("phone number invalid");
    return false;
  } else {
    return true;
  }
}

/*
* 车牌验证
* @param {String} plate 车牌号
* */
let validatePlate = (plate) => {
  let reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(?![A-Z]+\b)[A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  plate = (plate + "").trim();
  if (!plate || /^\s*$/.test(plate)) {
    console.error("licence plate can not be empty");
    return false;
  } else if (!reg.test(palte)){
    console.error("license plate is illegal");
    return false;
  } else {
    return true;
  }
}

/*
* 移动端android版本判断
* */
let validateVersionGt35 = () => {
  let ua = JSON.parse(window.navigator.userAgent);
  let appVersion = ua.appVersion ? ua.appVersion.replace(".", "") : "";
  if (appVersion && appVersion > 40) {
    return false;
  } else {
    return false;
  }
}

/*
* 系统环境
* @param {isIos, isAndroid, isApp, isWeixin}
* */
// let checkSystem = (function() {
//   console.log(window.navigator);
//   let ua = window.navigator.userAgent;
//   let obj = {
//     isIos() {
//       return !! ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
//     },
//     isAndroid() {
//       return ua.indexOf('Android') > -1 || ua.indexOf("Adr") > -1;
//     },
//     isApp() {
//       return ua.indexOf("MongoToC") > 0;
//     },
//     isWeixin() {
//       return ua.toLowerCase().match(/MicroMessenger/i) === "micromessenger";
//     }
//   }
//   return (arg) => {
//     if (typeof obj[arg] === "boolean") {
//       return obj[arg];
//     } else {
//       obj[arg] = obj[arg]();
//     }
//   }
// })();

module.exports = {
  getCurrentTime,
  formatDate,
  currency,
  validatePhone,
  validatePlate,
  validateVersionGt35,
  // checkSystem
}
