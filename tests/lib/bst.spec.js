#!/usr/bin/env node

/**
 * es6-ds/tests/lib/bst.spec.js
 *
 * Copyright (c) 2015 David Vuong <david.vuong256@gmail.com>
 * Licensed MIT
 */
import chai from 'chai';
import _ from 'lodash';
import BinarySearchTree from '../../lib/bst';

describe('BinarySearchTree', () => {
  describe('.insert()', () => {
    let tree;
    beforeEach(() => {
      tree = new BinarySearchTree();
    });

    it('should add into the tree when invoked', () => {
      tree.insert(tree.root, 1);
      chai.expect(tree.root.data).to.equal(1);
      chai.expect(tree.size).to.equal(1);
    });

    it('should add to the left if smaller', () => {
      tree.insert(tree.root, 5);
      tree.insert(tree.root, 3);

      chai.expect(tree.root.data).to.equal(5);
      chai.expect(tree.root.left.data).to.equal(3);
      chai.expect(tree.root.right).to.not.exist;
    });

    it('should add to the left if larger', () => {
      tree.insert(tree.root, 5);
      tree.insert(tree.root, 8);

      chai.expect(tree.root.data).to.equal(5);
      chai.expect(tree.root.right.data).to.equal(8);
      chai.expect(tree.root.left).to.not.exist;
    });

    it('should update size on every insert', () => {
      const nodes = [2, 5, 10, 3, 1, 4, 6, 7];
      nodes.map(i => tree.insert(tree.root, i));

      chai.expect(tree.size).to.equal(nodes.length);
    });

    it('should cause worse case when inserted in order', () => {
      for (let i = 1; i < 10; i++) {
        tree.insert(tree.root, i);
      }
      chai.expect(tree.size).to.equal(9);

      // The tree should look like this:
      // (1)
      //   (2)
      //     (3)
      //       ...
      //         (9)
      // Giving resulting `.insert` calls the worst case time complexity.
      let [current, previous] = [tree.root.right, tree.root];
      while (current.right) {
        chai.expect(current.data).to.be.above(previous.data);
        [current, previous] = [current.right, current];
      }
    });
  });

  describe('.get()', () => {
    let tree;
    beforeEach(() => {
      tree = new BinarySearchTree();
    });

    it('should find nothing when tree is empty', () => {
      chai.expect(tree.size).to.be.equal(0);
      chai.expect(tree.get(tree.root, 1)).to.not.exist;
    });

    it('should find the root', () => {
      [6, 3, 7, 9, 10, 1].map(i => tree.insert(tree.root, i));

      //     (6)
      //   (3)  (7)
      // (1)      (9)
      //           (10)
      chai.expect(tree.get(tree.root, 6)).to.be.equal(tree.root);
    });

    it('should find the node if node exists in tree', () => {
      // Same tree as above ^
      [6, 3, 7, 9, 10, 1].map(i => tree.insert(tree.root, i));

      chai.expect(tree.get(tree.root, 9).data).to.be.equal(9);
      chai.expect(tree.get(tree.root, 1).data).to.be.equal(1);
    });
  });

  describe('.remove()', () => {
    let tree;
    beforeEach(() => {
      tree = new BinarySearchTree();
    });

    it('should remove nothing if tree is empty', () => {
      chai.expect(tree.size).to.be.equal(0);
      tree.remove(tree.root, 1);
      chai.expect(tree.size).to.be.equal(0);
    });

    it('should remove easily when node is the left leaf', () => {
      tree.insert(tree.root, 5);
      tree.insert(tree.root, 3);

      //   (5)
      // (3)
      tree.remove(tree.root, 3);
      chai.expect(tree.size).to.be.equal(1);
      chai.expect(tree.root.data).to.be.equal(5);
    });

    it('should remove easily when node is the right leaf', () => {
      tree.insert(tree.root, 5);
      tree.insert(tree.root, 6);

      //   (5)
      //     (6)
      tree.remove(tree.root, 6);
      chai.expect(tree.size).to.be.equal(1);
      chai.expect(tree.root.data).to.be.equal(5);
    });

    it('should remove when the node is the root', () => {
      tree.insert(tree.root, 5);

      tree.remove(tree.root, 5);
      chai.expect(tree.size).to.be.equal(0);
      chai.expect(tree.root).to.not.exist;
    });

    it('should not remove if node does not exist', () => {
      [6, 3, 7, 9, 10, 1].map(i => tree.insert(tree.root, i));
      chai.expect(tree.size).to.be.equal(6);
      tree.remove(tree.root, 99);
      chai.expect(tree.size).to.be.equal(6);
    });

    it('should remove when node has no children', () => {
      [5, 3, 7].map(i => tree.insert(tree.root, i));

      //    (5)
      // (3)  (7)
      tree.remove(tree.root, 7);
      chai.expect(tree.size).to.be.equal(2);
      chai.expect(tree.root.left.data).to.be.equal(3);
      chai.expect(tree.root.right).to.not.exist;
    });

    it('should remove when node has one child (left)', () => {
      [5, 3, 7, 6].map(i => tree.insert(tree.root, i));

      //   (5)
      // (3)  (7)
      //     (6)
      tree.remove(tree.root, 7);

      // Expected result:
      //
      //   (5)
      // (3) (6)
      chai.expect(tree.size).to.be.equal(3);
      chai.expect(tree.root.left.data).to.be.equal(3);
      chai.expect(tree.root.right.data).to.be.equal(6);
    });

    it('should remove when node has one child (right)', () => {
      [5, 3, 7, 8].map(i => tree.insert(tree.root, i));

      //   (5)
      // (3)  (7)
      //        (8)
      tree.remove(tree.root, 7);

      // Expected result:
      //
      //   (5)
      // (3) (8)
      chai.expect(tree.size).to.be.equal(3);
      chai.expect(tree.root.left.data).to.be.equal(3);
      chai.expect(tree.root.right.data).to.be.equal(8);
    });

    it('should remove when node has 2 children', () => {
      [5, 3, 7, 8, 6].map(i => tree.insert(tree.root, i));

      //    (5)
      // (3)   (7)
      //     (6) (8)
      tree.remove(tree.root, 7);

      // Expected result:
      //
      //    (5)
      // (3)   (8)
      //     (6)
      chai.expect(tree.size).to.be.equal(4);
      chai.expect(tree.root.left.data).to.be.equal(3);

      const right = tree.root.right;
      chai.expect(right.data).to.be.equal(8);
      chai.expect(right.left.data).to.be.equal(6);
    });

    it('should remove entire tree when removed in random order', () => {
      const nodes = [6, 3, 7, 9, 10, 1, 4, 19, 2];
      nodes.map(i => tree.insert(tree.root, i));

      //       (6)
      //    (3)    (7)
      // (1)  (4)    (9)
      //  (2)          (10)
      //                 (19)
      chai.expect(tree.size).to.be.equal(nodes.length);

      _.each(_.shuffle(nodes), (node, i) => {
        tree.remove(tree.root, node);
        chai.expect(tree.size).to.be.equal(nodes.length - (i + 1));
      });
      chai.expect(tree.size).to.be.equal(0);
      chai.expect(tree.root).to.not.exist;
    });
  });
});
