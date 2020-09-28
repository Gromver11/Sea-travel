const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    mode: "production",
    entry: {
        main: './src/index.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },

            {
                test: /\.pug$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: ['img:src', 'source:srcset']
                        }
                    },
                    {
                        loader: 'pug-html-loader',
                        options: {
                            pretty:true
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')({
                                browsers: ['last 2 versions']
                            })]
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name].[ext]'
                    }
                }],
            },
            {
                test: /\.(woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[ext]'
                        }
                    }
                ]

            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/pug/index.pug',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css',
        })
    ]
}