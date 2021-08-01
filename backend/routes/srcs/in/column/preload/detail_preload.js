// const imgPath = '../../../../../client/src/images'
// const fs =require('fs')
const Column_detail = require('../../../../Schemas/column_detail')
// const Column = require('../../../Schemas/column')
const toInsert = [
    //require('./details/1601'),
    //require('./details/1602'),
    require('./details/1603'),
    require('./details/1604'),
    require('./details/1605'),
    require('./details/1606'),
    require('./details/1805'),
    require('./details/1806'),
    require('./details/1807'),
    require('./details/1808'),
    require('./details/1907'),
    require('./details/1908'),
    require('./details/1909'),
    require('./details/1910'),
    require('./details/1912'),
    require('./details/2001')

]

// const path = require('path')

const main = async () => {
    toInsert.forEach(async (obj,index)=>{
        const column_detail = new Column_detail(obj)
        console.log(index)
        console.log(column_detail)
        column_detail.save()
    })
}
main()