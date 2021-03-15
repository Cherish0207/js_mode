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
}

const chain500 = new Chain(order500);
const chain200 = new Chain(order200);
const chainnormal = new Chain(ordernormal);
chain500.setNextSuccessor(chain200).setNextSuccessor(chainnormal);
order500(1, true, 500); // 输出：500 元定金预购, 得到 100 优惠券
// chain500.exec(1, false, 500); // 输出：普通购买, 无优惠券
// order500( 2, true, 500 ); // 输出：200 元定金预购, 得到 500 优惠券
// order500( 3, false, 500 ); // 输出：普通购买, 无优惠券
// order500( 3, false, 0 ); // 输出：手机库存不足
