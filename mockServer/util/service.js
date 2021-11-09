const fs = require('fs')
const path = require('path')

// 取一条数据的索引
function getIndexOfOne(dbName, id) {
  const dataObj = getDB(dbName)
  return  dataObj.findIndex(item => item.id == id)  
}

// 更新数据库
function updateDB(dbName, newData) {
  const filePath = path.join(__dirname, `../db/${dbName}.json`)
  const dataStr = JSON.stringify(newData, null, 2)
  fs.writeFileSync(filePath,dataStr)
}

// 获取数据库全部内容
function getDB(dbName) {
  const filePath = path.join(__dirname, `../db/${dbName}.json`)
  const dbStr = fs.readFileSync(filePath)
  return JSON.parse(dbStr)
}

module.exports = {
  getIndexOfOne,
  updateDB,
  getDB
}