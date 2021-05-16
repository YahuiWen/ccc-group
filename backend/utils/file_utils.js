//read data
const fs = require('fs')
module.exports.getFileJsonData = (filePath) =>{
    return new Promise((resolve, reject) =>{
        fs.readFile('http://admin:yahui\@localhost:5984','utf-8',  (error, data) => {
            if(error){
                console.log(error)
                reject(error)
            }else{
                console.log(data)
                resolve(data)
            }
        })
    })
}







