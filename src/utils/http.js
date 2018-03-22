import wepy from "wepy";
import Tip from "./tip";
import * as Mock from "../mock";

const DEBUG = true;

export default class httpMixin extends wepy.mixin {
  isFunction(item) {
    return typeof item === "function";
  }
  $get(
    {url = "", headers = {}, data = {}},
    {success = () => {}, fail = () => {}, complete = () => {}}
  ) {
    const methods = "GET";
    this.$ajax(
      {url, headers, methods, data},
      {success, fail, complete}
    )
  }
  
  $post(
    {url = "", headers = {}, data = {}},
    {success = () => {}, fail = () => {}, complete = () => {}}
  ) {
    const methods = "POST";
    this.$ajax(
      {url, headers, methods, data},
      {success, fail, complete}
    )
  }
  
  $ajax(
    {url = "", headers = {}, methods = "GET", data = {}},
    {success = () => {}, fail = () => {}, complete = () => {}}
  ) {
    const request = {
      url,
      method: ["GET", "POST"].indexOf(methods) > -1 ? methods : "GET",
      header: Object.assign({}, headers),
      data: Object.assign({}, data)
    }
    
    if (!DEBUG) {
      wepy.request(Object.assign(request, {
        success: (res) => {
          if (res && res.status) {
            return setTimeout(() => {
              this.isFunction(success) && success(res);
              this.$apply();
            })
          }
        },
        fail: (res) => {
          return setTimeout(() => {
            this.isFunction(fail) && fail(res);
            this.$apply();
          })
        },
        complete: (res) => {
          Tip.loaded();
          return (() => {
            this.isFunction(complete) && complete(res);
            this.$apply();
          })
        }
      }))
    } else {
      Tip.loading();
      this.isFunction(success) && success(Mock[data.MockkeyName]);
      setTimeout(() => {
        Tip.loaded();
        this.$apply();
      }, 2000);
    }
  }
}
