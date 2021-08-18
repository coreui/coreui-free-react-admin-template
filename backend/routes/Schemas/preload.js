const mongoose = require('mongoose')
const { Schema: columnDetail, collectionName: detailName } = require('./column_detail')
const { Schema: columnOutline, collectionName: outlineName } = require('./column_outline')

const sourceUrl =
    'mongodb+srv://ntueeplus:ntueeplus2020@cluster0.fctiy.mongodb.net/heroku_kbtrwz4h?retryWrites=true&w=majority',
  targetUrl =
    process.env.MONGO_URI ||
    'mongodb+srv://ntueeplus:ntueeplus2020@cluster0.gbnte.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
// 'mongodb://localhost:27017/EEplus?readPreference=primary&appname=MongoDB%20Compass&ssl=false'

const copy = async (sourceDB, targetDB, schema, name, ordered = true) => {
  const sourceModel = sourceDB.model(name, schema)
  const targetModel = targetDB.model(name, schema)
  const docs = await sourceModel.find()
  console.log(`${docs.length} ${name} docs found`)
  await targetModel.insertMany(docs, { ordered }) //ordered true may run faster(?) but will be unordered
  console.log(`insert ${name} complete`)
}

const main = async () => {
  if (!targetUrl) throw new Error('MONGO_URI not set in env')
  console.log(`saving to ${targetUrl}`)
  const option = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
  const sourceDB = await mongoose.createConnection(sourceUrl, option)
  const targetDB = await mongoose.createConnection(targetUrl, option)
  const dp = new Promise((resolve, reject) => {
    targetDB.db.dropDatabase(function (err, res) {
      if (err) reject(err)
      console.log('docker DB drop success')
      resolve()
    })
  })
  await dp
  const task1 = async () => {
    await copy(sourceDB, targetDB, columnDetail, detailName)
  }
  const task2 = async () => {
    await copy(sourceDB, targetDB, columnOutline, outlineName)
  }
  await Promise.all([task1(), task2()])
  sourceDB.close()
  targetDB.close()
}
main()
