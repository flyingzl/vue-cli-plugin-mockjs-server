const express = require('express')
const watch = require('watch')
const { cleanCache } = require('./util')
const ROUTE_PATH = './routes.js'
let { mock } = require(ROUTE_PATH)


module.exports = (_, options) => {
    if (process.env.NODE_ENV !== 'development') return
    const { path, debug = true, port = 3000 } = options.pluginOptions.mockjs
    if (!path) {
        throw new Error('mock path should be configured!!')
    }

    watch.watchTree(path, () => {
        cleanCache(require.resolve(ROUTE_PATH))
        try {
            mock = require(ROUTE_PATH)
            console.info('Mock module update success.')
        } catch (error) {
            console.error('Mock module update failed, please restart the application. %s', error)
        }
    })
    const app = express()
    mock.debug = debug
    app.use('/', mock(path))
    const server = app.listen(port, () => {
        const host = server.address().address
        const port = server.address().port
        console.log('Mock server listening at http://%s:%s', host, port)
    })
    
}