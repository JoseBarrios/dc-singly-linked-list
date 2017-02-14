'use strict'

var SinglyLinkedList = require('../index.js');
var assert = require('assert');

var list = new SinglyLinkedList(0)
let node1 = list.insert(1);
//let node2 = list.insert(2);
//let node3 = list.insert(3);
let node4 = list.insert(4);
let node5 = list.insert(5);

//Correct outputs
//const CORRECT_MAX_DEPTH = 3;


describe('SinglyLinkedList', function() {

  describe('#insert()', function() {
    it('should add a node to the list', function() {
      assert.deepStrictEqual(list.insert(6), list.getNodeAtIndex(list.getLength()));
      assert.deepStrictEqual(list.insert(7), list.getNodeAtIndex(list.getLength()));
      assert.deepStrictEqual(list.insert(8), list.getNodeAtIndex(list.getLength()));
      assert.deepStrictEqual(list.insert(9), list.getNodeAtIndex(list.getLength()));
      assert.deepStrictEqual(list.insert(10), list.getNodeAtIndex(list.getLength()));
      assert.deepStrictEqual(list.insert(2, 2), list.getNodeAtIndex(2));
      assert.deepStrictEqual(list.insert(3, 3), list.getNodeAtIndex(3));

    });
  });

  describe('#search()', function() {
    it('should get the node with the indicated value', function() {
      assert.deepStrictEqual(list.search(5), list.getNodeAtIndex(5));
      assert.deepStrictEqual(list.search(6), list.getNodeAtIndex(6));
    });
  });


  describe('#getIndexOfNode()', function() {
    it('should get the index of the specified node', function() {
      assert.deepStrictEqual(list.getIndexOfNode(node5), 5);
    });
  });


  describe('#getNodeAtIndex()', function() {
    it('should get the node at the indicated index', function() {
      assert.deepStrictEqual(list.getNodeAtIndex(3), list.search(3));
    });
  });

  describe('#getLength()', function() {
    it('should return number of nodes in the list', function() {
      assert.deepStrictEqual(list.getLength(), 10);
    });
  });



  describe('#deleteAtIndex()', function() {
    it('should delete the node with the indicated index', function() {
      let copy = list.search(5);
      assert.deepStrictEqual(list.deleteAtIndex(5), copy);
    });
  });


  describe('#getLastNode()', function() {
    it('should return the last node in the list', function() {
      assert.deepStrictEqual(list.getLastNode(), list.getNodeAtIndex(10));
    });
  });

  describe('#containsCycle()', function() {
    it('should return true if theres a cyclical dependency', function() {
      assert.deepStrictEqual(list.containsCycle(), false);
      list.getNodeAtIndex(5).next = list.getNodeAtIndex(3);
      assert.deepStrictEqual(list.containsCycle(), true);
    });
  });

});

