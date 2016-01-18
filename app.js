#!/usr/bin/env node
/**
 * data-structures/index.js
 *
 * Copyright (c) 2015 David Vuong <david.vuong256@gmail.com>
 * Licensed MIT
 */
'use strict';
import BinarySearchTree from './lib/bst'
import {bst2dot} from './helpers/tree'

let tree = new BinarySearchTree();

[2, 5, 10, 3, 1, 4, 6, 7].map((i) => { tree.insert(tree.root, i) });
tree.remove(tree.root, 5);

bst2dot(tree);
console.log(tree.get(tree.root, 3));
