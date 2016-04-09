#!/usr/bin/env node

/**
 * es6-ds/lib/ll.js
 *
 * This is an implementation of a doubly circular linked list data structure. A
 * doubly circular linked list is a type of linked list where all nodes have a
 * reference to the previous and next node (doubly) and the last node is connected
 * to the first node (circular).
 *
 * All resources used I used to learn about linked lists can be found here:
 *  - http://www.martinbroadhurst.com/articles/circular-linked-list.html
 *
 * Copyright (c) 2016 David Vuong <david.vuong256@gmail.com>
 * Licensed MIT
 */
import _ from 'lodash';

const Node = {
  next: null,
  prev: null,
  data: null,
};

export default class DoublyCircularLinkedList {
  constructor() {
    this.head_m = null;
    this.size_m = 0;
  }

  get size() {
    return this.size_m;
  }

  get head() {
    return this.head_m;
  }

  /* Dynamically determine the tail based on the size and current head. */
  get tail() {
    // The head is the tail if there's only one node in the list.
    if (this.size_m === 1) {
      return this.head_m;
    }
    // Otherwise, the tail is the last node in the list i.e. the head's prev.
    return this.head_m ? this.head_m.prev : null;
  }

  append(data) {
    const node = Object.assign({}, Node);
    node.data = data;
    //  _________________
    //  |               |
    //  v               v
    // [a] <-> [b] <-> [c]
    //
    // [a] is the head and [c] is the tail
    // [c] is connected to [b] (previous) and [a] (next)
    // [a] is connected to [b] (next) and [c] (previous)

    // NULL <- [a] -> NULL
    //
    // [a] is the only node in the list, it has no next and no previous.

    // The list is empty, add to the head and subsequently the tail too.
    if (this.size_m === 0) {
      this.head_m = node;
    } else if (this.size_m === 1) {
      // Initial state:
      //
      // S: NULL <- [a] -> NULL
      //             ^
      //        head & tail

      // State 2:
      //
      //     ________
      //     |      |
      //     |      v
      // S: [a] -> [b]
      //     ^      ^
      //    head   tail
      this.head_m.next = node;
      this.head_m.prev = node;

      // State 3:
      //     ________
      //     |      |
      //     v      v
      // S: [a] <-> [b]
      //     ^       ^
      //    head    tail
      node.prev = this.head_m;
    } else {
      // Initial state:
      //                    tail
      //                     v
      // S: [a] <-> [b] <-> [c]
      //                     ^
      //                 head.prev

      // State 2:
      //
      //     _________________________
      //     |              tail     |
      //     v               v       |
      // S: [a] <-> [b] <-> [c] <-> [d]
      //                     ^
      //                 head.prev
      this.tail.next = node;
      node.prev = this.head_m.prev;
      node.next = this.head_m;

      // State 3:
      //
      //     _________________________
      //     |                       |
      //     v                       v
      // S: [a] <-> [b] <-> [c] <-> [d] <- tail
      //                             ^
      //                         head.prev
      this.head_m.prev = node;
    }
    this.size_m++;
  }

  get(data) {
    if (!this.head_m) {
      return null;
    }
    if (this.head_m.data === data) {
      return this.head_m;
    }

    let node = this.head_m.next;
    while (node && node !== this.head_m) {
      if (node.data === data) {
        return node;
      }
      node = node.next;
    }
    return null;
  }

  remove(node) {
    if (!_.isObject(node)) {
      node = this.get(node);
    }
    if (!node) {
      return null; // `node` does not exist.
    }

    if (this.size_m === 1) {
      // Case 1:
      //
      // NULL <- [a] -> NULL
      this.head_m = null;
    } else {
      // Case 2:
      //
      // [a] <-> [b]
      //  ^       ^
      //  Removing the head of tail when there are only 2 nodes in the list.
      if (node.prev === node.next) {
        node.next.prev = null;
        node.next.next = null;
        this.head_m = node.next;
      } else {
        // Case 3:
        //
        // [a] <-> [b] <-> [c]
        //          ^
        //          Removing a node in the middle.
        node.next.prev = node.prev;
        node.prev.next = node.next;
      }
    }
    this.size_m--;
  }
}
