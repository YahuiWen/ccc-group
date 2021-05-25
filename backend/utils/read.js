//read data
const fs = require('fs')
module.exports.getFileJsonData = (filePath) =>{
    return new Promise((resolve, reject) =>{
        fs.readFile(filePath,  (error, data) => {
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
