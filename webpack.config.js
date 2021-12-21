const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
  entry:'./src/main.js',
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'main.js'
  },
  devServer:{
    static:'/dist',
    open:true
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test:/\.(eot|woff2|woff|ttf|svg)$/,
        use:['file-loader']
      },
      {
        test:/\.(jpg|png|gif|bmp|jpeg|svg)$/,
        use:[
          {
            loader:'url-loader',
            options:{
              limit:500,
              name:'images/[name]_[hash:7].[ext]',
              context:'dist',
              publicPath:'./'
            }
          }
        ]
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