# Node - 从0基础到实战企业官网

Hello 小伙伴们，如果觉得本文还不错，记得点个赞或者给个 star，你们的赞和 star 是我编写更多更精彩文章的动力！[GitHub 地址](https://github.com/wjfstruggle/web_study_p)

### 本文重点内容

- Node 基础 - 通过对 Node 基础的了解学习，打下 Node 基础
- Node API - 开启服务提供 API 给前端调用
- Node 连接 MySQL - 通过 npm 安装 mysql，从而实现数据库的链接
- Node 实战 - 企业官网从 0 开始，打造能注册、登录以及留言的企业官网

## [三 基础](https://link.juejin.cn/?target=undefined)

> [返回目录](https://juejin.cn/post/6844903745755545614#catalog-chapter-three)

 **万丈高楼平地起，地基还得自己起。**

### [3.1 HTTP - 开始 Node 之旅](https://link.juejin.cn/?target=undefined)

 话不多说，先上代码：

> index.js

```js
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
```

 那么，上面代码，我们要怎么用呢？

 **首先**，将上面的代码复制粘贴到 `index.js` 中。
 **然后**，启动 VS Code 终端：`Ctrl + ~`。
 **接着**，输入 `node 01_http.js` 并回车。
 **最后**，打开 `localhost:3000`：



![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/58103e256f604810bbcaa27650e66901~tplv-k3u1fbpfcp-watermark.image?)



 OK，搞定完事，现在我们一一讲解上面代码：

1. **首先**，我们需要先开启HTTP 模式。我们都知道，像 PHP 这类老牌子的后端语言，需要 Apache 或者 Nginx 开启 HTTP 服务。然而我们的 Node 不需要：

```js
var http = require("http");
```

1. **然后**，开启 HTTP 服务，并设置开启的端口：

```js
/**
 * req 获取 url 信息 (request)
 * res 浏览器返回响应信息 (response)
 */
http.createServer(function (req, res) {
  // ... 步骤 3 代码
}).listen(3000); // 监听的端口
```

1. **接着**，我们设置 HTTP 头部，并往页面打印值，最后结束响应：

```js
// 设置 HTTP 头部，状态码是 200，文件类型是 html，字符集是 utf8
res.writeHead(200, {
  "Content-Type": "text/html;charset=UTF-8"
});

// 往页面打印值
res.write(`<h1> hello Node JS</h1>`)

// 结束响应 
res.end();
```

1. **最后**，我们往浏览器输入 `http://localhost:3000/`，将访问到我们开启的 Node 服务，从而往页面渲染页面。

 至此，小伙伴们是不是也开启了自己的 Node 之旅？

### [3.2 URL 模块](https://link.juejin.cn/?target=undefined)

 URL 模块是什么呢？
 我们在控制台（终端）开启 Node 模式，并打印出 `url` 来看一下：



![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/68a4d2fdc09c466c91c8b0cc97871f57~tplv-k3u1fbpfcp-watermark.image?)



 好家伙，它有 `Url`、`parse`、`resolve`、`resolveObject`、`format`、`URL`、`URLSearchParams`、`domainToASCII`、`domainToUnicode` 这么多模块。
 那么，这些模块都有什么用呢？

 话不多说，先上代码：

> url.js

```js
// 1. 引入 url 模块
var url = require("url");

// 2. 引入 http 模块
var http = require("http");

// 3. 用 http 模块创建服务
/**
 * req 获取 url 信息 (request)
 * res 浏览器返回响应信息 (response)
 */
http.createServer(function (req, res) {

  // 4. 获取服务器请求
  /**
   * 访问地址是：http://localhost:3000/?userName=wujf&userAge=23
   * 如果你执行 console.log(req.url)，它将执行两次，分别返回下面的信息：
   * /  ?userName=wujf&userAge=23
   * /  /favicon.ico
   * 这里为了防止重复执行，所以排除 req.url == /favicon.ico 的情况
   */
  if(req.url != "/favicon.ico") {
    
    // 5. 使用 url 的 parse 方法
    /**
     * parse 方法需要两个参数：
     * 第一个参数是地址
     * 第二个参数是 true 的话表示把 get 传值转换成对象
     */ 
    var result = url.parse(req.url, true);
    console.log(result);
    /**
     * Url {
     *   protocol: null,
     *   slashes: null,
     *   auth: null,
     *   host: null,
     *   port: null,
     *   hostname: null,
     *   hash: null,
     *   search: '?userName=wujf&userAge=23',
     *   query: { userName: 'wujf', userAge: '23' },
     *   pathname: '/',
     *   path: '/?userName=wujf&userAge=23',
     *   href: '/?userName=wujf&userAge=23' }
     */

    console.log(result.query.userName); // wujf

    console.log(result.query.userAge); // 23
  }

  // 设置 HTTP 头部，状态码是 200，文件类型是 html，字符集是 utf8
  res.writeHead(200, {
    "Content-Type": "text/html;charset=UTF-8"
  });

  // 往页面打印值
  res.write('<h1 style="text-align:center">Hello NodeJS</h1>');

  // 结束响应
  res.end();

}).listen(3000);
```

 在上面的代码中：

 **首先**，我们引入该章节的主角 `url` 模块：

```js
// 1. 引入 url 模块
var url = require("url");
```

 **然后**，我们引入 `http` 模块：

```js
// 2. 引入 http 模块
var http = require("http");
```

 **接着**，我们创建 `http` 模块，因为 `url` 的监听，需要 `http` 模块的开启：

```js
// 3. 用 http 模块创建服务
/**
 * req 获取 url 信息 (request)
 * res 浏览器返回响应信息 (response)
 */
http.createServer(function (req, res) {
  // ... 第 4 步、第 5 步代码

  // 设置 HTTP 头部，状态码是 200，文件类型是 html，字符集是 utf8
  res.writeHead(200, {
    "Content-Type": "text/html;charset=UTF-8"
  });

  // 往页面打印值
  res.write('<h1 style="text-align:center">Hello NodeJS</h1>');

  // 结束响应
  res.end();
}).listen(3000);
```

 **最后**，我们访问我们给出的地址：`http://localhost:3000/?userName=wujf&userAge=23`，并通过它查看 `url` 的 `parse` 模块怎么用，输出啥：

```js
// 4. 获取服务器请求
/**
  * 访问地址是：http://localhost:3000/?userName=wujf&userAge=23
  * 如果你执行 console.log(req.url)，它将执行两次，分别返回下面的信息：
  * /  ?userName=wujf&userAge=23
  * /  /favicon.ico
  * 这里为了防止重复执行，所以排除 req.url == /favicon.ico 的情况
  */
if(req.url != "/favicon.ico") {
  
  // 5. 使用 url 的 parse 方法
  /**
    * parse 方法需要两个参数：
    * 第一个参数是地址
    * 第二个参数是 true 的话表示把 get 传值转换成对象
    */ 
  var result = url.parse(req.url, true);
  console.log(result);
  /**
    * Url {
    *   protocol: null,
    *   slashes: null,
    *   auth: null,
    *   host: null,
    *   port: null,
    *   hostname: null,
    *   hash: null,
    *   search: '?userName=wujf&userAge=23',
    *   query: { userName: 'wujf', userAge: '23' },
    *   pathname: '/',
    *   path: '/?userName=wujf&userAge=23',
    *   href: '/?userName=wujf&userAge=23' }
    */

  console.log(result.query.userName); // wujf

  console.log(result.query.userAge); // 23
}
```

 从中，我们可以看出，我们可以通过 `query`，获取到我们想要的路径字段。

 当然，上面只讲解了 `parse` 的用法，我们可以将上面代码中 `if` 语句里面的代码全部清空。然后，输入下面的内容，去学习 `url` 模块更多的内容：

1. url 模块所有内容：

```js
console.log(url);

/**
 * Console：
 { 
   Url: [Function: Url],
    parse: [Function: urlParse], // 获取地址信息
    resolve: [Function: urlResolve], // 追加或者替换地址
    resolveObject: [Function: urlResolveObject],
    format: [Function: urlFormat], // 逆向 parse，根据地址信息获取原 url 信息
    URL: [Function: URL],
    URLSearchParams: [Function: URLSearchParams],
    domainToASCII: [Function: domainToASCII],
    domainToUnicode: [Function: domainToUnicode] 
  }
 */
```

1. parse 如何使用

```js
console.log(url.parse("http://www.baidu.com"));
/**
 * Console：
  Url {
    protocol: 'http:',
    slashes: true,
    auth: null,
    host: 'www.baidu.com',
    port: null,
    hostname: 'www.baidu.com',
    hash: null,
    search: null,
    query: null,
    pathname: '/',
    path: '/',
    href: 'http://www.baidu.com/' 
  }
 */
```

1. parse 带参数：

```js
console.log(url.parse("http://www.baidu.com?name=zhangsan&age=24"));

/**
 * Console：
  Url {
      protocol: 'http:',
      slashes: true,
      auth: null,
      host: 'www.baidu.com',
      port: null,
      hostname: 'www.baidu.com',
      hash: null,
      search: '?name=zhangsan&age=24',
      query: 'name=zhangsan&age=24',
      pathname: '/',
      path: '/?name=zhangsan&age=24',
      href: 'http://www.baidu.com/?name=zhangsan&age=24'
  }
 */
```

1. `format` 的使用：

```js
console.log(url.format({
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'www.baidu.com',
  port: null,
  hostname: 'www.baidu.com',
  hash: null,
  search: '?name=zhangsan',
  query: 'name=zhangsan',
  pathname: '/new',
  path: '/new?name=zhangsan',
  href: 'http://www.baidu.com/new?name=zhangsan' 
}))

// Console：
// http://www.baidu.com/new?name=zhangsan
```

1. `resolve` 的使用：

```js
console.log(url.resolve("http://www.baidu.com/wujf", "zhngsan"));

// Console：
// http://www.baidu.com/wujf
```

 当然，`url` 这里我们只讲解了个入门，更多的还请看官网 API：[url | Node.js v10.14.1 文档](https://link.juejin.cn/?target=http%3A%2F%2Fnodejs.cn%2Fapi%2Furl.html%23url_class_url)

### [3.3 CommonJS](https://link.juejin.cn/?target=undefined)

> [返回目录](https://juejin.cn/post/6844903745755545614#catalog-chapter-three-three)

- 什么是 CommonJS？

 CommonJS 就是为 JS 的表现来制定规范，因为 JS 没有模块系统、标准库较少、缺乏包管理工具，所以 CommonJS 应运而生，它希望 JS 可以在任何地方运行，而不只是在浏览器中，从而达到 Java、C#、PHP 这些后端语言具备开发大型应用的能力。

- CommonJS 的应用？

1. 服务器端 JavaScript 应用程序。（Node.js）
2. 命令行工具
3. 桌面图形界面应用程序。

- CommonJS 与 Node.js 的关系？

 `CommonJS `就是模块化的标准，`Node.js `就是 `CommonJS`（模块化）的实现。

- Node.js 中的模块化？

1. 在 `Node `中，模块分为两类：一是 `Node` 提供的模块，称为核心模块；二是用户编写的模块，成为文件模块。核心模块在 Node 源代码的编译过程中，编译进了二进制执行文件，所以它的加载速度是最快的，例如：`HTTP `模块、`URL` 模块、`FS `模块；文件模块是在运行时动态加载的，需要完整的路劲分析、文件定位、编译执行过程等……所以它的速度相对核心模块来说会更慢一些。
2. 我们可以将公共的功能抽离出一个单独的 JS 文件存放，然后在需要的情况下，通过 `exports` 或者 `module.exports` 将模块导出，并通过 `require `引入这些模块。

 现在，我们通过三种使用方式，来讲解下 `Node` 中的模块化及 `exports/require` 的使用。

 我们先查看下目录：



![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/79f7e50ad94c4b71a652e3e9855d13bb~tplv-k3u1fbpfcp-watermark.image?)



 **方法一**：

 首先，我们新建 `03_CommonJS.js`、`03_tool-add.js`、`node_modules/03_tool-multiply.js`、`node_modules/wujf-module/tools.js` 这 4 个文件/文件夹。
 其中 `package.json` 我们暂且不理会，稍后会讲解它如何自动生成。

 在 `03_tool-add.js` 中：

> 03_tool-add.js

```js
// 1. 假设我们文件其中有个工具模块
var tools = {
  add: (...numbers) => {
    let sum = 0;
    for (let number in numbers) {
      sum += numbers[number];
    }
    return sum;
  }
}

/**
 * 2. 暴露模块
 * exports.str = str;
 * module.exports = str;
 * 区别：
 * module.exports 是真正的接口
 * exports 是一个辅助工具
 * 如果 module.exports 为空，那么所有的 exports 收集到的属性和方法，都赋值给了 module.exports
 * 如果 module.exports 具有任何属性和方法，则 exports 会被忽略
 */

// exports 使用方法
// var str = "wujf is very good!";
// exports.str = str; // { str: 'wujf is very good!' }

// module.exports 使用方法
module.exports = tools;
```

 那么，上面的代码有啥含义呢？
 第一步，我们定义了个工具库 `tools`。
 第二步，我们通过 `modules.exports` 将 `tools` 进行了导出。
 所以，我们在 `03_CommonJS.js` 可以通过 `require` 导入使用：

```js
var http = require("http");

var tools1 = require('./03_tool-add');

http.createServer(function (req, res) {

  res.writeHead(200, {
    "Content-Type": "text/html;charset=UTF-8"
  });

  res.write('<h1 style="text-align:center">Hello NodeJS</h1>');
  
  console.log(tools1.add(1, 2, 3));
  /**
   * Console：
   * 6
   * 6
   * 这里要记得 Node 运行过程中，它请求了两次，
   * http://localhost:3000/ 为一次，
   * http://localhost:3000/favicon.ico 为第二次
   */
  
  res.end();

}).listen(3000);
```

 这样，我们就完成了 `exports` 与 `require` 的初次使用。

 **方法二**：

 当我们模块文件过多的时候，应该需要有个存放这些模块的目录，Node 就很靠谱，它规范我们可以将这些文件都放在 `node_modules` 目录中（大家都放在这个目录上，就不会有其他乱七八糟的命名了）。

 所以，我们在 `node_modules` 中新建一个 `03_tool-multiply.js` 文件，其内容如下：

> 03_tool-multiply.js

```js
var tools = {
  multiply: (...numbers) => {
    let sum = numbers[0];
    for (let number in numbers) {
      sum = sum * numbers[number];
    }
    return sum;
  }
}

module.exports = tools;
```

 在引用方面，我们只需要通过：

```js
// 如果 Node 在当前目录没找到 tool.js 文件，则会去 node_modules 里面去查找
var tools2 = require('03_tool-multiply');

console.log(tools2.multiply(1, 2, 3, 4));
```

 这样，就可以成功导入 `03_tool-multiply.js` 文件了。

 **方法三**：

 如果全部单个文件丢在 `node_modules` 上，它会显得杂乱无章，所以我们应该定义个自己的模块：`wujf-module`，然后将我们的 `tools.js` 存放在该目录中：

> wujf-module/tools.js

```js
var tools = {
  add: (...numbers) => {
    let sum = 0;
    for (let number in numbers) {
      sum += numbers[number];
    }
    return sum;
  },
  multiply: (...numbers) => {
    let sum = numbers[0];
    for (let number in numbers) {
      sum = sum * numbers[number];
    }
    return sum;
  }
}

module.exports = tools;
```

 这样，我们就定义好了自己的工具库。
 但是，如果我们通过 `var tools3 = require('wujf-module');` 去导入，会发现它报 `error` 了，所以，我们应该在 `wujf-module` 目录下，通过下面命令行生成一个 `package.json`

> PS E:\MyWeb\node_modules\wujf-module> npm init --yes

 这样，在 `wujf-module` 中就有了 `package.json`。
 而我们在 `03_CommonJS.js` 就可以引用它了：

> 03_CommonJS.js

```js
var http = require("http");

var tools1 = require('./03_tool-add');

// 如果 Node 在当前目录没找到 tool.js 文件，则会去 node_modules 里面去查找
var tools2 = require('03_tool-multiply');

/**
 * 通过 package.json 来引用文件
 * 1. 通过在 wujf-module 中 npm init --yes 来生成 package.json 文件
 * 2. package.json 文件中告诉了程序入口文件为 ："main": "tools.js",
 * 3. Node 通过 require 查找 wujf-module，发现它有个 package.json
 * 4. Node 执行 tools.js 文件
 */
var tools3 = require('wujf-module');

http.createServer(function (req, res) {

  res.writeHead(200, {
    "Content-Type": "text/html;charset=UTF-8"
  });

  res.write('<h1 style="text-align:center">Hello NodeJS</h1>');
  
  console.log(tools1.add(1, 2, 3));
  console.log(tools2.multiply(1, 2, 3, 4));
  console.log(tools3.add(4, 5, 6));
  /**
   * Console：
   * 6
   * 24
   * 15
   * 6
   * 24
   * 15
   * 这里要记得 Node 运行过程中，它请求了两次，
   * http://localhost:3000/ 为一次，
   * http://localhost:3000/favicon.ico 为第二次
   */
  
  res.end();

}).listen(3000);
```

 到此，我们就通过三种方法，了解了各种 `exports` 和 `require` 的姿势以及 Node 模块化的概念啦~

 参考文献：

- [CommonJS 规范 | 博客园 - Little Bird](https://link.juejin.cn/?target=https%3A%2F%2Fwww.cnblogs.com%2Flittlebirdlbw%2Fp%2F5670633.html)
- [js模块化编程之彻底弄懂CommonJS和AMD/CMD！ | 博客园 - 方便以后复习](https://link.juejin.cn/?target=http%3A%2F%2Fwww.cnblogs.com%2Fchenguangliang%2Fp%2F5856701.html)
- [[js高手之路\] es6系列教程 - 不定参数与展开运算符(...) | 博客园 - ghostwu](https://link.juejin.cn/?target=https%3A%2F%2Fwww.cnblogs.com%2Fghostwu%2Fp%2F7298462.html)

### [3.4 包与 npm](https://link.juejin.cn/?target=undefined)

 `Node` 中除了它自己提供的核心模块之外，还可以自定义模块，以及使用 **第三方模块**。
 `Node` 中第三方模块由包组成，可以通过包来对一组具有相互依赖关系的模块进行统一管理。



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/12/23/167db4863f64fe3c~tplv-t2oaga2asx-watermark.awebp)



 那么，假如我们需要使用一些第三方模块，应该去哪找呢？

2. [npm 官网](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2F)。如果你已经知道包的名字或者包的作用。那么，直接在 npm 官网上搜索，想必会更快找到想要安装的包。

 那么，`npm` 是啥？
 `npm` 是世界上最大的开放源代码的生态系统。我们可以通过 `npm` 下载各种各样的包。
 在我们安装 `Node` 的时候，它默认会顺带给你安装 npm。

- `npm -v`：查看 `npm` 版本。
- `npm list`：查看当前目录下都安装了哪些 npm 包。
- `npm info 模块`：查看该模块的版本及内容。
- `npm i 模块@版本号`：安装该模块的指定版本。

 在平时使用 npm 安装包的过程中，你可能需要知道一些 `npm `基本知识：

- `i`/`install`：安装。使用 `install` 或者它的简写 `i`，都表明你想要下载这个包。
- `uninstall`：卸载。如果你发现这个模块你已经不使用了，那么可以通过 `uninstall` 卸载它。
- `g`：全局安装。表明这个包将安装到你的计算机中，你可以在计算机任何一个位置使用它。
- `--save`/`-S`：通过该种方式安装的包的名称及版本号会出现在 `package.json` 中的 `dependencies` 中。`dependencies` 是需要发布在生成环境的。例如：`ElementUI` 是部署后还需要的，所以通过 `-S` 形式来安装。
- `--save-dev`/`-D`：通过该种方式安装的包的名称及版本号会出现在 `package.json` 中的 `devDependencies` 中。`devDependencies` 只在开发环境使用。例如：`gulp` 只是用来压缩代码、打包的工具，程序运行时并不需要，所以通过 `-D` 形式来安装。

 例子：

- `cnpm i webpack-cli -D`
- `npm install element-ui -S`

 那么，这么多的 npm 包，我们通过什么管理呢？
 答案是 `package.json`。
 如果我们需要创建 `package.json`，那么我们只需要在指定的包管理目录（例如 `node_modules`）中通过以下命名进行生成：

- `npm init`：按步骤创建 `package.json`。
- `npm init --yes`：快速创建 `package.json`

 当然，因为国内网络环境的原因，有些时候通过 npm 下载包，可能会很慢或者直接卡断，这时候就要安装淘宝的 npm 镜像：cnpm

- `npm install -g cnpm --registry=https://registry.npm.taobao.org`

### [3.5 fs 文件管理](https://link.juejin.cn/?target=undefined)

 本章节我们讲解下 fs 文件管理：

> 如需快速找到下面某个内容，请使用 `Ctrl + F`

1. `fs.stat` 检测是文件还是目录
2. `fs.mkdir` 创建目录
3. `fs.writeFile` 创建写入文件
4. `fs.appendFile` 追加文件
5. `fs.readFile` 读取文件
6. `fs.readdir` 读取目录
7. `fs.rename` 重命名
8. `fs.rmdir` 删除目录
9. `fs.unlink` 删除文件



 **首先**，我们通过 `fs.stat` 检查一个读取的是文件还是目录：

> 04_fs.js

```js
//  1. fs.stat
let fs = require('fs');
fs.stat('index.js', (error, stats) => {
  if(error) {
    console.log(error);
    return false;
  } else {
    console.log(stats);
    /**
     * Console：
     * Stats {
     *  dev: 235673175,
      mode: 33206,
      nlink: 1,
      uid: 0,
      gid: 0,
      rdev: 0,
      blksize: 4096,
      ino: 844424930648477,
      size: 556,
      blocks: 1,
      atimeMs: 1646231326184.0894,
      mtimeMs: 1646229000163.8994,
      ctimeMs: 1646229000163.8994,
      birthtimeMs: 1646229000163.8994,
      atime: 2022-03-02T14:28:46.184Z,
      mtime: 2022-03-02T13:50:00.164Z,
      ctime: 2022-03-02T13:50:00.164Z,
      birthtime: 2022-03-02T13:50:00.164Z }
     */

    console.log(`文件：${stats.isFile()}`); 
    // Console：文件：true
    
    console.log(`目录：${stats.isDirectory()}`); 
    // Console：目录：false

    return false;
  }
})
```

 通过 `Console` 打印出来的信息，我们基础掌握了 `fs.stat` 的作用。

 **然后**，我们尝试通过 `fs.mkdir` 创建目录：

> 05_fs.js

```js
//  2. fs.mkdir
let fs = require('fs');

/**
 * 接收参数
 * path - 将创建的目录路径
 * mode - 目录权限（读写权限），默认 0777
 * callback - 回调，传递异常参数 err
 */
fs.mkdir('css', (err) => {
  if(err) {
    console.log(err);
    return false;
  } else {
    console.log("创建目录成功！");
    // Console：创建目录成功！
  }
})
```

 通过 `node 05_fs.js`，我们发现目录中多了一个 `css` 文件夹。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8273e846619c4cf29d3bbcfa5f97ba97~tplv-k3u1fbpfcp-watermark.image?)

 **那么**，有创建就有删除，创建的目录如何删除呢？这里讲解下 `fs.rmdir`：

> 05_fs.js

```js
//  8. fs.rmdir
let fs = require('fs');

/**
 * 接收参数
 * path - 将创建的目录路径
 * mode - 目录权限（读写权限），默认 0777
 * callback - 回调，传递异常参数 err
 */
fs.rmdir('css', (err) => {
  if(err) {
    console.log(err);
    return false;
  } else {
    console.log("删除目录成功！");
    // Console：删除目录成功！
  }
})
```

 通过 `node 05_fs.js`，我们发现目录中的 `css` 文件夹被删除了。

 **接着**，我们通过 `fs.writeFile` 来创建写入文件：

> 05_fs.js

```js
//  3. fs.writeFile
let fs = require('fs');

/**
 * filename (String) 文件名称
 * data (String | Buffer) 将要写入的内容，可以是字符串或者 buffer 数据。
 * · encoding (String) 可选。默认 'utf-8'，当 data 是 buffer 时，该值应该为 ignored。
 * · mode (Number) 文件读写权限，默认 438。
 * · flag (String) 默认值 'w'。
 * callback { Function } 回调，传递一个异常参数 err。
 */
fs.writeFile('index.js', 'Hello wujf', (err) => {
  if(err) {
    console.log(err);
    return false;
  } else {
    console.log('写入成功！');
  }
})
```

 值得注意的是，这样的写入，是清空原文件中的所有数据，然后添加 `Hello wujf` 这句话。即：存在即覆盖，不存在即创建。

 有创建就有删除，感兴趣的可以使用 `fs.unlink` 进行文件的删除，再次不做过多讲解。

 **既然**，上面的是覆盖文件，那么有没有追加文件呢？有的，使用 `fs.appendFile` 吧：

> 05_fs.js

```js
//  4. fs.appendFile
let fs = require('fs');

fs.appendFile('index.js', '这段文本是要追加的内容', (err) => {
  if(err) {
    console.log(err);
    return false;
  } else {
    console.log("追加成功");
  }
})
```

 这样，我们就成功往里面追加了一段话，从而使 `index.js` 变成了：

> index.js

```js
Hello wujf这段文本是要追加的内容
```

 **在上面**，我们已经做了：新增、修改、删除操作。那么小伙伴一定很熟悉下一步骤是做什么了：

- `fs.readFile` 读取文件
- `fs.readdir` 读取目录

> 05_fs.js

```js
let fs = require('fs');

// 5. fs.readFile
fs.readFile('index.js', (err, data) => {
  if(err) {
    console.log(err);
    return false;
  } else {
    console.log("读取文件成功！");
    console.log(data);
    // Console：
    // 读取文件成功！
    // <Buffer 48 65 6c 6c 6f 20 6a 73 6c 69 61 6e 67 e8 bf 99 e6 ae b5 e6 96 87 e6 9c ac e6 98 af e8 a6 81 e8 bf bd e5 8a a0 e7 9a 84 e5 86 85 e5 ae b9>
  }
})

// 6. fs.readdir 读取目录
fs.readdir('node_modules', (err, data) => {
  if(err) {
    console.log(err);
    return false;
  } else {
    console.log("读取目录成功！");
    console.log(data);
    // Console：
    // 读取目录成功！
    // [ '03_tool-multiply.js', 'wujf-module' ]
  }
})
```

 如上，我们成功做到了读取文件和读取目录。

 **最后**，我们再回顾一开始的目标：

\1. `fs.stat` 检测是文件还是目录
\2. `fs.mkdir` 创建目录
\3. `fs.writeFile` 创建写入文件
\4. `fs.appendFile` 追加文件
\5. `fs.readFile` 读取文件
\6. `fs.readdir` 读取目录
\7. `fs.rename` 重命名
\8. `fs.rmdir` 删除目录
\9. `fs.unlink` 删除文件

 很好，我们就剩下重命名了：

> 05_fs.js

```js
let fs = require('fs');

// 7. fs.rename 重命名
fs.rename('index.js', 'wujf.js', (err) => {
  if(err) {
    console.log(err);
    return false;
  } else {
    console.log("重命名成功！");
  }
})
```

 当然，如果 `fs.rename` 还有更劲爆的功能：剪切

> 05_fs.js

```js
let fs = require('fs');

// 7. fs.rename 重命名
fs.rename('wujf.js', 'node_modules/wujf.js', (err) => {
  if(err) {
    console.log(err);
    return false;
  } else {
    console.log("剪切成功！");
  }
})
```



### [3.6 fs 案例](https://link.juejin.cn/?target=undefined)

> [返回目录](https://juejin.cn/post/6844903745755545614#catalog-chapter-three-six)

 在上一章节中，我们了解了 `fs` 的文件管理。
 那么，在这里，我们尝试使用 `fs` 做点小事情：

> 06_fsDemo.js

```js
/**
 * 1. fs.stat 检测是文件还是目录
 * 2. fs.mkdir 创建目录
 * 3. fs.writeFile 创建写入文件
 * 4. fs.appendFile 追加文件
 * 5. fs.readFile 读取文件
 * 6. fs.readdir 读取目录
 * 7. fs.rename 重命名
 * 8. fs.rmdir 删除目录
 * 9. fs.unlink 删除文件
 */

// 1. 判断服务器上面有没有 upload 目录，没有就创建这个目录
// 2. 找出 html 目录下面的所有的目录，然后打印出来

let fs = require('fs');

// 图片上传
fs.stat('upload', (err, stats) => {
  // 判断有没有 upload 目录
  if(err) {
    // 如果没有
    fs.mkdir('upload', (error) => {
      if(error) {
        console.log(error);
        return false;
      } else {
        console.log("创建 upload 目录成功！");
      }
    })
  } else {
    // 如果有
    console.log(stats.isDirectory());
    console.log("有 upload 目录，你可以做更多操作！");
  }
})

// 读取目录全部文件
fs.readdir('node_modules', (err, files) => {
  if(err) {
    console.log(err);
    return false;
  } else {
    // 判断是目录还是文件夹
    console.log(files);

    let filesArr = [];

    (function getFile(i) {
      
      // 循环结束
      if(i == files.length) {
        // 打印出所有目录
        console.log("目录：");
        console.log(filesArr);
        return false;
      }

      // 判断目录是文件还是文件夹
      fs.stat('node_modules/' + files[i], (error, stats) => {

        if(stats.isDirectory()) {
          filesArr.push(files[i]);
        }

        // 递归调用
        getFile(i+1);
        
      })
    })(0)
  }
})
```

### [3.7 fs 流](https://link.juejin.cn/?target=undefined)

 话不多说，我们了解下 `fs` 流及其读取：

```js
// 新建 fs
const fs = require('fs');
// 流的方式读取文件
let fileReadStream = fs.createReadStream('index.js');
// 读取次数
let count = 0;
// 保存数据
let str = '';
// 开始读取
fileReadStream.on('data', (chunk) => {
  console.log(`${++count} 接收到：${chunk.length}`);
  // Console：1 接收到：30
  str += chunk;
})
// 读取完成
fileReadStream.on('end', () => {
  console.log("——结束——");
  console.log(count);
  console.log(str);

  // Console：——结束——
  // 1
  // console.log("Hello World！");
})
// 读取失败
fileReadStream.on('error', (error) => {
  console.log(error);
})
```

 在这里，我们通过 `fs` 模块的 `createReadStream` 创建了读取流，然后读取文件 `index.js`，从而最后在控制台输出了：

```js
1 接收到：259
——结束——
1
console.log("尽信书，不如无书；尽看代码，不如删掉这些文件。");
console.log("尽信书，不如无书；尽看代码，不如删掉这些文件。");
console.log("尽信书，不如无书；尽看代码，不如删掉这些文件。");
```

 其中 `console.log()` 那三行就是 `index.js` 的文本内容。

 然后，我们试下流的存入：

```js
let fs = require('fs');
let data = 'console.log("Hello World! 我要存入数据！")';

// 创建一个可以写入的流，写入到文件 index.js 中
let writeStream = fs.createWriteStream('index.js');
// 开始写入
writeStream.write(data, 'utf8');
// 写入完成
writeStream.end();
writeStream.on('finish', () => {
  console.log('写入完成！');
  // Console：写入完成
});
```

 我们打开 `index.js`，会发现里面的内容变成了 `console.log("Hello World! 我要存入数据！")`，依次，我们通过流的形式进行了读取和写入的操作。

### [3.8 创建 Web 服务器](https://link.juejin.cn/?target=undefined)

 在这里，我们利用 http 模块、url 模块、path 模块、fs 模块创建一个 Web 服务器。

 什么是 Web 服务器？
 Web 服务器一般指网站服务器，是指驻留于因特网上某种类型计算机的程序，可以像浏览器等 Web 客户端提供文档，也可以放置网站文件，让全世界浏览；可以放置数据文件，让全世界下载。目前最主流的三个 Web 服务器是 Apache、Nginx、IIS。

 下面，我们使用 Node 来创建一个 Web 服务：



![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fd75fb28ee67450985f88d7b499be1b7~tplv-k3u1fbpfcp-watermark.image?)



> WebService.js

```js
// 引入 http 模块
let http = require("http");

// 引入 fs 模块
let fs = require("fs");

http.createServer((req, res) => {
  // 获取响应路径
  let pathName = req.url;

  // 默认加载路径
  if (pathName == "/") {
    // 默认加载的首页
    pathName = "index.html";
  }

  // 过滤 /favicon.ico 的请求
  if (pathName != "/favicon.ico") {
    // 获取 WebService 下的 index.html
    fs.readFile("./WebService/" + pathName, (err, data) => {
      if (err) {
        
        // 如果不存在这个文件
        
        console.log("404 Not Found!");
        fs.readFile('./WebService/404.html', (errorNotFound, dataNotFound) => {
          if(errorNotFound) {
            console.log(errorNotFound);
          } else {
            res.writeHead(200, {
              "Content-Type": "text/html; charset='utf-8'"
            });
            // 读取写入文件
            res.write(dataNotFound);
            // 结束响应
            res.end();
          }
        })
        return;
      } else {

        // 返回这个文件
        
        // 设置请求头
        res.writeHead(200, {
          "Content-Type": "text/html; charset='utf-8'"
        });
        // 读取写入文件
        res.write(data);
        // 结束响应
        res.end();
      }
    });
  }
}).listen(8080);
```

 这样，我们在浏览器输入 `localhost:8080` 即可以看到：



![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f05be7ebcdf4d0eb7c3fb837dc77e32~tplv-k3u1fbpfcp-watermark.image?)



 好家伙，感情它就加载了整个 `index.html` 文件，连 CSS 这些没引入么？
 所以，下一步，我们要动态加载 `html`、`css` 以及 `js`：

> WebService.js

```js
// 引入 http 模块
let http = require("http");

// 引入 fs 模块
let fs = require("fs");

// 引入 url 模块
let url = require("url");

// 引入 path 模块
let path = require("path");

http.createServer((req, res) => {
  
  // 获取响应路径
  let pathName = url.parse(req.url).pathname;

  // 默认加载路径
  if (pathName == "/") {
    // 默认加载的首页
    pathName = "index.html";
  }

  // 获取文件的后缀名
  let extName = path.extname(pathName);

  // 过滤 /favicon.ico 的请求
  if (pathName != "/favicon.ico") {
    // 获取 WebService 下的 index.html
    fs.readFile("./WebService/" + pathName, (err, data) => {
      // 如果不存在这个文件
      if (err) {
        console.log("404 Not Found!");
        fs.readFile(
          "./WebService/404.html",
          (errorNotFound, dataNotFound) => {
            if (errorNotFound) {
              console.log(errorNotFound);
            } else {
              res.writeHead(200, {
                "Content-Type": "text/html; charset='utf-8'"
              });
              // 读取写入文件
              res.write(dataNotFound);
              // 结束响应
              res.end();
            }
          }
        );
        return;
      }
      // 返回这个文件
      else {
        // 获取文件类型
        let ext = getExt(extName);

        // 设置请求头
        res.writeHead(200, {
          "Content-Type": ext + "; charset='utf-8'"
        });
        // 读取写入文件
        res.write(data);
        // 结束响应
        res.end();
      }
    });
  }
}).listen(8080);

// 获取后缀名
getExt = (extName) => {
  switch(extName) {
    case '.html': return 'text/html';
    case '.css': return 'text/css';
    case '.js': return 'text/js';
    default: return 'text/html';
  }
}
```

 当然，在上面，我们仅仅模拟了 `html`、`css`、`js` 这三种文件类型而已，我们需要模拟更多的文件类型：

> [08_ext.json](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FLiangJunrong%2FNode%2Fblob%2Fmaster%2FNodeBase%2F08_ext.json)

```
 代码详情请点击上面的链接
```

 在上面的 `json` 文件中，我们定义了各种的文件类型，此刻文件目录如下所示：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5843690e895740d78210851e288702b3~tplv-k3u1fbpfcp-watermark.image?)



 这时候，我们需要修改下我们的 `js` 文件，让它适应多种请求响应了：

> WebService.js

```js
// 引入 http 模块
let http = require("http");

// 引入 fs 模块
let fs = require("fs");

// 引入 url 模块
let url = require("url");

// 引入 path 模块
let path = require("path");

http.createServer((req, res) => {
  
  // 获取响应路径
  let pathName = url.parse(req.url).pathname;

  // 默认加载路径
  if (pathName == "/") {
    // 默认加载的首页
    pathName = "index.html";
  }

  // 获取文件的后缀名
  let extName = path.extname(pathName);

  // 过滤 /favicon.ico 的请求
  if (pathName != "/favicon.ico") {
    // 获取 08_WebService 下的 index.html
    fs.readFile("./WebService/" + pathName, (err, data) => {
      // 如果不存在这个文件
      if (err) {
        console.log("404 Not Found!");
        fs.readFile(
          "./WebService/404.html",
          (errorNotFound, dataNotFound) => {
            if (errorNotFound) {
              console.log(errorNotFound);
            } else {
              res.writeHead(200, {
                "Content-Type": "text/html; charset='utf-8'"
              });
              // 读取写入文件
              res.write(dataNotFound);
              // 结束响应
              res.end();
            }
          }
        );
        return;
      }
      // 返回这个文件
      else {
        // 获取文件类型
        let ext = getExt(extName);
        console.log(ext);

        // 设置请求头
        res.writeHead(200, {
          "Content-Type": ext + "; charset='utf-8'"
        });
        // 读取写入文件
        res.write(data);
        // 结束响应
        res.end();
      }
    });
  }
}).listen(8080);

// 获取后缀名
getExt = (extName) => {
  // readFile 是异步操作，所以需要使用 readFileSync
  let data = fs.readFileSync('./08_ext.json');
  let ext = JSON.parse(data.toString());
  return ext[extName];
}
```

 如此，我们做了个简单的 Web 服务器。

### [3.9 非阻塞 I/O 事件驱动](https://link.juejin.cn/?target=undefined)

 Java、PHP 或者 .NET 等服务端语言，会为每一个客户端的连接创建一个新的线程。
 Node 不会为每一个客户连接创建一个新的线程，而仅仅使用一个线程。
 当有用户连接了，就会触发一个内部事件，通过非租塞 I/O、事件驱动机制，让 Node 程序宏观上也是并行的。
 使用 Node，一个 8GB 内存的服务器，可以同时处理超过 4 万用户的连接。

 在这一章节中，主要解决：

1. Node 的非阻塞 I/O 是什么？
2. Node events 模块是什么？

 首先，在我们正常编程中，我们是希望程序能够一行一行按照我们的意愿编写的：

> 09_io.js

```js
console.log("1");

console.log("2");

console.log("3");

/**
 * Console：
 * 1
 * 2
 * 3
 */
```

 但是，事与愿违。
 我们有时候，会执行一些异步方法（函数）：

> 09_io.js

```js
const fs = require("fs")
console.log(1);

const readFile = () => {
  fs.readFile("08_ext.json",(err,data) => {
    console.log(2);
  })
}
readFile();
console.log(3);

/**
 * 1
 * 3
 * 2
 *  */ 
```

 在上面代码中，由于 `fs.readFile` 是 Node 的异步函数。所以，程序先执行了 1 和 3，最后才执行 `fs.readFile` 的 2 部分。

> 在这里，可以看出 Node 不会因为一段代码的逻辑错误，从而导致其他代码无法运行。

 这样子，就导致了一个问题：步骤 3 可能拿不到步骤 2 的执行结果了！这就是 Node 的非租塞性 I/O 驱动。
 那么，我们有没有办法解决这个问题呢？
 有的！

1. 通过回调函数
2. 通过 Node 的 `events` 模块

 首先，我们通过回调函数来解决这个异步问题：

> 09_io.js

```js
let fs = require("fs");

getExt = (callback) => {
  fs.readFile('08_ext.json', (err, data) => {
    callback(data);
  })  
}

getExt( (result) => {
  console.log(result.toString());
})
```

 通过回调，我们可以将 `getExt` 的数据提取出来。

 然后，我们通过 Node 的 `events` 模块来解决这个异步问题：

```js
// 引入 fs 模块
let fs = require("fs");

/**
 * Node 事件循环：
 * 1. Node 是单进程单线程应用程序，但是通过事件和回调支持并发，所以性能非常高。
 * 2. Node 的每一个 API 都是异步的，并作为一个独立线程运行，使用异步函数调用，并处理并发。
 * 3. Node 有多个内置的事件，我们可以通过引入 events 模块，并通过实例化 EventEmitter 类来绑定和监听事件。
 */

// 引入 events 模块
let events = require("events");
// 实例化事件对象
let EventEmitter = new events.EventEmitter();

getExt = () => {
  fs.readFile('08_ext.json', (err, data) => {
    // 将 data 广播出去
    EventEmitter.emit('data', data.toString());
  })  
};

getExt();

// 监听 data
EventEmitter.on('data', (ext) => {
  console.log(ext);
});
```

 在这里，`EventEmitter.on` 通过监听 `data` 的形式，获取了 `getExt` 内部的执行结果。
 如此，我们就了解了 Node 的 I/O 事件及 `events` 模块

### [3.10 get 与 post](https://link.juejin.cn/?target=undefined)



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/12/23/167db4adefcf3363~tplv-t2oaga2asx-watermark.awebp)



 话不多说，先上代码：

> get.js

```js
// 加载 http 模块
var http = require('http');

// 虚拟 SQL 读取出来的数据
var items = [];

// 创建 http 服务
http.createServer(function (req, res) {
  
  // 设置跨域的域名，* 代表允许任意域名跨域
  res.setHeader('Access-Control-Allow-Origin', '*');
  // 设置 header 类型
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  // 跨域允许的请求方式
  res.setHeader('Content-Type', 'application/json');

  // 判断请求
  switch (req.method) {
    
    // post 请求时，浏览器会先发一次 options 请求，如果请求通过，则继续发送正式的 post 请求
    case 'OPTIONS':
      res.statusCode = 200;
      res.end();
      break;
    
      // 如果是 get 请求，则直接返回 items 数组
    case 'GET':
      let data = JSON.stringify(items);
      res.write(data);
      res.end();
      break;
      
    // 如果是 post 请求
    case 'POST':
      let item = '';
      // 读取每次发送的数据
      req.on('data', function (chunk) {
        item += chunk;
      });
      // 数据发送完成
      req.on('end', function () {
        // 存入
        item = JSON.parse(item);
        items.push(item.item);
        // 将数据返回到客户端
        let data = JSON.stringify(items);
        res.write(data);
        res.end();
      });
      break;
  }
}).listen(3000)

console.log('http server is start...');
```

 **首先**，我们加载了 `http` 模块，并创建了服务。
 **然后**，我们设置了跨域的处理方式，允许进行跨域。
 **接着**，我们进行了请求的判断处理，由于只做简单演练，故只判断是 `get` 请求还是 `post` 请求。
 **最后**，我们将请求的结果返回给客户端。

 在上面，我们进行了后端 Node 的部署，那么前端页面要怎么做呢？

> get.html

```js
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
  <meta http-equiv="X-⌃-Compatible" content="ie=edge">
  <title>Node Web</title>

</head>

<body>

  <div id="app">
    <h1>Todo List</h1>
    <ul>
      <li v-for="(item, index) in items" :key="index">{{ item }}</li>
    </ul>
    <input type="text" v-model="item">
    <button @click="postApi">添加</button>
  </div>

  <!-- cdn 引用：Vue 和 Node -->
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  
  <script>
    new Vue({
      el: document.getElementById('app'),
      data: function () {
        return {
          items: [],
          item: '',
        }
      },
      created() {
        // 进入页面请求数据
        axios.get('http://localhost:3000/').then(res => {
          console.log("\n【API - get 数据】");
          console.log(res);
          this.items = res.data;
        }).catch(function (err) {
          console.log(err)
        })
      },
      methods: {
        // 点击按钮提交数据
        postApi() {
          axios.post('http://localhost:3000/', {
            item: this.item
          }).then(res => {
            console.log("\n【API - post 数据】")
            console.log(res);
            this.items = res.data;
          }).catch(function (err) {
            console.log(err)
          })
        }
      }
    })
  </script>
</body>

</html>
```

 我们通过 Vue 进行了布局，通过 Axios 进行了接口的请求。从而完成了对数据的操作。

### [3.11 Node 连接 MySQL](https://link.juejin.cn/?target=undefined)

> 关于 MySQL 的安装，可以查看 **wujf** 写的：[MySQL 安装及图形化工具](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FLiangJunrong%2Fdocument-library)

 **首先**，我们通过可视化工具进行表的设计：

| 名   | 类型    | 长度 | 键   |
| ---- | ------- | ---- | ---- |
| id   | int     | 11   | 主键 |
| name | varchar | 255  |      |
| age  | varchar | 255  |      |

 **然后**，我们进行表的填充：

| id   | name     | age  |
| ---- | -------- | ---- |
| 1    | jslliang | 23   |
| 2    | wujf   | 23   |

 **接着**，我们安装 Node 连接 MySQL 的包：

```
npm i mysql -D
```

 **再来**，我们编写 Node 的 `index.js`：

> index.js

```js
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'node'
});

connection.connect();

connection.query('SELECT * FROM user', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});

connection.end();
```

 **最后**，我们通过 `node index.js`，打开该服务：

```js
[ RowDataPacket { id: 1, name: 'wujf', age: '23' },
  RowDataPacket { id: 2, name: 'wujf', age: '23' } ]
```

 如此，我们便完成了 Node 连接 MySQL。

 ———————华丽分割线———————

 当然，增删改查是后端的基本操作，所以在这里，我们可以补全基本的增删改查功能。

 先看目录：



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/12/23/167db4b034ab5dc8~tplv-t2oaga2asx-watermark.awebp)



- **新增表字段**

> add.js

```js
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'node'
});

connection.connect();

let addSql = "INSERT INTO user(id,name,age) VALUES(0,?,?)";
let addSqlParams = ["wujf", "23"];

connection.query(addSql, addSqlParams, function (err, res) {
  if (err) {
    console.log("新增错误：");
    console.log(err);
    return;
  } else {
    console.log("新增成功：");
    console.log(res);
  }
});

connection.end();
```

 我们只需要直接 `node add.js`，就能往数据库中新增数据了。

- **删除表字段**

> delete.js

```js
// 连接 MySQL
var mysql = require('mysql');
// MySQL 的连接信息
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'node'
});

// 开始连接
connection.connect();

// 新增的 SQL 语句及新增的字段信息
var delSql = 'DELETE FROM user where id = 2';

// 连接 SQL 并实施语句
connection.query(delSql, function (err, res) {
  if (err) {
    console.log("删除错误：");
    console.log(err);
    return;
  } else {
    console.log("删除成功：");
    console.log(res);
  }
});

// 终止连接
connection.end();
```

- **修改表字段**

> update.js

```js
// 连接 MySQL
var mysql = require('mysql');
// MySQL 的连接信息
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'node'
});

// 开始连接
connection.connect();

// 新增的 SQL 语句及新增的字段信息
let updateSql = "UPDATE user SET name = ?,age = ? WHERE Id = ?";
let updateSqlParams = ["LiangJunrong", "23", 1];

// 连接 SQL 并实施语句
connection.query(updateSql, updateSqlParams, function (err, res) {
  if (err) {
    console.log("修改错误：");
    console.log(err);
    return;
  } else {
    console.log("修改成功：");
    console.log(res);
  }
});

// 终止连接
connection.end();
```

- **查询表字段**

> read.js

```js
// 连接 MySQL
var mysql = require('mysql');
// MySQL 的连接信息
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'node'
});

// 开始连接
connection.connect();

// 新增的 SQL 语句及新增的字段信息
let readSql = "SELECT * FROM user";

// 连接 SQL 并实施语句
connection.query(readSql, function (err, res) {
  if (err) throw err;
  console.log(res);
});

// 终止连接
connection.end();
```

 以上，我们打通了 Node 与 MySQL 的壁垒，实现了数据的增删改查。

## [四 Web 实战 —— 企业官网](https://link.juejin.cn/?target=undefined)

> [返回目录](https://juejin.cn/post/6844903745755545614#catalog-chapter-four)

 在进行代码实战的时候，我们很多时候会遇到一些小事儿，例如：logo 制作、ico 制作、icon 挑选等……

 下面这些都是 **wujf** 平时碰到的，小伙伴有需要的可以 mark 啦~

- [logo 制作](https://link.juejin.cn/?target=http%3A%2F%2Fwww.uugai.com%2Flogoa%2Fwenzi.php)
- [ico 制作](https://link.juejin.cn/?target=http%3A%2F%2Fwww.bitbug.net%2F)
- [icon 挑选](https://link.juejin.cn/?target=https%3A%2F%2Fwww.iconfont.cn%2Fhome%2Findex)

 另外，由于 HTML 与 CSS 没什么好讲的，所以本章节的前提静态页面 **wujf** 已经写好了，小伙伴们在学习前可以预先下载：

- [本文静态页面代码地址](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FLiangJunrong%2FNode%2Ftree%2FFrontEndCodeBase)

### [4.1 编程环境](https://link.juejin.cn/?target=undefined)

> [返回目录](https://juejin.cn/post/6844903745755545614#catalog-chapter-four-one)

 **首先**，我们查看下我们的前端基本代码：[地址](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FLiangJunrong%2FNode%2Ftree%2FFrontEndCodeBase)



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/12/23/167db4b22a71f82d~tplv-t2oaga2asx-watermark.awebp)



 如上，我们仅需要了解 FrontEndCode 目录以及 NodeWeb 目录即可，其他目录为上面章节练习参考。

 **然后**，我们进行后端功能分析：

1. 留言板。用户点击 **留言板** 的时候，需要先判断用户是否登录。如果用户尚未登录，则直接跳转到 **登录页**；如果用户登录了，则显示 **留言板页面**。

 在 **留言板页面** 中，存在两个接口：

- **获取留言内容**：调取 `getMessage` 接口，返回全部留言信息，由于预计信息不多，故这里不做分页功能，有需要的小伙伴在实现完这个功能后，可以进行分页接口的设计。
- **提交留言内容**：调取 `sendMessage` 接口，将用户名、用户 id、留言内容发送给后端。



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/12/23/167db4b629555859~tplv-t2oaga2asx-watermark.awebp)



1. 在 **登录页面** 中，存在一个接口：

- **登录**：调取 `login` 接口，提交用户填写的姓名和密码。



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/12/23/167db4eac593083f~tplv-t2oaga2asx-watermark.awebp)



1. 在 **注册页面** 中，存在一个接口：

- **注册**：调取 `register` 接口，提交用户填写的姓名和密码。



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/12/23/167db50d7d913be2~tplv-t2oaga2asx-watermark.awebp)



 由此，我们可以设计下前后端的接口结合：

> 接口文档

| 接口                        | 类型 | 参数                                                       | 返回信息                                                     |
| --------------------------- | ---- | ---------------------------------------------------------- | ------------------------------------------------------------ |
| `getMessage`：获取留言信息  | get  | 无参                                                       | n 条记录：id(用户 id)、user_name(用户名)、user_message(用户留言内容)、time(留言时间) |
| `sendMessage`：提交留言信息 | post | id(用户 id)、user_name(用户名)、user_message(用户留言内容) | status 状态                                                  |
| `login`：登录               | post | id(用户 id)、user_name(用户名)、user_password(用户密码)    | status 状态                                                  |
| `register`：注册            | post | id(用户 id)、user_name(用户名)、user_password(用户密码)    | status 状态                                                  |

 **最后**，我们进行 MySQL 数据库的表设计：

> user 表

| 名            | 类型     | 长度 | 键   |
| ------------- | -------- | ---- | ---- |
| id            | int      | 11   | 主键 |
| user_name     | varchar  | 255  |      |
| user_password | varchar  | 255  |      |
| time          | datetime |      |      |

> message 表

| 名           | 类型     | 长度 | 键   |
| ------------ | -------- | ---- | ---- |
| id           | int      | 11   | 主键 |
| user_message | varchar  | 255  |      |
| user_id      | varchar  | 255  | 外键 |
| user_name    | varchar  | 255  |      |
| time         | datetime |      |      |

### [4.2 后端接口](https://link.juejin.cn/?target=undefined)

> [返回目录](https://juejin.cn/post/6844903745755545614#catalog-chapter-four-two)

 在我们进行实操之前，先确认我们是否能写接口，所以我们可以新建一个 `test` 文件夹，里面放一个 `index.html` 以及一个 `index.js` 来测试一下。

```
- text
 - index.html
 - index.js
```

 **首先**，我们就 4.1 提到的接口，提前进行后端接口的设置：

> index.js

```js
// 连接 MySQL：先安装 npm i mysql -D
var mysql = require('mysql');
// MySQL 的连接信息
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'nodebase'
});
// 开始连接
connection.connect();

// 引入 http 模块：http 是提供 Web 服务的基础
const http = require("http");

// 引入 url 模块：url 是对用户提交的路径进行解析
const url = require("url");

// 引入 qs 模块：qs 是对路径进行 json 化或者将 json 转换为 string 路径
const qs = require("querystring");

// 用 http 模块创建服务
/**
 * req 获取 url 信息 (request)
 * res 浏览器返回响应信息 (response)
 */
http.createServer(function (req, res) {

  // 设置 cors 跨域
  res.setHeader("Access-Control-Allow-Origin", "*");
  // 设置 header 类型
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  // 跨域允许的请求方式
  res.setHeader('Content-Type', 'application/json');

  if (req.method == "POST") { // 接口 POST 形式

    console.log("\n【POST 形式】");

    // 获取前端发来的路由地址
    let pathName = req.url;

    console.log("\n接口为：" + pathName);

    // 接收发送过来的参数
    let tempResult = "";

    // 数据接入中
    req.addListener("data", function (chunk) {
      tempResult += chunk;
    });

    // 数据接收完成
    req.addListener("end", function () {

      var result = JSON.stringify(qs.parse(tempResult));
      console.log("\n参数为：");
      console.log(result);

      if (pathName == "/sendMessage") { // 提交留言信息

        console.log("\n【API - 提交留言信息】");

      } else if (pathName == "/login") { // 登录

        console.log("\n【API - 登录】");

      } else if (pathName == "/register") { // 注册

        console.log("\n【API - 注册】");

      }
      // 接口信息处理完毕
    })
    // 数据接收完毕

  } else if (req.method == "GET") { // 接口 GET 形式

    console.log("\n【GET 形式】");

    // 解析 url 接口
    let pathName = url.parse(req.url).pathname;

    console.log("\n接口为：" + pathName);

    if (pathName == "/getMessage") { // 获取留言信息

      console.log("\n【API - 获取留言信息】");

    } else if(pathName == "/") { // 首页
      res.writeHead(200, {
        "Content-Type": "text/html;charset=UTF-8"
      });

      res.write('<h1 style="text-align:center">wujf 前端有限公司服务已开启！</h1><h2 style="text-align:center">详情可见：<a href="https://github.com/LiangJunrong/document-library/blob/master/other-library/Node/NodeBase.md" target="_blank">Node 基础</a></h2>');

      res.end();
    }

  }

}).listen(8888); // 监听的端口

// 获取当前时间
function getNowFormatDate() {
  var date = new Date();
  var year = date.getFullYear(); // 年
  var month = date.getMonth() + 1; // 月
  var strDate = date.getDate(); // 日
  var hour = date.getHours(); // 时
  var minute = date.getMinutes(); // 分
  var second = date.getMinutes(); // 秒
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  // 返回 yyyy-mm-dd hh:mm:ss 形式
  var currentdate = year + "-" + month + "-" + strDate + " " + hour + ":" + minute + ":" + second;
  return currentdate;
}
```

 通过判断 `req.method` 属于 `GET` 还是 `POST` 形式，从而确定加载的接口：

- 在 `POST` 中，判断是属于 **提交留言信息**、**登录** 还是 **注册**；
- 在 `GET` 中，判断是不是 **获取留言信息**。

 **同时**，我们在其中定义了 MySQL 的连接以及一个 `getNowFormatDate` 用来获取当前时间，格式为：`2018-12-21 10:03:59`

 **然后**，我们通过一个前端页面来演示我们的接口是否能使用：

> index.html

```js
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>演示代码</title>
</head>

<body>
  <div>
    <label for="user">用户名</label><input type="text" id="user">
  </div>
  <div>
    <label for="password">密&nbsp;&nbsp;&nbsp;码</label><input type="password" id="password">
  </div>
  <div>
    <button id="register">注册</button>
  </div>

  <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.js"></script>
  <script>
    $(function () {
      // 测试 get 接口
      $.ajax({
        url: "http://localhost:8888/getMessage",
        type: "POST",
        data: {
          username: "wujf"
        },
        success: function (res) {
          console.log(res);
        },
        error: function (err) {
          console.log(err);
        }
      })

      $("#register").click(function () {
        // 测试 post 接口
        $.ajax({
          url: "http://localhost:8888/login",
          type: "POST",
          data: {
            username: $("#user").val(),
            password: $("#password").val()
          },
          success: function (res) {
            console.log(res);
          },
          error: function (err) {
            console.log(err);
          }
        })
      })
    });
  </script>
</body>

</html>
```

 **最后**，我们通过 `node index.js`，并打开 `index.html`，通过 `F12` 控制台查看我们的接口是否正常：



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/12/23/167db510727a4435~tplv-t2oaga2asx-watermark.awebp)



 可以看到我们的接口能正常调通，这样我们就可以连接数据库，进行这 4 个接口的设计了。

> 如果小伙伴们觉得每次更新 Node 代码后，又要重启一遍 `node index.js` 觉得麻烦，可以通过 `supervisor` 来监听 Node 代码的改动，`supervisor` 的安装使用：[supervisor](https://juejin.cn/post/6844903745755545614#chapter-five-one)

### [4.3 注册功能](https://link.juejin.cn/?target=undefined)

> [返回目录](https://juejin.cn/post/6844903745755545614#catalog-chapter-four-three)

 很好，我们回到仿企业网站的页面上，准备编写接口以及丰富 Node 的接口。

 **首先**，我们开启前端和 Node 服务：

1. 打开命令行/终端
2. 开启前端

- `cd FrontEndCode`
- `live-server`

> 安装 `live-server`：`npm i live-server -g`

1. 开启后端

- `cd NodeWeb`
- `supervisor index.js`

> 安装 `supervisor`：`npm i supervisor -g`

 **然后**，我们在注册页面通过点击事件来触发调接口：

> register.html

```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="keywords" content="前端,wujf,bootstrap,企业建站">
  <meta http-equiv="description" content="wujf 为你打造最好的企业服务">
  <link rel="shortcut icon" href="./images/favicon.ico" type="image/x-icon" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>注册-wujf 前端有限公司</title>
  <link rel="stylesheet" href="./css/index.css">
  <link rel="stylesheet" href="./css/bootstrap.min.css">
</head>

<body>
  <!-- 省略 body 中代码，有需要的请前往第四章开头下载查看全部代码 -->

  <script src="./js/jquery-3.3.1.min.js"></script>
  <script src="./js/bootstrap.min.js"></script>
  <script src="./js/islogin.js"></script>
  <script>
    $(function () {
      $("#register-submit").click(function () {

        let userName = $("#userName").val();
        let userPassword = $("#userPassword").val();

        if (!userName) {
          alert("请输入用户名");
          $("#userName").focus();
        } else if (!userPassword) {
          alert("请输入密码");
          $("#userPassword").focus();
        } else if (userName.length > 10) {
          alert("请输入少于 10 位的用户名");
          $("#userName").focus();
        } else if (userPassword.length > 20) {
          alert("请输入少于 20 位的密码");
          $("#userPassword").focus();
        } else {

          // 如果用户输入的没毛病，那就加载接口
          $.ajax({
            url: "http://localhost:8888/register",
            type: 'post',
            dataType: 'json',
            data: {
              username: userName,
              password: userPassword
            },
            success: function (res) {
              console.log(res);
              if (res.code == "0") {
                alert("注册成功，前往登录！");
                window.location.href = "./login.html";
              }
            },
            error: function (err) {
              console.log(err.responseText);
              if (err.responseText == "注册失败，姓名重复！") {
                alert("用户名已被注册！");
              } else if (err.responseText == "注册失败，名额已满！") {
                alert("注册失败，名额已满！");
              } else if (err.responseText == "注册失败，密码为空！") {
                alert("注册失败，密码为空！");
              } else if (err.responseText == "注册失败，姓名过长！") {
                alert("注册失败，姓名过长！");
              } else if (err.responseText == "注册失败，密码过长！") {
                alert("注册失败，密码过长！");
              } else {
                alert("未知错误！");
              }
            }
          })
        }

      })
    })
  </script>
</body>

</html>
```

 如此，我们在用户点击 **注册** 按钮的时候，进行接口的调用，发送数据到了后端，如果成功了，那就弹窗，并跳转到登录页；如果没成功，就弹窗提示。

 **接着**，我们编写 Node，前端调用接口后，Node 判断这两个参数是否为空，如果不为空，则将数据存储到数据库。

> index.js

```
// ... 其他代码省略，请自行前往章节 4.2 后端接口 获取其他代码

if (pathName == "/sendMessage") { // 提交留言信息

  console.log("\n【API - 提交留言信息】");

} else if (pathName == "/login") { // 登录

  console.log("\n【API - 登录】");

} else if (pathName == "/register") { // 注册

  console.log("\n【API - 注册】");

  result = JSON.parse(result);

  let username = result.username; // 用户名
  let password = result.password; // 密码
  let time = getNowFormatDate(); // 时间

  if (!username) { // 用户名为空
    res.end("注册失败，用户名为空。");
    return;
  } else if (!password) { // 密码为空
    res.end("注册失败，密码为空！");
    return;
  } else if(username.length > 10) { // 姓名过长
    res.end("注册失败，姓名过长！");
    return;
  } else if(password.length > 20) { // 密码过长
    res.end("注册失败，密码过长！");
    return;
  } else {
    
    // 查询 user 表
    // 使用 Promise 的原因是因为中间调用了两次数据库，而数据库查询是异步的，所以需要用 Promise。
    new Promise( (resolve, reject) => {

      // 新增的 SQL 语句及新增的字段信息
      let readSql = "SELECT * FROM user";
      
      // 连接 SQL 并实施语句
      connection.query(readSql, function (error1, response1) {
        
        if (error1) { // 如果 SQL 语句错误
          throw error1;
        } else {
          
          console.log("\nSQL 查询结果：");

          // 将结果先去掉 RowDataPacket，再转换为 json 对象
          let newRes = JSON.parse(JSON.stringify(response1));
          console.log(newRes);

          // 判断姓名重复与否
          let userNameRepeat = false;
          for(let item in newRes) {
            if(newRes[item].user_name == username) {
              userNameRepeat = true;
            }
          }

          // 如果姓名重复
          if(userNameRepeat) {
            res.end("注册失败，姓名重复！");
            return;
          } else if(newRes.length > 300) { // 如果注册名额已满
            res.end("注册失败，名额已满！");
            return;
          } else { // 可以注册
            resolve();
          }
          
        }
      });

    }).then( () => {
      
      console.log("\n第二步：");
      
      // 新增的 SQL 语句及新增的字段信息
      let addSql = "INSERT INTO user(user_name,user_password, time) VALUES(?,?,?)";
      let addSqlParams = [result.username, result.password, time];

      // 连接 SQL 并实施语句
      connection.query(addSql, addSqlParams, function (error2, response2) {
        if (error2) { // 如果 SQL 语句错误
          console.log("新增错误：");
          console.log(error2);
          return;
        } else {
          console.log("\nSQL 查询结果：");
          console.log(response2);

          console.log("\n注册成功！");

          // 返回数据
          res.write(JSON.stringify({
            code: "0",
            message: "注册成功！"
          }));

          // 结束响应
          res.end();
        }
      });

    })
    // Promise 结束
  }
  // 注册流程结束
}
```

 **最后**，我们在查看下该功能是否成功：



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/12/23/167db5157604487c~tplv-t2oaga2asx-watermark.awebp)



### [4.4 登录功能](https://link.juejin.cn/?target=undefined)

> [返回目录](https://juejin.cn/post/6844903745755545614#catalog-chapter-four-four)

 在上面，我们完成了注册功能，那么相对来说，登录功能就容易通了，因为查询部分我们已经试过了一次。

> login.html

```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="keywords" content="前端,wujf,bootstrap,企业建站">
  <meta http-equiv="description" content="wujf 为你打造最好的企业服务">
  <link rel="shortcut icon" href="./images/favicon.ico" type="image/x-icon" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>登录-wujf 前端有限公司</title>
  <link rel="stylesheet" href="./css/index.css">
  <link rel="stylesheet" href="./css/bootstrap.min.css">
</head>

<body>
  
  <!-- 代码省略，有需要的小伙伴请在第四章前言部分下载代码 -->

  <script src="./js/jquery-3.3.1.min.js"></script>
  <script src="./js/bootstrap.min.js"></script>
  <script src="./js/islogin.js"></script>
  <script>
    $(function () {
      $("#login-submit").click(function () {

        let userName = $("#userName").val(); // 用户名
        let userPassword = $("#userPassword").val(); // 密码

        if (!userName) {
          alert("请输入用户名");
          $("#userName").focus();
        } else if (!userPassword) {
          alert("请输入密码");
          $("#userPassword").focus();
        } else if (userName.length > 10) {
          alert("请输入少于 10 位的用户名");
          $("#userName").focus();
        } else if (userPassword.length > 20) {
          alert("请输入少于 20 位的密码");
          $("#userPassword").focus();
        } else {

          $.ajax({
            url: "http://localhost:8888/login",
            type: 'post',
            dataType: 'json',
            data: {
              username: userName,
              password: userPassword
            },
            success: function (res) {
              console.log(res);
              if (res.code == "0") {
                sessionStorage.setItem("id", res.data.id);
                sessionStorage.setItem("userName", res.data.userName);
                alert("登录成功！");
                window.location.href = "./messageBoard.html";
              } else if (res.code == "1") {
                alert("登录失败，密码错误！");
              }
            },
            error: function (err) {
              console.log(err.responseText);
              if (err.responseText == "不存在该用户！") {
                alert("不存在该用户！");
              } else if (err.responseText == "登录失败，用户名为空！") {
                alert("登录失败，用户名为空！");
              } else if (err.responseText == "登录失败，密码为空！") {
                alert("登录失败，密码为空！");
              } else if (err.responseText == "登录失败，姓名过长！") {
                alert("登录失败，姓名过长！");
              } else if (err.responseText == "登录失败，密码过长！") {
                alert("登录失败，密码过长！");
              } else {
                alert("未知错误！");
              }
            }
          })

        }

      })
    })
  </script>
</body>

</html>
```

 编写完前端的代码后，我们进行 Node 代码的编辑：

> index.js

```
// ... 其他代码省略，请自行前往章节 4.2 后端接口 获取其他代码

if (pathName == "/sendMessage") { // 提交留言信息

  console.log("\n【API - 提交留言信息】");

} else if (pathName == "/login") { // 登录

  console.log("\n【API - 登录】");

  result = JSON.parse(result);

  let username = result.username; // 用户名
  let password = result.password; // 密码

  if (!username) { // 用户名为空
    res.end("登录失败，用户名为空！");
    return;
  } else if (!password) { // 密码为空
    res.end("登录失败，密码为空！");
    return;
  } else if(username.length > 10) {
    res.end("登录失败，姓名过长！");
    return;
  } else if(password.length > 20) {
    res.end("登录失败，密码过长！");
    return;
  } else { 
    
    // 新增的 SQL 语句及新增的字段信息
    let readSql = "SELECT * FROM user WHERE user_name  = '" + username + "'";

    // 连接 SQL 并实施语句
    connection.query(readSql, function (error1, response1) {
      if (error1) {
        throw error1;
      } else {
        if(response1 == undefined || response1.length == 0) { // 不存在用户
          res.end("\n不存在该用户！");
          return;
        } else { // 存在用户
          console.log("\n存在该用户！");

          let newRes = JSON.parse(JSON.stringify(response1));
          console.log(newRes);

          if(newRes[0].user_password == password) { // 密码正确
            // 返回数据
            res.write(JSON.stringify({
              code: "0",
              message: "登录成功！",
              data: {
                id: newRes[0].id,
                userName: newRes[0].user_name
              }
            }));

            res.end();
          } else { // 密码错误
            // 返回数据
            res.write(JSON.stringify({
              code: "1",
              message: "登录失败，密码错误！"
            }));

            res.end();
          }
          // 判断密码正确与否完毕
        }
        // 存在用户处理结束
      }
    });
  }
  // 登录步骤结束
} else if (pathName == "/register") { // 注册

  console.log("\n【API - 注册】");

}
```

 很好，前端和后端都编写完毕，是时候查验下功能是否实现了：



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/12/23/167db52440fdaf7f~tplv-t2oaga2asx-watermark.awebp)



### [4.5 留言功能](https://link.juejin.cn/?target=undefined)

> [返回目录](https://juejin.cn/post/6844903745755545614#catalog-chapter-four-five)

 现在，我们就剩下留言功能了，一鼓作气做好它吧！

> messageBoard.html

```
<!-- 留言板 -->
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="keywords" content="前端,wujf,bootstrap,企业建站">
  <meta http-equiv="description" content="wujf 为你打造最好的企业服务">
  <link rel="shortcut icon" href="./images/favicon.ico" type="image/x-icon" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>留言板-wujf 前端有限公司</title>
  <link rel="stylesheet" href="./css/index.css">
  <link rel="stylesheet" href="./css/bootstrap.min.css">
</head>

<body>
  
  <!-- 代码省略，基础代码请前往本章节前言下载 -->

  <script src="./js/jquery-3.3.1.min.js"></script>
  <script src="./js/bootstrap.min.js"></script>
  <script src="./js/islogin.js"></script>
  <script>
    $(function() {
      
      let userName = sessionStorage.getItem("userName");
      let userId = sessionStorage.getItem("id");
      
      // 查询留言板
      if(userName && userId) { // 如果有存储
        $.ajax({
          url: "http://localhost:8888/getMessage",
          type: 'get',
          dataType: 'json',
          success: function (res) {
            console.log(res);
            let li = ``;
            for(let item in res.data) {
              li = li + `
                <li>
                  <span class="text-warning font-bold">☆ </span>
                  <span class="user-message">${res.data[item].user_message}</span>
                  <span>—— </span>
                  <span class="user-name">${res.data[item].user_name} [${res.data[item].user_id}]</span>
                  <span class="message-time">${res.data[item].time}</span>
                </li>
              `;
            }
            $("#message-board-ul").append(li);
          },
          error: function (err) {
            console.log(err);
          }
        })
      } else { // 如果没有存储
        window.location.href = "../login.html";
      }

      // 提交留言
      $("#message-submit").click(function() {
        let messageText = $("#message").val()
        if(!messageText) {
          alert("留言内容不能为空");
        } else if(messageText.length > 140) {
          alert("留言长度不能超过 140 位！");
        } else {
          $.ajax({
            url: "http://localhost:8888/sendMessage",
            type: 'post',
            dataType: 'json',
            data: {
              userid: userId,
              username: userName,
              message: messageText
            },
            success: function (res) {
              console.log(res);
              if(res.code == "0") {
                alert("新增成功！");
                window.location.reload();
              }
            },
            error: function (err) {
              console.log(err);
              console.log(err.responseText);
              if (err.responseText == "登录失败，留言内容为空！") {
                alert("登录失败，留言内容为空！");
              } else if (err.responseText == "登录失败，字数超过限制！") {
                alert("登录失败，字数超过限制！");
              } else {
                alert("未知错误！");
              }
            }
          })
        }
      })

    })
  </script>
</body>

</html>
```

 接着编写下 Node 后端：

> index.js

```
// ... 其他代码省略，请自行前往章节 4.2 后端接口 获取其他代码

if (pathName == "/sendMessage") { // 提交留言信息

  console.log("\n【API - 提交留言信息】");

  result = JSON.parse(result);

  let id = result.userid; // id
  let userName = result.username; // 用户名
  let messageText = result.message; // 留言内容
  let time = getNowFormatDate(); // 时间

  if(!messageText) {
    res.end("登录失败，留言内容为空！");
    return;
  } else if(messageText.length > 140) {
    res.end("登录失败，字数超过限制！");
    return;
  } else {
    
    // 新增的 SQL 语句及新增的字段信息
    let addSql = "INSERT INTO message(user_message, user_id, user_name, time) VALUES(?, ?, ?, ?)";
    let addSqlParams = [messageText, id, userName, time];

    // 连接 SQL 并实施语句
    connection.query(addSql, addSqlParams, function (error1, response1) {
      if (error1) { // 如果 SQL 语句错误
        throw error1;
      } else {
        console.log("\n新增成功！");

        // 返回数据
        res.write(JSON.stringify({
          code: "0",
          message: "新增成功！"
        }));

        // 结束响应
        res.end();
      }
    })
  }

} else if (pathName == "/login") { // 登录

  console.log("\n【API - 登录】");

} else if (pathName == "/register") { // 注册

  console.log("\n【API - 注册】");

}



// ... 其他代码省略，请自行前往章节 4.2 后端接口 获取其他代码



if (pathName == "/getMessage") { // 获取留言信息

  console.log("\n【API - 获取留言信息】");

  // 解析 url 参数部分
  let params = url.parse(req.url, true).query;

  console.log("\n参数为：");
  console.log(params);

  // 新增的 SQL 语句及新增的字段信息
  let readSql = "SELECT * FROM message";

  // 连接 SQL 并实施语句
  connection.query(readSql, function (error1, response1) {
    if (error1) {
      throw error1; 
    } else {
      
      let newRes = JSON.parse(JSON.stringify(response1));
      console.log(newRes);

      // 返回数据
      res.write(JSON.stringify({
        code: "1",
        message: "查询成功！",
        data: newRes
      }));

      // 结束响应
      res.end();
    }
  });
  // 查询完毕
} else if(pathName == "/") { // 首页
  res.writeHead(200, {
    "Content-Type": "text/html;charset=UTF-8"
  });

  res.write('<h1 style="text-align:center">wujf 前端有限公司服务已开启！</h1><h2 style="text-align:center">详情可见：<a href="https://github.com/LiangJunrong/document-library/blob/master/other-library/Node/NodeBase.md" target="_blank">Node 基础</a></h2>');

  res.end();
}
```

 敲完代码再看下功能是否实现：



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/12/23/167db5280acce0c8~tplv-t2oaga2asx-watermark.awebp)



 综上，我们完成了所有的功能模块：注册、登录以及留言。

## [五 工具整合](https://link.juejin.cn/?target=undefined)

> [返回目录](https://juejin.cn/post/6844903745755545614#catalog-chapter-five)

 **工欲善其事，必先利其器。**
 掌控好了工具，可以方便你更快地进行开发。

### [5.1 supervisor - 监听 Node 改动](https://link.juejin.cn/?target=undefined)

> [返回目录](https://juejin.cn/post/6844903745755545614#catalog-chapter-five-one)

- [supervisor 官网](https://link.juejin.cn/?target=http%3A%2F%2Fwww.supervisord.org%2F)

 正如其官网所说，它是一个进行控制系统：

1. 安装插件：`npm i supervisor -g`
2. 运行文件：`supervisor app.js`
3. 查看运行：`localhost:3000`

 平时，我们 `node app.js` 后，当我们修改了 `app.js` 的内容，就需要关闭 node 命令行再执行 `node app.js`。
 而我们使用 `supervisor` 后，我们修改了 `app.js` 中的内容，只要点击保存，即可生效保存后的代码，实现实时监听 node 代码的变动。

 关于这个工具，网上更详细的攻略有：

- [详细版：用Supervisor守护你的Node.js进程 | 简书 - Mike的读书季](https://link.juejin.cn/?target=https%3A%2F%2Fwww.jianshu.com%2Fp%2F6d84e5efe99d)

### [5.2 PM2 - Node 进程管理](https://link.juejin.cn/?target=undefined)

> [返回目录](https://juejin.cn/post/6844903745755545614#catalog-chapter-five-two)

- [PM2 - npm](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fpm2)

 PM2 是 Node 进程管理工具，可以利用它来简化很多 Node 应用管理的繁琐任务，如性能监控、自动重启、负载均衡等，而且使用非常简单。

 下面就对 PM2 进行入门性的介绍，基本涵盖了 PM2 的常用的功能和配置：

1. 全局安装 PM2：`npm i pm2 -g`
2. 监听应用：`pm2 start index.js`
3. 查看所有进程：`pm2 list`
4. 查看某个进程：`pm2 describe App name/id`
5. 停止某个进程：`pm2 stop App name/id`。例如：

> 先通过 `pm2 list` 查看：

| App name | id   | status |
| -------- | ---- | ------ |
| index    | 0    | online |

 只需要执行 `pm2 stop index` 或者 `pm2 stop 0` 即可。

1. 停止所有进程：`pm2 stop all`
2. 重启某个进程：`pm2 restart App name/id`
3. 删除某个进程：`pm2 delete App name/id`

 如上，如果说我们的 `supervisor` 是监听单个进程的话，那么 `PM2` 就是监听多个进程。

 更多攻略：

- [PM2 官网](https://link.juejin.cn/?target=https%3A%2F%2Fpm2.io%2Fdoc%2Fen%2Fruntime%2Fquick-start%2F%3Futm_source%3Dpm2%26utm_medium%3Dwebsite%26utm_campaign%3Drebranding)
- [PM2 用法简介 | 简书 - LeavesLife](https://link.juejin.cn/?target=https%3A%2F%2Fwww.jianshu.com%2Fp%2Ff640450bd120)
- [PM2实用入门指南 | 博客园 - 程序猿小卡](https://link.juejin.cn/?target=http%3A%2F%2Fwww.cnblogs.com%2Fchyingp%2Fp%2Fpm2-documentation.html)

## [六 参考资料](https://link.juejin.cn/?target=undefined)

转载至 [jsliang node教程](https://juejin.cn/post/6844903745755545614)

