/**
 * Created by Raphson on 7/11/16.
 */
var webpack = require("webpack");
module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'js/main.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
        ,new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            output: {
                comments: false
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query:
                {
                    presets:['react', 'es2015']
                }
            }
        ]
    },
    devServer: {
        /*headers: {
            "Access-Control-Allow-Origin": "http://localhost:8080",
            "Access-Control-Allow-Credentials": "true"
        }*/
    }
}