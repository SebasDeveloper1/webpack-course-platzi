const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ProgressPlugin = require('progress-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: "assets/images/[hash][ext][query]",
    },
    mode: 'development', // Se activa y se asigna este documento como modo desarrollo y contiene la conf de este modo
    //watch: true, // se activa para que reconpile de manera automatica el proyecto al hacer cambios
    resolve: {
        extensions: ['.js'],     //Ahora usaremos solo esto
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css|.scss$/i,
                use: [MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|svg|jpeg|gif)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2)$/,
                type: "asset/resource",
                generator: {
                    filename: "assets/fonts/[name].[ext]"
                }
            },
            // {
            //     test: /\.(woff|woff2)$/,
            //     use: {
            //         loader: 'url-loader',
            //         options: {
            //             limit: 10000,
            //             mimetype: "application/font-woff", //MIME Type: Standard para enviar contenid en la red
            //             name: "[name].[ext]",
            //             outputPath: "./assets/fonts/", //Salida en este directorio
            //             publicPath: "../assets/fonts/", //Salida en este directorio público (como se mueve desde css paraencontrar la font (en dist))
            //             esModule: false //Avisa si es un módulo
            //         }
            //     },
            //     type: 'javascript/auto',
            // }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: './assets/[name].[contenthash].css',
        }),
        // new CopyPlugin({
        //     patterns: [
        //         {
        //             from: path.resolve(__dirname, "src", "assets/images"),
        //             to: "assets/images"
        //         }
        //     ]
        // }),
        new Dotenv(),
        new ProgressPlugin(),
    ],
}