export default class ClientSocketService {
  static instance = null
  static get Instance() {
    if (!this.instance) {
      this.instance = new ClientSocketService()
    }
    return this.instance
  }
  ws = null
  callBackMapping = {}
  connected = false
  sendCount = 0
  connectedCount = 0
  connect() {
    if (!window.WebSocket) {
      return console.log('web socket is not support')
    }
    // this.ws = new WebSocket('ws://172.26.131.13:8083')
    this.ws = new WebSocket('ws://localhost:8083')
    this.ws.onopen = () => {
      console.log('server successfully connect')
      this.connected = true
      this.connectedCount = 0
    }
    this.ws.onclose = () => {
      console.log('server not successfully connect')
      this.connected = false
      this.connectedCount++
      setTimeout(() => {
        this.connect()
      }, 500 * this.connectedCount)
    }
    // get data
    this.ws.onmessage = msg => {
      console.log('data from serve: ' + msg.data)
      const receivedData = JSON.parse(msg.data)
      console.log('type is that: ' + receivedData.socketType)
      const socketType = receivedData.socketType
      if (this.callBackMapping[socketType]) {
        const action = receivedData.action
        console.log('type is that: ' + action)
        if (action === 'getData') {
          // const realData = JSON.parse(receivedData.data)
          const realData = receivedData.return_value
          // console.log('realData'+realData.value.medical)
          var jsonData = {
            city: receivedData.return_value.key,
            medical: realData.value.medical,
            education: realData.value.education,
            environment: realData.value.environment,
            transport: realData.value.transport,
            entertainment: realData.value.entertainment
          }
          // this.callBackMapping[socketType].call(this, realData)
          console.log('jsonData'+JSON.stringify(jsonData))
          this.callBackMapping[socketType].call(this, JSON.stringify(jsonData))
        } else if (action === 'getSemData') {
          const realData = receivedData.return_value
          var semJsonData = {
            city: receivedData.return_value.key,
            medical_pos: realData.value.medical_pos,
            medical_neu: realData.value.medical_neu,
            medical_neg: realData.value.medical_neg,
            education_pos: realData.value.education_pos,
            education_neu: realData.value.education_neu,
            education_neg: realData.value.education_neg,
            entertainment_pos: realData.value.entertainment_pos,
            entertainment_neu: realData.value.entertainment_neu,
            entertainment_neg: realData.value.entertainment_neg,
            environment_pos: realData.value.environment_pos,
            environment_neu: realData.value.environment_neu,
            environment_neg: realData.value.environment_neg,
            transport_pos: realData.value.transport_pos,
            transport_neu: realData.value.transport_neu,
            transport_neg: realData.value.transport_neg,
          }
          console.log('jsonData'+JSON.stringify(semJsonData))
          this.callBackMapping[socketType].call(this, JSON.stringify(semJsonData))
        }
      else if (action === 'getAllData') {
          // const realData = JSON.parse(receivedData.data)
          const realData = receivedData.return_value
          // console.log('realData'+realData.value.medical)

          console.log('jsonData'+JSON.stringify(realData))
          this.callBackMapping[socketType].call(this, JSON.stringify(realData))
        }
        else if (action === 'getWordData') {
          const realData = receivedData.return_value
          // console.log('realData'+realData.value.medical)
          var wordJsonData1 = {
            city: receivedData.return_value.key,
            word: realData.value.words
          }
          var wordJsonData = wordJsonData1.word
          console.log(wordJsonData)
          console.log('jsonData'+JSON.stringify(wordJsonData))
          this.callBackMapping[socketType].call(this, JSON.stringify(wordJsonData))
        }
      else if (action === 'themeChange') {
          // eslint-disable-next-line no-unused-vars
          const realtheme = JSON.parse(receivedData.data)
        }
      }
    }
  }
  registerCallBack(socketType, callBack) {
    this.callBackMapping[socketType] = callBack
  }

  unregisterCallBack(socketType) {
    this.callBackMapping[socketType] = null
  }
  send(data) {
    if (this.connected) {
      this.sendCount = 0
      this.ws.send(JSON.stringify(data))
    } else {
      this.sendCount++
      setTimeout(() => {
        this.send(data)
      }, 500 * this.sendCount)
    }
  }
}
