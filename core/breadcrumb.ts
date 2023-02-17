import { reportData } from '../common/type'
export class Breadcrumb {
  maxBreadcrumbs = 20;
  stack:Array<reportData>  = [];
  constructor() {}
  push (data: reportData) {
    if (this.stack.length >= this.maxBreadcrumbs) {
      // 超出则删除第一条
      this.stack.shift();
    }
    this.stack.push(data);
    // 按照时间排序
    this.stack.sort((a, b) => a.time - b.time);
    // console.log(this.stack.map(item => `${item.status}：${item.data.desc}`), 'this.stack')
  }
}

const breadcrumb = new Breadcrumb();
export { breadcrumb };