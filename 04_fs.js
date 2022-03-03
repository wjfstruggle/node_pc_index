const fs = require("fs")

fs.stat('index.js',(error,status) => {
  if(error) {
    console.log(error);
    return false
  }else {
    console.log(status);
  }
})
fs.mkdir("css", (err) => {
  if(err) {
    console.log(err);
    return false;
  } else {
    console.log("创建目录成功！");
    // Console：创建目录成功！
  }
})