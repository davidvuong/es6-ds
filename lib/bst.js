#!/usr/bin/env node

/**
 * es6-ds/lib/bst.js
 *
 * This file contains an implementation of the Binary Search Tree data
 * structure. By no means is this an efficient implementation, it's merely just
 * for educational purposes.
 *
 * All resources used to learn about BSTs can be found here:
 *  - http://algs4.cs.princeton.edu/32bst/
 *  - http://www.algolist.net/Data_structures/Binary_search_tree/Removal
 *  - https://www.youtube.com/watch?v=gcULXE7ViZw
 *
 * Copyright (c) 2015 David Vuong <david.vuong256@gmail.com>
 * Licensed MIT
 */
const Node = {
  left: null,
  right: null,
  data: null,
};

export default class BinarySearchTree {
  constructor() {
    this.root_m = null;
    this.size_m = 0;
  }

  get size() {
    return this.size_m;
  }
  get root() {
    return this.root_m;
  }

  get(current, data) {
    if (!current) {
      return null;
    }
    if (data > current.data) {
      return this.get(current.right, data);
    } else if (data < current.data) {
      return this.get(current.left, data);
    }
    return current;
  }

  insert(current, data) {
    if (!current) {
      const node = Object.assign({}, Node);
      node.data = data;

      this.size_m++;
      if (!this.root_m) {
        this.root_m = node;
      }

      return node;
    } else if (data >= current.data) {
      current.right = this.insert(current.right, data);
    } else {
      current.left = this.insert(current.left, data);
    }
    return current;
  }

  remove(current, data) {
    if (!current) {
      return current;
    } else if (data > current.data) {
      current.right = this.remove(current.right, data);
    } else if (data < current.data) {
      current.left = this.remove(current.left, data);
    } else {
      if (!current.left && !current.right) {
        /**
         * `current` is the root node AND has no children.
         *
         *        (5) <-- no children
         *   (null) (null)
         *
         */
        if (this.size_m === 1) {
          this.root_m = null;
        }

        this.size_m--;
        /**
         * `current` has no children (leaf).
         *
         *        (5)
         *     (3)  (7) <-- no children
         */
        return null;
      } else if (!current.left) {
        /**
         * `current` has 1 child node on the *right*, 9.
         *
         *        (5)
         *     (3)  (7) <-- 1 right child
         *            (9)
         */
        this.size_m--;
        return current.right;
      } else if (!current.right) {
        /**
         * Node has 1 child on the *left*, 6.
         *
         *        (5)
         *     (3)  (7) <-- 1 left child
         *         (6)
         */
        this.size_m--;
        return current.left;
      }
      /**
       * Node has 2 children (one on both side).
       *
       *        (5)
       *     (3)    (7) <-- 2 children 6, 9
       *         (6)  (9)
       *             (8)
       *
       * 1. Find the smallest node at the right subtree of 7 (8)
       *
       *        (5)
       *     (3)    (7)
       *         (6)  (9)
       *             (8) <-- smallest in the right sub-tree of 7
       *
       * 2. Swap values with the smallest and the current
       *
       *        (5)
       *     (3)    (8) <-- 7 swapped with 8
       *         (6)  (9)
       *             (7) <-- 8 swapped with 7
       *
       * 3. Reduce to one of the 3 situations above.
       *
       *        (5)
       *     (3)    (8)
       *         (6)  (9)
       *             (7) <-- 7 is removed
       *
       *  ^ In this case, it was quite simple as it was reduced to a leaf
       */
      // (1) Finds the smallest node `right` of current.
      //
      // NOTE: This could also be finding the largest node `left` of current.
      let minNode = current.right;
      while (minNode.left) {
        minNode = minNode.left;
      }

      // (2) Swap the values.
      [current.data, minNode.data] = [minNode.data, current.data];

      // (3)   Problem has now been reduced to removing either leaf or 1 child.
      //       It's at one of these reduced cases where we `size_m--`, not here.
      //
      // (3.5) If the child of `current.right` also has 2 children then it repeats.
      current.right = this.remove(current.right, data);

      // (4) Return the current node so the parent can link it correctly
      /**
       * ^ `this.remove(...)` returns the right node, skipping the current node.
       * Take the example of this tree:
       *
       *        (2)
       *     (1)    (5)
       *         (3)   (10)
       *          (4) (6)
       *               (7)
       *
       * 1. I want to remove the node with data 5.
       * 2. I swap with the right min-node, 6.
       * 3. I reduce the problem down to the right subtree at 10.
       *
       * When the subtree at 10 is complete, `this.remove(...)` will give me 10. If
       * I return 10 then I get this tree:
       *
       *        (2)
       *     (1)  (10)
       *         (6)
       *          (7)
       *
       * ^ Which is wrong because I'm missing the left subtree at 5 (which is
       * 6 because I swapped). However, if I returned `current` which is 6 (swapped),
       * then I get the proper result:
       *
       *        (2)
       *     (1)    (6)
       *         (3)   (10)
       *          (4) (7)
       */
      return current;
    }
    return current;
  }
}
