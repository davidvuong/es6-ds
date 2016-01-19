# Data structures in NodeJS (ES6)

**Welcome to data-structures!**

This repository contains a collection of common data structures implemented on NodeJS.

## Documentation

*TODO*

## Getting Started

To start using data-structures, simply clone the repository from GitHub:

```
git clone git@github.com:davidvuong/data-structures.git
```

After you've successfully cloned follow the instructions below to continue the setup process.

### System Requirements

This repository has only been tested on OS X but I should expect it to also run on any other platform that is supported by NodeJS v5.1.x. In addition, because we're using Babel to transpile ES6, Babel also needs to installed. The recommended method is to install it globally.

### Building data-structures

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

### Running data-structures

```
npm start --silent >! test.dot && dot -Tpdf test.dot -o test.pdf
```

*TODO*

## Testing data-structures

```
npm test
```

## Contributing to data-structures

*TODO*
