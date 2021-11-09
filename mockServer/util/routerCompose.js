const fs = require('fs')
const path = require('path')
const { Router } = require('express')
const routerAll = Router()
const routerDir = path.join(__dirname, '../router')

fs.readdir(routerDir, (error, data) => {
  data.forEach( file => {
    if(file !== 'index.js'){
      const { fileName, router } = require('../router'+'/'+file)
      routerAll.use('/'+fileName, router)
    }
  })
})

module.exports = routerAll