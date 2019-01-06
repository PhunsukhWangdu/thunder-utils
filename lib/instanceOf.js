function _instanceOf(obj, Constr) {
  const prototype = Constr.prototype;
  //proto = obj.__proto__;
  let proto = Object.getPrototypeOf(obj);
  while(true) {
    if(proto === undefined || proto === null) return false;
    if(proto === prototype) return true
    proto = Object.getPrototypeOf(obj);
  }
}