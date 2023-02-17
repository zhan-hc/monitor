/**
 * 
 * @param target 
 * @param eventName 
 * @param handler 
 * @param opitons 
 */
export function on (target: any, eventName: String, handler: Function, opitons: boolean | Object = false) {
  target.addEventListener(eventName, handler, opitons);
}

// 是否支持history
export function supportsHistory() {
  const hasHistoryApi = 'history' in window && !!window.history.pushState && !!window.history.replaceState;
  return hasHistoryApi;
}


/**
 * 重写指定的方法
 * @param { object } source 重写的对象
 * @param { string } name 重写的属性
 * @param { function } fn 拦截的函数
 */
export function replaceAop<T, K extends keyof T>(source:T, name: K, fn:Function){
  if (source === undefined) return;
  if (source) {
    var original = source[name];
    var wrapped = fn(original);
    if (typeof wrapped === "function") {
      source[name] = wrapped;
    }
  }
}

/**
 * 将地址字符串转换成对象，
 * 输入：'https://github.com/xy-sea/web-see?token=123&name=11'
 * 输出：{
 *  "host": "github.com",
 *  "path": "/xy-sea/web-see",
 *  "protocol": "https",
 *  "relative": "/xy-sea/web-see?token=123&name=11"
 * }
 */
export function parseUrlToObj(url:string) {
  if (!url) {
    return {};
  }
  const match = url.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
  if (!match) {
    return {};
  }
  const query = match[6] || '';
  const fragment = match[8] || '';
  return {
    host: match[4],
    path: match[5],
    protocol: match[2],
    relative: match[5] + query + fragment,
  };
}