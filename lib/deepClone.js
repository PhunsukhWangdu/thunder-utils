function deepClone(obj) {
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

export default deepClone;