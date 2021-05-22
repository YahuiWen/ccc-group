const Koa = require('koa')
const app = new Koa()
// Middleware
//first layer
const  durMidd = require('./middleware/koa_response_duration')
app.use(durMidd)
//second layer
const  headerMidd = require('./middleware/koa_response_header')
app.use(headerMidd)
//third layer
const  dataMidd = require('./middleware/koa_response_data')
app.use(dataMidd)

app.listen(8888)

const webSocketService = require('./service/webSocketService')
webSocketService.listen()

// const URL = "http://127.0.0.1:5984"
// function createDB(dbName) {
//     var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//     var req = new XMLHttpRequest();
//     req.open("PUT", URL + "/" + dbName, true);
//     req.setRequestHeader("Content-type", "application/json");
//     req.send();
// }
//
// function updateDB(dbName, docName, data) {
//     var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//     var req = new XMLHttpRequest();
//     req.open("PUT", URL + '/' + dbName + '/' + docName, true);
//     req.setRequestHeader("Content-type", "application/json");
//     req.send(JSON.stringify(data));
// }
//
// createDB('baseball');
// updateDB('baseball', 'document', {"pitcher":"Nolan Ryan"});
// console.log("finsih")

// const axios = require('axios').default;
// axios.get("http://admin:yahui\\@localhost:5984/first").then(function (response) {
//     console.log(response);
// }).catch(function (error) {
//     console.log(1);
// });
// var nano = require('nano')('http://localhost:5984');
// nano.db.create('books');
// var books = nano.db.use('books');
//
// //Insert a book document in the books database
// books.insert({name: 'The Art of war'}, null, function(err, body) {
//     if (!err){
//         console.log(body);
//     }
// });
//
// //Get a list of all books
// books.list(function(err, body){
//     console.log(body.rows);
// })
// const NodeCouchDb = require('node-couchdb');

// node-couchdb instance with default options
// const couch = new NodeCouchDb();

// not admin party
// const couchAuth = new NodeCouchDb({
//     auth: {
//         // host: '172.26.131.13',
//         // port: 5984,
//         user: 'admin',
//         pass: 'yahui'
//     }
// });
// couchAuth.createDatabase('couchtest').then( err => {
//     // request error occured
// });
// couchAuth.listDatabases().then(dbs => dbs.map(
//     console.log(dbs)
// ), err => {
//     // request error occured
// });
// const dbName = "echarts";
// const viewUrl = '_design/by_city_name/_view/city?key="Melbourne"';
// const viewUrl = '_design/all_cities/_view/all';


// couchAuth.get(dbName, viewUrl).then(({data, headers, status}) => {
//     // data is json response
//     // headers is an object with all response headers
//     // status is statusCode number
//     const cities = data.rows
//     const o = cities.forEach(myFunction);
//     console.log("is"+o)
//     if(o !== undefined){
//         try{
//             // do parse
//             JSON.parse(o)
//             console.log(o)
//         }
//         catch(error){
//             console.error("Not a JSON response")
//         }
//     }
//
// }, err => {
//     // either request error occured
//     // ...or err.code=EDOCMISSING if document is missing
//     // ...or err.code=EUNKNOWN if statusCode is unexpected
//     console.log(err)
// });

// async function myFunction(item) {
//     'use strict';
//     // console.log(item.key, item.value.medical, item.value.education, item.value.environment,
//     //     item.value.transport,item.value.entertainment)
//     // const kk = {"city": item.key, "medical": item.value.medical,
//     //     "education":item.value.education, "environment":item.value.environment,
//     //     "transport":item.value.transport, "entertainment":item.value.entertainment}
//     // console.log(kk)
//     const jsonData = {
//         id: item.key,
//         city: item.value.city,
//         medical: item.value.medical,
//         education: item.value.education,
//         environment: item.value.environment,
//         transport: item.value.transport,
//         entertainment: item.value.entertainment
//     }
//     // const s = JSON.stringify(jsonData);
//     console.log(jsonData)
//     return jsonData
//     // return new Promise((resolve, reject) =>{
//     //     resolve(kk)
//     // })
// }
// function searchMelbourne(item) {
//     if (item.key = "Melbourne"){
//         console.log(item.value.medical)
//     }
// }
