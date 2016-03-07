#!/usr/bin/env node
/**
 * es6-ds/lib/skiplist.js
 *
 * This file contains an implementation of the skip list structure. By
 * no means is this an efficient implementation, it's merely just for educational
 * purposes.
 *
 * All resources used to learn about skip list trees can be found here:
 *  - https://en.wikipedia.org/wiki/Skip_list
 *  - https://en.wikipedia.org/wiki/File:Skip_list_add_element-en.gif
 *  - https://www.cs.umd.edu/class/spring2008/cmsc420/L12.SkipLists.pdf
 *
 * Copyright (c) 2016 David Vuong <david.vuong256@gmail.com>
 * Licensed MIT
 */
'use strict';
import _ from 'lodash';

const Node = {
    left : null,
    right: null,
    up   : null,
    down : null,
    data : null
};

export default class SkipList {
    constructor() {
        this.size_m = 0;

        this.head_m = Object.assign({}, Node);
        this.tail_m = Object.assign({}, Node);

        // Initialise the sentinel nodes.
        //
        // [head] <-> [tail]
        this.head_m.right = this.tail_m;
        this.tail_m.left  = this.head_m;

        // Keep track of the lowest level head&tail to make insertions easier.
        this.head_0_m = this.head_m;
        this.tail_0_m = this.tail_m;
    }

    get size() { return this.size_m; }

    _isTail(node) {
        return _.isNull(node.data) && _.isNull(node.right);
    }

    _isHead(node) {
        return _.isNull(node.data) && _.isNull(node.left);
    }

    _insertAfter(position, newNode) {
        const tmp = position.right;
        position.right = newNode;
        newNode.left = position;
        newNode.right = tmp;
        tmp.left = newNode;
    }

    _insertLevel(newNode) {
        let [currentHead, currentTail] = [this.head_0_m, this.tail_0_m];
        while (Math.random() > 0.5) {
            const newNodeCopy = Object.assign({}, Node);
            newNodeCopy.data = newNode.data;

            // Link the new/copy nodes together to form a link.
            newNode.up = newNodeCopy;
            newNodeCopy.down = newNode;

            // Create new level if none available (i.e. highest level so far).
            if (_.isNull(currentHead.up)) {
                // 1. Create a new empty level and link it with the level below it.
                const head = Object.assign({}, Node);
                const tail = Object.assign({}, Node);
                currentHead.up = head;
                currentTail.up = tail;
                head.down = currentHead;
                tail.down = currentTail;

                // 2. Insert the newNodeCopy into the new level.
                head.right = newNodeCopy;
                newNodeCopy.left = head;
                tail.left = newNodeCopy;
                newNodeCopy.right = tail;

                // 3. Iterate up to the newly created level.
                currentHead = currentHead.up;
                currentTail = currentTail.up;

                // Update `this.head_m` and `this.tail_m` to point to the highest level.
                this.head_m = head;
                this.tail_m = tail;

            // We're inserting into a level that already exists.
            } else {
                currentHead = currentHead.up;
                currentTail = currentTail.up;

                // Need to determine where in the current level the newNodeCopy
                // should be placed between...
                //
                // The idea is we scan from the head of the current level until we reach
                // either the end OR a node that is larger than the new node. Once we
                // find that position, add the `newNodeCopy` into that position.
                //
                // 1. This is what our current skip list looks like:
                //
                // [head] <-> [5] <---------> [15] <-> [tail]
                // [head] <-> [5] <-> [8] <-> [15] <-> [tail]
                //
                // 2. We want to insert [12] so we first insert it into the 0th level.
                //
                // [head] <-> [5] <------------------> [15] <-> [tail]
                // [head] <-> [5] <-> [8] <-> [12] <-> [15] <-> [tail]
                //
                // 3. Flip a coin and we decide to add it into the level above.
                //  3.1 Scan until we hit 5, 5 < 12 so we continue
                //  3.2 Scan until 15, 15 > 12 we stop.
                //
                // We now know we need to insert before 15.
                //
                // [head] <-> [5] <---------> [12] <-> [15] <-> [tail]
                // [head] <-> [5] <-> [8] <-> [12] <-> [15] <-> [tail]
                let position = currentHead;
                while (!this._isTail(position.right) && position.right.data < newNodeCopy.data) {
                    position = position.right;
                }
                this._insertAfter(position, newNodeCopy);
            }

            // Don't forget to update the reference to `newNode` otherwise the up/down
            // references for levels above will ref the wrong node.
            newNode = newNodeCopy;
        }
    }

    insert(data) {
        const newNode = Object.assign({}, Node);
        newNode.data = data;

        // When the list is initially empty, just insert between the head and tail.
        //
        // [head] <-> [newNode] <-> [tail]
        if (this.size_m === 0) {
            this.head_m.right = newNode;
            newNode.left = this.head_m;
            newNode.right = this.tail_m;
            this.tail_m.left = newNode;

        // When there's more than 0 nodes in the skip list.
        } else {
            // Start at the very top of the skip list and search right.
            let position = this.head_m;
            while (!this._isTail(position.right) && !_.isNull(position.down)) {
                // Note accepting duplicate nodes in this implementation.
                if (position.data === data) { return; }

                // 1. Inserting 10 into our skip list.
                //
                // [head_2] <-----------------> [15] <-> [tail]
                // [head_1] <-> [5] <-> [9] <---[15] <-> [tail]
                // [head_0] <-> [5] <-> [9] <-> [15] <-> [tail]
                //
                // Result: We go down from head_2 to head_1.
                if (position.right.data > data) {
                    position = position.down;

                // 2. Inserting 16 into our skip list.
                //
                // [head_2] <-----------------> [15] <-> [20] <-> [tail]
                // [head_1] <-> [5] <-> [9] <---[15] <-> [20] <-> [tail]
                // [head_0] <-> [5] <-> [9] <-> [15] <-> [20] <-> [tail]
                //
                // Result: We go right from head_2 to [15].
                } else {
                    position = position.right;
                }
            }

            // Make sure we're at the bottom:
            //
            // [head_2] <-> [1] <-> [tail] <- stopped here.
            // [head_1] <-> [1] <-> [tail]
            // [head_2] <-> [1] <-> [tail] <- should move to here instead.
            //
            // Result: Keep going down until we hit the bottom.
            while (!_.isNull(position.down)) {
                position = position.down;
            }

            // Edge case: We need to maintain the order our of skip list when inserting.
            //
            // 1. Imagine our 0th level looks like this and we're inserting [7]
            //
            // [head_0] <-> [5] <-> [6] <-> [8] <-> [9] <-> [10] <-> [tail]
            //
            // 2. We ran our search and we stopped at [5]. If we don't perform this loop
            // and just add it after 5, we'll end up with an unordered skip list.
            //
            // [head_0] <-> [5] <-> [7] <-> [6] <-> [8] <-> [9] <-> [10] <-> [tail]
            //
            // Result: Keep going right until we hit a position that's larger than data.
            while (!this._isTail(position.right) && position.right.data < data) {
                position = position.right;
            }

            // Finally, Add our new node after the current `position`.
            this._insertAfter(position, newNode);
        }

        // Update the list size and determine if we should add it to the levels above.
        this.size_m++;
        this._insertLevel(newNode);
    }

    toString() {
        const rows = [];

        let hPosition = this.head_0_m;
        while (hPosition) {
            const row = [];

            let vPosition = hPosition;
            while (vPosition) {
                row.push(_.isNull(vPosition.data) ? 'N' : vPosition.data);
                vPosition = vPosition.up;
            }
            rows.push(row.join(', '));
            hPosition = hPosition.right;
        }
        return rows.join('\n');
    }

    _removeLevel(position) {
        // The idea here is to remove [x] from the highest -> lowest level.
        //
        // [H_3] <---------> [1] <---------------------------------> [T] |
        // [H_2] <---------> [1] <---------------------------------> [T] | (down)
        // [H_1] <---------> [1] <-> [2] <---------> [4] <---------> [T] |
        // [H_0] <-> [0] <-> [1] <-> [2] <-> [3] <-> [4] <-> [6] <-> [T] v

        // Only remove if the level is actually empty.
        if (!this._isHead(position.left))  { return; }
        if (!this._isTail(position.right)) { return; }

        // Don't remove the last level - we need it!
        if (_.isNull(position.up) && _.isNull(position.down)) { return; }

        // We're removing the highest level in the skip list.
        this.head_m = this.head_m.down;
        this.head_m.up = null;
        this.tail_m = this.tail_m.down;
        this.tail_m.up = null;
    }

    remove(data) {
        let position = this.get(data);
        if (!position) { return false; }

        // Remove `position` from all levels (keep going down).
        //
        // [H_3] <---------> [1] <-----------------------------------------> [T]
        // [H_2] <---------> [1] <-----------------------------------------> [T]
        // [H_1] <---------> [1] <-> [2] <---------> [4] <-----------------> [T]
        // [H_0] <-> [0] <-> [1] <-> [2] <-> [3] <-> [4] <-> [5] <-> [6] <-> [T]
        //
        // Image we're trying to remove [1].
        //
        // Flow: Search for [1] (hit the top level), go down until H_0.
        while (position) {
            position.up = null;
            position.left.right = position.right;
            position.right.left = position.left;

            this._removeLevel(position);
            position = position.down;
        }

        this.size_m--;
        return true;
    }

    get(data) {
        if (this.size_m === 0) { return null; }

        // Example walk-through:
        //
        // [H_3] <---------> [1] <-----------------------------------------> [T]
        // [H_2] <---------> [1] <-----------------------------------------> [T]
        // [H_1] <---------> [1] <-> [2] <---------> [4] <-----------------> [T]
        // [H_0] <-> [0] <-> [1] <-> [2] <-> [3] <-> [4] <-> [5] <-> [6] <-> [T]
        //
        // Imagine we're searching for [5].
        //
        // Flow:
        //  (s)[H_3], (r)[1], (d)[1], (d)[1], (r)[2], (r)[4], (d)[4], (r)[5], (f)[5].
        let position = this.head_m;
        while (!_.isNull(position)) {
            if (data === position.data) {
                return position;

            // If `data` is smaller then it means it's at most going to `position.right - 1`.
            // If `position.right` is tail then there's no choice but to go down.
            } else if (this._isTail(position.right) || data < position.right.data) {
                position = position.down;

            // Otherwise we move forward and go to the right because it's safe.
            } else {
                position = position.right;
            }
        }
        return null;
    }
}
