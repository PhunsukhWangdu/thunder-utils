export function inherit(C, P){
  var F = function(){};
  F.prototype = P.prototype;
  C.prototype = new F();
  C.uber = P.prototype;
  //如果不将构造函数指回，new C()的constructor就是P
  //new C()->child.constructor ->child.__proto__.constructor->F.prototype.constructor->P.prototype.constructor->P
  C.prototype.constructor = C;
}