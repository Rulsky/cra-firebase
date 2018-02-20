module.exports = {
  babelrc: false,
  presets: [
    [
      'env',
      {
        targets: {
          node: '6',
        },
      },
    ],
    'react-app',
    'flow',
  ],
}
