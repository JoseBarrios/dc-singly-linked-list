"use strict"

const ThingDataController = require("dc-thing");

class SinglyLinkedListNodeDataController extends ThingDataController {

  constructor(data){
    super();
    this.type = "singly-linked-list-node";
    this._next = new WeakMap();
    this.data = data;
  }

  get next(){ return this._next.get(this); }
  set next(node){ this._next.set(this, node); }
}

class SinglyLinkedListDataController extends ThingDataController{

  constructor(model) {
    super(model);
    this.head = null;
    this.adjacencyList  = model;
    this.type = "singly-linked-list"
  }

  get adjacencyList() {
    const nodes = [];
    if(!this.head) return nodes;

    nodes.push(this.head.data);
    let currentNode = this.head;
    while (currentNode.next) {
      currentNode = currentNode.next;
      nodes.push(currentNode.data);
    }
    return nodes;
  }

  set adjacencyList(data) {
    data = data || [];
    data.forEach(datum => {
      this.insert(datum);
    });
  }

  insert(data, index) {
    index = index || null;
    let newNode = new SinglyLinkedListNodeDataController(data);
    let currentNode = this.head;

    //Empty list
    if (!currentNode) {
      this._insertHead(newNode);
    }
    //Has index
    else if (index) {
      this._insert(newNode, index);
    } else {
      // insert at the end
      this._insertTail(newNode);
    }

    return newNode;
  }

  _insertHead(node) {
    this.head = node;
  }

  _insert(node, index) {
    const previous = this.getNodeAtIndex(index - 1);
    const nextNode = previous.next;
    previous.next = node;
    node.next = nextNode;
  }

  _insertTail(node) {
    const lastNode = this.getLastNode();
    lastNode.next = node;
  }

  delete(data) {
    if(ThingDataController.lodash.isEqual(this.head.data, data)){
      this.head = null;
    }
    else{
      const index = this.getIndexOfData(data);
      let prev = this.getNodeAtIndex(index - 1);
      let target = this.getNodeAtIndex(index);
      let newNext = target.next;
      prev.next = newNext;
      target.next = null;
    }
  }

  deleteAtIndex(index) {
    let prev = this.getNodeAtIndex(index - 1);
    let target = this.getNodeAtIndex(index);
    let newNext = target.next;
    prev.next = newNext;
    target.next = null;
    return target;
  }

  getNode(targetData) {

    if(!this.head) return null;

    if (ThingDataController.lodash.isEqual(this.head.data, targetData)) {
      return this.head;
    }

    let targetNode = null;
    let currentNode = this.head;
    while (currentNode.next) {
      currentNode = currentNode.next;
      if (ThingDataController.lodash.isEqual(currentNode.data, targetData)) {
        targetNode = currentNode;
        break;
      }
    }
    return targetNode;
  }

  has(targetData) {

    if(!this.head) return false;

    if (ThingDataController.lodash.isEqual(this.head.data, targetData)) {
      return true;
    }

    let result = false;
    let currentNode = this.head;
    while (currentNode.next) {
      currentNode = currentNode.next;
      if (ThingDataController.lodash.isEqual(currentNode.data, targetData)) {
        result = true;
        break;
      }
    }
    return result;
  }


  //HELPERS
  getLastNode() {
    let currentNode = this.head;
    while (currentNode.next) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  get size() {
    if (this.head === null) return 0;
    let size = 1;
    let currentNode = this.head;
    while (currentNode.next) {
      currentNode = currentNode.next;
      size++;
    }
    return size;
  }

  get length() {
    return this.size;
  }

  getNodeAtIndex(targetIndex) {
    if(!this.head) return null;
    if(targetIndex === 0) return this.head;

    let currentNode = this.head;
    for (let i = 0; i < targetIndex; i++) {
      currentNode = currentNode.next ? currentNode.next : null;
    }
    return currentNode;
  }



  get isCircular() {
    let isCyclical = false;
    let slowWalker = this.head;
    let fastWalker = this.head;

    while (fastWalker && fastWalker.next) {
      slowWalker = slowWalker.next;
      fastWalker = fastWalker.next.next;
      if (slowWalker === fastWalker) {
        isCyclical = true;
        break;
      }
    }
    return isCyclical;
  }

  //Maybe merge with search?
  getIndexOfNode(node) {
    if(!this.head) return null;

    let index = 0;
    if (ThingDataController.lodash.isEqual(this.head, node)) {
      return index;
    }

    let result = null;
    let currentNode = this.head;
    while (currentNode.next) {
      index++;
      currentNode = currentNode.next;
      if (ThingDataController.lodash.isEqual(currentNode, node)) {
        result = index;
        break;
      }
    }
    return result;
  }

  getIndexOfData(data) {
    if(!this.head) return null

    let index = 0;
    if (ThingDataController.lodash.isEqual(this.head.data, data)) {
      return index;
    }

    let result = null;
    let currentNode = this.head;
    while (currentNode.next) {
      currentNode = currentNode.next;
      index++;
      if (ThingDataController.lodash.isEqual(currentNode.data, data)) {
        result = index;
        break;
      }
    }
    return result;
  }

}

module.exports = SinglyLinkedListDataController;

