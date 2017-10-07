import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';
import { find } from 'lodash';
import chai, { assert, expect } from 'chai';
chai.should();
import Header from '../src/js/Header';

describe('Header', function() {
  const testRenderer = TestRenderer.create(<Header />);
  const testJSON = testRenderer.toJSON();

  it('Should contain header element', function() {
    testJSON.should.have.property('type');
    testJSON.type.should.match(/header/)
  });

  it('Should contain heading element', function() {
    testJSON.should.have.property('children');
    testJSON.children.should.be.an('array');
    let child = find(testJSON.children, { type: 'h1' });
    child.should.be.an('object');
    child.type.should.match(/h1/);
  });

  it('Should contain paragraph element', function() {
    let child = find(testJSON.children, { type: 'p' });
    child.should.be.an('object');
    child.type.should.match(/p/);
  });
});
