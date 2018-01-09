# cra-firebase

This is a helper library which helps to implement server-side rendering (SSR) of project started with help of [create-react-app (CRA)](https://github.com/facebookincubator/create-react-app) in [google's firebase (FBS)](https://firebase.google.com/)

# Steps

## New project

1. Init project with help of [create-react-app (CRA)](https://github.com/facebookincubator/create-react-app)
2. Install [firebase-tools](https://www.npmjs.com/package/firebase-tools) as a npm devDependency:
   `yarn add -D firebase-tools` or `npm i -D firebase-tools`
3. Init project with firebase `yarn firebase-tools init` or `$(npm bin)/firebase init`
4. During initialization check `functions` and `hosting` options


# About directory structure:

from [FBS docs](https://firebase.google.com/docs/functions/get-started):

> By default, the Firebase CLI looks in the functions/ folder for the source code. You can specify another folder by adding the following lines in `firebase.json`:

```JSON
"functions": {
  "source": "another-folder"
}
```

# Handling more filetypes and/or syntaxes

## Adding more babel presets and plugins
By default, cra-firebase uses next presets:
  - env - with targeting node: '6.11.1',
  - react-app - same as CRA
  - flow

You can specify more babel presets and plugins in order to deal with new file formats or for some additional features.
You can do it via CLI commands, `.babelrc` file at root of your project, or in `package.json` in `babel` field.

CLI commands are:
  - presets: `--presets=preset-name,other-preset`
  - plugins: `--plugins=plugin-name,other-plugin,more-one-plugin,list-may-continue`

<!-- The precedence is **(from most important to less)** cli -> `.babelrc` -> `package.json` -> default config.
So, please, keep in mind that if you specify env preset the default one will be overwritten. -->

At current state this utility doesn't handle declaration of presets/plugins with options, because it does't dedupe such declarations.
But simple declarations (without options) works.
```javascript
"presets": [
  ["env", {"targets": { "node": 8}}] // will not be deduped
  "react" // will be deduped
]
```

*Please note that this utility is interested in plugins and presets sections configuration of babel, other parts are ignored. It does **NOT** look into any env option, only default one.*

## Adding more filetypes into filtering
you can specify in `package.json` or in `.crafirebaserc.json` more filetypes which you want to add/exclude to a process of babel transformation.

Values must be arrays of strings.

An example of `package.json`:
```JSON
"crafirebase": {
  "exclude": ["tmp.ts", "tmp.js"],
  "include": [".ts", ".filetypeofyourtaste"]
}
```

An example of `.crafirebaserc.json`:
```JSON
"exclude": ["tmp.ts", "tmp.js"],
"include": [".ts", ".filetypeofyourtaste"]
```
