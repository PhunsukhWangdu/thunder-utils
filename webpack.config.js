module.exports = {
    entry:"./index.js",
    devtool: 'eval-source-map',
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
};