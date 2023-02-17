import { replaceAop } from '../common'
import { HandleEvents } from '../HandleEvents'
export function xhrReplace() {
  if (!("XMLHttpRequest" in window)) {
    return;
  }
  const originalXhrProto = XMLHttpRequest.prototype;
  // 重写XMLHttpRequest 原型上的open方法
  replaceAop(originalXhrProto, "open", (originalOpen: Function) => {
    return function(this:any, ...args: (string|unknown)[]) {
      const that = this
      // 获取请求的信息
      that._xhr = {
        method: typeof args[0] === "string" ? args[0].toUpperCase() : args[0],
        url: args[1],
        startTime: new Date().getTime()
      };
      // 执行原始的open方法
      originalOpen.apply(that, args);
    };
  });
  // 重写XMLHttpRequest 原型上的send方法
  replaceAop(originalXhrProto, "send", (originalSend: Function) => {
    return function(this:any, ...args: (string|unknown)[]) {
      const that = this
      // 当请求结束时触发，无论请求成功还是失败都会触发
      that.addEventListener("loadend", () => {
        const { responseType, response, status } = that;
        const endTime = new Date().getTime();
        that._xhr.reqData = args[0];
        that._xhr.status = status;
        if (["", "json", "text"].indexOf(responseType) !== -1) {
          that._xhr.responseText =
            typeof response === "object" ? JSON.stringify(response) : response;
        }
        // 获取接口的请求时长
        that._xhr.elapsedTime = endTime - that._xhr.startTime;
        // 上报xhr接口数据
        HandleEvents.handleFetch(that._xhr)
      });
      // 执行原始的send方法
      originalSend.apply(that, args);
    };
  });
}