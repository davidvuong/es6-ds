#!/usr/bin/env node
/**
 * es6-ds/lib/rbt.js
 *
 * This file contains an implementation of the Red-black tree. By
 * no means is this an efficient implementation, it's merely just for educational
 * purposes.
 *
 * All resources used to learn about red-black trees can be found here:
 *  - [add resource]
 *
 * Copyright (c) 2016 David Vuong <david.vuong256@gmail.com>
 * Licensed MIT
 */
'use strict';

let Node = {
    left : null,
    right: null,
    data : null
};

export default class RedBlackTree {
    constructor() {
        this.root_m = null;
        this.size_m = 0;
    }

    get size() { return this.size_m; }
    get root() { return this.root_m; }

    get(data) {
        // TODO: Implement me!
    }

    insert(data) {
        // TODO: Implement me!
    }

    remove(data) {
        // TODO: Implement me!
    }
}
