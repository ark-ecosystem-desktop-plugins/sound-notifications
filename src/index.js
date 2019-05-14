const audioContext = new AudioContext()

// Load audio buffer
const mediaFile = require('./assets/1-up.json')
const mediaBuffer = new Float32Array(Array.from(Object.values(mediaFile)))
const audioBuffer = audioContext.createBuffer(1, mediaBuffer.byteLength, 22050)
audioBuffer.getChannelData(0).set(mediaBuffer)

const play = () => {
  const audioSource = audioContext.createBufferSource()
  audioSource.buffer = audioBuffer
  audioSource.connect(audioContext.destination)
  audioSource.start()
}

const onNewTransactions = () => {
  walletApi.eventBus.onAny(eventName => {
    if (eventName.includes('transaction:new')) {
      play()
    }
  })
}

// Call this when starting the application
onNewTransactions()

module.exports = {
  getComponentPaths () {
    return {
      'sound-notifications': 'components/sound-notifications.js'
    }
  }
}
