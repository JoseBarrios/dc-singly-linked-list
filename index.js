"use strict"

class SinglyLinkedListNodeDataController {

  constructor(data){
    this.type = "singly-linked-list-node";
    this.model = {};
    this.model.data = data;
    this.model.next = new WeakMap();
  }

  get data(){ return this.model.data; }
  set data(value){ this.model.data = value;}

  get next(){ return this.model.next.get(this); }
  set next(node){ this.model.next.set(this, node); }
}

class SinglyLinkedListDataController {

  constructor(model){
    this.head = null;
    this.model = model;
    this.type = "singly-linked-list"
  }

  get model(){
    const nodes = [];
    let currentNode = this.head;
    nodes.push(currentNode.data);
    while(currentNode.next){
      currentNode = currentNode.next;
      nodes.push(currentNode.data);
    }
    return nodes;
  }

  set model(data){
    data = data || [];
    data.forEach(datum => {this.insert(datum)});
  }

  insert(data, index){
    index = index || null;
    let newNode = new SinglyLinkedListNodeDataController(data);
    let currentNode = this.head;

    //Empty list
    if(!currentNode){
      this._insertHead(newNode)
    }
    //Has index 
    else if(index){
      this._insert(newNode, index);
    }
    else{ // insert at the end
      this._insertTail(newNode);
    }

    return newNode;
  }

  _insertHead(node){
    this.head = node;
  }

  _insert(node, index){
    const previous = this.getNodeAtIndex(index - 1);
    const nextNode = previous.next;
    previous.next = node;
    node.next = nextNode;
  }

  _insertTail(node){
    const lastNode = this.getLastNode();
    lastNode.next = node;
  }


  deleteAtIndex(index){
    let prev = this.getNodeAtIndex(index-1);
    let target = this.getNodeAtIndex(index);
    let newNext = target.next;
    prev.next = newNext;
    target.next = null;
    return target;
  }

  search(targetData){
    let targetNode = null;
    if(this.head.data === targetData){
      return this.head;
    }

    let currentNode = this.head;
    while(currentNode.next){
      currentNode = currentNode.next;
      if(currentNode.data === targetData){
        targetNode = currentNode;
        break;
      }
    }
    return targetNode;
  }





  //HELPERS
  getLastNode(){
    let currentNode = this.head;
    while(currentNode.next){ currentNode = currentNode.next; }
    return currentNode;
  }

  get size(){
    if(this.head === null) return 0;
    let size = 1;
    let currentNode = this.head;
    while(currentNode.next){
      currentNode = currentNode.next;
      size++;
    }
    return size;
  }

  get length(){
    let length = 0;
    let currentNode = this.head;
    while(currentNode.next){
      currentNode = currentNode.next;
      length++;
    }
    return length;
  }


  getNodeAtIndex(i){
    let currentNode = this.head;
    while(currentNode.next && i > 0){
      currentNode = currentNode.next;
      i--;
    }
    return currentNode;
  }

  containsCycle(){
    let isCyclical = false;
    let slowWalker = this.head;
    let fastWalker = this.head;

    while(fastWalker && fastWalker.next){
      slowWalker = slowWalker.next;
      fastWalker = fastWalker.next.next;
      if(slowWalker === fastWalker){
        isCyclical = true;
        break;
      }
    }
    return isCyclical
  }

  //Maybe merge with search?
  getIndexOfNode(node){
    let index = 0;
    let result = null;
    let currentNode = this.head;
    while(currentNode.next){
      index++;
      currentNode = currentNode.next;
      if(currentNode === node){
        result = index;
        break;
      }
    }
    return result;
  }

}

module.exports = SinglyLinkedListDataController;

