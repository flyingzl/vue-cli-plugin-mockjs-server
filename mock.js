/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs')

const { walk } = require('./util')

const RE = /^\s*\/\*[*\s]+?([^\r\n]+)[\s\S]+?@url\s+([^\n]+)[\s\S]+?\*\//im

function parseAPIs (dir) {
    const routes = {} // routes list

    const files = walk(dir);

    (files || []).forEach(filepath => {
        const content = String(fs.readFileSync(filepath, 'utf8')).trim() || '{}'

        let url = filepath
        let describe = 'no description'

        const m = content.match(RE)

        if (m) {
            url = m[2].trim()
            describe = m[1].replace(/(^[\s*]+|[\s*]+$)/g, '')
        }

        if (url[0] !== '/') {
            // fix url path
            url = '/' + url
        }

        let pathname = url
        if (pathname.indexOf('?') > -1) {
            pathname = pathname.split('?')[0]
        }

        if (routes[pathname]) {
            console.warn('[Mock Warn]: [' + filepath + ': ' + pathname + '] already exists and has been covered with new data.')
        }

        routes[pathname] = {
            url: url,
            filepath: filepath,
            describe: describe
        }

        if (/\.json$/.test(filepath)) {
            routes[pathname].content = content
        }
    })

    return routes
}

module.exports = parseAPIs
