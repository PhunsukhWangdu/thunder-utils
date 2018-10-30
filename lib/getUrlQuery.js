export default (url) => {
  url = url || window.location.href;
  if (url.indexOf('?') < 0) return {};
  const searchCount = url.split('').filter(i => i==='?').length; //兼容链接中两个'？'的情况
  let urlSearch = searchCount > 1 ? location.search.split('?')[1].split('&') : [];
  let URLParam = url.replace(/^.+\?/, '').replace(/(#.*)?$/, '').split('&');
  return urlSearch.concat(URLParam)
    .filter(param => param)
    .map(decodeURIComponent)
    .reduce((obj, param) => {
      const i = param.indexOf('=');
      const t = [param.slice(0, i), param.slice(i + 1)];
      obj[t[0]] = t[1];
      return obj
    },{})
}