# Data structures in NodeJS (ES6)

**Welcome to es6-ds!**

This repository contains a collection of common data structures implemented on NodeJS.

## Documentation

*TODO*

## Getting Started

To start using es6-ds, simply clone the repository from GitHub:

```
git clone git@github.com:davidvuong/es6-ds.git
```

After you've successfully cloned follow the instructions below to continue the setup process.

### System Requirements

This repository has only been tested on OS X but I should expect it to also run on any other platform that is supported by NodeJS v5.1.x. In addition, because we're using Babel to transpile ES6, Babel also needs to installed. The recommended method is to install it globally.

### Building es6-ds

1. Install NodeJS v5.1.x:

  I prefer to use [nvm](https://github.com/creationix/nvm) to manage my Node versions. 

  ```
  nvm install v5.1.0
  ```

1. Install Babel:

  ```
  npm install -g babel babel-core babel-cli
  npm install -g node-inspector
  ```

1. Install remaining project dependencies:

  ```
  npm install
  ```

### Running es6-ds

```
npm start --silent >! test.dot && dot -Tpdf test.dot -o test.pdf
```

*TODO*

## Testing es6-ds

```
npm test
```

or to execute tests based on a filter `-g "should do something"`:

```
mocha --compilers js:babel-register ./tests/**/*.spec.js -g "should do something"
```

## Contributing to es6-ds

*TODO*
