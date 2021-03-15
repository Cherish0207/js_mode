const order500 = function (orderType, pay, stock) {
  if (orderType === 1 && pay === true) {
    console.log("500 元定金预购, 得到 100 优惠券");
  } else {
    return "nextSuccessor";
  }
};
const order200 = function (orderType, pay, stock) {
  if (orderType === 2 && pay === true) {
    console.log("200 元定金预购, 得到 50 优惠券");
  } else {
    return "nextSuccessor";
  }
};
const ordernormal = function (orderType, pay, stock) {
  if (stock > 0) {
    console.log("普通购买, 无优惠券");
  } else {
    console.log("手机库存不足");
  }
};
class Chain {
  constructor(fn) {
    this.fn = fn;
    this.successor = null;
  }
  setNextSuccessor(successor) {
    return (this.successor = successor);
  }
  exec() {
    const nxt = this.fn.call(this, ...arguments);
    if (nxt === "nextSuccessor") {
      return this.successor.exec.call(this.successor, ...arguments);
    }
  }
  next() {
    return this.successor.exec.call(this.successor, ...arguments);
  }
}
const fn1 = new Chain(function () {
  console.log(1);
  return "nextSuccessor";
});
const fn2 = new Chain(function () {
  console.log(2);
  var self = this;
  setTimeout(function () {
    self.next(); // 异步，调用next
  }, 1000);
});
const fn3 = new Chain(function () {
  console.log(3);
});
fn1.setNextSuccessor(fn2).setNextSuccessor(fn3);
fn1.exec();
