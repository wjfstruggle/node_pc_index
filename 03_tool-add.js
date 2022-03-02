let tools = {
  add: (...number) => {
    let sum = 0;
    for (const key in number) {
      sum += number[key]
    }
    return sum;
  }
}
// 模块导出
module.exports = tools