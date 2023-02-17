export function getDomInfo (target:HTMLElement):string {
  const targetParent = target.parentElement as HTMLElement
  if (target.tagName.toLowerCase() === "body") {
    return '';
  }
  // 如果使用的uniapp里的image和text
  if (['uni-image', 'uni-text'].includes(targetParent.tagName.toLowerCase())) {
    target = targetParent
  }
  // 获取dom标签
  const tagName = target.tagName.toLowerCase();
  // 获取获取类名
  let classNames = target.classList.value;
  classNames = classNames !== "" ? ` class="${classNames}"` : "";
  // 获取id
  const id = target.id ? ` id="${target.id}"` : "";
  // 获取内容
  const innerText = target.innerText;
  // 获取包含id、class、innerTextde字符串的标签
  let dom = `<${tagName}${id}${classNames}>${innerText}</${tagName}>`;
  return dom
}