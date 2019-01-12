function compose(...funcs) {
  // 当未传入函数时，返回一个函数：arg => arg,直接调用reduce会typeerror
  if(funcs.length === 0) {
      return arg => arg
  }
  
  // 当只传入一个函数时，直接返回这个函数,个人觉得这句判断没必要，因为reduce方法如果是一个只有一个值的空数组，且不传入
  // initialValues时，就会返回这个数组的这一项
  // var a = [()=>{console.log(111)}]
  // a.reduce((a, b) => (...args) => a(b(...args))) == a[0] //true
  if(funcs.length === 1) {
      return funcs[0]
  }
  
  // 返回组合后的函数 从左向右从外到里
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
  //or
  return (arg) => funcs.reduceRight((compose, f) => f(compose), arg)
  
}

return funcs.reduce((last, next) => (...argv) => last(next(...argv)))