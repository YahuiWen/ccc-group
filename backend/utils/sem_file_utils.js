//read data
const fs = require('fs')
module.exports.getFileJsonData = (filePath) =>{
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

    // });
    return new Promise((resolve, reject) =>{
        const dbName = "analysis2";
        let viewUrl = ''
        if (filePath === 'Melbourne') {
            viewUrl = '_design/by_sem_analy/_view/sem?key="Melbourne"';
        }else if (filePath === 'Sydney') {
            viewUrl = '_design/by_sem_analy/_view/sem?key="Sydney"';
        }else if (filePath === 'Canberra') {
            viewUrl = '_design/by_sem_analy/_view/sem?key="Canberra"';
        }else if (filePath === 'Brisbane') {
            viewUrl = '_design/by_sem_analy/_view/sem?key="Brisbane"';
        }else if (filePath === 'Adelaide') {
            viewUrl = '_design/by_sem_analy/_view/sem?key="Adelaide"';
        }else if (filePath === 'Perth') {
            viewUrl = '_design/by_sem_analy/_view/sem?key="Perth"';
        }else if (filePath === 'Hobart') {
            viewUrl = '_design/by_sem_analy/_view/sem?key="Hobart"';
        }else if (filePath === 'Darwin') {
            viewUrl = '_design/by_sem_analy/_view/sem?key="Darwin"';
        }
        // const viewUrl = '_design/by_city_name/_view/city?key='+filePath;
        console.log(viewUrl)
        // const viewUrl = '_design/all_cities/_view/all';
        couchExternal.get(dbName, viewUrl).then(({data, headers, status}) => {
            console.log('fffffff')
            const cities = data.rows
            for(var key in cities){
                var value = cities[key]
            }
            resolve(value)
        }, err => {
            reject(err)
            console.log(err)
        });
    })
}

function myFunction(item) {
    'use strict';

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
