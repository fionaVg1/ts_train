const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
  mode:'development',
  entry:'./src/main.ts',
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'main.js'
  },
  devServer:{
    static:'/dist',
    open:true
  },
  resolve:{
    "extensions":['.ts','.js','.json']
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader','css-loader'],
        exclude:[
          path.resolve(__dirname,'src/components')
        ]
      },
      {
        test:/\.css$/,
        use:['style-loader',{
          loader:'css-loader',
          options:{
            modules:true
          }
        }],
        include:[
          path.resolve(__dirname,'src/components')
        ]
      },
      {
        test:/\.(eot|woff2|woff|ttf|svg)$/,
        use:['file-loader']
      },     
      {
        test:/\.ts$/,
        use:['ts-loader'],
        exclude:/node_modules/
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    }),
    new CleanWebpackPlugin()
  ]
}