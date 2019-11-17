const corsen = require('corsen')

function plugin (felid, options) {
  felid.options('*', (req, res) => {
    res.send()
  })
  felid.preRequest(corsen(options))
}

module.exports = plugin
