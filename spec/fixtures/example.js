import path from 'path'

const str = 'string templtes'

const app = (req, res) => {
  res.status(200).send(`hello with ${str}`)
}

export default app
