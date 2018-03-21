import wepy from "wepy";
import util from "./util";
import md5 from "./md5";
import Tip from "./tip"
import * as Mock from "../mock";

const API_SECRET_KEY = "www.mall.cycle.com";
const TIMESTAMP = util.getCurrentTime();
const SIGN = md5.hex_md5((TIMESTAMP + API_SECRET_KEY).toLowerCase());

const DEBUG = true;


const wxRequest = async (url, params={}, keyName) => {
  Tip.loading();
  let data = params.query || {};
  data.sign = SIGN;
  data.time = TIMESTAMP;
  let res = null;
  if (!DEBUG) {
    res = await wepy.request({
      url,
      method: params.method || "GET",
      data,
      header: { "Content-Type": "application/json"}
    }).then((res) => {
      params.success();
      // this.$apply();
    }, (err) => {
    
    });
  } else {
   res = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(Mock[keyName]);
      }, 2000);
    })
  }
  Tip.loaded();
  return res;
}
module.exports = {
  wxRequest
}
