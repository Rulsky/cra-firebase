module.exports = {
  babelrc: false,
  presets: [
    [
      'env',
      {
        targets: {
          node: '6.11.5',
        },
      },
    ],
    'react-app',
    'flow',
  ],
}
