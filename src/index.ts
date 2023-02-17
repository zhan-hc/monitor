/**
 * 这是一个测试Class,调用方法如下：
 * ```typescript
 * // We can initialize like this
 * const sdk = new frontendSdk();
 * ```
 */
// export class frontendSdk {
//   /**
//    * @description:        用以初始化
//    * @param {string} id   传参的ID
//    * @param {string} url  建立链接的ID
//    * @return {*}
//    */
//   constructor () {
//   }
//   initConfig(id: string, url: string) {}
// }
import { listeners } from './listeners'
import { HandleEvents } from './HandleEvents'
listeners.handleError()
listeners.handleUnhandledrejection()
listeners.handleClick()
listeners.handleHistory()
listeners.handleFetch()


const install = function (Vue:any, options = {}) {
  let handler = Vue.config.errorHandler;
  // vue项目在Vue.config.errorHandler中上报错误
  Vue.config.errorHandler = function (err: Error, vm: any, info: string) {
    HandleEvents.handleError(err);
    if (handler) handler.apply(null, [err, vm, info]);
  };
};
export default {
  install
}