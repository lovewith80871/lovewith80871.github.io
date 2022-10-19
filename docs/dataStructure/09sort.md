# Sort

## Bubble sort

<details> <summary> Click me show the codes </summary>
<p>

```javascript
const numbers = [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0];

function bubbleSort(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        const tmp = array[j + 1];
        array[j + 1] = array[j];
        array[j] = tmp;
      }
    }
  }
}

bubbleSort(numbers);
console.log(numbers);
```

</p>

</details>

---

## Selection sort

[原理影片](https://visualgo.net/en/sorting)

- 每次 loop array 找到第 n 小的 放到 array 第 n 個位置。

<details> <summary> Click me show the codes </summary>

<p>

```javascript
const numbers = [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0];

function selectionSort(array) {
  for (let i = 0; i < array.length; i++) {
    let min = array[i];
    let index = i;
    for (let j = i; j < array.length; j++) {
      if (array[j] < min) {
        min = array[j];
        index = j;
      }
    }
    let tmp = array[i];
    array[i] = min;
    array[index] = tmp;
  }
  return array;
}

console.log(selectionSort(numbers));
```

</p>

</details>

---

## Insertion sort

[原理影片](https://visualgo.net/en/sorting)

<details><summary>Click me show the codes</summary>
<p>

```javascript
const numbers = [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0];

function insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    if (array[i] < array[i - 1]) {
      for (let j = i; j > 0; j--) {
        if (array[i] < array[0]) {
          array.unshift(array.splice(i, 1)[0]);
        } else if (array[i] > array[j - 1] && array[i] < array[j]) {
          array.splice(j, 0, array.splice(i, 1)[0]);
        }
      }
    }
  }
}

insertionSort(numbers);
console.log(numbers);
```

</p>
</details>

---

## Merge sort

[原理影片](https://visualgo.net/en/sorting)

<details><summary>Click me show the codes</summary>
<p>

```javascript
const numbers = [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0];
// const numbers = [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0]

function mergeSort(array) {
  if (array.length === 1) {
    return array;
  }
  // Split Array in into right and left
  let left, right;
  if (array.length % 2 === 0) {
    left = array.slice(0, array.length / 2);
    right = array.slice(array.length / 2, array.length);
  } else {
    left = array.slice(0, array.length / 2 + 1);
    right = array.slice(array.length / 2 + 1, array.length);
  }
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let indexL = 0;
  let indexR = 0;
  let res = [];
  while (!isNaN(right[indexR]) || !isNaN(left[indexL])) {
    if (isNaN(right[indexR]) || left[indexL] < right[indexR]) {
      res.push(left[indexL]);
      indexL++;
    } else {
      res.push(right[indexR]);
      indexR++;
    }
  }
  return res;
}

const answer = mergeSort(numbers);
console.log(answer);
```

</p>
</details>

---

## Stable sorting vs Unstableˋ sorting

### Stable:

sorting 前 arr[i] === arr[j] 且 i < j，sorting 後原先的位置順序並不會交換，故 arr[afterI] === arr[afterJ] 且 afterI < afterJ。
ex: bubble, selection, insertion, merge

### Unstable:

sorting 後順序位置可能會交換。
Ex: quick, heap

---

## Quick sort

- 原理：參照小灰程序員裡面寫的

<details> <summary> Click me show the codes </summary>
<p>

```javascript
// const numbers = [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0];
const numbers = [99, 44, 6, 2, 1];

function quickSort(array, left, right) {
  if (left >= right) return;
  const piv = partion(array, left, right);
  quickSort(array, 0, piv - 1);
  quickSort(array, piv + 1, right);
}

function partion(array, left, right) {
  ////單邊排序
  const piv = array[left];
  let mark = left;
  for (let i = left + 1; i <= right; i++) {
    if (array[i] < piv) {
      mark = mark + 1;
      const tmp = array[i];
      array[i] = array[mark];
      array[mark] = tmp;
    }
  }
  const first = array[left];
  array[left] = array[mark];
  array[mark] = first;
  console.log(array);
  return mark;
}

//Select first and last index as 2nd and 3rd parameters
quickSort(numbers, 0, numbers.length - 1);
// console.log(numbers)
// console.log(numbers);
```

</p>
</details>

---

## Heap sort

[原理](https://brilliant.org/wiki/heap-sort/)

<details> <summary> Click me show the codes </summary>
<p>

```javascript
const numbers = [3, 52, 63, 12, 43, 25, 64, 34, 7, 14];

function heapSort(numbers) {
  // create heap
  for (let i = 0; i < numbers.length; i++) {
    let current = numbers[i];
    let currentIndex = i;
    let parentIndex = findParent(i);
    while (current > numbers[parentIndex] && currentIndex > 0) {
      numbers[currentIndex] = numbers[parentIndex];
      numbers[parentIndex] = current;
      currentIndex = parentIndex;
      parentIndex = findParent(parentIndex);
    }
  }
  // console.log(numbers)
  for (let i = numbers.length - 1; i > 0; i--) {
    console.log(numbers);
    const big = numbers[0];
    numbers[0] = numbers[i];
    numbers[i] = big;
    let currentIndex = 0;
    while (currentIndex < i) {
      let leftIndex = 2 * currentIndex + 1;
      let rightIndex = 2 * currentIndex + 2;
      if (rightIndex >= i) {
        break;
      }
      if (numbers[rightIndex] > numbers[leftIndex]) {
        const tmp = numbers[currentIndex];
        numbers[currentIndex] = numbers[rightIndex];
        numbers[rightIndex] = tmp;
        currentIndex = rightIndex;
      } else {
        const tmp = numbers[currentIndex];
        numbers[currentIndex] = numbers[leftIndex];
        numbers[leftIndex] = tmp;
        currentIndex = leftIndex;
      }
    }
  }
  console.log(numbers);
  return numbers;
}

heapSort(numbers);

function findParent(i) {
  if (i === 0) return 0;
  return Math.floor((i - 1) / 2);
}
```

</p>
</details>

---

## Which sort is the best

- Bubble - 不會用到，基本上只有在教學時才用到。
- Selection - 跟上述一樣。
- Insertion - 在數量很小的情況，或是基本上大小已經差不多都排好的情況下
- Merge - 在不 care space complexity 的請況下 適合使用它。 （space complexity O(n)）
- Quick - 很多情況都適合使用它，space complexit 只有 O(log n)。不過 the worst time complexity 是 O(n^2)，如果 piviot 沒選好的話，就會是 O(n^2)。 不過大部分情況 quick 都比 merge or heap 還快，因為他沒有做過多的 swap 的動作。

<!-- <img src="./sort_complexity.png" width="600"> -->

---

## Exercise

```javascript
//#1 - Sort 10 schools around your house by distance:
ans = 'use insertion sort; beacuse it really small';

//#2 - eBay sorts listings by the current Bid amount:
ans =
  'use Radix or Count; because the range is small, like one dollar to ten dollar';

//#3 - Sport scores on ESPN
ans =
  'use quck sort; 因為分數總類太多，有大有小。然後因為數量可能很大代表 space complexity 儘量選小，故不適合使用 merge sort, 這樣 memory 會吃很重';

//#4 - Massive database (can't fit all into memory) needs to sort through past year's user data
ans =
  'merge sort, 因為 memory 要考慮使用外部資源，就不考慮使用 space complexity; 這邊不用 quick 是因為資料很龐大，不想讓他的 worst case 到 n^2，這樣處理起來太慢';

//#5 - Almost sorted Udemy review data needs to update and add 2 new reviews
ans = 'insertion sort, 因為都要排好了';

//#6 - Temperature Records for the past 50 years in Canada
ans = 'radix or count sort, 如果數字沒有小數的話，且range 不大時。';
ans = 'else quick sort';

//#7 - Large user name database needs to be sorted. Data is very random.
ans = 'quick or merge 都行，但 quick 要確定能選到好的 piviot';

//#8 - You want to teach sorting for the first time
// bubble sort
```
