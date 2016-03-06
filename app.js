#!/usr/bin/env node
/**
 * es6-ds/index.js
 *
 * Ignore this file. This is a file used just for manual testing. Everything
 * will look like context-less gibberish here!
 *
 * Copyright (c) 2016 David Vuong <david.vuong256@gmail.com>
 * Licensed MIT
 */
'use strict';
import _ from 'lodash';

import BinarySearchTree from './lib/bst';
import CircularLinkedList from './lib/ll';
import BinaryHeap from './lib/heap';
import RedBlackTree from './lib/rbt';
import SkipList from './lib/skiplist';

import {bst2dot} from './helpers/tree';

const list = new SkipList();

_.shuffle(_.range(50)).map(i => list.insert(i));
list.toString();
