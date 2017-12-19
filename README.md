# cra-ssr-firebase

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
