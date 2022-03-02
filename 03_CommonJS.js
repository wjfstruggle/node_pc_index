const tools = require("./03_tool-add.js")
const multiply = require("03_tool-multiply")
const tools3 = require("wujf_modeules")
const http = require("http")

http.createServer((req ,res) => {
  res.writeHead(200, {
    "Content-type": "text/html"
  })
  let result = tools.add(1,2,3,4)
  let result2 = multiply.multiply(1,2,3,4)
  let result3 = tools3.multiply(1,2,3,4,5)
  res.write(`<h1>${result}  ${result2} ${result3}</h1>`)
  res.end();
}).listen(3000)