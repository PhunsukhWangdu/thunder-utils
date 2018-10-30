const _competeParams = (ori, now) => JSON.stringify(ori) === JSON.stringify(now)

const cacheAble = (api, opt = {}) => {
  let cache = null
  let oriparam = ''
  const { cacheOnlyResolve } = opt
  let p = (...props) => {
    if(_competeParams(oriparam, props) && cache) return cache
    oriparam = props;
    const result = api(...props).then(d => {
      if (cacheOnlyResolve) cache = result
    return d
  })
    if (!cacheOnlyResolve) cache = result
    return result
  }
  p.clean = () => (cache = null)
  return p
}

export default cacheAble;