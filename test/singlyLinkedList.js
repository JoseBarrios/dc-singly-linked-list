"use strict"

var SinglyLinkedList = require("../index.js");
var assert = require("assert");

let list = new SinglyLinkedList()
list.insert(0);
list.insert(1);
list.insert(2);
list.insert(3);

describe("SinglyLinkedList", function () {

  describe("#insert()", function () {
    it("should add a node to the list", function () {
      let list = new SinglyLinkedList()
      assert.deepStrictEqual(list.insert(0), list.getNodeAtIndex(list.length-1));
      assert.deepStrictEqual(list.insert(1), list.getNodeAtIndex(list.length-1));
      assert.deepStrictEqual(list.insert(2), list.getNodeAtIndex(list.length-1));
      assert.deepStrictEqual(list.insert(3), list.getNodeAtIndex(list.length-1));
      assert.deepStrictEqual(list.insert("A", 1), list.getNodeAtIndex(1));
      assert.deepStrictEqual(list.insert("B", 3), list.getNodeAtIndex(3));
    });
  });

  describe("#search()", function () {
    it("should get the node with the indicated value", function () {
      assert.deepStrictEqual(list.search(0), list.getNodeAtIndex(0));
      assert.deepStrictEqual(list.search(1), list.getNodeAtIndex(1));
      assert.deepStrictEqual(list.search(2), list.getNodeAtIndex(2));
      assert.deepStrictEqual(list.search(3), list.getNodeAtIndex(3));
    });
  });



  describe("#getNodeAtIndex()", function () {
    it("should get the node at the indicated index", function () {
      assert.deepStrictEqual(list.getNodeAtIndex(3), list.search(3));
    });
  });


  describe("#deleteAtIndex()", function () {
    it("should delete the node with the indicated index", function () {
      let list = new SinglyLinkedList([0, 1, 2, 3, 4])
      let copy = list.search(2);
      assert.deepStrictEqual(list.deleteAtIndex(2), copy);
      assert.deepStrictEqual(list.search(2), null);
    });
  });


  describe("#getLastNode()", function () {
    it("should return the last node in the list", function () {
      let list = new SinglyLinkedList([0, 1, 2, 3, 4])
      assert.deepStrictEqual(list.getLastNode(), list.getNodeAtIndex(4));
    });
  });

  describe("#getIndexOfNode()", function () {
    it("should get the index of the specified node", function () {
      let list = new SinglyLinkedList([0, 1, 2, 3, 4])
      assert.deepStrictEqual(list.getIndexOfNode(list.getNodeAtIndex(2)), 2);
    });
  });

  describe("#containsCycle()", function () {
    it("should return true if theres a cyclical dependency", function () {
      let list = new SinglyLinkedList([0, 1, 2, 3, 4, 5, 6, 7])
      assert.deepStrictEqual(list.containsCycle(), false);
      list.getNodeAtIndex(5).next = list.getNodeAtIndex(3);
      assert.deepStrictEqual(list.containsCycle(), true);
      list.getNodeAtIndex(5).next = list.getNodeAtIndex(6);
    });
  });


  describe("list.size", function () {
    it("should return number of nodes in the list", function () {
      let list = new SinglyLinkedList()
      list.insert(0);
      list.insert(1);
      list.insert(2);
      list.insert(3);
      assert.deepStrictEqual(list.size, 4);
    });
  });

  describe("list.length", function () {
    it("should return number of indexes in the list", function () {
      let list = new SinglyLinkedList()
      list.insert(0);
      list.insert(1);
      list.insert(2);
      list.insert(3);
      assert.deepStrictEqual(list.length, 4);
    });
  });

  describe("list.model", function () {
    it("should return an array representation of the list", function () {
      let list = new SinglyLinkedList()
      list.insert(0);
      list.insert(1);
      list.insert(2);
      list.insert(3);
      assert.deepStrictEqual(list.model, [0, 1, 2, 3]);
    });
  });

  describe("constructor", function () {
    it("should create a linked list from an array", function () {
      let list = new SinglyLinkedList([0, 1, 2, 3, 4])
      assert.deepStrictEqual(list.model, [0, 1, 2, 3, 4]);
    });
  });





});