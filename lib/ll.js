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
'use strict';

let Node = {
    next: null,
    prev: null,
    data: null
};

export default class DoublyCircularLinkedList {
    constructor() {
        this.head_m = null;
        this.tail_m = null;
        this.size_m = 0;
    }

    get size() {
        return this.size_m;
    }

    append(data) {
        let node = Object.assign({}, Node);
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
            this.tail_m = node;
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
            //     ^
            //     head & tail
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
            this.tail_m = node;
        } else {
            // Initial state:
            //                    tail
            //                     v
            // S: [a] <-> [b] <-> [c]
            //                     ^
            //                 head.prev

            // State 2:
            //                    tail
            //                     v
            // S: [a] <-> [b] <-> [c] <-> [d]
            //                     ^
            //                 head.prev
            this.tail_m.next = node;
            node.prev = this.tail_m;
            node.next = this.head_m;

            // State 3:
            //                            tail
            //                             v
            // S: [a] <-> [b] <-> [c] <-> [d]
            //                             ^
            //                         head.prev
            this.tail_m = node;
            this.head_m.prev = this.tail_m;
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

    remove(data) {

    }
}
