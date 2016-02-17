# Data structures in NodeJS (ES6)

**Welcome to es6-ds!**

This repository contains a collection of common data structures implemented on NodeJS + ES6.

## Getting Started

To start toying with es6-ds, simply clone the repository from GitHub:

```
git clone git@github.com:davidvuong/es6-ds.git
```

After you've successfully cloned follow the instructions below to continue the setup process.

### System Requirements

This project has only been tested on OS X but I should expect it to also run on any other platform that is supported by NodeJS v5.1.x. In addition, because we're using Babel to transpile ES6, Babel also needs to installed. The recommended method is to install it globally.

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

## Testing es6-ds

Tests are currently written using Mocha + Chai. You can execute all tests by running:

```
npm test
```

If you need to run a specific test, you can do so by using the `-g` flag (`-g "should do something"`). For example:

```
mocha --compilers js:babel-register ./tests/**/*.spec.js -g "should do something"
```
