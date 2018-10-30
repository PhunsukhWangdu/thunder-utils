export default (cb, time = 500) => {
  let timer;
  return () => {
    clearTimeout(timer)
    timer = setTimeout(cb, time)
  }
}