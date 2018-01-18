const promptLib = require('prompt')

const prompt = ({
  q, d, pattern, message,
}, pt = promptLib) =>
  new Promise((resolve, reject) => {
    pt.start()

    pt.get(
      {
        properties: {
          [q]: {
            default: d,
            conform: val => val.search(pattern) >= 0,
            message,
          },
        },
      },
      (error, response) => {
        if (error) return reject(error)
        return resolve(response[q])
      },
    )
  })

module.exports = prompt
