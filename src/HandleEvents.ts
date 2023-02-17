import * as ErrorStackParser from 'error-stack-parser';
import { breadcrumb } from '../core/breadcrumb'
import { EVENTTYPES, STATUS_CODE } from '../common/constant'
import { clickData, historyData, xhrData } from '../common/type'
let lastHref = document.location.href
const HandleEvents = {
  handleError(e:any) {
    try {
      const target = e.target;
      if (!target || (e.target && !e.target.localName)) {
        let stackFrame = ErrorStackParser.parse(!target ? e : e.error)[0];
        let { fileName, columnNumber, lineNumber } = stackFrame;
        let errorData = {
          type: EVENTTYPES.ERROR,
          status: STATUS_CODE.ERROR,
          time: +new Date(),
          message: e.message,
          fileName,
          line: lineNumber,
          column: columnNumber,
        };
        breadcrumb.push(
          {
            type: EVENTTYPES.ERROR,
            time: +new Date(),
            data: errorData,
            status: STATUS_CODE.ERROR
          }
        )
        console.log(errorData, 'errorDataerrorData=========================')
      }
      console.log(e, 'handleError-------no if ')
    } catch (err) {
      console.log(err, 'handleError-------catch')
    }
  },
  handleUnhandledrejection(e:any) {
    // on(window, 'unhandledrejection', function (e:Event) {
    //   console.log("捕获到异常unhandledrejection", e);
    //   e.preventDefault();
    // })
  },
  handleClick({ dom }:clickData) {
    breadcrumb.push(
      {
        type: EVENTTYPES.CLICK,
        time: +new Date(),
        data: {
          dom,
          desc: `用户点击dom：${dom}`
        },
        status: STATUS_CODE.OK
      }
    )
  },
  handleHistory({ from, to }: historyData) {
    breadcrumb.push(
      {
        type: EVENTTYPES.HISTORY,
        time: +new Date(),
        data: {
          from,
          to,
          desc: `路由变化：${from}页面 切换到 ${to}页面`
        },
        status: STATUS_CODE.OK
      }
    )
  },
  handleFetch(data: xhrData) {
    breadcrumb.push({
      type: EVENTTYPES.XHR,
      time: +new Date(),
      data: {
        ...data,
        desc: `调用接口：${data.url}请求${data.status === 200 ? '成功' : '失败'}`
      },
      status: data.status === 200 ? STATUS_CODE.OK : STATUS_CODE.ERROR
    })
  }
}
export { HandleEvents };