Function.prototype.applyPolyfill = function(content, argv){
  if(typeof this !== 'function') {
    throw new TypeError("it's not a function")
  }
  content = content || window;
  content.fn = this;
  let params = (argv && Object.prototype.toString.call(argv) === "[object Array]") ? argv : [];
  //const params = [...arguments].slice(1) || [];
  //[...arguments].slice(1)
  //const res = content.fn(...params);
  //这里params会自动调用toString
  const res = eval('content.fn(' + params +')');
  delete this.fn;
  return res;
}