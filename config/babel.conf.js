// TODO: exept additional plugins and presets and merge them into this one

module.exports = {
  babelrc: false,
  presets: [
    [
      'env',
      {
        targets: {
          node: '6.11.1',
        },
      },
    ],
    'react-app',
    'flow',
  ],
}
