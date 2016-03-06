#!/usr/bin/env node
/**
 * es6-ds/tests/lib/heap.spec.js
 *
 * Copyright (c) 2016 David Vuong <david.vuong256@gmail.com>
 * Licensed MIT
 */
'use strict';
import chai from 'chai';
import _ from 'lodash';
import BinaryHeap from '../../lib/heap';

describe('BinaryHeap', () => {
    describe('.insert()', () => {
        let heap;
        beforeEach(() => {
            heap = new BinaryHeap();
        });

        it('should insert when heap is empty', () => {
            chai.expect(heap.size).to.be.equal(0);
            heap.insert(1);
            chai.expect(heap.size).to.be.equal(1);
        });

        it('should insert when heap is not empty', () => {
            chai.expect(heap.size).to.be.equal(0);
            heap.insert(1);
            heap.insert(2);
            heap.insert(3);
            heap.insert(4);
            chai.expect(heap.size).to.be.equal(4);
        });

        it('should heap-up if the inserted element if smaller than parent', () => {
            chai.expect(heap.size).to.be.equal(0);
            //     (5)
            //   (9) (6)
            // (8)  <- inserted 8 (needs to bubble)
            //
            //     (5)
            //   (8)  (6)
            // (9)
            [5, 9, 6, 8].map(i => heap.insert(i));
            chai.expect(heap.size).to.be.equal(4);
            chai.expect(heap.nodes).to.be.deep.equal([null, 5, 8, 6, 9]);
        });

        it('should heap-up to root if inserted is smallest', () => {
            //        (10)
            //    (14)    (11)
            // (15) (17) (12)
            [10, 15, 12, 14, 17, 11].map(i => heap.insert(i));

            chai.expect(heap.nodes).to.be.deep.equal([null, 10, 14, 11, 15, 17, 12]);
            //        (3)
            //    (14)     (10)
            // (15) (17) (12) (11)
            heap.insert(3);
            chai.expect(heap.nodes).to.be.deep.equal([null, 3, 14, 10, 15, 17, 12, 11]);
        });
    });

    describe('.remove()', () => {
        let heap;
        beforeEach(() => {
            heap = new BinaryHeap();
        });

        it('should not remove when there are no nodes', () => {
            chai.expect(heap.size).to.be.equal(0);
            chai.expect(heap.remove()).to.not.exist;
            chai.expect(heap.size).to.be.equal(0);
        });

        it('should not remove when there is one node', () => {
            heap.insert(1);
            chai.expect(heap.size).to.be.equal(1);
            chai.expect(heap.remove()).to.be.equal(1);
            chai.expect(heap.size).to.be.equal(0);
        });

        it('should not remove when there are two nodes', () => {
            heap.insert(1);
            heap.insert(2);
            chai.expect(heap.size).to.be.equal(2);
            chai.expect(heap.remove()).to.be.equal(1);
            chai.expect(heap.size).to.be.equal(1);
        });

        it('should not remove when there are 3 or more', () => {
            heap.insert(1);
            heap.insert(2);
            heap.insert(3);
            heap.insert(0);
            chai.expect(heap.size).to.be.equal(4);
            chai.expect(heap.remove()).to.be.equal(0);
            chai.expect(heap.size).to.be.equal(3);
        });

        it('should not remove when in sorted order (ascending)', () => {
            const nodes =  _.shuffle(_.range(100));
            nodes.map(i => heap.insert(i));
            chai.expect(heap.size).to.be.equal(nodes.length);

            const removedNodes = [];
            _.each(_.range(nodes.length), () => {
                removedNodes.push(heap.remove());
            });
            chai.expect(_.sortBy(nodes)).to.be.deep.equal(removedNodes);
        });
    });
});
