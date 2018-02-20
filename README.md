[![Build Status](https://travis-ci.org/Rulsky/cra-firebase.svg?branch=ci-cd)](https://travis-ci.org/Rulsky/cra-firebase)
[![Coverage Status](https://coveralls.io/repos/github/Rulsky/cra-firebase/badge.svg?branch=master)](https://coveralls.io/github/Rulsky/cra-firebase?branch=master)

# cra-firebase

This is a helper library which helps to implement server-side rendering (SSR) of project started with help of [create-react-app (CRA)](https://github.com/facebookincubator/create-react-app) in [google's firebase (FBS)](https://firebase.google.com/)

# The idea
The capabilities which provide both create-react-app and firebase speeds up development of a product and removes lots of headaches, but they could do even more together.

'Firebase cloud functions' allows to implement server-side rendering, but our code needs to be prepared for the server beforehand.
Two major requirements are:
  - compatible with node v6.11.5
  - jsx should be transpiled into plain js

Also, we need to share some code between server and client. And it is good to write in one style (i.e. in es6/7).

So, in order to ease all achievement of all these goals you can use this tool.
Basically, this utility uses babel with necessary presets to transpile server and shared code into compatible with node 6.

# How to use

## New project

1. Init project with help of [create-react-app (CRA)](https://github.com/facebookincubator/create-react-app)
2. Install [firebase-tools](https://www.npmjs.com/package/firebase-tools) as a npm devDependency or a global module - this is up to your personal taste:
   `yarn add -D firebase-tools` or `npm i -D firebase-tools` or `npm i -G firebase-tools`
3. Init project with firebase `yarn firebase init` or `$(npm bin)/firebase init` or `firebase init`
4. During initialization check `functions` and `hosting` options
5. As a hosting dir specify `build`
6. Add [cra-firebase](https://www.npmjs.com/package/cra-firebase) (e.g. this utility) as a devDependency: `yarn add -D cra-firebase` or `npm i -D cra-firebase`
7. Run `yarn cra-firebase init -y` or `$(npm bin)/cra-firebase init -y`

## Existing projects
1. Add [cra-firebase]() (e.g. this utility) as a devDependency: `yarn add -D cra-firebase` or `npm i -D cra-firebase`
2. Update your `package.json` `scripts` by:
  - A) Add command into `package.json` `scripts` which will execute this line `cra-firebase build`
  - B) run `yarn cra-firebase init` to get step-by-step process of updating your project

# Commands description

## What happens when you run the `init -y` command:
  1. Modifies your project's `package.json` file and replaces CRA's `build` script with own. Don't worry: during the running of cra-firebase build, it also runs CRA build scripts.
  2. Deals with rewrite rules in your `firebase.json`:
    - If during firebase initialization process you chosed SPA option this script replaces default rewrite rule which point to `index.html` to point to a function `app`.
    - If no appropriate rule was found it adds one.
    - If a correct rule already present (i.e. points to app function) - just skips this step.
    - Also, if you already defined your own rule for '\*\*' route - it will respect it and will skip this step.
  3. Appends to your `.gitignore` file list of dirs and files which are dynamically generated by cra-firebase. This step respects your firebase config. **Plese note**, that this step doesn't check if ignores are already present in your `.gitignore`.

**Or You can run `init` without `-y` flag - in this case you'll be asked about each step.**

## What happens when you run the `build` command
  1. Sets `BABEL_ENV` to production - a requirement of the react-app babel preset. It also saves a previous value and restores it in the end.
  2. Deletes CRA `build` directory, and files which cra-firebase generates.
  3. Runs CRA 'build' script.
  4. Transpiles all code should go into firebase functions.
  5. Copies `index.html` content into `markup.js`.
  6. Deletes `build/index.html`. This is crucial to make SSR to work. Otherwise, firebase will ignore your rewrite rule.
  7. Copies dependencies from your root package.json into functions's
  8. Sets `BABEL_ENV` to the original value.

# About directories and files structure:

CRA provides to us a slightly rigid structure of our code: all source code should be in `src` dir. And there is no way to tell CRA to handle other structure.
That's why I suggest supporting this idea further in a manner of putting structure into a structure like this:
```bash
├── src/
│   ├── client/
│   │   └── clientOnly.jsx
│   │
│   ├── shared/
│   │   └── components/
│   │       └── app.jsx
│   │
│   ├── server/
│   │   └── serverOnly.js
│   │
│   ├── index.js
│   └── server.index.js
│
```

This utility respects a custom name of firebase's dir structure looks into your `firebase.json` for a name of your functions dir. Here a quote from [FBS docs](https://firebase.google.com/docs/functions/get-started):

> By default, the Firebase CLI looks in the functions/ folder for the source code. You can specify another folder by adding the following lines in `firebase.json`:

```JSON
"functions": {
  "source": "another-folder"
}
```

So, all transpiled code from src will be written into proper functions dir.
`server.index.js` will be transpiled and output into `index.js` under functions dir.

Another vital point to implement SSR is to provide to your server a code with initial markup.
Since CRA generates bundles with dynamic names we need to know their names to serve correct HTML with SSR.
So, as a result of a build process, you will have a `markup.js` file in your functions dir. This is a file which exports a single function as a default export. This function accepts single argument which is expected to be a result of a `react-dom/server.renderToString` call.

Basically, in your `server.index.js` you can write next:
```javascript
import { https } from 'firebase-functions'
import { renderToString } from 'react-dom/server'
import React from 'react'
import markup from './markup'
import App from './shared/components/App/App'

const app = https.onRequest((req, res) => {
  const apphtml = renderToString(<App />)
  res.status(200).send(markup(apphtml))
})

export { app }
```
*As I understand from firebase documentation you need a named export in your `functions/index.js` even if you exporting only one function. This makes sense to me because you can do more than just SSR.
By the way: you can use this tool to write cloud functions code using modern ES syntax.*

### ⚠️ **WARNING**: you must destrucure `firebase-functions` import because there is no default export ([read more here](https://github.com/firebase/firebase-functions/issues/33))


# Handling more filetypes and/or syntaxes

## Adding more babel presets and plugins
By default, cra-firebase uses next presets:
  - env - with targeting node: '6.11.1',
  - react-app - same as CRA
  - flow

You can specify more babel presets and plugins in order to deal with new file formats or for some additional features.
You can do it via CLI commands, `.babelrc` file at the root of your project, or in `package.json` in `babel` field.

CLI commands are:
  - presets: `--presets=preset-name,other-preset`
  - plugins: `--plugins=plugin-name,other-plugin,more-one-plugin,list-may-continue`

<!-- The precedence is **(from most important to less)** cli -> `.babelrc` -> `package.json` -> default config.
So, please, keep in mind that if you specify env preset the default one will be overwritten. -->

At the current state, this utility doesn't handle declaration of presets/plugins with options, because it doesn't dedupe such declarations.
But simple declarations (without options) works.
```javascript
"presets": [
  ["env", {"targets": { "node": 8}}] // will not be deduped
  "react" // will be deduped
]
```

*Please note that this utility is interested in plugins and presets sections configuration of babel, other parts are ignored. It does **NOT** look into any env option, only default one.*

## Adding more filetypes into filtering
you can specify in `package.json` or in `.crafirebaserc.json` or via CLI command option more filetypes which you want to add/exclude to a process of babel transformation.

In configuration files values must be arrays of strings.

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

The examples of CLI commands:
  - exclude: `--exclude=.sh,.tmp`
  - include: `--include=.txt,.ts`
