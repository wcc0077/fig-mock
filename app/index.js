const app = require('express')()
const bodyParser = require('body-parser')

app.use(require('cors')())
app.use(bodyParser.json())

// 初始化数据库文件
require('../mockServer/util/DBInit')()

// 初始化路由
require('../mockServer/util/routerInit')()

// 加载所有路由
app.use('/api',require('../mockServer/util/routerCompose'))

const port = 3721
app.listen(port, () => {
  console.log('mock server ready~~');
  console.log('启动地址为:localhost:' + port );
})
