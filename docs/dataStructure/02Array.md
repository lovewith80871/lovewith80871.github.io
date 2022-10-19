# Array

## Operation with time complexity

- Look up -> O(1)
- Push -> O(1)
- Insert -> O(n)
- Delete -> O(n)

```javascript
const strings = ['a', 'b', 'c', 'd'];

console.log(strings[0]); // O(1)
// 'a'

// push
strings.push('e'); // O(1)
// [a,b,c,d,e]

// pop
strings.pop();
strings.pop(); // O(1)
// [a,b,c]

// unshift
strings.unshift('x'); //O(n)
//process
// [a, b, c]
//. 0. 1. 2
// insert
// [x, a, b, c]
//     0, 1, 2
// shiftit
// [x, a, b, c]
//  0. 1. 2. 3

//splice
strings.splice(2, 0, 'alien'); //O(n)
// [x, a, alien, b, c]
```

---

## Static vs Dynamic array

較低的程式語言會使用 staitc array 例如 c or c++。<br/>
較高階的語言會使用 dynamic array 例如 javascript or ruby。<br/>
static array 在定義的時候就會給他固定大小，但是 dynamic 的 array 在定義的時候 並不會有固定大小。<br/>
所以在 static array push 的時候，時間都是 **O(1)**，但是 dynamic 可能是 **O(n) or O(1)**，
原因是因為 dynamic 的 array 在定義的時候還是會有一個固定大小，若 push 的時候超過這個大小時，就會另外生出一個大一點的 array 再將舊的 array 依序放入新 array，然後再將 push 值塞入，最後再將舊 array 刪除。

---

## How to build Array (use class)

```javascript
class MyArray {
  constructor() {
    this.length = 0;
    this.data = {};
  }

  get(index) {
    return this.data[index];
  }

  push(item) {
    this.data[this.length] = item;
    this.length++;
    return this.length;
  }

  pop() {
    const lastItem = this.data[this.length - 1];
    delete this.data[this.length - 1];
    this.length--;
    return lastItem;
  }

  delete(index) {
    const item = this.data[index];
    this._shiftItems(index);
  }

  _shiftItems(index) {
    for (let i = index; i < this.length - 1; i++) {
      this.data[index] = this.data[index + 1];
    }
    delete this.data[this.length - 1];
    this.length--;
  }
}

const newArray = new MyArray();
newArray.push('Hi');
newArray.push('you');
newArray.push('!');
newArray.delete(1);
console.log(newArray);
```

---

## Q1 reverse string

```javascript
function reverse(str) {
  if (!str || typeof str != 'string' || str.length < 2) return str;

  const backwards = [];
  const totalItems = str.length - 1;
  for (let i = totalItems; i >= 0; i--) {
    backwards.push(str[i]);
  }
  return backwards.join('');
}

function reverse2(str) {
  //check for valid input
  return str.split('').reverse().join('');
}

const reverse3 = (str) => [...str].reverse().join('');

reverse('Timbits Hi');
reverse('Timbits Hi');
reverse3('Timbits Hi');
```

---

## Q2 merge sorted array

```javascript
function mergeSortedArray(arr1, arr2) {
  if (arr1.length === 0) {
    return arr2;
  }
  if (arr2.length === 0) {
    return arr1;
  }
  let p1 = 0;
  let p2 = 0;
  let res = [];
  while (arr1[p1] || arr2[p2]) {
    if (!arr2[p2] || arr1[p1] < arr2[p2]) {
      // !arr2[p2] is really cool way to use
      res.push(arr1[p1]);
      p1++;
    } else {
      res.push(arr2[p2]);
      p2++;
    }
  }
  return res;
}

const a = mergeSortedArray([1, 2, 3, 4, 5, 6, 7], [4, 6, 30]);
console.log(a);
```

---

## Pros and Cons

- pros
  - Fast lookups
  - fast push/pop
  - ordered
- cons
  - slow inserts
  - slow deletes
  - fixed size (if use static array)
