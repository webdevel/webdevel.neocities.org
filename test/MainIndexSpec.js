import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';
import { find } from 'lodash';
import chai, { assert, expect } from 'chai';
chai.should();
import MainIndex from '../src/js/MainIndex';

describe('MainIndex', function() {
  const testRenderer = TestRenderer.create(<MainIndex />);
  const testJSON = testRenderer.toJSON();

  it('Should contain main element', function() {
    testJSON.should.have.property('type');
    testJSON.type.should.match(/main/)
  });

  it('Should contain div element', function() {
    testJSON.should.have.property('children');
    testJSON.children.should.be.an('array');
    let child = find(testJSON.children, { type: 'div' });
    child.should.be.an('object');
    child.type.should.match(/div/);
  });

  it('Should contain section element', function() {
    let child = find(testJSON.children, { type: 'div' });
    let section = find(child.children, { type: 'section' });
    section.should.be.an('object');
    section.type.should.match(/section/);
  });
});
