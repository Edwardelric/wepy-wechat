const API_HOST = "https://www.baidu.com";

import { wxRequest } from "../utils/wxRequest";

const wxJsCode2Session = (params) => wxRequest("/api/wechat/jscode2session", params, 'wxJsCode2Session');
const swiperList = (params) => wxRequest("/api/swiperList", params, "swiperList");
const discoverList = (params) => wxRequest("/api/discoverList", params, "discoverList");

module.exports ={
  wxJsCode2Session,
  swiperList,
  discoverList
}
