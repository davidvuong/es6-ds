#!/usr/bin/env node

/**
 * es6-ds/lib/stack.js
 *
 * This file contains an implementation of the stack data structure. By
 * no means is this an efficient implementation, it's merely just for educational
 * purposes.
 *
 * Copyright (c) 2016 David Vuong <david.vuong256@gmail.com>
 * Licensed MIT
 */
export default class Stack {
  constructor() {
    this.stack_m = [];
  }

  get size() {
    return this.stack_m.length;
  }

  pop() {
    return this.stack_m.pop();
  }

  push(data) {
    this.stack_m.push(data);
  }

  peak() {
    return this.stack_m[this.stack_m.length - 1];
  }
}
