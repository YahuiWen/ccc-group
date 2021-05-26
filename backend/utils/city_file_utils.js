//read data
const fs = require('fs')
module.exports.getFileJsonData = (filePath) =>{
    const NodeCouchDb = require('node-couchdb');
    // const couchAuth = new NodeCouchDb({
    //     auth: {
    //         // host: '172.26.131.13',
    //         // port: 5986,
    //         user: 'admin',
    //         pass: 'yahui'
    //     }
    // });
    const couchExternal = new NodeCouchDb({
        host: '172.26.131.13',
        protocol: 'http',
        port: 5986,
        auth: {
            user: 'admin',
            pass: 'admin'
        }
    });

    // const couchAuth = new NodeCouchDb({
    //     auth: {
    //         user: 'admin',
    //         pass: 'admin'
    //     }
    // });
    return new Promise((resolve, reject) =>{
        const dbName = "analysis2";
        let viewUrl = ''
        if (filePath === 'Melbourne') {
            viewUrl = '_design/by_city_name/_view/city?key="Melbourne"';
        }else if (filePath === 'Sydney') {
            viewUrl = '_design/by_city_name/_view/city?key="Sydney"';
        }else if (filePath === 'Canberra') {
            viewUrl = '_design/by_city_name/_view/city?key="Canberra"';
        }else if (filePath === 'Brisbane') {
            viewUrl = '_design/by_city_name/_view/city?key="Brisbane"';
        }else if (filePath === 'Adelaide') {
            viewUrl = '_design/by_city_name/_view/city?key="Adelaide"';
        }else if (filePath === 'Perth') {
            viewUrl = '_design/by_city_name/_view/city?key="Perth"';
        }else if (filePath === 'Hobart') {
            viewUrl = '_design/by_city_name/_view/city?key="Hobart"';
        }else if (filePath === 'Darwin') {
            viewUrl = '_design/by_city_name/_view/city?key="Darwin"';
        }
        // const viewUrl = '_design/by_city_name/_view/city?key='+filePath;
        console.log(viewUrl)
        // const viewUrl = '_design/all_cities/_view/all';
        couchExternal.get(dbName, viewUrl).then(({data, headers, status}) => {
            // data is json response
            // headers is an object with all response headers
            // status is statusCode number
            const cities = data.rows
            // const o = cities.forEach(myFunction);
            // var value = new Array()
            for(var key in cities){
                var value = cities[key]
                // value.push(cities[key])
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

function myFunction(item) {
    'use strict';
    // console.log(item.key, item.value.medical, item.value.education, item.value.environment,
    //     item.value.transport,item.value.entertainment)
    // const kk = {"city": item.key, "medical": item.value.medical,
    //     "education":item.value.education, "environment":item.value.environment,
    //     "transport":item.value.transport, "entertainment":item.value.entertainment}
    // console.log(kk)
    var jsonData = {
        city: item.key,
        medical: item.value.medical,
        education: item.value.education,
        environment: item.value.environment,
        transport: item.value.transport,
        entertainment: item.value.entertainment
    }
    // const s = JSON.stringify(jsonData);
    // console.log(jsonData)
    return jsonData
}





