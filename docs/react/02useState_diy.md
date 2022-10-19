---
slug: /useState_anylisis
---

# useState 分析

先附上 [github 連結](https://github.com/lovewith80871/customizeUseState)

分析 useState 功能，並且嘗試自己寫一個 useState。<br/>
一開始我們需要釐清這個 useState 需要有什麼需求或特性。以下是我自己列出需要達成的項目。

1. 是一個 function，需帶入一個參數，然後回傳一個 array 包含 [state, function]。
2. 使用 return 的 function 的時候，需要 re-render 頁面。
3. Initial state 是需要被記憶且不能被重新定義的。
4. 要能連續定義的 useState。
5. 需要注意的事項 <br />
   (5.1) setCount(count + 1) and setCount((count) => count + 1) 的不同？<br />
   (5.2) Lazy initial state

---

## 大綱

- 先從第 1, 2 點來完成一開始的 useState 架構
- Initial state 是需要被記憶且不能被重新定義的
- 要能連續定義的 useState
- 實現 setCount(count + 1) and setCount((count) => count + 1) 的不同
- 實現 Lazy initial state

---

## 先從第 1, 2 點來完成一開始的 useState 架構。

```jsx showLineNumbers
import React from 'react';
// 我們 import 這個function 來 rerender 我們的 component
import { render } from 'react-dom';

// 自定義 useState
const useState = (initialValue) => {
  // 定義 _state 去接從外部傳進來的 parameter (initialValue)。
  let _state = initialValue;

  // 定義 function，並透過 function 的 parameter 去修改 _state。
  const callback = (newState) => {
    _state = newState;

    // function 要結束時重新 render 畫面。
    render(<SampleUseState />, document.getElementById('root'));
  };

  // 回傳 [_state, callback function]
  return [_state, callback];
};

const SampleUseState = () => {
  const [count, setCount] = useState(0);
  const clickHandler = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => clickHandler()}>Click me</button>
    </div>
  );
};

export default SampleUseState;
```

到這裡基本上最原始的 useState 架構已經建置完畢，但實際上拿這段程式去使用，會發現「 誒～奇怪，怎麼按了 Click me，畫面都沒有+1 呢 」。

原因是當我的 click 觸發 setCount 的時候，這時候的 \_state 的確會變成 1，但會觸發第 15 行的 re-render，導致 \_state 會重新被第 23 行的 useState(0) 覆蓋掉，進而還是出現 0 的情況。
所以再來我們就必須來記憶這個 \_state，不能讓他隨隨便便就被覆蓋掉。

---

## Initial state 是需要被記憶且不能被重新定義的。

```jsx showLineNumbers
let _state;
const useState = (initialValue) => {
  _state = _state || initialValue;
  const callback = (newState) => {
    _state = newState;
    render(<SampleUseState />, document.getElementById('root'));
  };
  return [_state, callback];
};
```

先將原本在 function 內的 \_state 拉到外面去定義，並將第 3 行，改寫成如上述程式碼所視。因為一開始 \_state 會是 undefined 所以會讓 \_state 等於 initialValue，之後因為 \_state 有值了，initialValue 就不會再覆寫進 \_state 裡。這樣我們點選 click 就能使 count 一直往上+1 了。

但是到這裡還會有個問題，那就是當我們使用到 **複數** 的 useState 時（如下）

```jsx showLineNumbers
const SampleUseState = () => {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const clickHandler = () => {
    setCount(count + 1); // 使 count + 1
    setCount2(count2 + 2); // 使 count2 + 2
  };
  return (
    <div>
      <p>You clicked {count} times</p>
      <p>You clicked {count2} times</p>
      <button onClick={() => clickHandler()}>Click me</button>
    </div>
  );
};
```

會發現，每當我們觸發 clickHandler 時 count 會和 count2 一樣，一起被+2，但我們的預期應該是 count 只能被+1，count2 才是+2。那這又是怎樣？

其實就是 count 和 count2 共用了同一個 \_state，並且 count2 污染到了原本 count 的 \_state。

---

## 要能連續定義的 useState

```jsx showLineNumbers
// 將原本的 _state 改成一個陣列
let memoizedState = [];

// 當前 memoizedState index。
let cursor = 0;
const useState = (initialValue) => {
  memoizedState[cursor] = memoizedState[cursor] || initialValue;
  const currentCursor = cursor;
  const callback = (newState) => {
    memoizedState[currentCursor] = newState;

    // 準備重新 render 畫面前，要記得將 cursor 初始化。
    cursor = 0;
    render(<SampleUseState />, document.getElementById('root'));
  };

  // 每次 return 後，都會將 cursor +1
  return [memoizedState[cursor++], callback];
};
```

這樣就能將複數個 useState 所產生出的 state，分別記在這個陣列裡。一開始，我們將第一個 state 的值紀錄在 memoizedState[0]，然後在 return 時，我們會讓 cursor+1，這樣下一個 state 就會紀錄在 memoizedState[1] 的位置，以此類推...

這樣寫就可以很漂亮的將 count 還有 count2 分開了！！

到了這裡，最基本的 useState 就完成了～ 不過還記得我們在 **上一篇提到 要特別注意的事項** 裡提到的兩個特別的 useState 特性嗎？ 我們來嘗試把這兩個特性加入我們的程式碼內。

---

## 實現 setCount(count + 1) and setCount((count) => count + 1) 的不同

原本 setCount(count + 1) 這裡的 count 是指頁面本身的 count。
而 setCount(count => count + 1) 的 count 是 callback 回傳回來的 state。

將原本 useState 裡的 callback 改成如下

```jsx showLineNumbers
const callback = (newState) => {
  if (typeof newState === 'function') {
    memoizedState[currentCursor] = newState(memoizedState[currentCursor]);
  } else {
    memoizedState[currentCursor] = newState;
  }
  cursor = 0;
  render(<SampleUseState />, document.getElementById('root'));
};
```

這樣我們自定義的 useState 也能在使用 setCount 的時候，傳入一個 callback function 且效果就跟 React Hook 一樣，能拿到最即時的 state 去處理。

---

## 實現 Lazy initial state

實現跟上面的做法很雷同，就是當傳入的 initalValue 也是一個 function 時，需要另外做處理。這邊直接附上最後完整的程式碼

```jsx showLineNumbers
import React from 'react';
import { render } from 'react-dom';
let memoizedState = [];
let cursor = 0;

const useState = (initialValue) => {
  if (typeof initialValue === 'function') {
    memoizedState[cursor] = memoizedState[cursor] || initialValue();
  } else {
    memoizedState[cursor] = memoizedState[cursor] || initialValue;
  }
  const currentCursor = cursor;
  const callback = (newState) => {
    if (typeof newState === 'function') {
      memoizedState[currentCursor] = newState(memoizedState[currentCursor]);
    } else {
      memoizedState[currentCursor] = newState;
    }
    cursor = 0;
    render(<SampleUseState />, document.getElementById('root'));
  };
  return [memoizedState[cursor++], callback];
};

const expensive = () => {
  console.log('expensive');
  return 0;
};

const SampleUseState = () => {
  const [count, setCount] = useState(() => expensive());
  const clickHandler = () => {
    setCount((count) => count + 1);
    setCount((count) => count + 1);
  };
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => clickHandler()}>Click me</button>
    </div>
  );
};

export default SampleUseState;
```

這樣就能發揮到 Lazy initial state 的特性，在第一次載入時，才會執行到 expensive 的 function，之後 rerender 都不會使用到。
