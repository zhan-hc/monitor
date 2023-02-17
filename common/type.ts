import { EVENTTYPES, STATUS_CODE } from './constant'
export interface reportData {
  type: EVENTTYPES,
  data: any,
  time: number,
  status: STATUS_CODE
}
export interface clickData {
  dom: string
}
export interface historyData {
  from: string | undefined,
  to: string | undefined
}
export interface xhrData {
  method: string,
  url: string,
  startTime: number,
  reqData: any,
  status: number,
  responseText: string,
  elapsedTime: number
}