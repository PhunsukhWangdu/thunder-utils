Function.prototype.callPolyfill = function(content, ...argv){
  if(typeof this !== 'function') {
    throw new TypeError("it's not a function")
  }
  content = content || window;
  content.fn = this;
  //const params = [...arguments].slice(1) || [];
  //[...arguments].slice(1)
  const res = content.fn(...argv);
  delete this.fn;
  return res;
}