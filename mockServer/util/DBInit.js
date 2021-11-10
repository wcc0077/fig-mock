const config = require('../../config')
const fs = require('fs')
const path = require('path')
const mocking = require('../mocking')

const DBInit = () => {
  const configDBName = Object.keys(config)
  const existDBName = fs.readdirSync((path.join(__dirname, '../db')))

  configDBName.forEach(DBName => {
    // 检查, 当db中有相应的数据文件时,则跳过
    if(existDBName.includes(DBName +'.json')){
      return
    }
    mocking(DBName, config[DBName])
  })

  // 若config配置文件中不存在对应的数据库文件配置, 则自动删除router中的对应路由文件,
  existDBName.forEach(DBName => {
    if(configDBName.includes(DBName.replace('.json',''))){
      return
    }
    console.log(DBName);
    fs.unlinkSync(path.join(__dirname,`../db/${DBName}`))
  })
}

module.exports = DBInit