import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';
import { find } from 'lodash';
import chai, { assert, expect } from 'chai';
chai.should();
import Nav from '../src/js/Nav';

describe('Nav', function() {
  const testRenderer = TestRenderer.create(<Nav />);
  const testJSON = testRenderer.toJSON();

  it('Should contain nav element', function() {
    testJSON.should.have.property('type');
    testJSON.type.should.match(/nav/)
  });

  it('Should contain anchor element', function() {
    testJSON.should.have.property('children');
    testJSON.children.should.be.an('array');
    let child = find(testJSON.children, { type: 'a' });
    child.should.be.an('object');
    child.type.should.match(/a/);
  });
});
