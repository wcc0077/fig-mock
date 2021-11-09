const path = require('path')
const { Router } = require('express')
const { getDB, getIndexOfOne, updateDB } = require('../util/service')

const router = Router()

const fileName = __filename.slice(__dirname.length+1, -3)

let data = null

// 获取列表
router.get('/', (req, res)=>{
  data = getDB(fileName)
  res.send(data)
})

// 获取一条数据
router.get('/:id', (req, res)=>{
  const { id } = req.params
  if(getIndexOfOne(fileName,id)=== -1){
    res.send('没找到此id下的数据')
    return 
  }
  const result = data[getIndexOfOne(fileName, id)]
  res.send(result)
})

// 增加一条数据
router.post('/', (req, res)=>{
  const newData = req.body
  const id =require('mockjs').Random.id()

  if(getIndexOfOne(fileName,newData.id)!== -1){
    res.send('数据id已存在')
    return
  }
  
  Object.assign(newData, {id})

  let oldData = getDB(fileName)
  oldData = [newData, ...oldData]
  updateDB(fileName, oldData)
  res.send(newData)
})

// 修改一条数据
router.put('/:id', (req, res)=>{
  const { id } = req.params
  const index = getIndexOfOne(fileName,id)
  const newData = req.body

  let oldData = getDB(fileName)

  const oldItem = oldData[index]
  Object.assign(oldItem, newData)

  updateDB(fileName, oldData)
  res.send(oldItem)
})

// 删除一条数据
router.delete('/:id', (req, res)=>{
  const { id } = req.params
  const index = getIndexOfOne(fileName,id)
  if(index === -1){
    res.send('没找到此id下的数据')
    return 
  }
  data = getDB(fileName)
  data.splice(index,1)
  updateDB(fileName, data)
  res.send({})
})

module.exports = {fileName, router}