const url = require("url")
const http = require("http")

http.createServer((req, res) => {
  /**
   * /?userName=wujf&userAge=23
    /favicon.ico
   */
  if(req.url !== "/favicon.ico") {
    let result = url.parse(req.url, true)
    console.log(result);

    res.writeHead(200,{
      "Content-Type": "text/html;charset=UTF-8"
    })
    console.log(url.parse("http://www.baidu.com?name=zhangsan&age=24"));
    res.write(`<h1>${result.query.userName}：${result.query.userAge}</h1>`)
    /**
     * Url {
        protocol: null,
        slashes: null,
        auth: null,
        host: null,
        port: null,
        hostname: null,
        hash: null,
        search: '?userName=wujf&userAge=23',
        query: [Object: null prototype] { userName: 'wujf', userAge: '23' },
        pathname: '/',
        path: '/?userName=wujf&userAge=23',
        href: '/?userName=wujf&userAge=23'
      }
     */
  }
  res.end();
}).listen(3000)