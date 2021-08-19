const mongoose = require('../../../../Schemas/db')
const { model: Column_detail } = require('../../../../Schemas/column_detail')

const toInsert = [
  require('./details/1601'),
  require('./details/1602'),
  require('./details/1603'),
  require('./details/1604'),
  require('./details/1605'),
  require('./details/16052'),
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
  require('./details/2001'),
]

const main = async () => {
  for (let i = 0; i < toInsert.length; i += 1) {
    const { title, hashtags, sections, annotation, id } = toInsert[i]
    const data = {
      top: {
        name: title.map((til) => til.split(/\(|（|）|\)/)[0].trim()).join(' & '),
        experience: title.map((til) => til.split(/\(|（|）|\)/)[1].trim()),
        hashtags,
      },
      body: {
        body: sections.map(({ bigtitle, sections }) => ({
          bigtitle,
          bigsections: sections.map(({ title, section }) => ({
            subtitle: title,
            subsection: section.replace(/&nbsp;|&nbsp/g, '').replace(/\n/g, '\n     '),
          })),
        })),
      },
      annotation: {
        annotation: annotation.map((jbp) => ({
          job: jbp.split('：')[0],
          contributer: jbp.split('：')[1],
        })),
      },
      id: id.slice(7),
    }
    try {
      const column_detail = new Column_detail(data)
      await column_detail.save()
      console.log(id, 'done')
    } catch (e) {
      // console.log(e)
      console.log(`id ${id} duplicate`)
    }
  }
}
mongoose.connection.on('open', () => {
  console.log('DB on')
  main()
})
