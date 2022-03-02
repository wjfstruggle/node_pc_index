// 1. 引入 http 模块
const http = require("http");

// 2. 用 http 模块创建服务
/**
 * req 获取 url 信息 (request)
 * res 浏览器返回响应信息 (response)
 */
http.createServer((req,res) => {
  // 设置 HTTP 头部，状态码是 200，文件类型是 html，字符集是 utf8
  res.writeHead(200,{
    "Content-Type": "text/html;charset=UTF-8"
  })
  // 往页面打印内容
  res.write(`<h1> hello Node JS</h1>`)
  // 结束响应
  res.end()
}).listen(3000) // 监听端口

console.log("服务器开始运行");