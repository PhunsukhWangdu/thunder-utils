//1.traversal

const deepClone = function deepClone(obj) {
  function isObject(o) {
    return(typeof o === 'object' || typeof o === 'function') && o !== null
  }
  if(!isObject(o)) throw new Error('not a object');

  const isArray = Array.isArray(obj);
  let result = isArray ? [...obj] : {...obj};
  Reflect.ownKeys(result).forEach(
    k => result[k] = isObject(obj[k]) ? deepClone(obj[k]) : obj[k]
  )

  return result
}

//2.MessageChannel
const structuralClone = function(obj) {
  return new Promise(
    r => {
      const { port1, port2 } = new MessageChannel();
      port1.onmessage = ev => resolve(ev.data);
      port2.postMessage(obj)
    }
  )
}

// 注意该方法是异步的
// 可以处理 undefined 和循环引用对象
const test = async () => {
  const clone = await structuralClone(obj)
  console.log(clone)
}
test()

//3.JSON
const cloneWithoutSerilize = (obj) => JSON.parse(JSON.stringify(obj))


export default {
  deepClone,
  structuralClone,
  cloneWithoutSerilize
}