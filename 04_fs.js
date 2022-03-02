const fs = require("fs")

fs.stat('index.js',(error,status) => {
  if(error) {
    console.log(error);
    return false
  }else {
    console.log(status);
  }
})