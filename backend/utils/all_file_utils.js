//read data
const fs = require('fs')
module.exports.getAllFileJsonData = (filePath) =>{
    const NodeCouchDb = require('node-couchdb');
    const couchExternal = new NodeCouchDb({
        host: '172.26.131.13',
        protocol: 'http',
        port: 5986,
        auth: {
            user: 'admin',
            pass: 'admin'
        }
    });
    return new Promise((resolve, reject) =>{
        const dbName = "analysis2";

        // const viewUrl = '_design/by_city_name/_view/city?key='+filePath;
        // console.log(viewUrl)
        const viewUrl = '_design/all_cities/_view/all';
        couchExternal.get(dbName, viewUrl).then(({data, headers, status}) => {
            // data is json response
            // headers is an object with all response headers
            // status is statusCode number
            const cities = data.rows
            // const o = cities.forEach(myFunction);
            var value = new Array()
            for(var key in cities){
                // var value = cities[key]
                value.push(cities[key])
            }
            // console.log(value)
            resolve(value)
            // console.log(data.rows)
        }, err => {
            // either request error occured
            // ...or err.code=EDOCMISSING if document is missing
            // ...or err.code=EUNKNOWN if statusCode is unexpected
            reject(err)
            console.log(err)
        });
    })
}
