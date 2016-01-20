#!/usr/bin/env node
/**
 * es6-ds/index.js
 *
 * Copyright (c) 2015 David Vuong <david.vuong256@gmail.com>
 * Licensed MIT
 */
'use strict';
import BinarySearchTree from './lib/bst'
import {bst2dot} from './helpers/tree'

let tree = new BinarySearchTree();

let nodes = [6, 3, 7, 9, 10, 1, 4, 19, 2];
nodes.map((i) => tree.insert(tree.root, i));
tree.remove(tree.root, 6);
tree.remove(tree.root, 3);

bst2dot(tree);
