function mixin(...mixins) {
  class Mix {}

  for(let Ori of mixins) {
    copyPorperties(Mix, Ori)
    copyPorperties(Mix.prototype, Ori.prototype)
  }

  return Mix;
}

function copyPorperties(target, source) {
  for(let k of Reflect.ownKeys(source)) {
    if(k!=='constructor' && k!=='prototype' && k!=='name') {
      let desc = Object.getOwnPropertyDescriptor(source, k);
      Object.defineProperty(target, k, desc);
    }
  }
}