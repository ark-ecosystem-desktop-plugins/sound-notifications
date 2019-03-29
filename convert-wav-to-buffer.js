const fs = require('fs')
const path = require('path')
const glob = require('glob')
const load = require('audio-loader')

glob('src/**/*.wav', (err, files) => {
  if (err) {
    throw err
  }

  for (const file of files) {
    const filePath = path.join(__dirname, file)
    load(filePath).then(audioBuffer => {
      const channel = audioBuffer.getChannelData(0)
      const json = JSON.stringify(Array.from(channel))

      const dest = filePath.replace('.wav', '.json')
      fs.writeFile(dest, json, writeError => {
        if (writeError) throw writeError

        console.log(dest)
      })
    })
  }
})
