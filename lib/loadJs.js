export default (url, cb) => {
  url += `?v=${timer}`
  const that = this || window
  let head = that.document.getElementsByTagName('head')[0]
  let js = that.document.createElement('script')
  js.setAttribute('type', 'text/javascript')
  js.setAttribute('async', 'async')
  js.setAttribute('src', url)
  js.onload = cb
  head.appendChild(js)
}