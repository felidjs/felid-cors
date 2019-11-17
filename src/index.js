const corsen = require('../../corsen/src')

function plugin (felid, options) {
  felid.options('*', (req, res) => {
    res.send()
  })
  felid.preRequest(corsen(options))
}

module.exports = plugin
