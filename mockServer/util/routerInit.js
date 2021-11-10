const config = require('../../config')
const fs = require('fs')
const path = require('path')

const routerTemplate = fs.readFileSync(path.join(__dirname,'./routerTemplate.js'))

const initRouter = () => {
  const configRouteName = Object.keys(config)
  const existRouteName = fs.readdirSync((path.join(__dirname, '../router')))
  
  // 若存在对应的数据库文件, 则保留原数据库文件,如果想更新,可以删除db中的json文件,然后重新运行
  configRouteName.forEach(routeName => {
    if(existRouteName.includes(routeName+'.js')){
      return
    }
    fs.writeFileSync(path.join(__dirname,`../router/${routeName}.js`), routerTemplate)
  })

  // 若config配置文件中不存在对应的数据库文件配置, 则自动删除router中的对应路由文件,
  existRouteName.forEach(routeName => {
    if(configRouteName.includes(routeName.replace('.js',''))){
      return
    }
    console.log(routeName);
    fs.unlinkSync(path.join(__dirname,`../router/${routeName}`))
  })
}

module.exports = initRouter
