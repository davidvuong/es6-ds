#!/usr/bin/env node
/**
 * data-structures/tests/lib/bst.spec.js
 *
 * Copyright (c) 2015 David Vuong <david.vuong256@gmail.com>
 * Licensed MIT
 */
'use strict';
import chai from 'chai';
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
            nodes.map((i) => { tree.insert(tree.root, i) });

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
});
