# Recurision

## 特性

- Recursion 是指 function 本身呼叫自身 function。
- 若 無止盡的呼叫自身 function 則會造成 stack overflow

Try to write one

```javascript
let counter = 0;
function inception() {
  if (counter > 3) {
    return 'done';
  }
  counter++;
  inception(); //
}
inception();
```

上面這則 recurision 有什麼問題嗎？
A: 他只有在最裡層的時候會 return 'done'，開始往外層傳遞時，就不會在 return done 了。故需要注意 最後 return 的 value 需要一直往最外層帶，可以改成如以下。

```javascript
let counter = 0;
function inception() {
  if (counter > 3) {
    //if counter > 3; base case
    return 'done';
  }
  counter++;
  return inception(); // if counter < 3; recurisive case
}
inception();
```

**_在寫 recurision 要注意以下三件事_**

- Identify the **base case**
- Identify the **recurisive case**
- get closer and closer and return when needed. **Usually you have 2 returns**

---

## Recursion vs Iterative

Anything you do with a recursion CAN be done iteratively (loop)

Recursion 可以讓 code 看起來更 簡潔有力、易讀。但是重複的 recursion 會讓 stack size 越來越大。 在 不知道 data structure 多深多大的情況，用 recursion 去 loop 是比較好的方式（例如 tree traversal）

---

## When to use recursion

**every time you are useing a tree or converting Something into a tree, consider recursion.**

---

## Exapmple

Fibonacci

<details><summary>Click me show the codes</summary>
<p>

```javascript
// Given a number N return the index value of the Fibonacci sequence, where the sequence is:

// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144 ...
// the pattern of the sequence is that each value is the sum of the 2 previous values, that means that for N=5 → 2+3

//For example: fibonacciRecursive(6) should return 8

function fibonacciRecursive(n) {
  // Recursive for Big-O (2^n)
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

const b = fibonacciRecursive(10);
console.log(b);

function fibonacciIterative(n) {
  // Iterative for Big-O(n)
  if (n === 0) return 0;
  if (n === 1) return 1;
  let a = 0;
  let b = 1;
  let c = a + b;
  for (let i = 2; i < n; i++) {
    const tmp = c;
    c = c + b;
    b = tmp;
  }
  return c;
}
const a = fibonacciIterative(10);
console.log(a);
```

</p>
</details>

Reverse string

<details><summary>Click me show the codes</summary>
<p>

```javascript
//Implement a function that reverses a string using iteration...and then recursion!
function reverseString(str) {
  let str_split = str.split('');
  let res = [];
  for (let i = str_split.length - 1; i >= 0; i--) {
    res.push(str_split[i]);
  }
  return res.join('');
}

function reverseStringRecursion(str, stack = []) {
  if (str.split('').length === 0) {
    return stack.join('');
  }
  const str_split = str.split('');
  const tmp = str_split.pop();
  const lastStr = str_split.join('');
  stack.push(tmp);
  return reverseStringRecursion(lastStr, stack);
}

console.log(reverseStringRecursion('yoyo mastery'));

//should return: 'yretsam oyoy'
```

</p>
</details>

Factories

<details><summary>Click me show the codes</summary>
<p>

```javascript
// Write two functions that finds the factorial of any number. One should use recursive, the other should just use a for loop

// 5! = 5*4*3*2*1

function findFactorialRecursive(number) {
  if (number > 0) {
    return number * findFactorialRecursive(number - 1);
  }
  return 1;
}
console.log(findFactorialRecursive(5));

function findFactorialIterative(number) {
  let answer = 1;
  for (let i = number; i > 0; i--) {
    answer = answer * i;
  }
  return answer;
}
```

</p>
</details>

---

## Review

**recursion is interesting and clever, but can be costly.** and any thing you do with recursion can also use in Iterative

some times we use recursion to make thing simpler

- Merge sort
- quick sort
- trree traversal
- graph traversal
