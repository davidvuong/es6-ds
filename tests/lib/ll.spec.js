#!/usr/bin/env node
/**
 * es6-ds/tests/lib/ll.spec.js
 *
 * Copyright (c) 2016 David Vuong <david.vuong256@gmail.com>
 * Licensed MIT
 */
'use strict';
import chai from 'chai';
import _ from 'lodash';
import CircularLinkedList from '../../lib/ll';

describe('CircularLinkedList', () => {
    describe('.append()', () => {
        let list;
        beforeEach(() => {
            list = new CircularLinkedList();
        });

        it('should append when there are no elements', () => {
            chai.expect(list.size).to.be.equal(0);
            list.append(1);
            chai.expect(list.size).to.be.equal(1);
        });

        it('should append to the very end of the list', () => {
            chai.expect(list.size).to.be.equal(0);
            list.append(1);
            list.append(2);
            list.append(3);

            chai.expect(list.size).to.be.equal(3);
            chai.expect(list.tail_m.data).to.be.equal(3);
        });
    });

    describe('.get()', () => {
        let list;
        beforeEach(() => {
            list = new CircularLinkedList();
        });

        it('should return null if the list is empty', () => {
            chai.expect(list.size).to.be.equal(0);
            chai.expect(list.get(5)).to.not.exist;
        });

        it('should return null if the node cannot be found', () => {
            chai.expect(list.size).to.be.equal(0);
            list.append(1);
            chai.expect(list.size).to.be.equal(1);
            chai.expect(list.get(5)).to.not.exist;
        });

        it('should return the found node if exists', () => {
            list.append(100);
            chai.expect(list.size).to.be.equal(1);
            chai.expect(list.get(100).data).to.be.equal(100);
        });
    });
});
