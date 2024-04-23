import { AsyncLocalStorage } from 'node:async_hooks';

const storage = new AsyncLocalStorage();
let id = 0;

function one() {
  storage.enterWith({
    traceId: id++
  });
  two()
}

function two() {
  setTimeout(() => {
    three()
  }, Math.random() * 1000)
}

function three() {
  const store = storage.getStore()
  console.log(store.traceId, id)
}

one();
one();
one();
one();
one();