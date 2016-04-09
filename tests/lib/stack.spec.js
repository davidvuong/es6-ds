#!/usr/bin/env node

/**
 * es6-ds/tests/lib/stack.spec.js
 *
 * Copyright (c) 2016 David Vuong <david.vuong256@gmail.com>
 * Licensed MIT
 */
import chai from 'chai';
import Stack from '../../lib/stack';

describe('Stack', () => {
  describe('.push()', () => {
    let stack;
    beforeEach(() => {
      stack = new Stack();
    });

    it('should add to the end of the stack', () => {
      stack.push(1);
      stack.push(2);
      stack.push(3);
      chai.expect(stack.size).to.be.equal(3);
    });
  });

  describe('.pop()', () => {
    let stack;
    beforeEach(() => {
      stack = new Stack();
    });

    it('should remove the last element', () => {
      stack.push(1);
      stack.push(2);
      stack.push(3);
      chai.expect(stack.size).to.be.equal(3);

      stack.pop();
      stack.pop();
      chai.expect(stack.size).to.be.equal(1);
      chai.expect(stack.peak()).to.be.equal(1);
    });

    it('should not remove anything when empty', () => {
      chai.expect(stack.size).to.be.equal(0);
      stack.pop();
      chai.expect(stack.size).to.be.equal(0);
    });
  });

  describe('.peak()', () => {
    let stack;
    beforeEach(() => {
      stack = new Stack();
    });

    it('should not remove the last element', () => {
      stack.push(1);
      stack.push(2);
      chai.expect(stack.peak()).to.be.equal(2);
    });

    it('should not die when there are no elements', () => {
      chai.expect(stack.peak()).to.be.not.exist;
    });
  });
});
