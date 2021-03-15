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

Function.prototype.after = function (fn) {
  var __self = this;
  return async function () {
    var ret = await __self.apply(this, arguments);
    if (ret === "nextSuccessor") {
      fn.apply(this, arguments);
    }
    return ret;
  };
};

var order = order500.after(order200).after(ordernormal);
// order(1, false, 500);
order(1, true, 500); // 输出： 500 元定金预购, 得到 100 优惠券
