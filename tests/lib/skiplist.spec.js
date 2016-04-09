#!/usr/bin/env node

/**
 * es6-ds/tests/lib/skiplist.spec.js
 *
 * Copyright (c) 2016 David Vuong <david.vuong256@gmail.com>
 * Licensed MIT
 */
import chai from 'chai';
import _ from 'lodash';
import SkipList from '../../lib/skiplist';

describe('SkipList', () => {
  describe('.insert()', () => {
    let list;
    beforeEach(() => {
      list = new SkipList();
    });

    function _getBottomLevel() {
      const nodes = [];
      let position = list.head_0_m;
      while (position) {
        nodes.push(position.data);
        position = position.right;
      }
      return nodes;
    }

    it('should insert when there are no nodes', () => {
      list.insert(1);

      chai.expect(list.size).to.be.equal(1);
      chai.expect(list.head_m.data).to.not.exist;
      chai.expect(list.head_m.right.data).to.be.equal(1);
      chai.expect(list.head_m.right.right.data).to.not.exist;
    });

    it('should insert when there is one node', () => {
      [1, 2].map(i => list.insert(i));

      const nodes = _getBottomLevel(list);
      chai.expect(list.size).to.be.equal(2);
      chai.expect(nodes).to.be.deep.equal([null, 1, 2, null]);
    });

    it('should insert when there is more than one node', () => {
      [1, 2, 3].map(i => list.insert(i));

      const nodes = _getBottomLevel(list);
      chai.expect(list.size).to.be.equal(3);
      chai.expect(nodes).to.be.deep.equal([null, 1, 2, 3, null]);
    });

    it('should insert and maintain an ascending order', () => {
      const insertNodes = [5, 6, 2, 3, 1, 0, 9, 7];
      insertNodes.map(i => list.insert(i));

      const nodes = _getBottomLevel(list);
      const compareNodes = nodes.sort();
      compareNodes.unshift(null);
      compareNodes.push(null);

      chai.expect(list.size).to.be.equal(insertNodes.length);
      chai.expect(nodes).to.be.deep.equal(compareNodes);
    });
  });

  describe('.get()', () => {
    let list;
    beforeEach(() => {
      list = new SkipList();
    });

    it('should get node when node exists', () => {
      const insertNodes = [5, 6, 2, 3, 1, 0, 9, 7];
      insertNodes.map(i => list.insert(i));

      chai.expect(list.get(2).data).to.be.equal(2);
    });

    it('should get null when the list is empty', () => {
      chai.expect(list.size).to.be.equal(0);
      chai.expect(list.get(2)).to.not.exist;
    });

    it('should get null when node does not exist', () => {
      const insertNodes = [5, 6, 2, 3, 1, 0, 9, 7];
      insertNodes.map(i => list.insert(i));

      chai.expect(list.size).to.be.equal(insertNodes.length);
      chai.expect(list.get(1000)).to.not.exist;
    });
  });

  describe('.remove()', () => {
    let list;
    beforeEach(() => {
      list = new SkipList();
    });

    it('should not remove when list is empty', () => {
      chai.expect(list.size).to.be.equal(0);
      chai.expect(list.remove(-1)).to.be.equal(false);
    });

    it('should not remove when node not in list', () => {
      list.insert(0);

      chai.expect(list.size).to.be.equal(1);
      chai.expect(list.remove(-1)).to.be.equal(false);
    });

    it('should remove when the only one node', () => {
      list.insert(0);

      chai.expect(list.size).to.be.equal(1);
      chai.expect(list.remove(0)).to.be.equal(true);
    });

    it('should remove when there are multiple nodes', () => {
      [1, 5, 7, 9].map(i => list.insert(i));
      chai.expect(list.size).to.be.equal(4);
      chai.expect(list.remove(1)).to.be.equal(true);
    });

    it('should remove all nodes when randomly inserted and removed', () => {
      const nodes = _.shuffle(_.range(100));
      nodes.map(i => list.insert(i));

      chai.expect(list.size).to.be.equal(nodes.length);
      _.shuffle(nodes).map(i => list.remove(i));
      chai.expect(list.size).to.be.equal(0);
    });
  });
});
