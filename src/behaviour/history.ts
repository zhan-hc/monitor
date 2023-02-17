// 
//   const { from, to } = data;
//   // 定义parsedFrom变量，值为relative
//   const { relative: parsedFrom } = parseUrlToObj(from);
//   const { relative: parsedTo } = parseUrlToObj(to);
//   breadcrumb.push({
//     type: EVENTTYPES.HISTORY,
//     category: breadcrumb.getCategory(EVENTTYPES.HISTORY),
//     data: {
//       from: parsedFrom ? parsedFrom : '/',
//       to: parsedTo ? parsedTo : '/',
//     },
//     time: getTimestamp(),
//     status: STATUS_CODE.OK,
//   });
// },