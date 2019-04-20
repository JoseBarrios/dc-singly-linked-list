"use strict"

var SinglyLinkedList = require("../index.js");
var assert = require("assert");

describe("SinglyLinkedList", function () {

  describe("constructor", function () {
    it("should create a linked list from an array", function () {
      let list = new SinglyLinkedList([0, 1, 2, 3, 4])
      assert.deepStrictEqual(list.adjacencyList, [0, 1, 2, 3, 4]);
    });
  });

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

  describe("#getNode()", function () {
    it("should get the node with the indicated value", function () {
      let list = new SinglyLinkedList()
      assert.equal(list.getNode("inexistant"), null);
      list.insert({complexData: true});
      list.insert("one");
      list.insert(2);
      assert.deepStrictEqual(list.getNode({complexData:true}), list.getNodeAtIndex(0));
      assert.deepStrictEqual(list.getNode("one"), list.getNodeAtIndex(1));
      assert.equal(list.getNode(2), list.getNodeAtIndex(2));
    });
  });

  describe("#getIndexOfData(data)", function () {
    it("should get the index of the node with matching data ", function () {
      let list = new SinglyLinkedList()
      list.insert({complexData: true});
      list.insert("one");
      list.insert(2);
      assert.equal(list.getIndexOfData("inexistant"), null);
      // assert.equal(list.getIndexOfData({complexData:true}), 0);
      assert.equal(list.getIndexOfData("one"), 1);
      assert.equal(list.getIndexOfData(2), 2);
    });
  });

  describe("#getNodeAtIndex()", function () {
    it("should get the node at the indicated index", function () {
      let list = new SinglyLinkedList()
      list.insert(0);
      list.insert(1);
      list.insert(2);
      list.insert(3);

      assert.deepStrictEqual(list.getNodeAtIndex(3), list.getNode(3));
    });
  });

  describe("#getIndexOfData()", function () {
    it("should get the node at the indicated index", function () {
      let list = new SinglyLinkedList()
      list.insert(0);
      assert.equal(list.getIndexOfData(0), 0);
      list.insert("one");
      assert.equal(list.getIndexOfData("one"), 1);
      list.insert({two:"dos"});
      assert.equal(list.getIndexOfData({two:"dos"}), 2);

    });
  });



  describe("#deleteAtIndex()", function () {
    it("should delete the node with the indicated index", function () {
      let list = new SinglyLinkedList([0, 1, 2, 3, 4])
      let copy = list.getNode(2);
      assert.deepStrictEqual(list.deleteAtIndex(2), copy);
      assert.deepStrictEqual(list.getNode(2), null);
    });
  });

  describe("#delete(data)", function () {
    it("should delete the node with the indicated index", function () {
      let list = new SinglyLinkedList()
      assert.equal(list.size, 0);
      list.delete("non-existant");
      assert.equal(list.size, 0);
      assert.equal(list.has(1), false)
      list.insert(1);
      assert.equal(list.has(1), true)
      list.delete(1);
      assert.equal(list.has(1), false)
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

  describe("list.isCircular", function () {
    it("should return true if theres a cyclical dependency", function () {
      let list = new SinglyLinkedList([0, 1, 2, 3, 4, 5, 6, 7])
      assert.deepStrictEqual(list.isCircular, false);
      list.getNodeAtIndex(5).next = list.getNodeAtIndex(3);
      assert.deepStrictEqual(list.isCircular, true);
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

  describe("list.adjacencyList", function () {
    it("should return an array representation of the list", function () {
      let list = new SinglyLinkedList()
      assert.deepStrictEqual(list.adjacencyList, []);
      const data1 = {"one":1};
      const data2 = {"two":2};
      const data3 = {"three":3};
      const data4 = {"four":4};
      list.insert(data1);
      list.insert(data2);
      list.insert(data3);
      list.insert(data4);
      assert.deepStrictEqual(list.adjacencyList, [data1, data2, data3, data4]);
    });
  });
});
