//read data
const path = require('path')
const fileUtil = require('../utils/file_utils')
module.exports = async (ctx, next) =>{
    const url = ctx.request.url
    let filePath = url.replace('/api','')
    filePath = '../data' + filePath +'.json'
    filePath = path.join(__dirname, filePath)
    try{
        const ret = await fileUtil.getFileJsonData(filePath)
        ctx.response.body = ret
    }catch(error){
        const errorMessage = {
            message: 'file not exist',
            status: 404
        }
        ctx.response.body = JSON.stringify(errorMessage)
    }

    console.log(filePath)
    await next()
}