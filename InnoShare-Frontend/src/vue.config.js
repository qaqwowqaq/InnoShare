let proxyObj = {};
 
proxyObj['/'] = {
  //websocket
  ws: false,
  //目标地址
  target: 'http://localhost:8888',
  //发送请求头中host会设置成target
  changeOrigin: true,
  //不重写请求地址
  pathRewrite: {
    '^/': '/'
  }
};
 
// websocket的代理
 
proxyObj['/ws'] = {
  ws: true,
  target: 'ws://localhost:8888'
};
 
module.exports = {
  devServer: {
    host: 'localhost',
    port: 8000,
    proxy: proxyObj
  },
  configureWebpack: {
    devtool: 'source-map'
  }
};