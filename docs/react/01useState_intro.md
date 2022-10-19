---
slug: /useState_intro
---

# useState 介紹

## 大綱

- 什麼是 useState
- 如何使用 useState
- 要特別注意的事項

---

## 什麼是 useState

一般情況下，Function component 是沒辦法保留 state 的。
所以必須藉由 useState Hook 來對 Function component 裡面存 local state。

---

## 如何使用 useState

```jsx showLineNumbers
import React, { useState } from 'react';

const SampleUseState = () => {
  // count 是 state, setCount 是修改 count 的 function
  const [count, setCount] = useState(0);
  const clickHandler = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => clickHandler()}> add count </button>
    </div>
  );
};
export default SampleUseState;
```

這邊稍微提一下上面程式碼是在幹嘛。

> 第 5 行：我們定義 count 的 state 為 0，且 setCount 為修改 count 的 function。如果需要修改 count 的值時必須要透過 setCount 這個 function <br/>
> 第 12 行：使用者點擊時，讓 count +1。

這樣我們就可以單純的在 Function component 裡面去讀跟寫這個 state。 **且不必擔心這個 state 在每次 re-render 的時候會被清掉。**

---

## 要特別注意的事項

這裡想提兩個使用 useState 需要特別注意的事項。

- setCount(count + 1) vs setCount(count => count + 1)？
- Lazy initial state

### 1. setCount(count + 1) VS setCount(count => count + 1)？

上面這兩個寫法到底有什麼差異呢？讓我們先改寫一下原本的 clickHandler 這個 function，讓他執行 +1 這個動作兩次。

```jsx showLineNumbers
const clickHandlerOne = () => {
  // 結果: 只會加1
  setCount(count + 1);
  setCount(count + 1);
};
const clickHandlerTwo = () => {
  // 結果: 會加2
  setCount((count) => count + 1);
  setCount((count) => count + 1);
};
```

上述程式碼，我們用來代替原本的 clickHandler 後，分別會發生什麼事呢？
預期我們想對原本的 count+1 兩次，也就是希望結果是+2。我們可以看到在 clickHandlerOne 裡，結果只會+1。但 clickHandlerTwo 卻可以達到我們想+2 的需求。

會發生這個結果的原因是，在 clickHandlerOne 裡面，我們是用頁面本身被定義的 count 做+1，但因為頁面本身的 count 並不會立即的更新，所以導致我們是做了兩次 0+1 的用法。不過在 clickHanlderTwo 裡面，可能眼尖的你就會發現，我們是在對一個 callback function 裡面的參數做+1，這裡可以先說，這個 callback function 裡的參數是即時被更新的。至於他是如何做到，要等到下一篇的實作我們才會釐清。

### 2. Lazy initial state

這裡要先知道一件事，當元件初始化時， useState 會先將 initial value 寫入我們定義的參數(這裡範例是 count )，之後 rerender 時 initial value 是什麼就不重要了。

我們用以下範例來說明要如和使用 Lazy initial state 的特性

```jsx showLineNumbers
const someExpensiveComputation = () => {
  console.log('expensive computation'); // 代表運算量極大
  return 0;
};

const sampleUseState = () => {
  const [count, setCount] = useState(someExpensiveComputation());
  const clickHandler = () => {
    setCount((count) => count + 1);
  };
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => clickHandler()}> add count </button>
    </div>
  );
};
```

> 這裡我們多了一個 **someExpensiveComputation** 的 funtion，用來代表是一個運算量極大的 function，並且會回傳我一個 value，這裡稱為 initial value。

我們會發現每次觸發 clickHandler 使元件 rerender 的時候，console 都會印出 ‘expensive computation’ 代表 rerender 都會執行到 **someExpensiveComputation**，導致效能變得 **不好** 。但其實我們在初始化之後的 rerender 根本不用再去理 initial value 是什麼，但程式還是會一直算 someExpensiveComputation，所以我們就要利用 Lazy initial state 的特性去避開這件事。

這時候我們把第七行改成以下：

```jsx showLineNumbers
const [count, setCount] = useState(() => someExpensiveComputation());
// 這就是 Lazy initial state 的寫法
```

就會發現他只有在第一次載入的時候，才會執行 **someExpensiveComputation**，之後 rerender 的時候都不會在執行這個 function。這樣就能達成我們的需求。

---
