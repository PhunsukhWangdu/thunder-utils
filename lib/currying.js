function currying(fn, ...argv1) {
  let _paramlist = argv1;
  const _func = fn;
  return function _thenfunc(...argv2) {
    _paramlist.push(argv2);
    if(_paramlist.length >= _func.length) return _func.apply(null, _paramlist);
    return _thenfunc;
  }
}

function trueCurrying(fn, ...args) {
  if (args.length >= fn.length) {
    return fn(...args)
  }
  return function (...args2) {
    return trueCurrying(fn, ...args, ...args2)
  }
}