const config = require('../../config')
const fs = require('fs')
const path = require('path')

const routerTemplate = fs.readFileSync(path.join(__dirname,'./routerTemplate.js'))

const initRouter = () => {
  const configRouteName = Object.keys(config)
  const existRouteName = fs.readdirSync((path.join(__dirname, '../router')))

  configRouteName.forEach(routeName => {
    if(existRouteName.includes(routeName+'.js')){
      return
    }
    fs.writeFileSync(path.join(__dirname,`../router/${routeName}.js`), routerTemplate)
  })
}

module.exports = initRouter