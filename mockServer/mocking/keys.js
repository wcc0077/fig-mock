/**
 * * 提取出 mockjs中的Random对象中的函数, 供配置时简写使用 
 */

const { Random } = require('mockjs')

const keys = Object.keys(Random).filter(item=>{
  // 因为dataImage 和 order不支持普通无参调用,容易出错,所以排除掉这两项.
  // 因为extend是扩展方法,在这里用不到,所以也排除掉.
  if(['dataImage', 'order','extend'].includes(item)){
    return false
  }
  // 带'_'的是私有方法,也排除
  return item[0] === '_' ? false : true
})

// 绑定Random ,让解构后的this不丢失.
const bindRandom = {}
keys.forEach(key => { 
  bindRandom[key] = Random[key].bind(Random) 
})

module.exports = bindRandom



