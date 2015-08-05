## Exercise 5

# Demonstrating Node is single-threaded

Create a file named `single-thread.js` with the following code:

**single-thread.js:**

```js
function callback() {
  var limit = Date.now() + 3e3;
  while(Date.now() < limit);
  console.log('done 1');
}

function callback2() {
  console.log('done 2');
}

setTimeout(callback, 1);
setTimeout(callback2, 1);
```

Before running it, knowing that Node is single threaded, predict what will be the result of this script.

Verify your assumptions. Explain the behavior.