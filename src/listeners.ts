import { on, supportsHistory, replaceAop, parseUrlToObj } from './common'
import { breadcrumb } from '../core/breadcrumb'
import { EVENTTYPES } from '../common/constant'
import { xhrReplace } from './error/xhr'
import { getDomInfo } from './behaviour/click'
import { HandleEvents } from './HandleEvents';
let lastHref = document.location.href
const listeners = {
  handleError() {
    on(window, 'error', function (e:Event) {
      console.log("捕获到异常error", e);
      HandleEvents.handleError(e)
    })
  },
  handleUnhandledrejection() {
    on(window, 'unhandledrejection', function (e:Event) {
      console.log("捕获到异常unhandledrejection", e);
      e.preventDefault();
      HandleEvents.handleUnhandledrejection(e)
    })
  },
  handleClick () {
    on(document, 'click', function (e: Event) {
      const dom = getDomInfo(e.target as HTMLElement)
      HandleEvents.handleClick({dom})
    }, true)
  },
  handleHistory() {
    if (!supportsHistory()) return;
    window.onpopstate = function (...args) {
      const to = document.location.href
      const from = lastHref;
      lastHref = to;
      const {relative: fromVal} = parseUrlToObj(from)
      const {relative: toVal} = parseUrlToObj(to)
      HandleEvents.handleHistory({ from: fromVal, to:toVal })
    }
    function historyReplaceFn(originalHistoryFn: Function) {
      return function(this:any, ...args: (string|unknown)[]) {
        const that = this
        const url = args.length > 2 ? args[2] : undefined;
        if (url) {
          const from = lastHref;
          const to = String(url);
          lastHref = to;
          const {relative: fromVal} = parseUrlToObj(from)
          const {relative: toVal} = parseUrlToObj(to)
          HandleEvents.handleHistory({ from: fromVal, to:toVal })
        }
        return originalHistoryFn.apply(that, args);
      }
    }
    replaceAop(window.history, "pushState", historyReplaceFn);
    replaceAop(window.history, "replaceState", historyReplaceFn);
  },
  handleFetch() {
    xhrReplace()
  }
}

export { listeners }