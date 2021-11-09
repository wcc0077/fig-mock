const config = require('../../config')
const fs = require('fs')
const path = require('path')
const mocking = require('../mocking')

const DBInit = () => {
  const configDBName = Object.keys(config)
  const existDBName = fs.readdirSync((path.join(__dirname, '../db')))
  console.log(configDBName, existDBName);

  configDBName.forEach(DBName => {
    // 检查, 当db中有相应的数据文件时,则跳过
    if(existDBName.includes(DBName +'.json')){
      return
    }
    mocking(DBName, config[DBName])
  })
}

module.exports = DBInit