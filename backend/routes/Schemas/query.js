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

const parseImg = (file) => {
  if (!file) return undefined
  return {
    data: file.buffer,
    contentType: file.mimetype,
  }
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

module.exports = { updateQuery, parseImg, searchQuery }
