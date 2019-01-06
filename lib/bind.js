Function.prototype.bindPolyfill = function(content){
  if(typeof this !== 'function') {
    throw new TypeError("it's not a function")
  }
  content = content || window;
  const func = this;
  const _argv = Array.prototype.slice.call(arguments, 1);
  return function() {
    // content.fn = func;
    // const res = content.fn(arguments);
    // delete this.fn;
    // 因为返回了一个函数，我们可以 new F()，所以需要判断,这时this是F的一个实例化对象，不应被改变
    if (this instanceof F) {
      return new _this(...args, ...arguments)
    }
    const argv = Array.prototype.slice.call(arguments, 0);
    func.apply(content, _argv.concat(argv))
  }
}