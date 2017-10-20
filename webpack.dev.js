const Path = require('path'),
Webpack = require('webpack'),
CleanWebpackPlugin = require('clean-webpack-plugin'),
CopyWebpackPlugin = require('copy-webpack-plugin'),
HtmlWebpackPlugin = require('html-webpack-plugin'),
FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin'),
Notifier = require('node-notifier'),
Dashboard = require('webpack-dashboard'),
BUILD_PATH = 'build',
SRC = 'src',
packageJSON = require('./package.json');

const ASSET_PATH = process.env.ASSET_PATH || '/';
const vendors = ['moment'];

const config = {
entry: {
    index: Path.join(__dirname, SRC, 'entry/index.jsx'),
    vendor: vendors
},
output: {
    filename: '[name].js',
    path: Path.resolve(__dirname, BUILD_PATH),
    pathinfo: true,
    publicPath: ASSET_PATH
},
devtool: 'cheap-module-eval-source-map',
devServer: {
    compress: true,
    contentBase: Path.join(__dirname, BUILD_PATH),
    historyApiFallback: true,
    hot: true,
    overlay: true,
    port: 80,
    quiet: true,
    stats: { colors: true },
    watchOptions: {
        ignored: /node_modules/,
    },
    host: 'test.rettc.org',
    allowedHosts: [
        'rettc.org',
    ],
    proxy: [
        {
            context: ['/en'],
            changeOrigin: true,
            logLevel: 'info',
            // pathRewrite: { '^/': '/appSystem/' },
            // target:'http://101.132.139.82:8090',
            target:'http://222.28.49.253:80',
            // target: 'http://222.28.49.253:8443',
            // target: 'http://192.168.1.112:8080',
            // target: 'http://test.rettc.org:9092',
            // target: 'http://222.28.49.253:9092',
            bypass: function (req, res, proxyOptions) {
                if (req.headers.accept.indexOf('.html') !== -1) {
                    return '/index.html';
                }
            },
            secure: false,
            cookieDomainRewrite: {
                "rettc.org": "localhost",
                "*": ""
            },
            onProxyRes: function (proxyRes, req, res) {
                // proxyRes.headers['x-added'] = 'foobar-proxyRes';
                // console.log(proxyRes);
                // console.log(req);
                // console.log(res);
            },
            onProxyReq: function (proxyReq, req, res) {
                // proxyReq.setHeader('x-added', 'foobar-proxyReq');
                // console.log('proxyReq:', proxyReq);
                // console.log('req', req);
                // console.log(res);

                /* let buffers = [];
                req.on('data', function(trunk){
                    buffers.push(trunk);
                }).on('end', function(){
                    console.log(req.method, req.url, req.httpVersion);
                    console.log(req.headers);
                    let buffer = Buffer.concat(buffers);
                    console.log(buffer.toString());
                }); */
            }
        }
    ],
    publicPath: ASSET_PATH
},
module: {
    rules: [
        {
            test: /\.css$/,
            use: [
                {
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }
            ]
        },
        {
            test: /\.less$/,
            use: [
                {
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }
            ]
        },
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [
                { loader: 'babel-loader' }
            ]
        }
    ]
},
plugins: [
    // new CleanWebpackPlugin([`${BUILD_PATH}`], {
    //     root: __dirname,
    //     verbose: true,
    //     dry: false,
    //     exclude: ['favicon.ico']
    // }),
    new CopyWebpackPlugin([
        { from: './favicon.ico' },
    ]),
    new FriendlyErrorsWebpackPlugin({
        onErrors: (severity, errors) => {
            if (severity !== 'error') {
                return;
            }
            const error = errors[0];
            Notifier.notify({
                title: `${error.name}`,
                message: severity + ': ' + error.name,
                subtitle: error.file || '',
                sound: true,
                icon: Path.join(__dirname, 'favicon.ico')
            });
        }
    }),
    new HtmlWebpackPlugin({
        title: packageJSON.title,
        template: `${SRC}/index.ejs`,
        favicon: `./${BUILD_PATH}/favicon.ico`
    }),
    new Webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
        'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
    }),
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function (module) {
            return module.context && module.context.indexOf('node_modules') !== -1;
        }
    })
],
resolve: {
    modules: [
        Path.join(__dirname, SRC),
        'node_modules'
    ],
    extensions: ['.js', '.jsx', '.json', '.css', '.less']
},
}

module.exports = config;