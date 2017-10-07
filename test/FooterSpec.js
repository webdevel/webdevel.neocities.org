import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';
import { find } from 'lodash';
import chai, { assert, expect } from 'chai';
chai.should();
import Footer from '../src/js/Footer';

describe('Footer', function() {
  const testRenderer = TestRenderer.create(<Footer />);
  const testJSON = testRenderer.toJSON();

  it('Should contain footer element', function() {
    testJSON.should.have.property('type');
    testJSON.type.should.match(/footer/)
  });

  it('Should contain paragraph element', function() {
    testJSON.should.have.property('children');
    testJSON.children.should.be.an('array');
    let child = find(testJSON.children, { type: 'p' });
    child.should.be.an('object');
    child.type.should.match(/p/);
  });

  it('Should contain anchor element', function() {
    let child = find(testJSON.children, { type: 'p' });
    let anchor = find(child.children, { type: 'a' });
    anchor.should.be.an('object');
    anchor.type.should.match(/a/);
  });
});
