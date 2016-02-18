#!/usr/bin/env node
/**
 * es6-ds/lib/heap.js
 *
 * This file contains an implementation of the Binary Heap data structure. By
 * no means is this an efficient implementation, it's merely just for educational
 * purposes.
 *
 * NOTE: This is an implementation of a MIN-HEAP. This means that the root of the heap
 * is always going to be the smallest value.
 *
 * All resources used to learn about binary heaps/heaps in general can be found here:
 *  - http://www.cprogramming.com/tutorial/computersciencetheory/heap.html
 *  - http://www.cse.hut.fi/en/research/SVG/TRAKLA2/tutorials/heap_tutorial/taulukkona.html
 *  - https://en.wikipedia.org/wiki/Binary_heap
 *
 * Copyright (c) 2016 David Vuong <david.vuong256@gmail.com>
 * Licensed MIT
 */
'use strict';

export default class BinaryHeap {
    constructor() {
        // We're starting at index 1 for a few reasons:
        //  - When trying to find the left child, we can avoid the +1
        //  - When trying to find the parent, we can avoid the -1
        //  - Feels a bit more natural because most resources online start at 1
        this.nodes = [null];
    }

    get size() { return this.nodes.length - 1; }
    get root() { return this.nodes[1]; }

    _getParentIdx(idx) {
        if (idx <= 1) { return null; }
        return Math.ceil(idx / 2);
    }
    _getRootIdx() {
        return 1;
    }
    _getNode(idx) {
        let value = this.nodes[idx];
        return value ? { v: value, i: idx } : null;
    }
    _getLeft(idx) {
        return this._getNode(2 * idx);
    }
    _getRight(idx) {
        return this._getNode(2 * idx + 1);
    }
    _getLeftRightCurrentData(idx) {
        return [this._getLeft(idx), this._getRight(idx), this._getNode(idx)];
    }
    _swapNodes(idx1, idx2) {
        [this.nodes[idx1], this.nodes[idx2]] = [this.nodes[idx2], this.nodes[idx1]];
    }

    insert(data) {
        this.nodes.push(data);

        // We've added our 1st node - it is the smallest.
        if (this.size === 1) { return; }
        let _nodes = this.nodes;

        // Find the current index (last) + parent index.
        let [current, parent] = [this.size, this._getParentIdx(this.size)];

        // Up-heap:
        //
        // This is the process of swapping positions with the parent as to "bubble up"
        // the new node based on the MIN/MAX property. Here we have a min-heap so
        // want to bubble up smallest values to the top of the tree.
        //
        //         (5)
        //      (8)   (9)
        //   (10) (3)
        //
        // ^ Let's say we just added 3 to our tree. Since 8 > 3, we swap 8 and 3.
        //
        //         (5)
        //      (3)   (9)
        //   (10) (8)
        //
        // ^ Continuing the process, we notice that 5 > 3, swap 5 and 3.
        //
        //         (3)
        //      (5)   (9)
        //   (10) (8)
        //
        // ^ We keep doing this until either the current node is at the root of tree
        // or the parent is no longer larger. In this case we've reached the root.
        while (current > 1 && _nodes[parent] > _nodes[current]) {
            [_nodes[parent], _nodes[current]] = [_nodes[current], _nodes[parent]];
            current = parent;
            parent = this._getParentIdx(current);
        }
    }

    remove() {
        // There's nothing in the tree to remove.
        if (this.size === 0) { return null; }

        // The heap only has a root node.
        if (this.size === 1) { return this.nodes.pop(); }

        // The heap only has 2 nodes.
        let [root, last] = [this._getRootIdx(), this.size];
        if (this.size === 2) {
            this._swapNodes(root, last);
            return this.nodes.pop();
        }

        // The tree has 3 or more nodes.
        //
        // 1. Swap the root of the heap with the last node
        // 2. Remove the old root (now last node) from the heap
        this._swapNodes(root, last);
        let removed = this.nodes.pop();

        // Down-heap
        //
        // This is a similar process to an up-heap except we want to keep "bubbling"
        // down until we reach a point where both the left/right nodes are larger (min)
        // or smaller (max) than the current subtree's root. For example:
        //
        //         (3)
        //      (8)   (7)
        //   (10) (9)
        //
        // ^ We want to remove 5 so we swap it with the last node
        //
        //         (9)
        //      (8)   (7)
        //   (10) (3)
        //
        // ^ Next, we remove that last node
        //
        //         (9)
        //      (8)   (7)
        //   (10)
        //
        // ^ Now we begin the process of bubbling the root down the heap
        //
        //         (7)
        //      (8)   (9)
        //   (10)
        //
        // ^ Since this is a min-heap we look at the smallest child and swap
        // the positions. Since 9 now has no children, we stop. We would also
        // stop if 9 less than both the left and right children.
        let [left, right, current] = this._getLeftRightCurrentData(root);
        while (true) {
            // `current` has no children!
            if (!left && !right) { break; }

            // Both left & right are larger than `current`.
            if ((left && left.v < current.v) || (right && right.v < current.v)) {
                break;
            }

            // `current` has both left and right children.
            let idx;
            if (left && right) {
                idx = left.v < right.v ? left.i : right.i;
            // `current` only has a right child.
            } else if (!left) {
                idx = right.i;
            // `current` only has a left child.
            } else {
                idx = left.i;
            }

            // `current` is smaller than the smallest of both children.
            if (current.v < this.nodes[idx]) { break; }

            this._swapNodes(current.i, idx);
            [left, right, current] = this._getLeftRightCurrentData(idx);
        }
        return removed;
    }
}
