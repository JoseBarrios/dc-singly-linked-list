'use strict'


class SinglyLinkedList {

  static Node(data){
    let node = {};
    node.data = data || null;
    node.next = null;
    return node;
  }


  constructor(node){
    this.head = node || SinglyLinkedList.Node(0);
    this.length = 0;
  }



  insert(data, index){
    index = index || null;

    let newNode = SinglyLinkedList.Node(data);
    let currentNode = this.head;
    //Empty list
    if(!currentNode){
      this.head = newNode;
      this.length++;
    }
    //Non-empty list
    else if(index){
      let previous = this.getNodeAtIndex(index-1)
      let nextNode = previous.next;
      previous.next = newNode;
      newNode.next = nextNode;
      this.length++;
    }
    else{
      let lastNode = this.getLastNode();
      lastNode.next = newNode;
      this.length++;
    }

    return newNode;
  }

  print(){
    console.log(JSON.stringify(this, null, ' '))
  }


  deleteAtIndex(index){
    let prev = this.getNodeAtIndex(index-1);
    let target = this.getNodeAtIndex(index);
    let newNext = target.next;
    prev.next = newNext;
    target.next = null;
    this.length--;
    return target;
  }



  search(targetData){
    let targetNode = null;
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

  getLength(){
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

module.exports = SinglyLinkedList;

