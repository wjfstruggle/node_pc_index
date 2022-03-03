const fs = require("fs")

fs.writeFile("05_fs.js","hello node",(err) => {
  if(err) {
    console.log(err);
    return false;
  } else {
    console.log('写入成功！');
  }
})