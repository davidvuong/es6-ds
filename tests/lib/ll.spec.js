#!/usr/bin/env node

/**
 * es6-ds/tests/lib/ll.spec.js
 *
 * Copyright (c) 2016 David Vuong <david.vuong256@gmail.com>
 * Licensed MIT
 */
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
      chai.expect(list.tail.data).to.be.equal(3);
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

  describe('.remove()', () => {
    let list;
    beforeEach(() => {
      list = new CircularLinkedList();
    });

    it('should not remove when node does not exist', () => {
      list.append(1);
      chai.expect(list.size).to.be.equal(1);

      list.remove(0);
      chai.expect(list.size).to.be.equal(1);
    });

    it('should not remove when list of empty', () => {
      chai.expect(list.size).to.be.equal(0);
      list.remove(0);
      chai.expect(list.size).to.be.equal(0);
    });

    it('should remove when data is a node', () => {
      list.append(1);
      chai.expect(list.size).to.be.equal(1);
      list.remove(list.get(1));
      chai.expect(list.size).to.be.equal(0);
    });

    it('should remove when data is a primitive', () => {
      list.append(1);
      chai.expect(list.size).to.be.equal(1);
      list.remove(1);
      chai.expect(list.size).to.be.equal(0);
    });

    it('should remove when node is the head', () => {
      [1, 2, 3, 4, 5].map(i => list.append(i));
      chai.expect(list.size).to.be.equal(5);
      list.remove(1);
      chai.expect(list.size).to.be.equal(4);
    });

    it('should remove when node is the tail', () => {
      [1, 2, 3, 4, 5].map(i => list.append(i));
      chai.expect(list.size).to.be.equal(5);
      list.remove(5);
      chai.expect(list.size).to.be.equal(4);
    });

    it('should remove when is in the middle', () => {
      [1, 2, 3, 4, 5].map(i => list.append(i));
      chai.expect(list.size).to.be.equal(5);
      list.remove(3);
      chai.expect(list.size).to.be.equal(4);

      list.remove(2);
      chai.expect(list.size).to.be.equal(3);
    });

    it('should remove all nodes in random order', () => {
      const nodes = _.range(100);
      nodes.map(i => list.append(i));
      chai.expect(list.size).to.be.equal(nodes.length);

      _.each(_.shuffle(nodes), (n, i) => {
        list.remove(n);
        chai.expect(list.size).to.be.equal(nodes.length - (i + 1));
      });
      chai.expect(list.size).to.be.equal(0);
    });
  });
});
