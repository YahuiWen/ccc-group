// create a web socket server, port number 9998
const path = require('path')
const fileUtils = require('../utils/file_utils')
const allFileUtils = require('../utils/all_file_utils')
const WebSocket = require('ws')
const wss = new WebSocket.Server({
    port: 9998
})
//start listening
module.exports.listen = () => {
    // listening the client event
    // client: client web socket
    wss.on('connection', client => {
        console.log('client on')
        // listening message
        // msg: data that client sent to serve
        client.on('message', async msg => {
            console.log('client data: '+msg)
            let messages = JSON.parse(msg)
            const action = messages.action
            const cityPath = messages.cityName
            if (action === 'getData'){
                // subject map line
                // let path_fixed = '../data/' + messages.chartName + '.json'
                // path_fixed = path.join(__dirname, path_fixed)
                const ret = await fileUtils.getFileJsonData(cityPath)
                // data: json file context
                // messages.data = ret
                messages.return_value = ret
                client.send(JSON.stringify(messages))
                // client.send(messages)
                console.log(messages)
            }else if (action === 'getAllData'){
                const ret = await allFileUtils.getAllFileJsonData()
                messages.return_value = ret
                client.send(JSON.stringify(messages))
                console.log(messages)
            }
            else{
                wss.clients.forEach(client => {
                    client.send(msg)
                })
            }
            //backend send data -> frontend
            // client.send(msg)
        })
    })

}
