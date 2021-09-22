const { dbCatch } = require('../error')

const updateQuery = (obj) => {
  const toSet = Object.entries(obj).reduce(
    (acc, [key, val]) => {
      if (val === undefined) return acc
      if (val === '') {
        acc.$unset[key] = ''
        return acc
      }
      acc.$set[key] = val
      return acc
    },
    { $set: {}, $unset: {} },
  )
  return toSet
}

const searchQuery = (obj) => {
  const query = Object.entries(obj).reduce((acc, [key, val]) => {
    if (val === undefined) return acc
    if (key === '_id') return [{ _id: val }, ...acc]
    const reg = new RegExp(val.replace(' ', '|'), 'i')
    const obj = {}
    obj[key] = reg
    acc.push(obj)
    return acc
  }, [])
  console.log('search query:')
  console.log(query)
  return query.length === 0 ? {} : { $or: query }
}

/**
 *
 * @param {Collection} Collection
 * @param {json} query
 * @param {Number} page (default 1)
 * @param {Number} perpage (default 5)
 * @returns [documents,maxPage]
 */
const findWithLimit = async (Collection, query, page, perpage) => {
  const p = parseInt(page ? page : 1)
  const pp = parseInt(perpage && perpage > 0 ? perpage : 5)
  const totalData = await Collection.countDocuments(query).catch(dbCatch)
  const maxPage = Math.ceil(totalData / pp)
  if (p > maxPage) return [[], maxPage]
  const toSkip = p >= maxPage ? 0 : totalData - pp * p
  const toLim = p >= maxPage ? totalData - pp * (maxPage - 1) : pp
  const docs = await Collection.find(query).skip(toSkip).limit(toLim).catch(dbCatch)
  return [docs, maxPage]
}
/*
 * trans {buffer,mimetype} to {data,contentType}
 * @param {File} file format: {buffer,mimetype}
 * @returns
 */
const parseImg = (file) => {
  if (!file) return undefined
  return {
    data: file.buffer,
    contentType: file.mimetype,
  }
}

/**
 * trans {contentType, data} to dataurl
 * @param {String} key default 'img'
 * @returns
 */
const buf2url = (key = 'img') => {
  return function () {
    try {
      return `data:${this[key].contentType};base64,${Buffer.from(this[key].data).toString(
        'base64',
      )}`
    } catch {
      return ''
    }
  }
}

module.exports = { updateQuery, searchQuery, parseImg, buf2url, findWithLimit }
