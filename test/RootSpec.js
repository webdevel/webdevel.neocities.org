import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';
import { find } from 'lodash';
import chai, { assert, expect } from 'chai';
chai.should();
import Root from '../src/js/Root';

describe('Root', function() {
  const testRenderer = TestRenderer.create(<Root />);
  const testJSON = testRenderer.toJSON();

  it('Should contain div element', function() {
    testJSON.should.have.property('type');
    testJSON.type.should.match(/div/)
  });

  it('Should contain nav element', function() {
    testJSON.should.have.property('children');
    testJSON.children.should.be.an('array');
    let child = find(testJSON.children, { type: 'nav' });
    child.should.be.an('object');
    child.type.should.match(/nav/);
  });

  it('Should contain header element', function() {
    let child = find(testJSON.children, { type: 'header' });
    child.should.be.an('object');
    child.type.should.match(/header/);
  });

  it('Should contain footer element', function() {
    let child = find(testJSON.children, { type: 'footer' });
    child.should.be.an('object');
    child.type.should.match(/footer/);
  });
});
