var webpack = require('webpack');
var liveReloadPlugin = require('webpack-livereload-plugin');


module.exports = {
    plugins: [
        new LiveReloadPlugin({
            port: '35729',
            appendScriptTag: true
        })
    ]
};