/**
 * *把配置对象,转换成db.json数据,
 */
const Mock = require('mockjs')
const fs = require('fs')
const path = require('path')
module.exports = function (DBName, configItem){

  // * 将用户填写的config配置,转化为json数据
  function config2Data(DBName, configItem){
    let temp
    temp = mockList(configItem)
    temp = JSON.stringify(temp, null, 2)
    fs.writeFileSync(path.join(__dirname, `../db/${DBName}.json`), temp)
  }

  // * 将mock配置对象,转化为object Arr数组
  function mockList(configItem){
    let configObj, 
        n = 20 // 默认生成20条数据
    if(Array.isArray(configItem)){
      [configObj, n ] = configItem
    }else if (typeof configItem === 'function' ){
      configObj = configItem
    }else{
      throw new Error('config必须是数组或函数')
    }
  
    const res = []
    while(n--){
      res.push(Mock.mock(configObj))
    }
    return res
  }

  //#region region
  // * 将单条mock配置对象,转化为可mock的object
  // function mockObj(obj){
  //   const temp = Array.isArray(obj) ? [] : {}
  //   for(const [key, value] of Object.entries(obj)){
  //     // 如果是函数
  //     if(typeof value === 'function'){
  //       temp[key] = value()
  //     }else if(Array.isArray(value) || value instanceof Object/**如果是数组 或 对象 */){
  //       temp[key] =  mockObj(value)
  //     }else{
  //       temp[key] = value
  //     }
  //   }
  //   return temp
  // }
  //#endregion
  config2Data(DBName, configItem)
}

