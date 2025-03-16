/*
 * JavaScript LRU Cache(Least recently used cache)
 * We will design LRU Cache using Linked List from scratch and understand what is LRU Cache.
 */

/*
 * Node {
 *   next: Node | null
 *   prev: Node | null
 *   value: value
 *   key: key
 *}
 */

class LruCacheStore {
  constructor(maxStorage) {
    this.maxStorage = maxStorage;
    this.length = 0;
    this.map = new Map();
    this.head = null;
    this.tail = null;
  }

  $removeNode(node) {
    if (!node) return;

    if (node.prev) {
      node.prev.next = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev;
    }

    if (node == this.head) {
      this.head = node.next;
    }

    if (node == this.tail) {
      this.tail = node.prev;
    }

    this.map.delete(node.key);
  }

  get(key) {
    if (!this.map.has(key)) return null;

    const node = this.map.get(key);
    // remove the node
    this.$removeNode(node);
    // moving node forward
    node.prev = null;
    node.next = this.head;
    if (this.head !== null) {
      this.head.prev = node;
    }
    this.head = node;

    return node.value;
  }

  put(key, value) {
    // Check if storage is full
    if (this.length === this.maxStorage && !this.map.has(key)) {
      this.$removeNode(this.tail);
      this.length -= 1;
    }

    // if node already exist
    if (this.map.has(key)) {
      this.$removeNode(this.map.get(key));
    }
    // new node added
    const node = {
      next: this.head,
      prev: null,
      value,
      key,
    };

    // set value
    this.map.set(key, node);
    // update existing head and tail
    if (this.head !== null) this.head.prev = node;
    this.head = node;
    if (this.tail === null) {
      // initial node
      this.tail = node;
    }
    // update length
    this.length += 1;
  }

  printNode() {
    let current = this.head;
    const arr = [];
    while (current !== null) {
      arr.push(current);
      current = current.next;
    }

    return arr.reduce(
      (acc, curr) => (acc += `==>[[${curr.key}: ${curr.value}]] ==>`),
      ''
    );
  }
}

const cache = new LruCacheStore(4);
cache.put(1, 10);
cache.put(2, 20);
cache.get(1);
cache.put(3, 30);
cache.put(4, 40);
cache.put(5, 50);

console.log(cache.printNode());
